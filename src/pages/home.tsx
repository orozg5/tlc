import { GetServerSideProps } from "next";
import IUserProps from "@/interfaces/IUserProps";
import RegHeader from "@/components/shared/RegHeader";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import { getMe } from "@/utils/getMe";
import ProfileSetup from "@/components/features/ProfileSetup";
import StudentDashboard from "@/components/features/Dashboard/StudentDashboard";
import TutorDashboard from "@/components/features/Dashboard/TutorDashboard";
import getCities from "@/helpers/getCities";
import AdminDashboard from "@/components/features/Dashboard/AdminDashboard";

export default function home({ userData, cities }: IUserProps) {
  return (
    <>
      {userData && !userData?.first_name && <ProfileSetup userData={userData} cities={cities} />}
      {userData && <RegHeader userData={userData} />}
      {userData && userData?.role == "student" && <StudentDashboard userData={userData} />}
      {userData && userData?.role == "tutor" && <TutorDashboard userData={userData} />}
      {!userData && (
        <>
          <RegHeader
            userData={{
              id: "",
              email: "",
              first_name: "",
              last_name: "",
              gender: "",
              date_of_birth: "",
              city_id: "",
              role: "admin",
            }}
          />
          <AdminDashboard />
        </>
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

  if (session.role != "admin") {
    let userData = await getCurrentUserInfo(req);
    let cities = await getCities();

    return {
      props: {
        userData,
        cities,
      },
    };
  }

  return {
    props: {},
  };
};
