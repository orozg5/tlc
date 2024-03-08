import { Avatar, Flex, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import Link from "next/link";
import IUserProps from "@/interfaces/IUserProps";
import logout from "@/helpers/logout";

export default function RegHeader({ userData }: IUserProps) {
  const logOut = async () => {
    const res = await logout();
    if (res.status === 200) {
      window.location.reload();
    }
  };

  return (
    <Flex
      h="100px"
      p="16px"
      bgColor="#5C8374"
      position="sticky"
      top="0"
      justifyContent="space-between"
      align="center"
      zIndex="2"
    >
      <Flex align="center" gap="16px">
        <Link href="/">
          <Heading size="2xl" color="#183D3D" as="span">
            TLC
          </Heading>
        </Link>
        <Link href="/home">
          <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
            Home
          </Text>
        </Link>
        <Link href="/forum">
          <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
            Forum
          </Text>
        </Link>
        {userData?.role == "student" && (
          <>
            <Link href="/instructions">
              <Text color="#F1C93B" as="span" fontSize="20px" _hover={{ color: "#FAE392" }}>
                Instructions
              </Text>
            </Link>
            <Link href="/calendar">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
                Calendar
              </Text>
            </Link>
            <Link href="/chat">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
                Chat
              </Text>
            </Link>
          </>
        )}
        {userData?.role == "tutor" && (
          <>
            <Link href="/instructions">
              <Text color="#F1C93B" as="span" fontSize="20px" _hover={{ color: "#FAE392" }}>
                Instructions
              </Text>
            </Link>
            <Link href="/materials">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
                Materials
              </Text>
            </Link>
            <Link href="/calendar">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
                Calendar
              </Text>
            </Link>
            <Link href="/chat">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
                Chat
              </Text>
            </Link>
          </>
        )}
      </Flex>
      <Flex gap="16px" align="center">
        <Text color="#183D3D">
          {userData?.first_name} {userData?.last_name}
        </Text>
        <Menu>
          <MenuButton
            as={Avatar}
            src={`data:image/jpeg;base64,${userData?.profile_photo}`}
            border="solid 1px #183D3D"
            size="md"
          />
          <MenuList>
            <MenuItem color="black" as="a" href="/account">
              Account
            </MenuItem>
            <MenuItem color="black">Settings</MenuItem>
            <MenuDivider color="black" />
            <MenuItem onClick={logOut} color="black">
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
