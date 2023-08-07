"use client";

import { FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserProfileDocument } from "@/libs/users";
import { auth } from "@/libs/firebase";

const SignUpPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await createUserProfileDocument(user, { username });
      console.log("遷移する");

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSignUp}
      spacing={2}
      py={{ base: 4 }}
      px={{ base: 6 }}
      boxShadow={{ base: "md" }}
      borderRadius={{ base: "md" }}
    >
      <FormControl>
        <FormLabel>ユーザー名</FormLabel>
        <Input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>メールアドレス</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>パスワード</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        サインアップ
      </Button>
    </VStack>
  );
};

export default SignUpPage;
