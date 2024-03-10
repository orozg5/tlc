import TutorInstructions from "@/components/features/Instructions/TutorInstructions";
import RegHeader from "@/components/shared/RegHeader";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getCurrentUserInstructions from "@/helpers/getCurrentUserInstructions";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import { GetServerSideProps } from "next";
import React from "react";

export default function instructions({ userData, userInstructions }: IUserProps) {
  return (
    <>
      <RegHeader userData={userData} />
      {userData?.role == "tutor" && <TutorInstructions userData={userData} userInstructions={userInstructions} />}
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
  let userInstructions = await getCurrentUserInstructions(req);

  return {
    props: {
      userData,
      userInstructions,
    },
  };
};
