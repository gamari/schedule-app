"use client";

import { Box, Link, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <Box width="200px" height="100vh" bg="gray.700" color="white" p="4">
      <VStack align="start" spacing={4}>
        <Link onClick={() => router.push("/")}>ホーム</Link>
        <Link onClick={() => router.push("/about")}>アバウト</Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
