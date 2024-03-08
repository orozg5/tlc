import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import IUserProps from "@/interfaces/IUserProps";
import logout from "@/helpers/logout";
import { IoMenu } from "react-icons/io5";

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
          <Text fontSize="5xl" color="#183D3D" as="strong">
            TLC
          </Text>
        </Link>

        <Show breakpoint="(min-width: 900px)">
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
          <Link href="/instructions">
            <Text color="#F1C93B" as="span" fontSize="20px" _hover={{ color: "#FAE392" }}>
              Instructions
            </Text>
          </Link>
          {userData?.role == "tutor" && (
            <Link href="/materials">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
                Materials
              </Text>
            </Link>
          )}
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
        </Show>
      </Flex>

      <Flex gap="16px" align="center">
        <Show breakpoint="(min-width: 900px)">
          <Text color="#183D3D">
            {userData?.first_name} {userData?.last_name}
          </Text>
        </Show>

        <Show breakpoint="(max-width: 899px)">
          <Menu>
            <MenuButton as={Button} variant="unstyled">
              <IoMenu color="#183D3D" size="32px" />
            </MenuButton>
            <MenuList color="#183D3D">
              <MenuItem as="a" href="/home">
                Home
              </MenuItem>
              <MenuItem as="a" href="/forum">
                Forum
              </MenuItem>
              <MenuItem as="a" href="/instructions">
                Instructions
              </MenuItem>
              {userData?.role == "tutor" && (
                <MenuItem as="a" href="/materials">
                  Materials
                </MenuItem>
              )}
              <MenuItem as="a" href="/calendar">
                Calendar
              </MenuItem>
              <MenuItem as="a" href="/chat">
                Chat
              </MenuItem>
            </MenuList>
          </Menu>
        </Show>

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
