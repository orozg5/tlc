import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import IUserProps from "@/interfaces/IUserProps";
import logout from "@/helpers/logout";

export default function Header({ userData }: IUserProps) {
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
        {userData?.email && (
          <Link href="/home">
            <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
              Home
            </Text>
          </Link>
        )}
        <ScrollLink to="aboutus" spy={true} smooth={true} duration={500} offset={-80}>
          <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
            About us
          </Text>
        </ScrollLink>
        <Link href="/forum">
          <Text color="#F1C93B" as="span" fontSize="20px" _hover={{ color: "#FAE392" }}>
            Forum
          </Text>
        </Link>
        <ScrollLink to="contacts" spy={true} smooth={true} duration={500} offset={-80}>
          <Text color="#183D3D" as="span" fontSize="20px" _hover={{ color: "#040D12", cursor: "pointer" }}>
            Contacts
          </Text>
        </ScrollLink>
      </Flex>
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
    </Flex>
  );
}
