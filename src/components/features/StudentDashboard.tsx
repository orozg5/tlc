import IUserProps from "@/interfaces/IUserProps";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import calendar from "@/lotties/calendar.json";
import chat from "@/lotties/chat.json";
import forum from "@/lotties/forum.json";
import instructions from "@/lotties/instructions.json";
import { useRouter } from "next/navigation";

export default function StudentDashboard({ userData }: IUserProps) {
  const router = useRouter();

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
    <Flex direction="column" p="32px" h="calc(100vh - 100px)" align="center" justify="center">
      <Heading>Welcome, {userData?.first_name}</Heading>
      <Text textAlign="center">
        This is your dedicated space to connect with your tutors and access valuable educational resources.{" "}
      </Text>

      <Flex
        mt="16px"
        textAlign="center"
        direction="column"
        borderRadius="16px"
        p="8px"
        bg="#93B1A6"
        w="900px"
        h="300px"
        _hover={{ bgColor: "#5C8374" }}
        onClick={() => router.push("/instructions")}
      >
        <Lottie options={instructionsOptions} height="200px" width="348px" />
        <Text color="#183D3D" fontSize="24px">
          Discover a diverse range of tutors offering personalized lessons in various subjects, each committed to
          helping you succeed.
        </Text>
      </Flex>

      <Flex mt="32px" gap="32px" wrap="wrap">
        <Flex
          textAlign="center"
          direction="column"
          borderRadius="16px"
          p="8px"
          bg="#93B1A6"
          w="200px"
          h="200px"
          _hover={{ bgColor: "#5C8374" }}
          onClick={() => router.push("/calendar")}
        >
          <Lottie options={calendarOptions} height="200px" width="200px" />
          <Text color="#183D3D" fontSize="24px">
            Check your calendar
          </Text>
        </Flex>

        <Flex
          textAlign="center"
          direction="column"
          borderRadius="16px"
          p="8px"
          bg="#93B1A6"
          w="200px"
          h="200px"
          _hover={{ bgColor: "#5C8374" }}
          onClick={() => router.push("/chat")}
        >
          <Lottie options={chatOptions} height="132px" width="132px" />
          <Text color="#183D3D" fontSize="24px">
            Chat with instructors
          </Text>
        </Flex>

        <Flex
          textAlign="center"
          direction="column"
          borderRadius="16px"
          p="8px"
          bg="#93B1A6"
          w="200px"
          h="200px"
          _hover={{ bgColor: "#5C8374" }}
          onClick={() => router.push("/forum")}
        >
          <Lottie options={forumOptions} height="132px" width="132px" />
          <Text color="#183D3D" fontSize="24px">
            Discuss topics on forum
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
