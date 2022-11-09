import Head from "next/head";
import useSWR from "swr";
import Header from "../components/Header";
import Layout from "../components/Layout";
import fetcher from "../utils/fetcher";
import YouTube from "react-youtube";
import { opts } from "../utils/yt";
import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";

export default function Track({ id }) {
  const { data } = useSWR("/tracks.json", fetcher);
  const { data: video } = useSWR(
    () =>
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${
        data.find((v) => v.id === id).video
      }`,
    fetcher
  );

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!data) {
    return "Загрузка...";
  }

  return (
    <>
      <Head>
        <title>{video ? video.title + " - " : ""}YouBeat</title>
      </Head>
      <Header />
      <Layout>
        {mount && (
          <YouTube
            iframeClassName={classNames({
              "w-full aspect-video rounded-2xl": mount,
            })}
            videoId={data.find((v) => v.id === id).video}
            opts={opts}
          />
        )}
        <div className="flex gap-4 mt-6">
          <button className="border-2 rounded-2xl border-red-500 w-full h-44">
            <ChevronDoubleLeftIcon className="w-8 stroke-red-500 mx-auto" />
          </button>
          <button className="border-2 rounded-2xl border-yellow-500 w-full h-44">
            <ChevronDoubleUpIcon className="w-8 stroke-yellow-500 mx-auto" />
          </button>
          <button className="border-2 rounded-2xl border-green-500 w-full h-44">
            <ChevronDoubleDownIcon className="w-8 stroke-green-500 mx-auto" />
          </button>
          <button className="border-2 rounded-2xl border-blue-500 w-full h-44">
            <ChevronDoubleRightIcon className="w-8 stroke-blue-500 mx-auto" />
          </button>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  return {
    props: { id },
  };
}
