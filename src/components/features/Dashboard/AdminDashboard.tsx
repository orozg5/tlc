import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import news from "@/lotties/news.json";
import Lottie from "react-lottie";

export default function AdminDashboard() {
  const router = useRouter();
  const newsOptions = {
    loop: true,
    autoplay: true,
    animationData: news,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Flex direction="column" p="32px" mt="48px" align="center" justify="center">
      <Heading>Welcome, Admin!</Heading>

      <Flex
        mt="16px"
        textAlign="center"
        direction="column"
        justify="center"
        borderRadius="16px"
        p="8px"
        bg="#93B1A6"
        w={{ base: "200px", sm: "432px", md: "664px", lg: "900px" }}
        h="432px"
        _hover={{ bgColor: "#5C8374" }}
        onClick={() => router.push("/news")}
      >
        <Lottie options={newsOptions} height="auto" width="100%" style={{ maxHeight: "324px", maxWidth: "400px" }} />
        <Text color="#183D3D" fontSize={{ base: "16px", sm: "24px" }}>
          Share important announcements, educational insights, and platform updates to keep our community informed and
          engaged. Your contributions shape our learning environment. Start sharing today!
        </Text>
      </Flex>
    </Flex>
  );
}
