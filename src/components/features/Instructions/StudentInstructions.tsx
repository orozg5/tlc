import IInfo from "@/interfaces/IInfo";
import IUserProps from "@/interfaces/IUserProps";
import { StyleWrapper } from "@/styles/calendar";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Show,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import React, { useRef, useEffect, useState } from "react";
import { BsFiletypeDocx, BsGenderFemale, BsGenderMale } from "react-icons/bs";
import {
  FaFileAlt,
  FaFileArchive,
  FaFileImage,
  FaFilePowerpoint,
  FaGenderless,
  FaRegFile,
  FaRegFileExcel,
  FaRegFilePdf,
  FaStar,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCake } from "react-icons/lu";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import ITerm from "@/interfaces/ITerm";
import getTutorTerms from "@/helpers/getTutorTerms";
import { convertDateTime } from "@/utils/convertDateTime";
import reserveTerm from "@/helpers/reserveTerm";
import termConvertor from "@/utils/termConvertor";
import { getTimeDifference } from "@/utils/getTimeDifference";
import { useRouter } from "next/navigation";
import getInstructionMaterials from "@/helpers/getInstructionMaterials";
import IMaterial from "@/interfaces/IMaterial";
import { getExtension } from "@/utils/getExtension";
import { supabase } from "@/lib/supabase";

interface IEvent {
  id: string;
  start: string;
  end: string;
  backgroundColor: string;
  textColor: string;
}

export default function StudentInstructions({
  userData,
  subjects,
  cities,
  allInstructions,
  instructors,
  terms,
}: IUserProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCalendar, onOpen: onOpenCalendar, onClose: onCloseCalendar } = useDisclosure();
  const { isOpen: isOpenReserve, onOpen: onOpenReserve, onClose: onCloseReserve } = useDisclosure();
  const { isOpen: isOpenMaterials, onOpen: onOpenMaterials, onClose: onCloseMaterials } = useDisclosure();
  const cancelRef = useRef(null);

  const [reserve, setReserve] = useState({ term: "", id: "" });
  const [events, setEvents] = useState<IEvent[]>();
  const [theTerms, setTheTerms] = useState<ITerm[]>();
  const [filter, setFilter] = useState({
    subject_id: "",
    grade: "",
    type: "",
    price: "",
    city_id: "",
    instructor_id: "",
    startDate: "",
    endDate: "",
  });
  const [info, setInfo] = useState<IInfo>({
    instructor: {},
    instruction: {},
  });

  const [materials, setMaterials] = useState<IMaterial[]>();

  useEffect(() => {
    if (theTerms) {
      const theEvents = theTerms?.map((t) => {
        let endDate = new Date(t.start);
        const start = convertDateTime(new Date(t.start));
        endDate.setMinutes(endDate.getMinutes() + t.duration_min);
        const end = convertDateTime(endDate);

        let backgroundColor = "#183d3d";
        let color = "#eeeeee";
        if (t.reserved) {
          backgroundColor = "#F1C93B";
          color = "#040D12";
        }

        return {
          id: t.term_id,
          start: start,
          end: end,
          backgroundColor: backgroundColor,
          textColor: color,
        };
      });
      setEvents(theEvents);
    }
  }, [theTerms]);

  const getTutorCalendar = async (user_id: string) => {
    try {
      if (user_id) {
        const res = await getTutorTerms(user_id);
        if (res.status === 200) {
          setTheTerms(res.data);
        }
      }
    } catch (error) {}
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  const clearFilter = () => {
    setFilter({
      subject_id: "",
      grade: "",
      type: "",
      price: "",
      city_id: "",
      instructor_id: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEventClick = async (eventClickInfo: any) => {
    let reserved = false;
    theTerms?.find((t) => {
      if (t.term_id == eventClickInfo.event.id) {
        reserved = t.reserved;
      }
    });

    if (!userData?.id) {
      router.push("/signin");
    } else if (reserved) {
      return;
    } else {
      const term = termConvertor(eventClickInfo);
      if (getTimeDifference(term)) {
        setReserve({ term: term, id: eventClickInfo.event.id });
        onOpenReserve();
      }
    }
  };

  function renderEventContent(eventInfo: any) {
    return (
      <div onClick={() => handleEventClick(eventInfo)}>
        <Hide below="md">
          <Text>{eventInfo.timeText}</Text>
        </Hide>
        <Show below="md">
          <Text>{eventInfo.timeText.split(" ")[0]}</Text>
        </Show>
      </div>
    );
  }

  const confirmReserve = async () => {
    try {
      if (reserve.id && info.instructor.user_id && userData?.id && info.instruction.instruction_id) {
        const data = {
          term_id: reserve.id,
          instructor_id: info.instructor.user_id,
          student_id: userData?.id,
          instruction_id: info.instruction.instruction_id,
          reserved: true,
        };
        const res = await reserveTerm(data);
        if (res.status === 200) {
          getTutorCalendar(info.instructor.user_id);
          onCloseReserve();
        }
      }
    } catch (error) {}
  };

  const tutorMaterials = async (user_id: string) => {
    try {
      if (user_id) {
        const res = await getInstructionMaterials(user_id);
        if (res) {
          setMaterials(res);
        }
      }
    } catch (error) {}
  };

  const downloadFile = async (filename: string, filepath: string) => {
    const { data, error } = await supabase.storage.from("files").download(filepath);
    if (data) {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      link.click();

      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" mt="64px" mb="64px">
      <>
        <Heading>Filter Instructions</Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          mt="16px"
          gap="8px"
          align="center"
          justify="center"
          textAlign="center"
        >
          <Box>
            <Text>Subject</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="subject_id"
              value={filter.subject_id}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              {subjects?.map((subject) => (
                <option value={subject.subject_id}>{subject.subject_name}</option>
              ))}
            </Select>
          </Box>

          <Box>
            <Text>Grade</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="grade"
              value={filter.grade}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              <option value="1e">1st, elementary</option>
              <option value="2e">2st, elementary</option>
              <option value="3e">3rd, elementary</option>
              <option value="4e">4th, elementary</option>
              <option value="5e">5th, elementary</option>
              <option value="6e">6th, elementary</option>
              <option value="7e">7th, elementary</option>
              <option value="8e">8th, elementary</option>
              <option value="1h">1st, high school</option>
              <option value="2h">2st, high school</option>
              <option value="3h">3rd, high school</option>
              <option value="4h">4th, high school</option>
              <option value="1u">1st, university</option>
              <option value="2u">2st, university</option>
              <option value="3u">3rd, university</option>
              <option value="4u">4th, university</option>
              <option value="5u">5th, university</option>
              <option value="6u">6th, university</option>
              <option value="other">other</option>
            </Select>
          </Box>

          <Box>
            <Text>Type</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="type"
              value={filter.type}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              <option value="online">online</option>
              <option value="irl">irl</option>
              <option value="other">other</option>
            </Select>
          </Box>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          mt="16px"
          gap="8px"
          align="center"
          justify="center"
          textAlign="center"
        >
          <Box>
            <Text>Price (€/h)</Text>
            <Input
              bg="#93B1A6"
              color="#040D12"
              id="price"
              value={filter.price}
              onChange={handleChangeFilter}
              type="number"
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
          </Box>

          <Box>
            <Text>City</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="city_id"
              value={filter.city_id}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              {cities?.map((city) => (
                <option value={city.city_id}>{city.city_name}</option>
              ))}
            </Select>
          </Box>

          <Box>
            <Text>Instructor</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="instructor_id"
              value={filter.instructor_id}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              {instructors?.map((i) => (
                <option value={i.user_id}>
                  {i.first_name} {i.last_name}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          mt="16px"
          gap="8px"
          align="center"
          justify="center"
          textAlign="center"
        >
          <Box w={{ base: "264px", md: "232px" }}>
            <Text>Start Date</Text>
            <Input
              bg="#93B1A6"
              color="#040D12"
              id="startDate"
              value={filter.startDate}
              onChange={handleChangeFilter}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
              type="date"
            />
          </Box>

          <Box w={{ base: "264px", md: "232px" }}>
            <Text>End Date</Text>
            <Input
              bg="#93B1A6"
              color="#040D12"
              id="endDate"
              value={filter.endDate}
              onChange={handleChangeFilter}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
              type="date"
            />
          </Box>
        </Flex>

        {(filter.subject_id ||
          filter.city_id ||
          filter.grade ||
          filter.instructor_id ||
          filter.price ||
          filter.type ||
          filter.startDate ||
          filter.endDate) && (
          <Button
            onClick={clearFilter}
            bg="#183D3D"
            color="#eeeeee"
            fontWeight="50px"
            _hover={{ bg: "#93B1A6", color: "#040D12" }}
            mt="16px"
          >
            Clear filter
          </Button>
        )}
      </>

      <Flex mt="64px" direction="column" gap="32px">
        {allInstructions
          ?.filter(
            (i) =>
              (filter.subject_id === "" || i.subject_id === filter.subject_id) &&
              (filter.grade === "" ||
                i.grade
                  ?.slice(1, -1)
                  .split(",")
                  .find((instr) => instr === filter.grade)) &&
              (filter.type === "" || i.type === filter.type) &&
              (filter.price === "" || i.price === Number(filter.price)) &&
              (filter.city_id === "" ||
                instructors?.find((instructor) => instructor.user_id === i.instructor_id)?.city_id ===
                  filter.city_id) &&
              (filter.instructor_id === "" || i.instructor_id === filter.instructor_id) &&
              ((filter.startDate === "" && filter.endDate === "") ||
                terms?.find(
                  (t) =>
                    t.instructor_id == i.instructor_id &&
                    !t.reserved &&
                    new Date(t.start.split("T")[0]).toLocaleDateString() >=
                      new Date(filter.startDate).toLocaleDateString() &&
                    new Date(t.start.split("T")[0]).toLocaleDateString() <=
                      new Date(filter.endDate).toLocaleDateString()
                ))
          )
          .map((instruction) => (
            <Flex
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setInfo({
                  instructor: {
                    user_id: instruction.instructor_id,
                    first_name: instruction.first_name,
                    last_name: instruction.last_name,
                    gender: instruction.gender,
                    date_of_birth: instruction.date_of_birth,
                    city_id: instruction.city_id,
                    phone: instruction.phone,
                    educational_attainment: instruction.educational_attainment,
                    finished_school: instruction.finished_school,
                    description: instruction.instructorDescription,
                    profile_photo: instruction.profile_photo,
                  },
                  instruction: instruction || {},
                });
                onOpen();
              }}
              borderRadius="16px"
              bg="#93B1A6"
              w={{ base: "300px", sm: "432px", md: "664px" }}
              color="#183D3D"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100px", md: "200px" }}
                borderTopLeftRadius="16px"
                borderBottomLeftRadius="16px"
                src={`data:image/jpeg;base64,${instruction.profile_photo}`}
              />
              <Flex p="16px" direction="column" w={{ base: "200px", sm: "332px", md: "464px" }}>
                <Heading>{instruction.subject_name}</Heading>
                <Text>
                  {instruction.first_name} {instruction.last_name}
                  {", "}
                  {instruction.educational_attainment} degree, {instruction.finished_school}
                </Text>
                <Text>
                  {instruction?.grade
                    ?.slice(1, -1)
                    .split(",")
                    .map((g, index) => (
                      <span key={index}>
                        {g && g == "other" && g}
                        {g && g != "other" && g[0]}
                        {g && g != "other" && (g[0] == "1" ? "st" : g[0] == "2" ? "nd" : g[0] == "3" ? "rd" : "th")}
                        {g && g != "other" && (g[1] == "e" ? "-elementry" : g[1] == "h" ? "-high" : "-university")}
                        {index !== instruction?.grade?.slice(1, -1).split(",").length - 1 && ", "}
                      </span>
                    ))}
                </Text>
                <Text>
                  {instruction.type},{" "}
                  {
                    cities?.find(
                      (city) =>
                        city.city_id ==
                        instructors?.find((instructor) => instructor.user_id == instruction.instructor_id)?.city_id
                    )?.city_name
                  }
                </Text>
                <Text mt="8px">{instruction.description}</Text>
                <Text mt="8px" color="#FAE392">
                  {instruction.price} €/h
                </Text>
                <Flex mt="16px">
                  {Array.from({ length: instruction.average_rating }, (_, index) => (
                    <FaStar key={index} color="#F1C93B" size="24px" />
                  ))}
                  {Array.from({ length: 5 - instruction.average_rating }, (_, index) => (
                    <FaStar key={index} color="#eeeeee" size="24px" />
                  ))}
                </Flex>
              </Flex>
            </Flex>
          ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent p="16px" color="#040D12" bg="#93B1A6" textAlign="center">
          <ModalCloseButton />
          <ModalBody>
            <Heading size="lg">Instructor</Heading>

            <Avatar w="132px" h="132px" src={`data:image/jpeg;base64,${info.instructor?.profile_photo}`} />
            <Text>
              {info.instructor?.first_name} {info.instructor?.last_name}
            </Text>

            <Flex align="center" justify="center" gap="8px">
              <Text>
                {info.instructor?.gender == "female" ? (
                  <BsGenderFemale />
                ) : info.instructor?.gender == "male" ? (
                  <BsGenderMale />
                ) : (
                  <FaGenderless />
                )}
              </Text>
              <Text>{info.instructor?.gender}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <LuCake />
              <Text>{info.instructor?.date_of_birth && (info.instructor?.date_of_birth).split("T")[0]}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <IoLocationOutline />
              <Text>{cities?.find((city) => city.city_id == info.instructor?.city_id)?.city_name}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <MdOutlineLocalPhone />
              <Text>+385 {info.instructor?.phone}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <PiGraduationCap />
              <Text>
                {info.instructor?.finished_school}, {info.instructor?.educational_attainment} degree
              </Text>
            </Flex>

            <Text mt="8px">{info.instructor?.description}</Text>

            <Heading mt="16px" size="lg">
              Instruction
            </Heading>
            <Text>{info.instruction?.subject_name}</Text>
            <Text>
              {info.instruction?.grade
                ?.slice(1, -1)
                .split(",")
                .map((g, index) => (
                  <span key={index}>
                    {g && g == "other" && g}
                    {g && g != "other" && g[0]}
                    {g && g != "other" && (g[0] == "1" ? "st" : g[0] == "2" ? "nd" : g[0] == "3" ? "rd" : "th")}
                    {g && g != "other" && (g[1] == "e" ? "-elementry" : g[1] == "h" ? "-high" : "-university")}
                    {index !== info.instruction?.grade?.slice(1, -1).split(",").length - 1 && ", "}
                  </span>
                ))}
            </Text>
            <Text>{info.instruction?.type}</Text>
            <Text>{info.instruction?.price} €/h</Text>
            <Text mt="16px">{info.instruction?.description}</Text>

            <Flex direction="column" align="center" justify="center">
              <Button
                mt="16px"
                bg="#183D3D"
                color="#eeeeee"
                fontWeight="50px"
                _hover={{ bg: "#5C8374", color: "#040D12" }}
                onClick={() => {
                  tutorMaterials(info.instructor.user_id || "");
                  onOpenMaterials();
                }}
              >
                Materials
              </Button>

              <Button
                mt="16px"
                bg="#183D3D"
                color="#eeeeee"
                fontWeight="50px"
                _hover={{ bg: "#5C8374", color: "#040D12" }}
                onClick={() => {
                  getTutorCalendar(info.instructor.user_id || "");
                  onOpenCalendar();
                }}
              >
                Check Tutor Calendar
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenCalendar} onClose={onCloseCalendar} size={{ base: "md", md: "2xl", lg: "4xl" }}>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody>
            <StyleWrapper>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{ left: "prev,today,next", right: "title" }}
                footerToolbar={{ left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek" }}
                eventTimeFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
                slotLabelFormat={{ hour: "numeric", minute: "2-digit", hour12: false }}
                slotMinTime={"07:00:00"}
                slotMaxTime={"22:00:00"}
                timeZone="Europe/Zagreb"
                firstDay={1}
                allDaySlot={false}
                eventContent={renderEventContent}
                events={events}
                eventClick={handleEventClick}
                eventTextColor="#eeeeee"
                eventBackgroundColor="#183d3d"
              />
            </StyleWrapper>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isOpenReserve} leastDestructiveRef={cancelRef} onClose={onCloseReserve}>
        <AlertDialogOverlay bg="blackAlpha.600">
          <AlertDialogContent textAlign="center" color="#040D12" bg="#93B1A6">
            <AlertDialogHeader mt="8px" fontSize="lg" fontWeight="bold">
              Reserve Instruction
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Are you sure you want to reserve this term?</Text>
              <Text>{reserve.term}</Text>
            </AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Button
                fontWeight="50px"
                mb="8px"
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
                ref={cancelRef}
                onClick={onCloseReserve}
              >
                No
              </Button>
              <Button
                fontWeight="50px"
                mb="8px"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "#183D3D" }}
                color="#040D12"
                ml={3}
                onClick={confirmReserve}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpenMaterials} onClose={onCloseMaterials} size={{ base: "md", md: "xl" }}>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody>
            <Heading size="lg">Materials</Heading>
            <Flex direction="column" gap="16px" mt="16px" mb="16px">
              {materials?.map((m) => (
                <Flex align="center" gap="8px">
                  {getExtension(m.file_name) == "pdf" ? (
                    <FaRegFilePdf size="28px" color="#183D3D" />
                  ) : getExtension(m.file_name) == "docx" ? (
                    <BsFiletypeDocx size="28px" color="#183D3D" />
                  ) : getExtension(m.file_name) == "xlsx" ? (
                    <FaRegFileExcel size="28px" color="#183D3D" />
                  ) : getExtension(m.file_name) == "png" ||
                    getExtension(m.file_name) == "jpg" ||
                    getExtension(m.file_name) == "jpeg" ? (
                    <FaFileImage size="28px" color="#183D3D" />
                  ) : getExtension(m.file_name) == "zip" ? (
                    <FaFileArchive size="28px" color="#183D3D" />
                  ) : getExtension(m.file_name) == "pptx" ? (
                    <FaFilePowerpoint size="28px" color="#183D3D" />
                  ) : getExtension(m.file_name) == "txt" ? (
                    <FaFileAlt size="28px" color="#183D3D" />
                  ) : (
                    <FaRegFile size="28px" color="#183D3D" />
                  )}
                  <Text
                    w={{ base: "100px", sm: "200px", md: "400px", lg: "600px" }}
                    onClick={() => downloadFile(m.file_name, m.file_url)}
                    _hover={{ cursor: "pointer", color: "#040D12" }}
                    color="#183D3D"
                  >
                    {m.file_name}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
