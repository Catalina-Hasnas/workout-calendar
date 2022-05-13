import type { NextPage } from "next";
import Head from "next/head";
import Calendar from "../components/Calendar/Calendar";
import dayjs from "dayjs";
import "dayjs/locale/de";

dayjs.locale("de");

const Home: NextPage = () => {
  return (
    <div className="backgroundPattern">
      <Head>
        <title>Workout Calendar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Calendar />
    </div>
  );
};

export default Home;
