import Head from "next/head";
import Header from "@/components/shared/Header";
import Fotter from "@/components/shared/Fotter";
import Main from "@/components/features/LandingPage/Main";
import AboutUs from "@/components/features/LandingPage/AboutUs";
import { GetServerSideProps } from "next";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";
import getActiveNews from "@/helpers/getActiveNews";

export default function Home({ userData, activeNews }: IUserProps) {
  return (
    <>
      <Head>
        <title>TLC</title>
        <meta name="description" content="A web application for finding and managing tutoring services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header userData={userData} />
      <Main />
      <AboutUs activeNews={activeNews} />
      <Fotter id="contacts" />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let userData = await getMe(req);
  let activeNews = await getActiveNews();

  if (!userData) {
    return {
      props: {},
    };
  }
  return {
    props: {
      userData,
      activeNews
    },
  };
};
