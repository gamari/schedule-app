"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Test = () => {
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // TODO ここで日付を登録する

    setDate("");
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>
      <FormControl>
        <FormLabel>日付</FormLabel>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" type="submit">
        提案する
      </Button>
    </VStack>
  );
};

export default Test;
