import updateProfile from "@/helpers/updateProfile";
import IUserProps from "@/interfaces/IUserProps";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { PiGenderFemale, PiGenderMale, PiGenderNeuterBold } from "react-icons/pi";
import { TbMap2 } from "react-icons/tb";

export default function ProfileSetup({ userData }: IUserProps) {
  const [user, setUser] = useState(userData);
  const [profile, setProfile] = useState(userData?.profile_photo);
  const [showButtons, setShowButtons] = useState(false);
  const [error, setError] = useState(false);
  const profileRef = useRef<HTMLInputElement>(null);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUser(user && { ...user, [e.target.id]: e.target.value });
  };

  const handleProfileUpload = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  const handleProfileDelete = () => {
    setUser(
      user && {
        ...user,
        profile_photo: "",
      }
    );
    setProfile("");
  };

  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          let base64String = event.target.result as string;
          base64String = base64String.split(",")[1];

          setUser(
            user && {
              ...user,
              profile_photo: base64String,
            }
          );
          setProfile(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !user?.first_name ||
      !user?.last_name ||
      !user?.date_of_birth ||
      !user?.gender ||
      (user.role == "tutor" && (!user.profile_photo || !user.phone))
    ) {
      setError(true);
      return;
    }
    try {
      if (user) {
        const res = await updateProfile(user);
        if (res.status === 200) {
          window.location.reload();
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <Modal isOpen={true} onClose={() => {}} isCentered={true}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bgColor="#93B1A6" color="#040D12">
          <ModalHeader textAlign="center">Setup your profile</ModalHeader>
          <ModalBody>
            <Flex
              direction="column"
              align="center"
              onMouseEnter={() => setShowButtons(true)}
              onMouseLeave={() => setShowButtons(false)}
            >
              <Input
                id="profile_photo"
                type="file"
                ref={profileRef}
                style={{ display: "none" }}
                onChange={handleProfileChange}
              />

              <Avatar
                border="solid 2px #183D3D"
                w="164px"
                h="164px"
                src={`data:image/jpeg;base64,${profile}`}
                position="relative"
              />

              {showButtons && (
                <Flex gap="8px" position="absolute" top="132px">
                  <Button
                    bgColor="#183D3D"
                    color="#eeeeee"
                    _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
                    onClick={handleProfileUpload}
                    value={user?.profile_photo}
                  >
                    <FiUpload />
                  </Button>
                  <Button
                    bgColor="#183D3D"
                    color="#eeeeee"
                    _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
                    onClick={handleProfileDelete}
                  >
                    <GoTrash />
                  </Button>
                </Flex>
              )}
            </Flex>

            <Flex mt="16px" direction="column" align="center">
              <Text>First name</Text>
              <Input
                id="first_name"
                value={user?.first_name}
                onChange={handleUserChange}
                w="264px"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
              />

              <Text mt="8px">Last name</Text>
              <Input
                id="last_name"
                value={user?.last_name}
                onChange={handleUserChange}
                w="264px"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
              />

              <Text mt="8px">Date of birth</Text>
              <Input
                id="date_of_birth"
                value={user?.date_of_birth ? new Date(user.date_of_birth).toISOString().split("T")[0] : ""}
                onChange={handleUserChange}
                w="264px"
                type="date"
                borderColor="#040D12"
                _hover={{ borderColor: "#5C8374" }}
                focusBorderColor="#040D12"
              />

              <Text mt="8px">Gender</Text>
              <Flex align="center">
                <Flex
                  align="center"
                  direction="column"
                  p="4px"
                  w="80px"
                  mr="8px"
                  border={user?.gender == "male" ? "#183D3D 4px solid" : "#040D12 1px solid"}
                  borderRadius="16px"
                  _hover={{ borderColor: "#5C8374", color: "#5C8374" }}
                  onClick={() => setUser(user && { ...user, gender: "male" })}
                >
                  <PiGenderMale size="20px" />
                  <Text>Male</Text>
                </Flex>

                <Flex
                  align="center"
                  direction="column"
                  p="4px"
                  w="80px"
                  border={user?.gender == "female" ? "#183D3D 4px solid" : "#040D12 1px solid"}
                  borderRadius="16px"
                  _hover={{ borderColor: "#5C8374", color: "#5C8374" }}
                  onClick={() => setUser(user && { ...user, gender: "female" })}
                >
                  <PiGenderFemale size="20px" />
                  <Text>Female</Text>
                </Flex>

                <Flex
                  align="center"
                  direction="column"
                  p="4px"
                  w="80px"
                  ml="8px"
                  border={user?.gender == "other" ? "#183D3D 4px solid" : "#040D12 1px solid"}
                  borderRadius="16px"
                  _hover={{ borderColor: "#5C8374", color: "#5C8374" }}
                  onClick={() => setUser(user && { ...user, gender: "other" })}
                >
                  <PiGenderNeuterBold size="20px" />
                  <Text>Other</Text>
                </Flex>
              </Flex>

              <Box mt="8px">
                <Text textAlign="center">Address</Text>
                <InputGroup>
                  <InputLeftElement>
                    <Button pl="14px" variant="unstyled">
                      <TbMap2 />
                    </Button>
                  </InputLeftElement>
                  <Input
                    id="address"
                    value={user?.address}
                    onChange={handleUserChange}
                    w="264px"
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                  />
                </InputGroup>
              </Box>

              <Text mt="8px">Phone</Text>
              <InputGroup w="264px" borderColor="#040D12">
                <InputLeftAddon bgColor="#5C8374">+385</InputLeftAddon>
                <Input
                  id="phone"
                  value={user?.phone}
                  onChange={handleUserChange}
                  type="number"
                  _hover={{ borderColor: "#5C8374" }}
                  focusBorderColor="#040D12"
                />
              </InputGroup>

              {userData?.role === "student" && (
                <>
                  <Text mt="8px">School name</Text>
                  <Input
                    id="school"
                    value={user?.school}
                    onChange={handleUserChange}
                    w="264px"
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                  />

                  <Text mt="8px">Grade</Text>
                  <Select
                    id="grade"
                    value={user?.grade}
                    onChange={handleUserChange}
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
                  </Select>
                </>
              )}
              {userData?.role === "tutor" && (
                <>
                  <Text mt="8px">Educational attainment</Text>
                  <Select
                    id="educational_attainment"
                    w="264px"
                    value={user?.educational_attainment}
                    onChange={handleUserChange}
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                  >
                    <option value="hs">high school</option>
                    <option value="associates">associates degree</option>
                    <option value="bachelors">bachelors degree</option>
                    <option value="masters">masters degree</option>
                    <option value="phd">doctoral degree</option>
                  </Select>

                  <Text mt="8px">Finished school</Text>
                  <Input
                    id="finished_school"
                    value={user?.finished_school}
                    onChange={handleUserChange}
                    w="264px"
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                  />

                  <Text mt="8px">Description</Text>
                  <Textarea
                    id="description"
                    value={user?.description}
                    onChange={handleUserChange}
                    placeholder="Say something about yourself..."
                    w="264px"
                    maxLength={300}
                    borderColor="#040D12"
                    _hover={{ borderColor: "#5C8374" }}
                    focusBorderColor="#040D12"
                    _placeholder={{ color: "#5C8374" }}
                  />
                </>
              )}
            </Flex>
            {error && user?.role == "student" && (
              <Text color="#B50711" textAlign="center" mt="16px">
                First name, last name, date of birth and gender is required.
              </Text>
            )}
            {error && user?.role == "tutor" && (
              <Text color="#B50711" textAlign="center" mt="16px">
                First name, last name, date of birth, gender, profile photo and phone number is required.
              </Text>
            )}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button onClick={handleSubmit} alignSelf="center" bgColor="#F1C93B" _hover={{ bgColor: "#FAE392" }}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
