import Head from "next/head";
import { useState, useEffect } from "react";
import getUsers from "@/helpers/getUsers";
import Header from "@/components/shared/Header";
import Fotter from "@/components/shared/Fotter";
import Main from "@/components/features/LandingPage/Main";
import AboutUs from "@/components/features/LandingPage/AboutUs";

export default function Home() {
  /*
  const [userData, setUserData] = useState({ email: "" });
  useEffect(() => {
    getUsers().then((resp) => {
      setUserData(resp);
    });
  }, []);*/

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
