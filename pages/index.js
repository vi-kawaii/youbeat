import Layout from "../components/Layout";
import Header from "../components/Header";
import Head from "next/head";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import YouTube from "react-youtube";
import { opts } from "../utils/yt";

export default function Home() {
  const { data } = useSWR("/tracks.json", fetcher);

  return (
    <>
      <Head>
        <title>YouBeat</title>
      </Head>
      <Header home />
      <Layout>
        <div className="divide-y divide-neutral-500">
          {data ? (
            data.map((v) => (
              <div>
                <YouTube
                  className="mt-4"
                  iframeClassName="w-full aspect-video"
                  videoId={v.video}
                  opts={opts}
                />
                <button className="py-2 bg-red-500 rounded-full w-full my-4">
                  Играть
                </button>
              </div>
            ))
          ) : (
            <div>Загрузка...</div>
          )}
        </div>
      </Layout>
    </>
  );
}
