"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import useCalendarEvents from "@/hooks/useCalendarEvents";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

dayjs.locale("ja");

const localizer = dayjsLocalizer(dayjs);

export const ScheduleForTeacher = () => {
  const { events, loading } = useCalendarEvents();
  const [selectedEvent, setSelectedEvent] = useState<Schedule>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEventSelect = (event: Schedule) => {
    setSelectedEvent(event);
    onOpen();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]}
        defaultView="month"
        onSelectEvent={handleEventSelect}
      />

      {/* Event Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>イベント詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedEvent && (
              <>
                <p>
                  <strong>タイトル:</strong> {selectedEvent.title}
                </p>
                <p>
                  <strong>開始時間:</strong>{" "}
                  {dayjs(selectedEvent.start).format("YYYY/MM/DD HH:mm")}
                </p>
                <p>
                  <strong>終了時間:</strong>{" "}
                  {dayjs(selectedEvent.end).format("YYYY/MM/DD HH:mm")}
                </p>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ScheduleForTeacher;
