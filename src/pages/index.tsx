import Head from "next/head";
import Header from "@/components/shared/Header";
import Fotter from "@/components/shared/Fotter";
import Main from "@/components/features/LandingPage/Main";
import AboutUs from "@/components/features/LandingPage/AboutUs";
import { GetServerSideProps } from "next";
import IUserProps from "@/interfaces/IUserProps";
import { getMe } from "@/utils/getMe";

export default function Home({ userData }: IUserProps) {
  return (
    <>
      <Head>
        <title>TLC</title>
        <meta name="description" content="A web application for finding and managing tutoring services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js" />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header userData={userData} />
      <Main />
      <AboutUs />
      <Fotter id="contacts" />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let userData = await getMe(req);

  if (!userData) {
    return {
      props: {},
    };
  }

  return {
    props: {
      userData,
    },
  };
};
