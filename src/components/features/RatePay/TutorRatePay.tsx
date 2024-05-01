import IUserProps from "@/interfaces/IUserProps";
import { convertDateTime } from "@/utils/convertDateTime";
import { Button, ButtonGroup, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function TutorRatePay({ doneTutorTerms, ratedTutor }: IUserProps) {
  const [filter, setFilter] = useState(0);

  return (
    <>
      <Flex direction="column" align="center" gap="32px" m="64px">
        <ButtonGroup mb="32px">
          <Button
            onClick={() => setFilter(0)}
            fontWeight="50px"
            bgColor={filter == 0 ? "#5C8374" : "#183D3D"}
            color="#eeeeee"
            _hover={{ bgColor: "#5C8374", color: "#040D12" }}
          >
            Not payed
          </Button>
          <Button
            onClick={() => setFilter(1)}
            fontWeight="50px"
            bgColor={filter == 1 ? "#5C8374" : "#183D3D"}
            color="#eeeeee"
            _hover={{ bgColor: "#5C8374", color: "#040D12" }}
          >
            Payed
          </Button>
          <Button
            onClick={() => setFilter(2)}
            fontWeight="50px"
            bgColor={filter == 2 ? "#5C8374" : "#183D3D"}
            color="#eeeeee"
            _hover={{ bgColor: "#5C8374", color: "#040D12" }}
          >
            Feedback
          </Button>
        </ButtonGroup>

        {filter == 0 &&
          doneTutorTerms
            ?.filter((t) => t.payed == false)
            .map((t) => (
              <Flex borderRadius="16px" bg="#93B1A6" w={{ base: "300px", sm: "432px", md: "664px" }} color="#183D3D">
                <Image
                  objectFit="cover"
                  maxW={{ base: "100px", md: "200px" }}
                  borderTopLeftRadius="16px"
                  borderBottomLeftRadius="16px"
                  src={`data:image/jpeg;base64,${t.profile_photo}`}
                />
                <Flex p="16px" direction="column" w={{ base: "200px", sm: "332px", md: "464px" }}>
                  <Heading>
                    {t?.first_name} {t?.last_name}
                  </Heading>
                  <Text>{t.subject_name}</Text>
                  <Text>ended: {t?.start.split("T")[0]}</Text>
                  <Text mt="8px" color="#FAE392">
                    {t.price} €/h
                  </Text>
                </Flex>
              </Flex>
            ))}

        {filter == 1 &&
          doneTutorTerms
            ?.filter((t) => t.payed == true)
            .map((t) => (
              <Flex borderRadius="16px" bg="#93B1A6" w={{ base: "300px", sm: "432px", md: "664px" }} color="#183D3D">
                <Image
                  objectFit="cover"
                  maxW={{ base: "100px", md: "200px" }}
                  borderTopLeftRadius="16px"
                  borderBottomLeftRadius="16px"
                  src={`data:image/jpeg;base64,${t.profile_photo}`}
                />
                <Flex p="16px" direction="column" w={{ base: "200px", sm: "332px", md: "464px" }}>
                  <Heading>
                    {t?.first_name} {t?.last_name}
                  </Heading>
                  <Text>{t.subject_name}</Text>
                  <Text>ended: {t?.start.split("T")[0]}</Text>
                  <Text mt="8px" color="#FAE392">
                    {t.price} €/h
                  </Text>
                </Flex>
              </Flex>
            ))}

        {filter == 2 &&
          ratedTutor?.map((r) => (
            <Flex borderRadius="16px" bg="#93B1A6" w={{ base: "300px", sm: "432px", md: "664px" }} color="#183D3D">
              <Image
                objectFit="cover"
                maxW={{ base: "100px", md: "200px" }}
                borderTopLeftRadius="16px"
                borderBottomLeftRadius="16px"
                src={`data:image/jpeg;base64,${r.profile_photo}`}
              />
              <Flex p="16px" direction="column" w={{ base: "200px", sm: "332px", md: "464px" }}>
                <Heading>
                  {r?.first_name} {r?.last_name}
                </Heading>
                <Text>{r?.subject}</Text>
                <Text>{convertDateTime(new Date(r?.date)).split("T")[0]}</Text>
                <Text mt="8px">{r?.comment}</Text>
                <Flex mt="8px" gap="4px">
                  {Array.from({ length: r?.rating }, (_, index) => (
                    <FaStar key={index} color="#F1C93B" size="24px" />
                  ))}
                  {Array.from({ length: 5 - r?.rating }, (_, index) => (
                    <FaStar key={index} color="#eeeeee" size="24px" />
                  ))}
                </Flex>
              </Flex>
            </Flex>
          ))}
      </Flex>
    </>
  );
}
