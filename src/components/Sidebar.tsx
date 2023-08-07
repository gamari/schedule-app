"use client";

import { AiOutlineCalendar } from "react-icons/ai";
import { Box, HStack, Link, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <VStack
      width="200px"
      height="100vh"
      bg="gray.700"
      color="white"
      p="4"
      flex={"none"}
    >
      <VStack align="start" spacing={4}>
        <HStack
          style={{
            fontSize: "1.5rem",
            borderBottom: "1px solid #fff",
          }}
        >
          <AiOutlineCalendar size={20} />
          <span>予約ページ</span>
        </HStack>
        <Link onClick={() => router.push("/about")}></Link>
      </VStack>
    </VStack>
  );
};

export default Sidebar;
