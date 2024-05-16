import Header from "@/components/shared/Header";
import RegHeader from "@/components/shared/RegHeader";
import createCategory from "@/helpers/createCategory";
import createComment from "@/helpers/createComment";
import createPost from "@/helpers/createPost";
import getAllPosts from "@/helpers/getAllPosts";
import getCategories from "@/helpers/getCategories";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getForumComments from "@/helpers/getForumComments";
import IUserProps from "@/interfaces/IUserProps";
import { convertTime } from "@/utils/convertTime";
import { getMe } from "@/utils/getMe";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
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
import { GetServerSideProps } from "next";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";

export default function forum({ userData, categories, posts, comments }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenPost, onOpen: onOpenPost, onClose: onClosePost } = useDisclosure();
  const { isOpen: isOpenComment, onOpen: onOpenComment, onClose: onCloseComment } = useDisclosure();

  const [error, setError] = useState(false);
  const [errorPost, setErrorPost] = useState(false);

  const [point, setPoint] = useState(0);
  const [names, setNames] = useState({
    category: "",
    post: "",
  });
  const [ids, setIds] = useState({
    category: "",
    post: "",
  });
  const [post, setPost] = useState({
    pic: "",
    name: "",
    date: "",
    post_name: "",
    post_content: "",
  });

  const [newCategory, setNewCategory] = useState({
    user_id: userData?.id,
    name: "",
  });
  const [newPost, setNewPost] = useState({
    user_id: userData?.id,
    forum_category_id: ids.category,
    name: "",
    content: "",
  });
  const [newComment, setNewComment] = useState({
    user_id: userData?.id,
    forum_category_id: ids.category,
    forum_post_id: ids.post,
    content: "",
  });

  const handleNewCategory = async () => {
    setError(false);
    if (newCategory.name && newCategory.user_id) {
      let categoryExists = false;
      categories?.forEach((c) => {
        if (c.forum_category_name == newCategory.name) {
          categoryExists = true;
          setError(true);
          return;
        }
      });
      
      if (categoryExists) {
        return;
      }

      try {
        const res = await createCategory(newCategory);
        if (res.status == 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const handleNewPost = async () => {
    setErrorPost(false);
    if (newPost.name && newPost.content && newPost.user_id && newPost.forum_category_id) {
      try {
        const res = await createPost(newPost);
        if (res.status == 200) {
          window.location.reload();
        }
      } catch (error) {}
    } else {
      setErrorPost(true);
      return;
    }
  };

  const handleNewComment = async () => {
    if (newComment.content && newComment.user_id && newComment.forum_category_id && newComment.forum_post_id) {
      try {
        const res = await createComment(newComment);
        if (res.status == 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  return (
    <>
      {userData?.role != "not-registered" && <RegHeader userData={userData} />}
      {userData?.role == "not-registered" && <Header userData={userData} />}
      <Flex minH="calc(100vh - 100px)">
        <Flex direction="column" flex="0.5" borderRight="solid 1px #183D3D" p="16px" gap="2px">
          {userData?.role == "not-registered" && (
            <Heading mb="16px" size="md" fontWeight="50px">
              Categories
            </Heading>
          )}
          {userData?.role != "not-registered" && (
            <Button
              mb="16px"
              bgColor="#183D3D"
              fontWeight="50px"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              onClick={onOpen}
            >
              New category
            </Button>
          )}
          <Text
            onClick={() => {
              setNames({ ...names, category: "", post: "" });
              setIds({ ...names, category: "", post: "" });
              setPoint(0);
            }}
            borderRadius="16px"
            p="4px"
            _hover={{ bgColor: "#5C8374", color: "#040D12", cursor: "pointer" }}
          >
            All
          </Text>

          {categories?.map((c) => (
            <Text
              onClick={() => {
                setNames({ ...names, category: c.forum_category_name || "" });
                setIds({ ...ids, category: c.forum_category_id || "" });
                setNewPost({ ...newPost, forum_category_id: c.forum_category_id || "" });
                setPoint(1);
              }}
              borderRadius="16px"
              p="4px"
              _hover={{ bgColor: "#5C8374", color: "#040D12", cursor: "pointer" }}
            >
              {c.forum_category_name}
            </Text>
          ))}
        </Flex>

        <Flex direction="column" flex="2" p="16px" align="center">
          {point == 1 && (
            <>
              {userData?.role != "not-registered" && (
                <Button
                  mb="16px"
                  bgColor="#183D3D"
                  fontWeight="50px"
                  color="#eeeeee"
                  _hover={{ bgColor: "#5C8374", color: "#040D12" }}
                  onClick={onOpenPost}
                >
                  New post
                </Button>
              )}
              <Heading textAlign="center" size="md" fontWeight="50px">
                {names.category}
              </Heading>
            </>
          )}

          {point != 2 && (
            <>
              {posts
                ?.filter((p) => p.forum_category_id == ids.category || ids.category == "")
                .map((p) => (
                  <Box
                    onClick={() => {
                      setNames({ ...names, post: p.forum_post_name || "" });
                      setIds({ ...ids, post: p.forum_post_id || "" });
                      setPost({
                        name: p.first_name + " " + p.last_name,
                        date: convertTime(p.date || ""),
                        post_content: p.forum_post_content || "",
                        post_name: p.forum_post_name || "",
                        pic: p.profile_photo || "",
                      });
                      setNewComment({
                        ...newComment,
                        forum_category_id: p.forum_category_id || "",
                        forum_post_id: p.forum_post_id || "",
                      });
                      setPoint(2);
                    }}
                    mt="32px"
                    _hover={{ cursor: "pointer" }}
                    w={{ base: "200px", sm: "300px", md: "400px", lg: "600px", xl: "800px", "2xl": "1100px" }}
                  >
                    <Flex justify="space-between">
                      <Flex align="center" gap="8px">
                        <Avatar size="md" src={`data:image/jpeg;base64,${p.profile_photo}`} />
                        <Flex direction="column">
                          <Text>{p.forum_post_name}</Text>
                          <Text fontSize="xs">{convertTime(p.date || "")}</Text>
                        </Flex>
                      </Flex>
                      <Flex align="center" gap="8px">
                        <FaRegComment />
                        <Text>{comments?.filter((c) => c.forum_post_id == p.forum_post_id).length}</Text>
                      </Flex>
                    </Flex>
                    <Text mt="8px">{p.forum_post_content}</Text>
                  </Box>
                ))}
            </>
          )}

          {point == 2 && (
            <Flex direction="column">
              <Flex justify="center" gap="8px" mb="32px">
                <Button
                  bgColor="#183D3D"
                  fontWeight="50px"
                  color="#eeeeee"
                  _hover={{ bgColor: "#5C8374", color: "#040D12" }}
                  onClick={() => {
                    names.category ? setPoint(1) : setPoint(0);
                  }}
                >
                  Go Back
                </Button>
                {userData?.role != "not-registered" && (
                  <Button
                    bgColor="#183D3D"
                    fontWeight="50px"
                    color="#eeeeee"
                    _hover={{ bgColor: "#5C8374", color: "#040D12" }}
                    onClick={onOpenComment}
                  >
                    Add comment
                  </Button>
                )}
              </Flex>

              <Flex
                justify="space-between"
                w={{ base: "200px", sm: "300px", md: "400px", lg: "600px", xl: "800px", "2xl": "1100px" }}
              >
                <Flex align="center" gap="8px">
                  <Avatar size="md" src={`data:image/jpeg;base64,${post.pic}`} />
                  <Flex direction="column">
                    <Text>{post.name}</Text>
                    <Text fontSize="xs">{post.date}</Text>
                  </Flex>
                </Flex>
                <Flex align="center" gap="8px">
                  <FaRegComment />
                  <Text>{comments?.filter((c) => c.forum_post_id == ids.post).length}</Text>
                </Flex>
              </Flex>
              <Heading size="lg" fontWeight="50px" mt="8px">
                {post.post_name}
              </Heading>
              <Text mt="8px">{post.post_content}</Text>
              <Divider mt="32px" color="#183D3D" />

              {comments
                ?.filter((c) => c.forum_post_id == ids.post)
                .map((c) => (
                  <Box
                    mt="32px"
                    w={{ base: "200px", sm: "300px", md: "400px", lg: "600px", xl: "800px", "2xl": "1100px" }}
                  >
                    <Flex align="center" gap="8px">
                      <Avatar size="sm" src={`data:image/jpeg;base64,${c.profile_photo}`} />
                      <Flex direction="column">
                        <Text>
                          {c.first_name} {c.last_name}
                        </Text>
                        <Text fontSize="xs">{convertTime(c.date || "")}</Text>
                      </Flex>
                    </Flex>

                    <Text mt="8px">{c.forum_comment_content}</Text>
                  </Box>
                ))}
            </Flex>
          )}
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Add new category</ModalHeader>
            <Text mt="8px">Name</Text>
            <Input
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              w="264px"
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            {error && (
              <Text mt="16px" color="#8A1414">
                This category name already exists.
              </Text>
            )}
            <Flex mb="16px" mt="32px" gap="8px" justify="center">
              <Button
                onClick={() => {
                  onClose();
                }}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleNewCategory}
                color="#040D12"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "gray.500" }}
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenPost} onClose={onClosePost}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Add new post</ModalHeader>
            <Text mt="8px">Name</Text>
            <Input
              value={newPost.name}
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
              w="264px"
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            <Text mt="8px">Description</Text>
            <Textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              w="264px"
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            {errorPost && (
              <Text mt="16px" color="#8A1414">
                All fields are required.
              </Text>
            )}
            <Flex mb="16px" mt="32px" gap="8px" justify="center">
              <Button
                onClick={onClosePost}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleNewPost}
                color="#040D12"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "gray.500" }}
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenComment} onClose={onCloseComment}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Add new comment</ModalHeader>
            <Textarea
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              w="264px"
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            <Flex mb="16px" mt="32px" gap="8px" justify="center">
              <Button
                onClick={onCloseComment}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleNewComment}
                color="#040D12"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "gray.500" }}
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let session = await getMe(req);
  let userData = {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    city_id: "",
    role: "not-registered",
  };

  if (session && (session.role == "tutor" || session.role == "student")) {
    userData = await getCurrentUserInfo(req);
  }

  const categories = await getCategories();
  const posts = await getAllPosts();
  const comments = await getForumComments();

  return {
    props: {
      userData,
      categories,
      posts,
      comments,
    },
  };
};
