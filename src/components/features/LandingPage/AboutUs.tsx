import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function AboutUs() {
  return (
    <Flex
      id="aboutus"
      direction="column"
      h="calc(100vh - 80px)"
      p="16px"
      bgColor="#93B1A6"
      justify="center"
      align="center"
    >
      <Box>
        <Heading textAlign="center">ABOUT US</Heading>
        <Text textAlign="center" mt="32px" maxW="800px">
          Welcome to our platform dedicated to connecting students and instructors for personalized learning
          experiences! <br /> <br /> At{" "}
          <Text color="#183D3D" as="span">
            TLC
          </Text>
          , we understand the challenges students face in finding the right instructor for additional tutoring across
          various subjects, from primary school to university. <br /> Similarly, instructors often struggle to reach a
          broader audience, especially when starting out. <br /> This is why we've created a user-friendly web platform
          to facilitate the discovery, arrangement, and exchange of information and digital materials between students
          and instructors. <br /> <br /> We continuously evaluate and improve our platform to ensure an optimal user
          experience, and we welcome feedback and suggestions for future enhancements. <br /> Join us at{" "}
          <Text color="#183D3D" as="span">
            TLC{" "}
          </Text>
          and embark on your journey towards personalized learning today!
        </Text>
      </Box>
    </Flex>
  );
}
