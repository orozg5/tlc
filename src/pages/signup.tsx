import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Lottie from "react-lottie";
import student from "@/lotties/student.json";
import tutor from "@/lotties/tutor.json";
import Link from "next/link";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import register from "@/helpers/register";
import { useRouter } from "next/navigation";
import IRegister from "@/interfaces/IRegister";

export default function signup() {
  const router = useRouter();
  const [user, setUser] = useState<IRegister>({
    role: "student",
    email: "",
    password: "",
  });
  const [role, setRole] = useState<number>(0);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const isEmailInvalid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  };

  const isPasswordInvalid = (password: string) => {
    return password.length < 8;
  };

  const studentOptions = {
    loop: true,
    autoplay: true,
    animationData: student,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const tutorOptions = {
    loop: true,
    autoplay: true,
    animationData: tutor,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError("");
    if (isEmailInvalid(user.email) || isPasswordInvalid(user.password)) {
      isEmailInvalid(user.email)
        ? isPasswordInvalid(user.password)
          ? setError("Email and password are invalid.")
          : setError("Email is invalid.")
        : setError("Password is invalid.");
      return;
    }

    try {
      const res = await register(user);
      if (res.status === 200) {
        alert("Verification email has been sent. Please activate your account first.");
        router.push("/signin");
      }
    } catch (error) {
      setError("User already exists.");
    }
  };

  return (
    <Flex mt="64px" justify="center" align="center" direction="column" gap="64px">
      <Box textAlign="center">
        <Link href="/">
          <Heading size="3xl">TLC</Heading>
        </Link>
        {role === 0 && (
          <Heading mt="16px" size="lg">
            Sign up
          </Heading>
        )}
        {role !== 0 && (
          <Flex w="200px" mt="16px" align="center" justify="space-between">
            <Text _hover={{ cursor: "pointer" }} onClick={() => window.location.reload()}>
              <FaArrowLeft color="#eeeeee" />
            </Text>
            <Heading size="lg">Sign up</Heading>
            <Link href="/">
              <ImCross color="#eeeeee" />
            </Link>
          </Flex>
        )}
      </Box>

      {!role && (
        <Flex gap="32px" direction={{base: "column", md: "row"}}>
          <Card bgColor="#5C8374" w={{base:"xs", sm: "sm"}}>
            <CardBody>
              <Lottie options={studentOptions} height="200px" width="200px" />
              <Heading textAlign="center" mt="40px" size="xl">
                Student
              </Heading>
              <Text mt="16px" textAlign="center">
                Find personalized tutoring tailored to your needs. Explore subjects, schedule sessions, and track
                progress easily.
              </Text>
            </CardBody>
            <CardFooter justify="center" flexDirection="column">
              <Button
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
                fontWeight="50px"
                onClick={() => {
                  setRole(1);
                  setUser({ ...user, role: "student" });
                }}
              >
                Student Sign up
              </Button>

              <Flex gap="4px" mt="8px" color="#040D12" justify="center">
                <Text>Already have an account?</Text>
                <Link href="/signin">
                  <Text _hover={{ color: "#eeeeee", cursor: "pointer" }}>Sign in</Text>
                </Link>
              </Flex>
            </CardFooter>
          </Card>

          <Card bgColor="#FAE392" w={{base:"xs", sm: "sm"}}>
            <CardBody>
              <Lottie options={tutorOptions} height="240px" width="240px" />
              <Heading textAlign="center" size="xl">
                Tutor
              </Heading>
              <Text mt="16px" textAlign="center">
                Showcase your expertise and connect with students. Share your methods, set availability, and help
                students excel while growing your business.
              </Text>
            </CardBody>
            <CardFooter justify="center" flexDirection="column">
              <Button
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
                fontWeight="50px"
                onClick={() => {
                  setRole(2);
                  setUser({ ...user, role: "tutor" });
                }}
              >
                Tutor Sign up
              </Button>

              <Flex gap="4px" mt="8px" color="#040D12" justify="center">
                <Text>Already have an account?</Text>
                <Link href="/signin">
                  <Text _hover={{ color: "#183D3D", cursor: "pointer" }}>Sign in</Text>
                </Link>
              </Flex>
            </CardFooter>
          </Card>
        </Flex>
      )}

      {role !== 0 && (
        <Card bgColor={role === 1 ? "#5C8374" : "#FAE392"} w={{base:"xs", sm: "sm"}}>
          <CardBody>
            <Lottie options={role === 1 ? studentOptions : tutorOptions} height="240px" width="240px" />
            <Text fontSize="18px" color={role === 1 ? "#eeeeee" : "#040D12"} mt="16px">
              Email
            </Text>
            <Input
              id="email"
              onChange={handleUserChange}
              color={role === 1 ? "#eeeeee" : "#040D12"}
              borderColor={role === 1 ? "#eeeeee" : "#040D12"}
              _hover={{ borderColor: role === 1 ? "gray.200" : "#5C8374" }}
              focusBorderColor={role === 1 ? "#eeeeee" : "#040D12"}
            />

            <Text fontSize="18px" color={role === 1 ? "#eeeeee" : "#040D12"} mt="16px">
              Password
            </Text>
            <InputGroup>
              <Input
                id="password"
                onChange={handleUserChange}
                type={showPass ? "text" : "password"}
                color={role === 1 ? "#eeeeee" : "#040D12"}
                borderColor={role === 1 ? "#eeeeee" : "#040D12"}
                _hover={{ borderColor: role === 1 ? "gray.200" : "#5C8374" }}
                focusBorderColor={role === 1 ? "#eeeeee" : "#040D12"}
              />
              <InputRightElement>
                <Button variant="unstyled" onClick={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <FaEye color={role === 1 ? "#eeeeee" : "#040D12"} />
                  ) : (
                    <FaEyeSlash color={role === 1 ? "#eeeeee" : "#040D12"} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </CardBody>
          <CardFooter justify="center" flexDirection="column">
            <Text mb="8px" textAlign="center" color={role === 1 ? "#8A1414" : "red"}>
              {error}
            </Text>
            <Button
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
              fontWeight="50px"
              size="lg"
              fontSize="18px"
              onClick={handleSubmit}
            >
              Sign up
            </Button>

            <Flex gap="4px" mt="8px" color="#040D12" justify="center">
              <Text>Already have an account?</Text>
              <Link href="/signin">
                <Text _hover={{ color: role === 1 ? "#eeeeee" : "#183D3D", cursor: "pointer" }}>Sign in</Text>
              </Link>
            </Flex>
          </CardFooter>
        </Card>
      )}
    </Flex>
  );
}
