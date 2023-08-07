"use client";

import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p="4">
        {children}
      </Box>
    </Flex>
  );
}
