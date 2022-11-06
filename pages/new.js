import Layout from "../components/Layout";
import Header from "../components/Header";
import Head from "next/head";

export default function New() {
  return (
    <>
      <Head>
        <title>Новый трек</title>
      </Head>
      <Header />
      <Layout>Создание нового трека</Layout>
    </>
  );
}
