import IInfo from "@/interfaces/IInfo";
import IUserProps from "@/interfaces/IUserProps";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FaGenderless } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCake } from "react-icons/lu";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";

export default function StudentInstructions({ userData, subjects, cities, allInstructions, instructors }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState({
    subject_id: "",
    grade: "",
    type: "",
    price: "",
    city_id: "",
    instructor_id: "",
  });
  const [info, setInfo] = useState<IInfo>({
    instructor: {},
    instruction: {},
  });

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  const clearFilter = () => {
    setFilter({
      subject_id: "",
      grade: "",
      type: "",
      price: "",
      city_id: "",
      instructor_id: "",
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" mt="64px" mb="64px">
      <>
        <Heading>Filter Instructions</Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          mt="16px"
          gap="8px"
          align="center"
          justify="center"
          textAlign="center"
        >
          <Box>
            <Text>Subject</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="subject_id"
              value={filter.subject_id}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              {subjects?.map((subject) => (
                <option value={subject.subject_id}>{subject.subject_name}</option>
              ))}
            </Select>
          </Box>

          <Box>
            <Text>Grade</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="grade"
              value={filter.grade}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              <option value="1e">1st, elementary</option>
              <option value="2e">2st, elementary</option>
              <option value="3e">3rd, elementary</option>
              <option value="4e">4th, elementary</option>
              <option value="5e">5th, elementary</option>
              <option value="6e">6th, elementary</option>
              <option value="7e">7th, elementary</option>
              <option value="8e">8th, elementary</option>
              <option value="1h">1st, high school</option>
              <option value="2h">2st, high school</option>
              <option value="3h">3rd, high school</option>
              <option value="4h">4th, high school</option>
              <option value="1u">1st, university</option>
              <option value="2u">2st, university</option>
              <option value="3u">3rd, university</option>
              <option value="4u">4th, university</option>
              <option value="5u">5th, university</option>
              <option value="6u">6th, university</option>
              <option value="other">other</option>
            </Select>
          </Box>

          <Box>
            <Text>Type</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="type"
              value={filter.type}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              <option value="online">online</option>
              <option value="irl">irl</option>
              <option value="other">other</option>
            </Select>
          </Box>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          mt="16px"
          gap="8px"
          align="center"
          justify="center"
          textAlign="center"
        >
          <Box>
            <Text>Price (€/h)</Text>
            <Input
              bg="#93B1A6"
              color="#040D12"
              id="price"
              value={filter.price}
              onChange={handleChangeFilter}
              type="number"
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
          </Box>

          <Box>
            <Text>City</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="city_id"
              value={filter.city_id}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              {cities?.map((city) => (
                <option value={city.city_id}>{city.city_name}</option>
              ))}
            </Select>
          </Box>

          <Box>
            <Text>Instructor</Text>
            <Select
              bg="#93B1A6"
              color="#040D12"
              id="instructor_id"
              value={filter.instructor_id}
              onChange={handleChangeFilter}
              w={{ base: "264px", md: "232px" }}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            >
              <option value="">Select</option>
              {instructors?.map((i) => (
                <option value={i.user_id}>
                  {i.first_name} {i.last_name}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>

        {(filter.subject_id ||
          filter.city_id ||
          filter.grade ||
          filter.instructor_id ||
          filter.price ||
          filter.type) && (
          <Button
            onClick={clearFilter}
            bg="#183D3D"
            color="#eeeeee"
            fontWeight="50px"
            _hover={{ bg: "#93B1A6", color: "#040D12" }}
            mt="16px"
          >
            Clear filter
          </Button>
        )}
      </>

      <Flex mt="64px" direction="column" gap="32px">
        {allInstructions
          ?.filter(
            (i) =>
              (filter.subject_id === "" || i.subject_id === filter.subject_id) &&
              (filter.grade === "" || i.grade === filter.grade) &&
              (filter.type === "" || i.type === filter.type) &&
              (filter.price === "" || i.price === Number(filter.price)) &&
              (filter.city_id === "" ||
                instructors?.find((instructor) => instructor.user_id === i.instructor_id)?.city_id ===
                  filter.city_id) &&
              (filter.instructor_id === "" || i.instructor_id === filter.instructor_id)
          )
          .map((instruction) => (
            <Flex
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setInfo({
                  instructor: instructors?.find((instructor) => instructor.user_id === instruction.instructor_id) || {},
                  instruction: instruction || {},
                });
                onOpen();
              }}
              borderRadius="16px"
              bg="#93B1A6"
              w={{ base: "300px", sm: "432px", md: "664px" }}
              color="#183D3D"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100px", md: "200px" }}
                borderTopLeftRadius="16px"
                borderBottomLeftRadius="16px"
                src={`data:image/jpeg;base64,${
                  instructors?.find((instructor) => instructor.user_id == instruction.instructor_id)?.profile_photo
                }`}
              />
              <Flex p="16px" direction="column" w={{ base: "200px", sm: "332px", md: "464px" }}>
                <Heading>
                  {subjects?.find((subject) => subject.subject_id == instruction.subject_id)?.subject_name}
                </Heading>
                <Text>
                  {instructors?.find((instructor) => instructor.user_id == instruction.instructor_id)?.first_name}{" "}
                  {instructors?.find((instructor) => instructor.user_id == instruction.instructor_id)?.last_name},{" "}
                  {
                    instructors?.find((instructor) => instructor.user_id == instruction.instructor_id)
                      ?.educational_attainment
                  }{" "}
                  degree,{" "}
                  {instructors?.find((instructor) => instructor.user_id == instruction.instructor_id)?.finished_school}
                </Text>
                <Text>
                  {instruction.grade}, {instruction.type},{" "}
                  {
                    cities?.find(
                      (city) =>
                        city.city_id ==
                        instructors?.find((instructor) => instructor.user_id == instruction.instructor_id)?.city_id
                    )?.city_name
                  }
                </Text>
                <Text mt="8px">{instruction.description}</Text>
                <Text mt="8px" color="#FAE392">
                  {instruction.price} €/h
                </Text>
              </Flex>
            </Flex>
          ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent p="16px" color="#040D12" bg="#93B1A6" textAlign="center">
          <ModalCloseButton />
          <ModalBody>
            <Heading size="lg">Instructor</Heading>

            <Avatar w="132px" h="132px" src={`data:image/jpeg;base64,${info.instructor?.profile_photo}`} />
            <Text>
              {info.instructor?.first_name} {info.instructor?.last_name}
            </Text>

            <Flex align="center" justify="center" gap="8px">
              <Text>
                {info.instructor?.gender == "female" ? (
                  <BsGenderFemale />
                ) : info.instructor?.gender == "male" ? (
                  <BsGenderMale />
                ) : (
                  <FaGenderless />
                )}
              </Text>
              <Text>{info.instructor?.gender}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <LuCake />
              <Text>{info.instructor?.date_of_birth && (info.instructor?.date_of_birth).split("T")[0]}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <IoLocationOutline />
              <Text>{cities?.find((city) => city.city_id == info.instructor?.city_id)?.city_name}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <MdOutlineLocalPhone />
              <Text>+385 {info.instructor?.phone}</Text>
            </Flex>

            <Flex align="center" justify="center" gap="8px">
              <PiGraduationCap />
              <Text>
                {info.instructor?.finished_school}, {info.instructor?.educational_attainment} degree
              </Text>
            </Flex>

            <Text mt="8px">{info.instructor?.description}</Text>

            <Heading mt="16px" size="lg">
              Instruction
            </Heading>
            <Text>{subjects?.find((subject) => subject.subject_id == info.instruction?.subject_id)?.subject_name}</Text>
            <Text>
              {info.instruction?.grade && info.instruction?.grade[0]}
              {info.instruction?.grade &&
                (info.instruction?.grade[0] == "1"
                  ? "st"
                  : info.instruction?.grade[0] == "2"
                  ? "nd"
                  : info.instruction?.grade[0] == "3"
                  ? "rd"
                  : "th")}
              {info.instruction?.grade &&
                (info.instruction?.grade[1] == "e"
                  ? ", elementry school"
                  : info.instruction?.grade[1] == "h"
                  ? ", high school"
                  : ", university")}
            </Text>
            <Text>{info.instruction?.type}</Text>
            <Text>{info.instruction?.price} €/h</Text>
            <Text mt="16px">{info.instruction?.description}</Text>

            <Button
              mt="16px"
              bg="#183D3D"
              color="#eeeeee"
              fontWeight="50px"
              _hover={{ bg: "#5C8374", color: "#040D12" }}
            >
              Chat
            </Button>
            <Button
              mt="16px"
              ml="8px"
              bg="#183D3D"
              color="#eeeeee"
              fontWeight="50px"
              _hover={{ bg: "#5C8374", color: "#040D12" }}
            >
              Calendar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
