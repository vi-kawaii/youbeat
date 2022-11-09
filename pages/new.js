import Layout from "../components/Layout";
import Header from "../components/Header";
import Head from "next/head";
import { useState } from "react";
import YouTube from "react-youtube";
import getYouTubeVideoId, { opts } from "../utils/yt";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";

export default function New() {
  const [videoURL, setVideoURL] = useState("");

  const changeVideoURL = ({ target: { value } }) => setVideoURL(value);

  return (
    <>
      <Head>
        <title>Новый трек - YouBeat</title>
      </Head>
      <Header />
      <Layout>
        <div className="flex-grow">
          <input
            className="rounded-full py-2 px-4 w-full mb-6 bg-neutral-700"
            placeholder="Ссылка на видео"
            onChange={changeVideoURL}
            value={videoURL}
          />
          {getYouTubeVideoId(videoURL) && (
            <>
              <YouTube
                iframeClassName="w-full aspect-video rounded-2xl"
                opts={opts}
                videoId={getYouTubeVideoId(videoURL)}
              />
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <button className="flex bg-red-500 block rounded-full py-2 px-4 mt-6 active:bg-red-600">
                  <CursorArrowRaysIcon className="w-6 mr-2" />
                  Нажимайте в ритм
                </button>
                <button className="flex bg-blue-500 block rounded-full py-2 px-4 mt-6">
                  <CursorArrowRaysIcon className="w-6 mr-2" />
                  Сохранить с ритмом {120} BPM
                </button>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
