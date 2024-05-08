import createInstruction from "@/helpers/createInstruction";
import deleteInstruction from "@/helpers/deleteInstruction";
import editInstruction from "@/helpers/editInstruction";
import IInstruction from "@/interfaces/IInstruction";
import IUserProps from "@/interfaces/IUserProps";
import { multiSelectStyle } from "@/styles/multiselect";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import React, { useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import ReactSelect from "react-select";

export default function TutorInstructions({ userData, userInstructions, subjects }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const cancelRef = useRef(null);

  const [id, setId] = useState("");
  const [instruction, setInstruction] = useState<IInstruction>({
    instructor_id: userData?.id,
  });
  const [editInstr, setEditInstr] = useState<IInstruction>({});
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  const handleInstructionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInstruction({ ...instruction, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (selectedValues: any) => {
    setInstruction({ ...instruction, grade: selectedValues });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEditInstr({ ...editInstr, [e.target.id]: e.target.value });
  };

  const handleEditSelectChange = (selectedValues: any) => {
    setEditInstr({ ...editInstr, grade: selectedValues });
  };

  const editI = async () => {
    setError2(false);
    if (!editInstr.subject_id || !editInstr.grade || !editInstr.type || !editInstr.description || !editInstr.price) {
      setError2(true);
      return;
    }

    try {
      const res = await editInstruction(editInstr);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {}
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

  const confirmDelete = async () => {
    if (id) {
      try {
        const res = await deleteInstruction(id);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const options = [
    { value: "1e", label: "1st, elementary" },
    { value: "2e", label: "2nd, elementary" },
    { value: "3e", label: "3rd, elementary" },
    { value: "4e", label: "4th, elementary" },
    { value: "5e", label: "5th, elementary" },
    { value: "6e", label: "6th, elementary" },
    { value: "7e", label: "7th, elementary" },
    { value: "8e", label: "8th, elementary" },
    { value: "1h", label: "1st, high school" },
    { value: "2h", label: "2nd, high school" },
    { value: "3h", label: "3rd, high school" },
    { value: "4h", label: "4th, high school" },
    { value: "1u", label: "1st, university" },
    { value: "2u", label: "2nd, university" },
    { value: "3u", label: "3rd, university" },
    { value: "4u", label: "4th, university" },
    { value: "5u", label: "5th, university" },
    { value: "6u", label: "6th, university" },
    { value: "other", label: "other" },
  ];

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
            position="relative"
          >
            <Flex w={{ base: "300px", sm: "432px", md: "664px" }} position="absolute" justify="flex-end">
              <Button
                onClick={() => {
                  setEditInstr({
                    ...editInstr,
                    instruction_id: i.instruction_id,
                    instructor_id: i.instructor_id,
                    subject_id: i.subject_id,
                    price: i.price,
                    type: i.type,
                    description: i.description,
                    grade: i.grade,
                  });
                  onOpenEdit();
                }}
                _hover={{ color: "#040D12" }}
                variant="unstyled"
              >
                <FiEdit3 />
              </Button>
              <Button
                onClick={() => {
                  setId(i?.instruction_id || "");
                  onOpenDelete();
                }}
                _hover={{ color: "#040D12" }}
                variant="unstyled"
              >
                <RxCross1 />
              </Button>
            </Flex>
            <Heading>{subjects?.find((subject) => subject.subject_id == i.subject_id)?.subject_name}</Heading>
            <Text>
              {i?.grade?.slice(1, -1).split(",").map((g, index) => (
                <span key={index}>
                  {g && g == "other" && g}
                  {g && g != "other" && g[0]}
                  {g && g != "other" && (g[0] == "1" ? "st" : g[0] == "2" ? "nd" : g[0] == "3" ? "rd" : "th")}
                  {g && g != "other" && (g[1] == "e" ? "-elementry" : g[1] == "h" ? "-high" : "-university")}
                  {g && ", "}
                </span>
              ))}
              {i.type}
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
              <ReactSelect
                id="grade"
                options={options}
                isMulti
                onChange={handleSelectChange}
                styles={multiSelectStyle}
              />

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

      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalHeader textAlign="center">Edit instruction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center">
              <Text>Subject</Text>
              <Select
                id="subject_id"
                onChange={handleEditChange}
                value={editInstr.subject_id}
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
              <ReactSelect
                id="grade"
                options={options}
                isMulti
                onChange={handleEditSelectChange}
                styles={multiSelectStyle}
              />

              <Text mt="16px">Type</Text>
              <Select
                id="type"
                onChange={handleEditChange}
                value={editInstr.type}
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
                onChange={handleEditChange}
                value={editInstr.description}
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
                onChange={handleEditChange}
                value={editInstr.price}
                w="264px"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
              />
            </Flex>

            {error2 && (
              <Text textAlign="center" mt="16px" color="#B50711">
                All fields are required.
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button _hover={{ color: "#183D3D" }} variant="unstyled" onClick={onCloseEdit}>
              Close
            </Button>
            <Button
              onClick={editI}
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

      <AlertDialog isOpen={isOpenDelete} leastDestructiveRef={cancelRef} onClose={onCloseDelete}>
        <AlertDialogOverlay bg="blackAlpha.600">
          <AlertDialogContent textAlign="center" color="#040D12" bg="#93B1A6">
            <AlertDialogHeader mt="8px" fontSize="lg" fontWeight="bold">
              Delete Instruction
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Are you sure you want to delete this instruction?</Text>
              <Text fontSize="12px">(You can only delete instructions that don't have reserved terms)</Text>
            </AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Button
                fontWeight="50px"
                mb="8px"
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
                ref={cancelRef}
                onClick={onCloseDelete}
              >
                No
              </Button>
              <Button
                fontWeight="50px"
                mb="8px"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "#183D3D" }}
                color="#040D12"
                ml={3}
                onClick={confirmDelete}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
