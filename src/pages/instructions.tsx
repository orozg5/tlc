import StudentInstructions from "@/components/features/Instructions/StudentInstructions";
import TutorInstructions from "@/components/features/Instructions/TutorInstructions";
import RegHeader from "@/components/shared/RegHeader";
import getAllInstructions from "@/helpers/getAllInstructions";
import getCities from "@/helpers/getCities";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getCurrentUserInstructions from "@/helpers/getCurrentUserInstructions";
import getInstructors from "@/helpers/getInstructors";
import getSubjects from "@/helpers/getSubjects";
import getTerms from "@/helpers/getTerms";
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
  terms
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
          terms={terms}
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

  const userData = await getCurrentUserInfo(req);
  const userInstructions = await getCurrentUserInstructions(req);
  const subjects = await getSubjects();
  const cities = await getCities();
  const allInstructions = await getAllInstructions();
  const instructors = await getInstructors();
  const terms = await getTerms();

  return {
    props: {
      userData,
      userInstructions,
      subjects,
      cities,
      allInstructions,
      instructors,
      terms,
    },
  };
};
