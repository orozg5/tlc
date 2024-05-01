import StudentRatePay from "@/components/features/RatePay/StudentRatePay";
import TutorRatePay from "@/components/features/RatePay/TutorRatePay";
import RegHeader from "@/components/shared/RegHeader";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getDoneTerms from "@/helpers/getDoneTerms";
import getDoneTutorTerms from "@/helpers/getDoneTutorTerms";
import getRated from "@/helpers/getRated";
import getRatedTutor from "@/helpers/getRatedTutor";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";

import { GetServerSideProps } from "next";

export default function rate_pay({ userData, doneTerms, rated, doneTutorTerms, ratedTutor }: IUserProps) {
  return (
    <>
      <RegHeader userData={userData} />
      {userData?.role == "student" && <StudentRatePay userData={userData} doneTerms={doneTerms} rated={rated} />}
      {userData?.role == "tutor" && <TutorRatePay doneTutorTerms={doneTutorTerms} ratedTutor={ratedTutor} />}
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
  let doneTutorTerms = await getDoneTutorTerms(req);
  let rated = await getRated(req);
  let ratedTutor = await getRatedTutor(req);

  return {
    props: {
      userData,
      doneTerms,
      doneTutorTerms,
      rated,
      ratedTutor
    },
  };
};
