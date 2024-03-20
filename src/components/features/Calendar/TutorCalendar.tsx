import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  Flex,
  Hide,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Show,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { StyleWrapper } from "@/styles/calendar";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import addTerm from "@/helpers/addTerm";
import { convertDateTime } from "@/utils/convertDateTime";
import IUserProps from "@/interfaces/IUserProps";
import termConvertor from "@/utils/termConvertor";
import { headerToolbarConst } from "@/consts/headerToolbarConst";
import { footerToolbarConst } from "@/consts/footerToolbarConst";
import deleteTerm from "@/helpers/deleteTerm";

interface IEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  textColor: string;
}

export default function TutorCalendar({ userData, myTerms, subjects, allInstructions, students }: IUserProps) {
  const { isOpen: isOpenEvent, onOpen: onOpenEvent, onClose: onCloseEvent } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventInfo, setEventInfo] = useState({
    term: "",
    subject_name: "",
    student_name: "",
    description: "",
  });
  const [term, setTerm] = useState({
    instructor_id: userData?.id || "",
    date: "",
    duration_h: 0,
    duration_m: 0,
    description: "",
    repeat: "n",
  });
  const [error, setError] = useState(false);

  const headerToolbar = useBreakpointValue(headerToolbarConst);
  const footerToolbar = useBreakpointValue(footerToolbarConst);

  useEffect(() => {
    if (myTerms) {
      const theEvents = myTerms?.map((t) => {
        let endDate = new Date(t.start);
        const start = convertDateTime(new Date(t.start));
        endDate.setMinutes(endDate.getMinutes() + t.duration_min);
        const end = convertDateTime(endDate);

        const subject_id = allInstructions?.find((i) => i.instruction_id == t.instruction_id)?.subject_id;
        const subject = subjects?.find((subject) => subject.subject_id == subject_id)?.subject_name;

        let backgroundColor = "#183d3d";
        let color = "#eeeeee";
        if (subject) {
          backgroundColor = "#F1C93B";
          color = "#040D12";
        }

        return {
          id: t.term_id,
          title: subject || "",
          start: start,
          end: end,
          backgroundColor: backgroundColor,
          textColor: color,
        };
      });

      setEvents(theEvents);
    }
  }, []);

  const handleDateClick = (arg: any) => {
    const formattedDate = new Date(arg.dateStr);
    setTerm({ ...term, date: convertDateTime(formattedDate) });
    onOpen();
  };

  const handleTerm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTerm({ ...term, [e.target.id]: e.target.value });
  };

  const handleMinutesChange = (e: any) => {
    let duration_m = parseInt(e.target.value, 10);
    let duration_h = term.duration_h;
    const startHour = new Date(term.date).getHours();
    const startMinute = new Date(term.date).getMinutes();
    duration_m = Math.min(duration_m, 22 * 60 - (startHour * 60 + startMinute) - duration_h * 60);
    setTerm({ ...term, duration_m: duration_m });
  };

  const handleHoursChange = (e: any) => {
    let duration_h = parseInt(e.target.value, 10);
    let duration_m = term.duration_m;
    const startHour = new Date(term.date).getHours();
    const startMinute = new Date(term.date).getMinutes();
    duration_h = Math.min(duration_h, Math.floor(((22 - startHour) * 60 - startMinute - duration_m) / 60));
    setTerm({ ...term, duration_h });
  };

  const handleDateTimeTerm = (e: any) => {
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

    setTerm({ ...term, date: convertDateTime(datetime) });
  };

  const handleEventClick = async (eventClickInfo: any) => {
    const termDate = termConvertor(eventClickInfo);

    let student_id = "";
    let instruction_id = "";
    let description = "";
    let subject_id = "";
    let subject_name = "";
    let student_name = "";

    myTerms?.find((t) => {
      if (t.term_id == eventClickInfo.event.id) {
        student_id = t.student_id || "";
        instruction_id = t.instruction_id || "";
        description = t.description || "";
      }
    });
    allInstructions?.find((i) => {
      if (i.instruction_id == instruction_id) subject_id = i.subject_id || "";
    });
    subjects?.find((s) => {
      if (s.subject_id == subject_id) subject_name = s.subject_name || "";
    });
    students?.find((s) => {
      if (s.user_id == student_id && s.first_name && s.last_name) student_name = s.first_name + " " + s.last_name;
    });

    setEventInfo({
      ...eventInfo,
      term: termDate,
      subject_name: subject_name,
      student_name: student_name,
      description: description,
    });

    if (subject_name && student_name) {
      onOpenEvent();
    } else {
      const confirmed = confirm(`Are you sure you want to delete this term (${termDate})?`);
      if (confirmed && termDate) {
        try {
          const res = await deleteTerm(eventClickInfo.event.id);
          if (res.status === 200) {
            window.location.reload();
          }
        } catch (error) {}
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    if (!term.date || (term.duration_h == 0 && term.duration_m == 0)) {
      setError(true);
      return;
    }

    try {
      if (term.instructor_id) {
        const res = await addTerm(term);
        if (res.status === 200) {
          window.location.reload();
        }
      }
    } catch (error) {}
  };

  function renderEventContent(eventInfo: any) {
    return (
      <div onClick={() => handleEventClick(eventInfo)}>
        <Hide below="md">
          <Text>{eventInfo?.timeText}</Text>
          <Text>{eventInfo?.event?.title}</Text>
        </Hide>
        <Show below="md">
          <Text>{eventInfo?.timeText?.split(" ")[0]}</Text>
        </Show>
      </div>
    );
  }

  return (
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
            eventClick={handleEventClick}
          />
        </StyleWrapper>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalHeader textAlign="center">Add new term</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center">
              <Text>Date</Text>
              <Input
                id="date"
                type="datetime-local"
                onChange={handleDateTimeTerm}
                value={term.date}
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
                  value={term.duration_h}
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
                  value={term.duration_m}
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
                onChange={handleTerm}
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
                onChange={handleTerm}
                placeholder="Say something about your term..."
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

      <Modal isOpen={isOpenEvent} onClose={onCloseEvent}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>{eventInfo.term}</ModalHeader>
            <Text mt="8px">Subject: {eventInfo.subject_name}</Text>
            <Text mt="8px">Student: {eventInfo.student_name}</Text>
            <Text mt="8px" mb="8px">
              {eventInfo.description}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
