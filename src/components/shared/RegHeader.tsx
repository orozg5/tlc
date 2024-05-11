import { Avatar, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Show, Text } from "@chakra-ui/react";
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
            <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12" }}>
              Home
            </Text>
          </Link>
          {userData?.role == "admin" && (
            <Link href="/news">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12" }}>
                News
              </Text>
            </Link>
          )}
          {userData?.role != "admin" && (
            <>
              <Link href="/forum">
                <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12" }}>
                  Forum
                </Text>
              </Link>
              <Link href="/instructions">
                <Text color="#F1C93B" as="span" fontSize="20px" _hover={{ color: "#FAE392" }}>
                  Instructions
                </Text>
              </Link>
              <Link href="/materials">
                <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12" }}>
                  Materials
                </Text>
              </Link>
              <Link href="/calendar">
                <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12" }}>
                  Calendar
                </Text>
              </Link>
              <Link href="/chat">
                <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12" }}>
                  Chat
                </Text>
              </Link>
              <Link href="/rate-pay">
                {userData?.role == "student" && (
                  <Text color="#F1C93B" as="span" fontSize="20px" _hover={{ color: "#FAE392" }}>
                    Rate & Pay
                  </Text>
                )}
                {userData?.role == "tutor" && (
                  <Text color="#F1C93B" as="span" fontSize="20px" _hover={{ color: "#FAE392" }}>
                    Feedback & Payments
                  </Text>
                )}
              </Link>
            </>
          )}
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
              {userData?.role == "admin" && (
                <MenuItem as="a" href="/news">
                  News
                </MenuItem>
              )}
              {userData?.role != "admin" && (
                <>
                  <MenuItem as="a" href="/forum">
                    Forum
                  </MenuItem>
                  <MenuItem as="a" href="/instructions">
                    Instructions
                  </MenuItem>
                  <MenuItem as="a" href="/materials">
                    Materials
                  </MenuItem>
                  <MenuItem as="a" href="/calendar">
                    Calendar
                  </MenuItem>
                  <MenuItem as="a" href="/chat">
                    Chat
                  </MenuItem>
                </>
              )}
              {userData?.role == "student" && (
                <MenuItem as="a" href="/rate-pay">
                  Rate & Pay
                </MenuItem>
              )}
              {userData?.role == "tutor" && (
                <MenuItem as="a" href="/rate-pay">
                  Feedback & Payments
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Show>

        <Menu>
          <MenuButton
            as={Avatar}
            src={
              (userData?.role != "admin" && `data:image/jpeg;base64,${userData?.profile_photo}`) ||
              "https://ih1.redbubble.net/image.2955130987.9629/raf,360x360,075,t,fafafa:ca443f4786.jpg"
            }
            border="solid 1px #183D3D"
            size="md"
          />
          <MenuList>
            {userData?.role != "admin" && (
              <>
                <MenuItem color="black" as="a" href="/account">
                  Account
                </MenuItem>
                <MenuDivider color="black" />
              </>
            )}
            <MenuItem onClick={logOut} color="black">
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
