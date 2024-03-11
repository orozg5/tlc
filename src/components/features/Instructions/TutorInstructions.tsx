import createInstruction from "@/helpers/createInstruction";
import IInstruction from "@/interfaces/IInstruction";
import IUserProps from "@/interfaces/IUserProps";
import {
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export default function TutorInstructions({ userData, userInstructions, subjects }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [instruction, setInstruction] = useState<IInstruction>({
    instructor_id: userData?.id,
  });
  const [error, setError] = useState(false);

  const handleInstructionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInstruction({ ...instruction, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError(false);
    if (
      !instruction.subject_id ||
      !instruction.grade ||
      !instruction.type ||
      !instruction.description ||
      !instruction.price
    ) {
      setError(true);
      return;
    }

    try {
      const res = await createInstruction(instruction);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <Flex mt="64px" mb="64px" justify="center" align="center" direction="column">
      <Button
        onClick={onOpen}
        bgColor="#183D3D"
        color="#eeeeee"
        _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
        fontWeight="50px"
      >
        Add new instruction
      </Button>

      <Flex mt="64px" direction="column" gap="32px">
        {userInstructions?.map((i) => (
          <Flex
            direction="column"
            textAlign="center"
            align="center"
            p="16px"
            borderRadius="16px"
            w={{ base: "300px", sm: "432px", md: "664px" }}
            bg="#93B1A6"
            color="#183D3D"
          >
            <Heading>{subjects?.find((subject) => subject.subject_id == i.subject_id)?.subject_name}</Heading>
            <Text mt="4px">
              {i.grade}, {i.type}
            </Text>
            <Text mt="8px" w={{ base: "264px", sm: "400px", md: "632px" }}>
              {i.description}
            </Text>
            <Text mt="8px" color="#FAE392">
              {i.price}€/h
            </Text>
          </Flex>
        ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalHeader textAlign="center">Create new instruction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center">
              <Text>Subject</Text>
              <Select
                id="subject_id"
                onChange={handleInstructionChange}
                w="264px"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
                placeholder="Select"
              >
                {subjects?.map((subject) => (
                  <option value={subject.subject_id}>{subject.subject_name}</option>
                ))}
              </Select>

              <Text mt="16px">Grade</Text>
              <Select
                id="grade"
                onChange={handleInstructionChange}
                w="264px"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
              >
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

              <Text mt="16px">Type</Text>
              <Select
                id="type"
                onChange={handleInstructionChange}
                w="264px"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
                placeholder="Select"
              >
                <option value="online">online</option>
                <option value="irl">irl</option>
                <option value="other">other</option>
              </Select>

              <Text mt="16px">Description</Text>
              <Textarea
                id="description"
                onChange={handleInstructionChange}
                placeholder="Say something about your instructions..."
                w="264px"
                maxLength={300}
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
                _placeholder={{ color: "#5C8374" }}
              />

              <Text mt="16px">Price (€/h)</Text>
              <Input
                id="price"
                type="number"
                onChange={handleInstructionChange}
                w="264px"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
              />
            </Flex>

            {error && (
              <Text textAlign="center" mt="16px" color="#B50711">
                All fields are required.
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button _hover={{ color: "#183D3D" }} variant="unstyled" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleSubmit}
              ml="16px"
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
