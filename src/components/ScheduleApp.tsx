"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { firestore } from "@/libs/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

import "dayjs/locale/ja";
import "react-big-calendar/lib/css/react-big-calendar.css";

dayjs.locale("ja");

const localizer = dayjsLocalizer(dayjs);

const ScheduleApp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:30");

  const handleSubmit = async () => {
    try {
      await addDoc(collection(firestore, "schedules"), {
        start: startTime,
        end: endTime,
        date: dayjs(date).toISOString(),
        status: "pending",
      });
      setDate(null);
      onClose();
      alert("スケジュール提案が送信されました!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleSelectSlot = (slotInfo: any) => {
    const selectedDate = dayjs(slotInfo.start);
    const today = dayjs();

    if (selectedDate.isBefore(today.add(1, "day"), "day")) {
      return;
    }

    setDate(slotInfo.start);
    setStartTime("20:00");
    setEndTime("21:00");
    onOpen();
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        views={["month"]}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        style={{ height: "500px" }}
        formats={{
          monthHeaderFormat: (date: Date) => dayjs(date).format("YYYY年MM月"),
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            日付を確認: {dayjs(date).format("YYYY/MM/DD")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>開始時間</FormLabel>
              <Select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {/* 00:00から23:30までの30分刻みのオプションを生成 */}
                {Array.from({ length: 48 }).map((_, idx) => {
                  const hour = String(Math.floor(idx / 2)).padStart(2, "0");
                  const minute = idx % 2 === 0 ? "00" : "30";
                  return (
                    <option key={idx} value={`${hour}:${minute}`}>
                      {hour}:{minute}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>終了時間</FormLabel>
              <Select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {/* 00:30から24:00までの30分刻みのオプションを生成 */}
                {Array.from({ length: 48 }).map((_, idx) => {
                  const hour = String(Math.floor((idx + 1) / 2)).padStart(
                    2,
                    "0"
                  );
                  const minute = (idx + 1) % 2 === 0 ? "00" : "30";
                  return (
                    <option key={idx} value={`${hour}:${minute}`}>
                      {hour}:{minute}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              提案する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ScheduleApp;
