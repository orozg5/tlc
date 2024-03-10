import IUserProps from "@/interfaces/IUserProps";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import upload from "@/lotties/upload.json";
import calendar from "@/lotties/calendar.json";
import chat from "@/lotties/chat.json";
import forum from "@/lotties/forum.json";
import instructions from "@/lotties/instructions.json";
import { useRouter } from "next/navigation";

export default function TutorDashboard({ userData }: IUserProps) {
  const router = useRouter();

  const uploadOptions = {
    loop: true,
    autoplay: true,
    animationData: upload,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const calendarOptions = {
    loop: true,
    autoplay: true,
    animationData: calendar,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const chatOptions = {
    loop: true,
    autoplay: true,
    animationData: chat,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const forumOptions = {
    loop: true,
    autoplay: true,
    animationData: forum,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const instructionsOptions = {
    loop: true,
    autoplay: true,
    animationData: instructions,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Flex direction="column" p="32px" mt="48px" align="center" justify="center">
      <Heading textAlign="center">Welcome, {userData?.first_name}</Heading>
      <Text textAlign="center">This is your space to craft and share instructional content with your students.</Text>

      <Flex
        mt="16px"
        textAlign="center"
        justify="center"
        direction="column"
        borderRadius="16px"
        p="8px"
        bg="#93B1A6"
        w={{base: "200px", sm: "432px", md: "664px", lg:"900px"}}
        h="300px"
        _hover={{ bgColor: "#5C8374" }}
        onClick={() => router.push("/instructions")}
      >
        <Lottie options={instructionsOptions} height="auto" width="100%" style={{maxHeight: "200px", maxWidth: '348px' }} />
        <Text mt="16px" color="#183D3D" fontSize={{base: "16px", sm: "24px"}}>
          Start creating engaging lessons to help your students succeed on their learning journey.
        </Text>
      </Flex>

      <Flex mt="32px" gap="32px" wrap="wrap" justify="center">
        <Flex
          textAlign="center"
          direction="column"
          borderRadius="16px"
          justify="center"
          p="8px"
          bg="#93B1A6"
          w="200px"
          h="200px"
          _hover={{ bgColor: "#5C8374" }}
          onClick={() => router.push("/materials")}
        >
          <Lottie options={uploadOptions} height="164px" width="164px" />
          <Text mb={{base: "16px", sm: "0px"}} color="#183D3D" fontSize={{base: "16px", sm: "24px"}}>Add a new material</Text>
        </Flex>

        <Flex
          textAlign="center"
          direction="column"
          borderRadius="16px"
          justify="center"
          p="8px"
          bg="#93B1A6"
          w="200px"
          h="200px"
          _hover={{ bgColor: "#5C8374" }}
          onClick={() => router.push("/calendar")}
        >
          <Lottie options={calendarOptions} height="200px" width="200px" />
          <Text mb={{base: "16px", sm: "0px"}} color="#183D3D" fontSize={{base: "16px", sm: "24px"}}>Check your calendar</Text>
        </Flex>

        <Flex
          textAlign="center"
          direction="column"
          borderRadius="16px"
          justify="center"
          p="8px"
          bg="#93B1A6"
          w="200px"
          h="200px"
          _hover={{ bgColor: "#5C8374" }}
          onClick={() => router.push("/chat")}
        >
          <Lottie options={chatOptions} height="132px" width="132px" />
          <Text color="#183D3D" fontSize={{base: "16px", sm: "24px"}}>Chat with students</Text>
        </Flex>

        <Flex
          textAlign="center"
          direction="column"
          borderRadius="16px"
          justify="center"
          p="8px"
          bg="#93B1A6"
          w="200px"
          h="200px"
          _hover={{ bgColor: "#5C8374" }}
          onClick={() => router.push("/forum")}
        >
          <Lottie options={forumOptions} height="132px" width="132px" />
          <Text color="#183D3D" fontSize={{base: "16px", sm: "24px"}}>Discuss topics on forum</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
