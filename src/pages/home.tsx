import { GetServerSideProps } from "next";
import IUserProps from "@/interfaces/IUserProps";
import RegHeader from "@/components/shared/RegHeader";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import { getMe } from "@/utils/getMe";
import { useRef, useState } from "react";
import ProfileSetup from "@/components/features/ProfileSetup";

export default function home({ userData }: IUserProps) {
  return (
    <>
      {!userData?.first_name && <ProfileSetup userData={userData} />}
      <RegHeader userData={userData} />
      {userData?.role == "student" && <></>}
      {userData?.role == "tutor" && <></>}
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
