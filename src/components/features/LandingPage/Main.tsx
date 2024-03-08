import { Box, Flex, Heading, Show, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import teach from "@/lotties/teach.json";

export default function Main() {
  const teachOptions = {
    loop: true,
    autoplay: true,
    animationData: teach,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Flex justify="center" align="center" h="calc(100vh - 100px)" bgColor="#040D12" p="16px">
      <Lottie
        options={teachOptions}
        height="1000px"
        width="1000px"
        style={{ position: "absolute", cursor: "default", opacity: "0.5" }}
      />

      <Box zIndex="1">
        <Heading textAlign="center" size="2xl">
          <Text fontSize="90px" color="#183D3D" as="span">
            T
          </Text>
          each{" "}
          <Text fontSize="90px" color="#183D3D" as="span">
            L
          </Text>
          earn{" "}
          <Text fontSize="90px" color="#183D3D" as="span">
            C
          </Text>
          onnect
        </Heading>
        <Text textAlign="center">A web application for finding and managing tutoring services</Text>
      </Box>
    </Flex>
  );
}
