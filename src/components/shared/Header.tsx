import { Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Show, Text } from "@chakra-ui/react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import IUserProps from "@/interfaces/IUserProps";
import logout from "@/helpers/logout";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/router";

export default function Header({ userData }: IUserProps) {
  const logOut = async () => {
    const res = await logout();
    if (res.status === 200) {
      window.location.reload();
    }
  };

  const router = useRouter();
  const handleAboutUsClick = () => {
    if (router.pathname === "/instructions" || router.pathname === "/forum") {
      router.push("/");
      setTimeout(() => {
        const aboutusElement = document.getElementById("aboutus");
        if (aboutusElement) {
          aboutusElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };
  const handleContactsClick = () => {
    if (router.pathname === "/instructions" || router.pathname === "/forum") {
      router.push("/");
      setTimeout(() => {
        const contactsElement = document.getElementById("contacts");
        if (contactsElement) {
          contactsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
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

        <Show breakpoint="(min-width: 768px)">
          {userData?.email && (
            <Link href="/home">
              <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
                Home
              </Text>
            </Link>
          )}
          <ScrollLink to="aboutus" spy={true} smooth={true} duration={500} offset={-80} onClick={handleAboutUsClick}>
            <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
              About us
            </Text>
          </ScrollLink>
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
          <ScrollLink to="contacts" spy={true} smooth={true} duration={500} offset={-80} onClick={handleContactsClick}>
            <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
              Contacts
            </Text>
          </ScrollLink>
        </Show>
      </Flex>

      <Show breakpoint="(min-width: 768px)">
        <Flex gap="16px">
          {userData?.email && (
            <Button onClick={logOut} bgColor="#F1C93B" _hover={{ bgColor: "#FAE392" }}>
              Log out
            </Button>
          )}
          {!userData?.email && (
            <>
              <Link href="/signin">
                <Button variant="unstyled" _hover={{ color: "black" }}>
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button bgColor="#F1C93B" _hover={{ bgColor: "#FAE392" }}>
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Show>

      <Show breakpoint="(max-width: 767px)">
        <Menu>
          <MenuButton as={Button} variant="unstyled">
            <IoMenu color="#183D3D" size="32px" />
          </MenuButton>
          <MenuList color="#183D3D">
            {userData?.email && (
              <MenuItem as="a" href="/home">
                Home
              </MenuItem>
            )}
            <MenuItem as="a" href="/forum">
              Forum
            </MenuItem>
            <MenuItem as="a" href="/instructions">
              Instructions
            </MenuItem>
            <MenuDivider />
            {!userData?.email && (
              <>
                <MenuItem as="a" href="/signin">
                  Sign in
                </MenuItem>
                <MenuItem as="a" href="/signup">
                  Sign up
                </MenuItem>
              </>
            )}
            {userData?.email && <MenuItem onClick={logOut}>Log out</MenuItem>}
          </MenuList>
        </Menu>
      </Show>
    </Flex>
  );
}
