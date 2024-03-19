import RegHeader from "@/components/shared/RegHeader";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import { GetServerSideProps } from "next";
import getCurrentUserTerms from "@/helpers/getCurrentUserTerms";
import TutorCalendar from "@/components/features/Calendar/TutorCalendar";
import StudentCalendar from "@/components/features/Calendar/StudentCalendar";
import getSubjects from "@/helpers/getSubjects";
import getAllInstructions from "@/helpers/getAllInstructions";
import getInstructors from "@/helpers/getInstructors";
import getStudents from "@/helpers/getStudents";

export default function calendar({ userData, myTerms, subjects, allInstructions, instructors, students }: IUserProps) {
  return (
    <>
      <RegHeader userData={userData} />
      {userData?.role == "tutor" && (
        <TutorCalendar
          userData={userData}
          myTerms={myTerms}
          subjects={subjects}
          allInstructions={allInstructions}
          students={students}
        />
      )}
      {userData?.role == "student" && (
        <StudentCalendar
          userData={userData}
          myTerms={myTerms}
          subjects={subjects}
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

  const userData = await getCurrentUserInfo(req);
  const myTerms = await getCurrentUserTerms(req);
  const subjects = await getSubjects();
  const allInstructions = await getAllInstructions();
  const instructors = await getInstructors();
  const students = await getStudents();

  return {
    props: {
      userData,
      myTerms,
      subjects,
      allInstructions,
      instructors,
      students,
    },
  };
};
