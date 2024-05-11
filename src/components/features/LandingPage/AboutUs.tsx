import IUserProps from "@/interfaces/IUserProps";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AboutUs({ activeNews }: IUserProps) {
  const [slide, setSlide] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = slide === (activeNews?.length || 0) ? 0 : slide + 1;
      setSlide(nextSlide);
    }, 10000);

    return () => clearInterval(interval);
  }, [slide]);

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
      {slide == 0 && (
        <Box h="400px">
          <Heading textAlign="center">ABOUT US</Heading>
          <Text textAlign="center" mt="32px" maxW="800px">
            Welcome to our platform dedicated to connecting students and instructors for personalized learning
            experiences! <br /> <br /> At{" "}
            <Text color="#183D3D" as="span">
              TLC
            </Text>
            , we understand the challenges students face in finding the right instructor for additional tutoring across
            various subjects, from primary school to university. <br /> Similarly, instructors often struggle to reach a
            broader audience, especially when starting out. <br /> This is why we've created a user-friendly web
            platform to facilitate the discovery, arrangement, and exchange of information and digital materials between
            students and instructors. <br /> <br /> We continuously evaluate and improve our platform to ensure an
            optimal user experience, and we welcome feedback and suggestions for future enhancements. <br /> Join us at{" "}
            <Text color="#183D3D" as="span">
              TLC{" "}
            </Text>
            and embark on your journey towards personalized learning today!
          </Text>
        </Box>
      )}
      {slide == 1 && (
        <Box h="400px">
          <Heading textAlign="center">{activeNews && activeNews[0].news_name}</Heading>
          <Text textAlign="center" maxW="800px" color="#5C8374">
            {activeNews && activeNews[0].date?.split("T")[0]} - {activeNews && activeNews[0].end_date?.split("T")[0]}
          </Text>
          <Text textAlign="center" mt="32px" maxW="800px">
            {activeNews && activeNews[0].description}
          </Text>
        </Box>
      )}
      {slide == 2 && (
        <Box h="400px">
          <Heading textAlign="center">{activeNews && activeNews[1].news_name}</Heading>
          <Text textAlign="center" maxW="800px" color="#5C8374">
            {activeNews && activeNews[1].date?.split("T")[0]} - {activeNews && activeNews[1].end_date?.split("T")[0]}
          </Text>
          <Text textAlign="center" mt="32px" maxW="800px" maxH="300px" overflow="auto">
            {activeNews && activeNews[1].description}
          </Text>
        </Box>
      )}
      {slide == 3 && (
        <Box h="400px">
          <Heading textAlign="center">{activeNews && activeNews[2].news_name}</Heading>
          <Text textAlign="center" maxW="800px" color="#5C8374">
            {activeNews && activeNews[2].date?.split("T")[0]} - {activeNews && activeNews[2].end_date?.split("T")[0]}
          </Text>
          <Text textAlign="center" mt="32px" maxW="800px">
            {activeNews && activeNews[2].description}
          </Text>
        </Box>
      )}
      {slide == 4 && (
        <Box h="400px">
          <Heading textAlign="center">{activeNews && activeNews[3].news_name}</Heading>
          <Text textAlign="center" maxW="800px" color="#5C8374">
            {activeNews && activeNews[3].date?.split("T")[0]} - {activeNews && activeNews[3].end_date?.split("T")[0]}
          </Text>
          <Text textAlign="center" mt="32px" maxW="800px">
            {activeNews && activeNews[3].description}
          </Text>
        </Box>
      )}

      <Flex gap="8px" mt="32px">
        {activeNews && activeNews?.length > 0 && (
          <Button
            bgColor={slide == 0 ? "#F1C93B" : "white"}
            _hover={{ bgColor: slide == 0 ? "#FAE392" : "gray.100" }}
            size="xs"
            borderRadius="50%"
            onClick={() => setSlide(0)}
          />
        )}
        {activeNews && activeNews?.length >= 1 && (
          <Button
            bgColor={slide == 1 ? "#F1C93B" : "white"}
            _hover={{ bgColor: slide == 1 ? "#FAE392" : "gray.100" }}
            size="xs"
            borderRadius="50%"
            onClick={() => setSlide(1)}
          />
        )}
        {activeNews && activeNews?.length >= 2 && (
          <Button
            bgColor={slide == 2 ? "#F1C93B" : "white"}
            _hover={{ bgColor: slide == 2 ? "#FAE392" : "gray.100" }}
            size="xs"
            borderRadius="50%"
            onClick={() => setSlide(2)}
          />
        )}
        {activeNews && activeNews?.length >= 3 && (
          <Button
            bgColor={slide == 3 ? "#F1C93B" : "white"}
            _hover={{ bgColor: slide == 3 ? "#FAE392" : "gray.100" }}
            size="xs"
            borderRadius="50%"
            onClick={() => setSlide(3)}
          />
        )}
        {activeNews && activeNews?.length == 4 && (
          <Button
            bgColor={slide == 4 ? "#F1C93B" : "white"}
            _hover={{ bgColor: slide == 4 ? "#FAE392" : "gray.100" }}
            size="xs"
            borderRadius="50%"
            onClick={() => setSlide(4)}
          />
        )}
      </Flex>
    </Flex>
  );
}
