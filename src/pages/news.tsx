import RegHeader from "@/components/shared/RegHeader";
import addNews from "@/helpers/addNews";
import deleteNews from "@/helpers/deleteNews";
import editNews from "@/helpers/editNews";
import getAllNews from "@/helpers/getAllNews";
import newsActivity from "@/helpers/newsActivity";
import INews from "@/interfaces/INews";
import IUserProps from "@/interfaces/IUserProps";
import { convertTime } from "@/utils/convertTime";
import { getMe } from "@/utils/getMe";
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
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

export default function news({ userData, allNews }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [news, setNews] = useState<INews>({});
  const [newsId, setNewsId] = useState("");

  const handleDate = async (e: any) => {
    const today = new Date();
    const end_date = new Date(e);
    if (end_date < today) {
      setNews({ ...news, end_date: today.toISOString().split("T")[0] });
    } else {
      setNews({ ...news, end_date: e });
    }
  };

  const handleActivity = async (id: string) => {
    if (id) {
      try {
        const res = await newsActivity(id);
        if (res.status == 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const handleEdit = async () => {
    setError2(false);
    if (newsId && news.news_name && news.description && news.end_date) {
      try {
        const res = await editNews(newsId, news);
        if (res.status == 200) {
          window.location.reload();
        }
      } catch (error) {}
    } else {
      setError2(true);
      return;
    }
  };

  const handleDelete = async () => {
    if (newsId) {
      try {
        const res = await deleteNews(newsId);
        if (res.status == 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const submit = async () => {
    setError(false);
    if (news.news_name && news.description && news.end_date) {
      try {
        const res = await addNews(news);
        if (res.status == 200) {
          window.location.reload();
        }
      } catch (error) {}
    } else {
      setError(true);
      return;
    }
  };

  return (
    <>
      <RegHeader userData={userData} />
      <Flex direction="column" align="center" mt="32px" mb="64px">
        <Button
          onClick={() => {
            setNews({});
            onOpen();
          }}
          mt="16px"
          bgColor="#183D3D"
          color="#eeeeee"
          _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
        >
          Add new news
        </Button>
        <Flex mt="48px" direction="column" gap="32px">
          {allNews?.map((n) => (
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              w={{ base: "200px", sm: "400px", md: "600px", lg: "800px" }}
              bgColor="#5C8374"
              borderRadius="16px"
              p="16px"
            >
              <Flex gap="8px">
                <Text
                  onClick={() => {
                    setNewsId(n.news_id || "");
                    onOpenDelete();
                  }}
                  _hover={{ color: "#183D3D", cursor: "pointer" }}
                >
                  <GoTrash size="22px" />
                </Text>
                <Text
                  onClick={() => {
                    setNewsId(n.news_id || "");
                    setNews({
                      news_name: n.news_name,
                      description: n.description,
                      end_date: n.end_date?.split("T")[0],
                    });
                    onOpenEdit();
                  }}
                  _hover={{ color: "#183D3D", cursor: "pointer" }}
                >
                  <FiEdit3 size="22px" />
                </Text>
                {n.is_active && (
                  <Text
                    onClick={() => handleActivity(n.news_id || "")}
                    _hover={{ color: "#183D3D", cursor: "pointer" }}
                  >
                    <FaEye size="22px" />
                  </Text>
                )}
                {!n.is_active && (
                  <Text
                    onClick={() => handleActivity(n.news_id || "")}
                    _hover={{ color: "#183D3D", cursor: "pointer" }}
                  >
                    <FaEyeSlash size="22px" />
                  </Text>
                )}
              </Flex>
              <Heading mt="8px">{n.news_name}</Heading>
              <Text color="#93B1A6">
                {convertTime(n.date || "").split(",")[0]} - {convertTime(n.end_date || "").split(",")[0]}
              </Text>
              <Text mt="8px">{n.description}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Add new news</ModalHeader>

            <Text>News name</Text>
            <Input
              value={news.news_name}
              onChange={(e) => setNews({ ...news, news_name: e.target.value })}
              borderColor="#183D3D"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#183D3D"
            />

            <Text mt="8px">Description</Text>
            <Textarea
              value={news.description}
              onChange={(e) => setNews({ ...news, description: e.target.value })}
              borderColor="#183D3D"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#183D3D"
            ></Textarea>

            <Text mt="8px">Active until</Text>
            <Input
              value={news.end_date}
              onChange={(e) => handleDate(e.target.value)}
              type="date"
              borderColor="#183D3D"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#183D3D"
            />

            {error && (
              <Text mt="16px" color="red">
                All fields are required.
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              mb="16px"
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              ml="8px"
              mb="16px"
              color="#040D12"
              bgColor="#F1C93B"
              _hover={{ bgColor: "#FAE392", color: "gray.500" }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Edit news</ModalHeader>

            <Text>News name</Text>
            <Input
              value={news.news_name}
              onChange={(e) => setNews({ ...news, news_name: e.target.value })}
              borderColor="#183D3D"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#183D3D"
            />

            <Text mt="8px">Description</Text>
            <Textarea
              value={news.description}
              onChange={(e) => setNews({ ...news, description: e.target.value })}
              borderColor="#183D3D"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#183D3D"
            ></Textarea>

            <Text mt="8px">Active until</Text>
            <Input
              value={news.end_date}
              onChange={(e) => handleDate(e.target.value)}
              type="date"
              borderColor="#183D3D"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#183D3D"
            />

            {error2 && (
              <Text mt="16px" color="red">
                All fields are required.
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCloseEdit}
              mb="16px"
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              ml="8px"
              mb="16px"
              color="#040D12"
              bgColor="#F1C93B"
              _hover={{ bgColor: "#FAE392", color: "gray.500" }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Delete news</ModalHeader>
            <Text>Are you sure you want to delete these news?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onCloseDelete}
              mb="16px"
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              ml="8px"
              mb="16px"
              color="#040D12"
              bgColor="#F1C93B"
              _hover={{ bgColor: "#FAE392", color: "gray.500" }}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let session = await getMe(req);

  if (!session || session.role != "admin") {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const allNews = await getAllNews();
  const userData = {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    city_id: "",
    role: "admin",
  };

  return {
    props: {
      userData,
      allNews,
    },
  };
};
