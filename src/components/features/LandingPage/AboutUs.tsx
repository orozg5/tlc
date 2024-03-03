import { useState, useEffect } from "react";
import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function AboutUs() {
  const [slide, setSlide] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = slide === 3 ? 1 : slide + 1;
      setSlide(nextSlide);
    }, 5000);

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
      {slide == 1 && (
        <Box className="animation">
          <Heading textAlign="center">ABOUT US</Heading>
          <Text textAlign="center" mt="32px" w="800px">
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

      {slide == 2 && (
        <Flex className="animation" gap="16px" h="364px">
          <Card direction="row" w="800px" borderRadius="16px" bgColor="#5C8374" color="#eeeeee">
            <Image borderRadius="16px" objectFit="cover" w="280px" src="teacher.jpg" alt="Emma Robinson" />
            <Stack>
              <CardBody>
                <Heading size="xl">Emma Robinson</Heading>
                <Text fontSize="sm" color="#183D3D">
                  Tutor
                </Text>
                <Text mt="16px">
                  This platform has revolutionized the way I connect with my students! It's incredibly easy to use and
                  has expanded my reach beyond my expectations.
                </Text>
              </CardBody>
              <CardFooter gap="2px">
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" />
              </CardFooter>
            </Stack>
          </Card>

          <Card direction="row" w="800px" borderRadius="16px" bgColor="#5C8374" color="#eeeeee">
            <Image borderRadius="16px" objectFit="cover" w="280px" src="student.jpg" alt="Olivia Fischer" />
            <Stack>
              <CardBody>
                <Heading size="xl">Olivia Fischer</Heading>
                <Text fontSize="sm" color="#183D3D">
                  Student
                </Text>
                <Text mt="16px">
                  Finding a tutor has never been easier! I was able to connect with an amazing instructor in no time,
                  thanks to the comprehensive search options provided by this platform.
                </Text>
              </CardBody>
              <CardFooter gap="2px">
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" />
                <FaStar size="20px" />
              </CardFooter>
            </Stack>
          </Card>
        </Flex>
      )}

      {slide == 3 && (
        <Flex className="animation" gap="16px" h="364px">
          <Card direction="row" w="800px" borderRadius="16px" bgColor="#5C8374" color="#eeeeee">
            <Image borderRadius="16px" objectFit="cover" w="280px" src="teacher2.png" alt="Liam Johnson" />
            <Stack>
              <CardBody>
                <Heading size="xl">Liam Johnson</Heading>
                <Text fontSize="sm" color="#183D3D">
                  Tutor
                </Text>
                <Text mt="16px">
                  Love the option to share digital materials with my students. It's convenient and efficient, making the
                  learning process much smoother for everyone involved.
                </Text>
              </CardBody>
              <CardFooter gap="2px">
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" />
              </CardFooter>
            </Stack>
          </Card>

          <Card direction="row" w="800px" borderRadius="16px" bgColor="#5C8374" color="#eeeeee">
            <Image borderRadius="16px" objectFit="cover" w="280px" src="student2.png" alt="Sophia Anderson" />
            <Stack>
              <CardBody>
                <Heading size="xl">Sophia Anderson</Heading>
                <Text fontSize="sm" color="#183D3D">
                  Student
                </Text>
                <Text mt="16px">
                  Overall, a fantastic platform for finding tutors and scheduling sessions. The ability to rate and
                  provide feedback on instructors is particularly helpful in making informed decisions.
                </Text>
              </CardBody>
              <CardFooter gap="2px">
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
                <FaStar size="20px" color="#F1C93B" />
              </CardFooter>
            </Stack>
          </Card>
        </Flex>
      )}

      <Flex gap="8px" mt="32px">
        <Button
          bgColor={slide == 1 ? "#F1C93B" : "white"}
          _hover={{ bgColor: slide == 1 ? "#FAE392" : "gray.100" }}
          size="xs"
          borderRadius="50%"
          onClick={() => setSlide(1)}
        />
        <Button
          bgColor={slide == 2 ? "#F1C93B" : "white"}
          _hover={{ bgColor: slide == 2 ? "#FAE392" : "gray.100" }}
          size="xs"
          borderRadius="50%"
          onClick={() => setSlide(2)}
        />
        <Button
          bgColor={slide == 3 ? "#F1C93B" : "white"}
          _hover={{ bgColor: slide == 3 ? "#FAE392" : "gray.100" }}
          size="xs"
          borderRadius="50%"
          onClick={() => setSlide(3)}
        />
      </Flex>
    </Flex>
  );
}
