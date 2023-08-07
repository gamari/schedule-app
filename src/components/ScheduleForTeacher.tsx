"use client";

import { firestore } from "@/libs/firebase";
import { VStack, Button, Box } from "@chakra-ui/react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const ScheduleForTeacher = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const querySnapshot = await getDocs(collection(firestore, "schedules"));
      const schedulesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSchedules(schedulesData);
    };

    fetchSchedules();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const scheduleRef = doc(firestore, "schedules", id);
      await updateDoc(scheduleRef, { status: "approved" });
      alert("スケジュールが承認されました!");
      // ここで通知のロジックも追加できます
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <VStack spacing={4}>
      {schedules.map((schedule: Schedule) => (
        <Box key={schedule?.id}>
          <Box>{schedule?.date}</Box>
          <Button onClick={() => handleApprove(schedule?.id)}>承認</Button>
        </Box>
      ))}
    </VStack>
  );
};
