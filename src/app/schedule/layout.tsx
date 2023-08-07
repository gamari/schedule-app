"use client";

import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction={"row"}>
      <Sidebar />
      <Box p="4">{children}</Box>
    </Flex>
  );
}
