import StudentMaterials from "@/components/features/Materials/StudentMaterials";
import TutorMaterials from "@/components/features/Materials/TutorMaterials";
import RegHeader from "@/components/shared/RegHeader";
import getCurrentStudentMaterials from "@/helpers/getCurrentStudentMaterials";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getMaterialsStudents from "@/helpers/getMaterialsStudents";
import getMyStudents from "@/helpers/getMyStudents";
import getTutorFolders from "@/helpers/getTutorFolders";
import getTutorMaterials from "@/helpers/getTutorMaterials";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import { GetServerSideProps } from "next";

export default function materials({ userData, materials, folders, users, materials_students, currentStudentMaterials }: IUserProps) {
  return (
    <>
      <RegHeader userData={userData} />
      {userData?.role == "tutor" && (
        <TutorMaterials
          userData={userData}
          materials={materials}
          folders={folders}
          users={users}
          materials_students={materials_students}
        />
      )}
      {userData?.role == "student" && <StudentMaterials currentStudentMaterials={currentStudentMaterials} />}
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
  let materials = await getTutorMaterials(req);
  let folders = await getTutorFolders(req);
  let students = await getMyStudents(userData.id);
  let users = students.users;
  let materials_students = await getMaterialsStudents();
  let currentStudentMaterials = await getCurrentStudentMaterials(req);

  return {
    props: {
      userData,
      materials,
      folders,
      users,
      materials_students,
      currentStudentMaterials
    },
  };
};
