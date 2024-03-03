import Head from "next/head";
import Header from "@/components/shared/Header";
import Fotter from "@/components/shared/Fotter";
import Main from "@/components/features/LandingPage/Main";
import AboutUs from "@/components/features/LandingPage/AboutUs";
import getMe from "@/helpers/getMe";
import { GetServerSideProps } from "next";
import IHomeProps from "@/interfaces/IHomeProps";

export default function Home({ userData }: IHomeProps) {
  return (
    <>
      <Head>
        <title>TLC</title>
        <meta name="description" content="A web application for finding and managing tutoring services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Main />
      <AboutUs />

      <Fotter id="contacts" />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async ({ req }) => {
  const userData = await getMe();

  if (!userData) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userData,
    },
  };
};
