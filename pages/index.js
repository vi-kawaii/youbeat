import Layout from "../components/Layout";
import Header from "../components/Header";
import Card from "../components/Card";
import Head from "next/head";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function Home() {
  const { data } = useSWR("/tracks.json", fetcher);

  return (
    <>
      <Head>
        <title>YouBeat</title>
      </Head>
      <Header home />
      <Layout>
        <div className="grid sm:grid-cols-2 gap-4">
          {data && data.map((v, i) => <Card key={i} v={v} />)}
        </div>
      </Layout>
    </>
  );
}
