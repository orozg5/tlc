import IUserProps from "@/interfaces/IUserProps";
import { StyleWrapper } from "@/styles/calendar";
import {
  Box,
  Button,
  Flex,
  Hide,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Show,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useEffect, useState } from "react";
import { convertDateTime } from "@/utils/convertDateTime";
import termConvertor from "@/utils/termConvertor";
import { headerToolbarConst } from "@/consts/headerToolbarConst";
import { footerToolbarConst } from "@/consts/footerToolbarConst";
import cancelTerm from "@/helpers/cancelTerm";
import { getTimeDifference } from "@/utils/getTimeDifference";

export default function StudentCalendar({ subjects, myTerms, allInstructions, instructors }: IUserProps) {
  const { isOpen: isOpenEvent, onOpen: onOpenEvent, onClose: onCloseEvent } = useDisclosure();
  const [events, setEvents] = useState<{ id: string; title: string; start: string; end: string }[]>([]);
  const [eventInfo, setEventInfo] = useState({
    id: "",
    term: "",
    subject_name: "",
    instructor_name: "",
    description: "",
  });

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

        return { id: t.term_id, title: subject || "", start: start, end: end };
      });
      setEvents(theEvents);
    }
  }, []);

  const handleEventClick = (eventClickInfo: any) => {
    const id = eventClickInfo.event.id;
    const term = termConvertor(eventClickInfo);

    let instructor_id = "";
    let instruction_id = "";
    let description = "";
    let subject_id = "";
    let subject_name = "";
    let instructor_name = "";

    myTerms?.find((t) => {
      if (t.term_id == eventClickInfo.event.id) {
        instructor_id = t.instructor_id || "";
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
    instructors?.find((i) => {
      if (i.user_id == instructor_id && i.first_name && i.last_name) instructor_name = i.first_name + " " + i.last_name;
    });

    setEventInfo({
      ...eventInfo,
      id: id,
      term: term,
      subject_name: subject_name,
      instructor_name: instructor_name,
      description: description,
    });

    if (subject_name && instructor_name) {
      onOpenEvent();
    }
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <div>
        <Hide below="md">
          <Text>{eventInfo.timeText}</Text>
          <Text>{eventInfo.event.title}</Text>
        </Hide>
        <Show below="md">
          <Text>{eventInfo.timeText.split(" ")[0]}</Text>
        </Show>
      </div>
    );
  };

  const handleCancel = async () => {
    const r = getTimeDifference(eventInfo.term);

    if (r) {
      const confirmed = confirm(`Are you sure you want to cancel this term (${eventInfo.term})?`);
      if (confirmed) {
        try {
          const res = await cancelTerm(eventInfo.id);
          if (res.status === 200) {
            window.location.reload();
          }
        } catch (error) {}
      }
    } else {
      alert("Cancellation of the term is possible up to 12 hours before its scheduled start time.");
    }
  };

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
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventTextColor="#eeeeee"
            eventBackgroundColor="#183d3d"
          />
        </StyleWrapper>
      </Box>

      <Modal isOpen={isOpenEvent} onClose={onCloseEvent}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>{eventInfo.term}</ModalHeader>
            <Text mt="8px">Subject: {eventInfo.subject_name}</Text>
            <Text mt="8px">Student: {eventInfo.instructor_name}</Text>
            <Text mt="8px" mb="16px">
              {eventInfo.description}
            </Text>
            <Button
              onClick={handleCancel}
              mb="16px"
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
            >
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
