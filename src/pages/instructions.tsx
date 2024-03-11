import StudentInstructions from "@/components/features/Instructions/StudentInstructions";
import TutorInstructions from "@/components/features/Instructions/TutorInstructions";
import RegHeader from "@/components/shared/RegHeader";
import getAllInstructions from "@/helpers/getAllInstructions";
import getCities from "@/helpers/getCities";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getCurrentUserInstructions from "@/helpers/getCurrentUserInstructions";
import getInstructors from "@/helpers/getInstructors";
import getSubjects from "@/helpers/getSubjects";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import { GetServerSideProps } from "next";
import React from "react";

export default function instructions({
  userData,
  userInstructions,
  subjects,
  cities,
  allInstructions,
  instructors,
}: IUserProps) {
  return (
    <>
      <RegHeader userData={userData} />
      {userData?.role == "tutor" && (
        <TutorInstructions userData={userData} userInstructions={userInstructions} subjects={subjects} />
      )}
      {userData?.role == "student" && (
        <StudentInstructions
          userData={userData}
          subjects={subjects}
          cities={cities}
          allInstructions={allInstructions}
          instructors={instructors}
        />
      )}
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
  let subjects = await getSubjects();
  let cities = await getCities();
  let allInstructions = await getAllInstructions();
  let instructors = await getInstructors();

  return {
    props: {
      userData,
      userInstructions,
      subjects,
      cities,
      allInstructions,
      instructors,
    },
  };
};
