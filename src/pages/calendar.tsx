import RegHeader from "@/components/shared/RegHeader";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import { GetServerSideProps } from "next";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { StyleWrapper } from "@/styles/calendar";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import addAvailability from "@/helpers/addAvailability";
import getCurrentUserAvailability from "@/helpers/getCurrentUserAvailability";
import { convertDateTime } from "@/utils/convertDateTime";

export default function calendar({ userData, myAvailability }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState(false);
  const [availability, setAvailability] = useState({
    instructor_id: userData?.id || "",
    date: "",
    duration_h: 0,
    duration_m: 0,
    description: "",
    repeat: "n",
  });
  const [events, setEvents] = useState<{ start: string; end: string }[]>([]);
  
  //(///////////////////////////)
  console.log(availability)

  useEffect(() => {
    const theEvents = myAvailability.map((a) => {
      let endDate = new Date(a.start);
      let startDate = new Date(a.start);

      const start = convertDateTime(startDate);

      endDate.setMinutes(endDate.getMinutes() + a.duration_min);
      const end = convertDateTime(endDate);

      return { start: start, end: end };
    });
    setEvents(theEvents);
  }, []);

  const handleDateClick = (arg: any) => {
    const formattedDate = new Date(arg.dateStr);
    setAvailability({ ...availability, date: convertDateTime(formattedDate) });
    onOpen();
  };

  const handleAvailability = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAvailability({ ...availability, [e.target.id]: e.target.value });
  };

  const handleMinutesChange = (e: any) => {
    let duration_m = parseInt(e.target.value, 10);
    let duration_h = availability.duration_h;

    const startHour = new Date(availability.date).getHours();
    const startMinute = new Date(availability.date).getMinutes();

    duration_m = Math.min(duration_m, 22 * 60 - (startHour * 60 + startMinute) - duration_h * 60);

    setAvailability({ ...availability, duration_m: duration_m });
  };

  const handleHoursChange = (e: any) => {
    let duration_h = parseInt(e.target.value, 10);
    let duration_m = availability.duration_m;

    const startHour = new Date(availability.date).getHours();
    const startMinute = new Date(availability.date).getMinutes();

    duration_h = Math.min(duration_h, Math.floor(((22 - startHour) * 60 - startMinute - duration_m) / 60));

    setAvailability({ ...availability, duration_h });
  };

  const handleDateTimeAvailability = (e: any) => {
    let datetime = new Date(e.target.value);

    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();

    if (hours < 7) {
      datetime.setHours(7);
      datetime.setMinutes(0);
    }

    if (hours > 21 || (hours === 21 && minutes > 0)) {
      datetime.setHours(21);
      datetime.setMinutes(0);
    }

    setAvailability({ ...availability, date: convertDateTime(datetime) });
  };

  const headerToolbar = useBreakpointValue({
    base: { left: "prev,today,next", right: "title" },
    md: {
      left: "prev,next",
      center: "title",
      right: "today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
  });

  const footerToolbar = useBreakpointValue({
    base: { left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek" },
    md: {},
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError(false);
    if (!availability.date || (availability.duration_h == 0 && availability.duration_m == 0)) {
      setError(true);
      return;
    }

    try {
      if (availability.instructor_id) {
        const res = await addAvailability(availability);
        if (res.status === 200) {
          window.location.reload();
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <RegHeader userData={userData} myAvailability={[]} />
      {userData?.role == "tutor" && (
        <Flex justify="center" p={{ base: "8px", md: "64px" }}>
          <Box w="800px">
            <StyleWrapper>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={headerToolbar}
                footerToolbar={footerToolbar}
                eventTimeFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
                slotLabelFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
                slotMinTime={"07:00:00"}
                slotMaxTime={"22:00:00"}
                timeZone="Europe/Zagreb"
                firstDay={1}
                allDaySlot={false}
                dateClick={handleDateClick}
                eventContent={renderEventContent}
                events={events}
              />
            </StyleWrapper>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent color="#040D12" bg="#93B1A6">
              <ModalHeader textAlign="center">Add new availability</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex direction="column" align="center">
                  <Text>Date</Text>
                  <Input
                    id="date"
                    type="datetime-local"
                    onChange={handleDateTimeAvailability}
                    value={availability.date}
                    w="264px"
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                  />

                  <Text mt="16px">Duration</Text>
                  <Flex textAlign="center" gap="8px" fontSize="14px">
                    <Text w="128px">Hours</Text>
                    <Text w="128px">Minutes</Text>
                  </Flex>
                  <Flex gap="8px">
                    <Input
                      id="duration_h"
                      type="number"
                      onChange={handleHoursChange}
                      value={availability.duration_h}
                      w="128px"
                      borderColor="#040D12"
                      _hover={{ borderColor: "#5C8374" }}
                      focusBorderColor="#040D12"
                      placeholder="hours"
                      _placeholder={{ color: "#5C8374" }}
                    />
                    <Input
                      id="duration_m"
                      type="number"
                      onChange={handleMinutesChange}
                      value={availability.duration_m}
                      w="128px"
                      borderColor="#040D12"
                      _hover={{ borderColor: "#5C8374" }}
                      focusBorderColor="#040D12"
                      placeholder="minutes"
                      _placeholder={{ color: "#5C8374" }}
                    />
                  </Flex>

                  <Text mt="16px">Repeat</Text>
                  <Select
                    id="repeat"
                    onChange={handleAvailability}
                    w="264px"
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                  >
                    <option value="n">Never</option>
                    <option value="d">Daily</option>
                    <option value="w">Weekly</option>
                    <option value="m">Monthly</option>
                  </Select>

                  <Text mt="16px">Description</Text>
                  <Textarea
                    id="description"
                    onChange={handleAvailability}
                    placeholder="Say something about your availability..."
                    w="264px"
                    maxLength={300}
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                    _placeholder={{ color: "#5C8374" }}
                  />

                  {error && (
                    <Text textAlign="center" mt="16px" color="#B50711">
                      Date and duration is required.
                    </Text>
                  )}
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button _hover={{ color: "#183D3D" }} variant="unstyled" onClick={onClose}>
                  Close
                </Button>
                <Button
                  onClick={handleSubmit}
                  ml="16px"
                  bgColor="#183D3D"
                  color="#eeeeee"
                  _hover={{ bgColor: "#5C8374", color: "#040D12" }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      )}
      {userData?.role == "student" && <></>}
    </>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let session = await getMe(req);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  let userData = await getCurrentUserInfo(req);
  let myAvailability = await getCurrentUserAvailability(req);

  return {
    props: {
      userData,
      myAvailability,
    },
  };
};
