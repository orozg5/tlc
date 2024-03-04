import { Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import IHomeProps from "@/interfaces/IHomeProps";
import { getMe } from "@/utils/getMe";

export default function home({ userData }: IHomeProps) {
  return (
    <>
      <Text>{userData?.email}</Text>
      <Text>{userData?.role}</Text>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async ({ req }) => {
  const userData = await getMe(req);

  if (!userData) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userData,
    },
  };
};
