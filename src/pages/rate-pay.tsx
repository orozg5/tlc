import StudentRatePay from "@/components/features/RatePay/StudentRatePay";
import TutorRatePay from "@/components/features/RatePay/TutorRatePay";
import RegHeader from "@/components/shared/RegHeader";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getDoneTerms from "@/helpers/getDoneTerms";
import getRated from "@/helpers/getRated";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";

import { GetServerSideProps } from "next";

export default function rate_pay({ userData, doneTerms, rated }: IUserProps) {
  return (
    <>
      <RegHeader userData={userData} />
      {userData?.role == "student" && <StudentRatePay userData={userData} doneTerms={doneTerms} rated={rated} />}
      {userData?.role == "tutor" && <TutorRatePay />}
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
  let doneTerms = await getDoneTerms(req);
  let rated = await getRated(req);

  return {
    props: {
      userData,
      doneTerms,
      rated,
    },
  };
};
