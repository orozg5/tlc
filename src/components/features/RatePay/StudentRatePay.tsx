import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { convertDateTime } from "@/utils/convertDateTime";
import addRating from "@/helpers/addRating";
import IUserProps from "@/interfaces/IUserProps";

export default function StudentRatePay({ userData, doneTerms, rated }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState({
    term_id: "",
    subject: "",
    student_id: userData?.id,
    instructor_id: "",
    instructor_name: "",
    rate: 0,
    comment: "",
    date: new Date(),
  });
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState(0);

  const submitRating = async () => {
    setError(false);
    if (rating.term_id && rating.rate && rating.student_id && rating.instructor_id && rating.date) {
      try {
        const res = await addRating(rating);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    } else {
      setError(true);
    }
  };

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
            All
          </Button>
          <Button
            onClick={() => setFilter(1)}
            fontWeight="50px"
            bgColor={filter == 1 ? "#5C8374" : "#183D3D"}
            color="#eeeeee"
            _hover={{ bgColor: "#5C8374", color: "#040D12" }}
          >
            New
          </Button>
          <Button
            onClick={() => setFilter(2)}
            fontWeight="50px"
            bgColor={filter == 2 ? "#5C8374" : "#183D3D"}
            color="#eeeeee"
            _hover={{ bgColor: "#5C8374", color: "#040D12" }}
          >
            Rated
          </Button>
        </ButtonGroup>
        {(filter == 0 || filter == 1) &&
          doneTerms?.map((t) => (
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
                <ButtonGroup mt="64px">
                  {!t.rated && (
                    <Button
                      fontWeight="50px"
                      bgColor="#183D3D"
                      color="#eeeeee"
                      _hover={{ bgColor: "#5C8374", color: "#040D12" }}
                      onClick={() => {
                        setRating({
                          term_id: t.term_id,
                          student_id: userData?.id,
                          subject: t.subject_name,
                          instructor_id: t?.user_id,
                          instructor_name: t.first_name + " " + t.last_name,
                          rate: 0,
                          comment: "",
                          date: new Date(),
                        });
                        setError(false);
                        onOpen();
                      }}
                    >
                      Rate
                    </Button>
                  )}
                  {!t.payed && (
                    <Button bgColor="#F1C93B" color="#040D12" _hover={{ bgColor: "#FAE392", color: "gray.500" }}>
                      Pay
                    </Button>
                  )}
                </ButtonGroup>
              </Flex>
            </Flex>
          ))}
        {filter == 0 && <Heading color="#eeeeee">Rated</Heading>}
        {(filter == 0 || filter == 2) &&
          rated?.map((r) => (
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Rate {rating.instructor_name}</ModalHeader>
            <Text mb="16px">{rating.subject}</Text>
            <Flex gap="4px" justify="center">
              <Text
                color={rating.rate > 0 && rating.rate <= 5 ? "#F1C93B" : "#eeeeee"}
                onClick={() => setRating({ ...rating, rate: 1 })}
              >
                <FaStar size="24px" />
              </Text>
              <Text
                color={rating.rate > 1 && rating.rate <= 5 ? "#F1C93B" : "#eeeeee"}
                onClick={() => setRating({ ...rating, rate: 2 })}
              >
                <FaStar size="24px" />
              </Text>
              <Text
                color={rating.rate > 2 && rating.rate <= 5 ? "#F1C93B" : "#eeeeee"}
                onClick={() => setRating({ ...rating, rate: 3 })}
              >
                <FaStar size="24px" />
              </Text>
              <Text
                color={rating.rate > 3 && rating.rate <= 5 ? "#F1C93B" : "#eeeeee"}
                onClick={() => setRating({ ...rating, rate: 4 })}
              >
                <FaStar size="24px" />
              </Text>
              <Text color={rating.rate == 5 ? "#F1C93B" : "#eeeeee"} onClick={() => setRating({ ...rating, rate: 5 })}>
                <FaStar size="24px" />
              </Text>
            </Flex>
            <Text mt="16px">Comment</Text>
            <Textarea
              value={rating.comment}
              onChange={(e) => setRating({ ...rating, comment: e.target.value })}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            {error && (
              <Text mt="8px" color="red">
                You must rate.
              </Text>
            )}

            <Button
              mt="16px"
              mb="16px"
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              ml="8px"
              mt="16px"
              mb="16px"
              bgColor="#F1C93B"
              color="#040D12"
              _hover={{ bgColor: "#FAE392", color: "gray.500" }}
              onClick={() => {
                setError(false);
                submitRating();
              }}
            >
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
