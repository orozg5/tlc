import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";

export default function Fotter(props: any) {
  return (
    <Flex
      direction="column"
      id={props.id}
      h="164px"
      bgColor="#5C8374"
      p="16px"
      color="#183D3D"
      align="center"
      justify="center"
    >
      <Flex align="start" gap="64px">
        <Box>
          <Flex gap="8px" align="center">
            <AiFillInstagram />
            <Text>teachlearnconnect</Text>
          </Flex>
          <Flex gap="8px" align="center">
            <FaXTwitter />
            <Text>tlc</Text>
          </Flex>
          <Flex gap="8px" align="center">
            <FaFacebook />
            <Text>teachlearnconnect</Text>
          </Flex>
        </Box>
        <Box>
          <Flex gap="8px" align="center">
            <FaLocationDot />
            <Text>FER, Zagreb 10000</Text>
          </Flex>
          <Flex gap="8px" align="center">
            <FaPhoneAlt />
            <Text>+385 95 555 0000</Text>
          </Flex>
        </Box>
      </Flex>

      <Flex mt="16px" gap="8px" fontSize="xs">
        <Text fontFamily="Arial">©</Text>
        <Text>TLC, 2024.</Text>
      </Flex>
      <Text fontSize="xs">Terms & Conditions | Privacy Policy</Text>
    </Flex>
  );
}
