import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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
    <Flex justify="center" align="center" h="calc(100vh - 80px)" bgColor="#040D12" p="16px">
      <Lottie
        options={teachOptions}
        height="800px"
        width="800px"
        style={{ position: "absolute", filter: "blur(0.6px) grayscale(40%)" }}
      />
      <Box zIndex="1">
        <Heading size="xl" textShadow="0px 0px 64px black, 0px 0px 64px black, 0px 0px 64px black, 0px 0px 64px black">
          <Text fontSize="80px" color="#183D3D" as="span">
            T
          </Text>
          each{" "}
          <Text fontSize="80px" color="#183D3D" as="span">
            L
          </Text>
          earn{" "}
          <Text fontSize="80px" color="#183D3D" as="span">
            C
          </Text>
          onnect
        </Heading>
        <Text textShadow="0px 0px 16px black">A web application for finding and managing tutoring services</Text>
      </Box>
    </Flex>
  );
}
