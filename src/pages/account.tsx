import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import Link from "next/link";
import Lottie from "react-lottie";
import male from "@/lotties/male.json";
import female from "@/lotties/female.json";
import { PiGenderNeuterBold } from "react-icons/pi";
import { TbMap2 } from "react-icons/tb";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import updateProfile from "@/helpers/updateProfile";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";

export default function account({ userData }: IUserProps) {
  const router = useRouter();
  const [user, setUser] = useState(userData);
  const [profile, setProfile] = useState(userData?.profile_photo);
  const profileRef = useRef<HTMLInputElement>(null);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUser(user && { ...user, [e.target.id]: e.target.value });
  };

  const handleProfileUpload = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
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

  const maleOptions = {
    loop: true,
    autoplay: true,
    animationData: male,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const femaleOptions = {
    loop: true,
    autoplay: true,
    animationData: female,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (user) {
        const res = await updateProfile(user);
        if (res.status === 200) {
          router.push("/home");
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <Flex bg="#040D12" direction="column" p="32px" color="#040D12" align="center">
        <Heading size="3xl" color="#eeeeee">
          TLC
        </Heading>

        <Flex direction="column">
          <Input
            id="profile_photo"
            type="file"
            ref={profileRef}
            style={{ display: "none" }}
            onChange={handleProfileChange}
          />
          <Avatar border="solid 4px #183D3D" mt="32px" w="320px" h="320px" src={`data:image/jpeg;base64,${profile}`} />
          <Button
            mt="32px"
            mb="16px"
            bgColor="#183D3D"
            color="#eeeeee"
            _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
            fontWeight="50px"
            onClick={handleProfileUpload}
            value={user?.profile_photo}
          >
            Upload new profile photo
          </Button>
        </Flex>
      </Flex>

      <Flex direction="column" p="32px" bg="#5C8374" color="#040D12" align="center">
        <Flex justify="center" gap="32px" textAlign="center">
          <Box>
            <Text>First name</Text>
            <Input
              id="first_name"
              value={user?.first_name}
              onChange={handleUserChange}
              w="232px"
              color="#040D12"
              borderColor="#040D12"
              _hover={{ borderColor: "#93B1A6" }}
              focusBorderColor="#040D12"
            />
          </Box>
          <Box>
            <Text>Last name</Text>
            <Input
              id="last_name"
              value={user?.last_name}
              onChange={handleUserChange}
              w="232px"
              color="#040D12"
              borderColor="#040D12"
              _hover={{ borderColor: "#93B1A6" }}
              focusBorderColor="#040D12"
            />
          </Box>
          <Box>
            <Text>Date of birth</Text>
            <Input
              id="date_of_birth"
              value={user?.date_of_birth ? new Date(user.date_of_birth).toISOString().split("T")[0] : ""}
              onChange={handleUserChange}
              w="232px"
              type="date"
              color="#040D12"
              borderColor="#040D12"
              _hover={{ borderColor: "#93B1A6" }}
              focusBorderColor="#040D12"
            />
          </Box>
        </Flex>

        <Text mt="16px">Gender</Text>
        <Flex gap="32px" align="center" justify="center" textAlign="center">
          <Box
            w="232px"
            border={user?.gender == "male" ? "#183D3D 4px solid" : "#040D12 1px solid"}
            borderRadius="16px"
            color="#040D12"
            _hover={{ borderColor: "#93B1A6", color: "#93B1A6" }}
            onClick={() => setUser(user && { ...user, gender: "male" })}
          >
            <Lottie options={maleOptions} height="24px" width="24px" />
            <Text>Male</Text>
          </Box>

          <Box
            w="232px"
            border={user?.gender == "female" ? "#183D3D 4px solid" : "#040D12 1px solid"}
            borderRadius="16px"
            color="#040D12"
            _hover={{ borderColor: "#93B1A6", color: "#93B1A6" }}
            onClick={() => setUser(user && { ...user, gender: "female" })}
          >
            <Lottie options={femaleOptions} height="24px" width="24px" />
            <Text>Female</Text>
          </Box>

          <Flex
            direction="column"
            align="center"
            w="232px"
            border={user?.gender == "other" ? "#183D3D 4px solid" : "#040D12 1px solid"}
            borderRadius="16px"
            color="#040D12"
            _hover={{ borderColor: "#93B1A6", color: "#93B1A6" }}
            p="4px 4px 0px 4px"
            onClick={() => setUser(user && { ...user, gender: "other" })}
          >
            <PiGenderNeuterBold size="20px" color="#1f1f1f" />
            <Text>Other</Text>
          </Flex>
        </Flex>

        <Flex mt="16px" justify="center" gap="32px" textAlign="center">
          <Box>
            <Text>Address</Text>
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
                w="232px"
                color="#040D12"
                borderColor="#040D12"
                _hover={{ borderColor: "#93B1A6" }}
                focusBorderColor="#040D12"
              />
            </InputGroup>
          </Box>
          <Box>
            <Text>Phone</Text>
            <InputGroup w="232px" borderColor="#040D12" color="#040D12">
              <InputLeftAddon bgColor="#5C8374">+385</InputLeftAddon>
              <Input
                id="phone"
                value={user?.phone}
                onChange={handleUserChange}
                type="number"
                _hover={{ borderColor: "#93B1A6" }}
                focusBorderColor="#040D12"
              />
            </InputGroup>
          </Box>
        </Flex>

        {userData?.role === "student" && (
          <Flex mt="16px" justify="center" gap="32px" textAlign="center">
            <Box>
              <Text>School name</Text>
              <Input
                id="school"
                value={user?.school}
                onChange={handleUserChange}
                w="232px"
                color="#040D12"
                borderColor="#040D12"
                _hover={{ borderColor: "#93B1A6" }}
                focusBorderColor="#040D12"
              />
            </Box>
            <Box>
              <Text>Grade</Text>
              <Select
                id="grade"
                value={user?.grade}
                onChange={handleUserChange}
                w="232px"
                color="#040D12"
                borderColor="#040D12"
                _hover={{ borderColor: "#93B1A6" }}
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
            </Box>
          </Flex>
        )}
        {userData?.role === "tutor" && (
          <>
            <Flex mt="16px" justify="center" gap="32px" textAlign="center">
              <Box>
                <Text>Educational attainment</Text>
                <Select
                  id="educational_attainment"
                  w="232px"
                  value={user?.educational_attainment}
                  onChange={handleUserChange}
                  color="#040D12"
                  borderColor="#040D12"
                  _hover={{ borderColor: "#93B1A6" }}
                  focusBorderColor="#040D12"
                >
                  <option value="hs">high school</option>
                  <option value="associates">associates degree</option>
                  <option value="bachelors">bachelors degree</option>
                  <option value="masters">masters degree</option>
                  <option value="phd">doctoral degree</option>
                </Select>
              </Box>
              <Box>
                <Text>Finished school</Text>
                <Input
                  id="finished_school"
                  value={user?.finished_school}
                  onChange={handleUserChange}
                  w="232px"
                  color="#040D12"
                  borderColor="#040D12"
                  _hover={{ borderColor: "#93B1A6" }}
                  focusBorderColor="#040D12"
                />
              </Box>
            </Flex>

            <Text mt="16px">Description</Text>
            <Textarea
              id="description"
              value={user?.description}
              onChange={handleUserChange}
              placeholder="Say something about yourself..."
              w="762px"
              maxLength={300}
              color="#040D12"
              borderColor="#040D12"
              _hover={{ borderColor: "#93B1A6" }}
              focusBorderColor="#040D12"
              _placeholder={{ color: "#93B1A6" }}
            />
          </>
        )}

        <Flex mt="32px" gap="16px">
          <Link href="/home">
            <Button variant="unstyled" color="#183D3D" fontWeight="50px" _hover={{ color: "black" }}>
              Cancel
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            bgColor="#183D3D"
            color="#eeeeee"
            _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
            fontWeight="50px"
          >
            Save changes
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let session = await getMe(req);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  let userData = await getCurrentUserInfo(req);

  return {
    props: {
      userData,
    },
  };
};
