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
import Lottie from "react-lottie";
import edu from "@/lotties/edu.json";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import login from "@/helpers/login";

export default function signin() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const eduOptions = {
    loop: true,
    autoplay: true,
    animationData: edu,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError("");
    if (!user.email || !user.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await login(user);
      if (res.status === 200) {
        router.push("/home");
      }
    } catch (error) {
      setError("User doesn't exist. Incorrect email or password. Verify your account.");
    }
  };

  return (
    <Flex mt="64px" justify="center" align="center" direction="column" gap="64px">
      <Box textAlign="center">
        <Link href="/">
          <Heading size="3xl">TLC</Heading>
        </Link>
        <Heading mt="16px" size="lg">
          Sign in
        </Heading>
      </Box>

      <Card bgColor="#5C8374" w={{base:"xs", sm: "sm"}}>
        <CardBody>
          <Lottie options={eduOptions} height="232px" width="232px" />
          <Text fontSize="18px" color="#eeeeee" mt="16px">
            Email
          </Text>
          <Input
            id="email"
            onChange={handleUserChange}
            color="#eeeeee"
            borderColor="#eeeeee"
            _hover={{ borderColor: "gray.200" }}
            focusBorderColor="#eeeeee"
          />

          <Text fontSize="18px" color="#eeeeee" mt="16px">
            Password
          </Text>
          <InputGroup>
            <Input
              id="password"
              onChange={handleUserChange}
              type={showPass ? "text" : "password"}
              color="#eeeeee"
              borderColor="#eeeeee"
              _hover={{ borderColor: "gray.200" }}
              focusBorderColor="#eeeeee"
            />
            <InputRightElement>
              <Button variant="unstyled" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaEye color="#eeeeee" /> : <FaEyeSlash color="#eeeeee" />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </CardBody>
        <CardFooter justify="center" flexDirection="column">
          <Text mb="8px" textAlign="center" color="#8A1414">
            {error}
          </Text>

          <Button
            onClick={handleSubmit}
            bgColor="#183D3D"
            color="#eeeeee"
            _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
            fontWeight="50px"
          >
            Sign in
          </Button>

          <Flex gap="4px" mt="8px" color="#040D12" justify="center">
            <Text>Don't have an account?</Text>
            <Link href="/signup">
              <Text _hover={{ color: "#eeeeee", cursor: "pointer" }}>Sign up</Text>
            </Link>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
}
