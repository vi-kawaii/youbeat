import Layout from "../components/Layout";
import Header from "../components/Header";
import Head from "next/head";
import { useState } from "react";
import YouTube from "react-youtube";
import getYouTubeVideoId, { opts } from "../utils/yt";

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
            className="rounded-full py-2 px-4 w-full mb-6 mt-6 bg-neutral-700"
            placeholder="Ссылка на видео"
            onChange={changeVideoURL}
            value={videoURL}
          />
          {getYouTubeVideoId(videoURL) && (
            <> 
              <YouTube
                iframeClassName="w-full aspect-video"
                opts={opts}
                videoId={getYouTubeVideoId(videoURL)}
              />
              <button className="bg-red-500 w-full rounded-full py-2">
                Создать
              </button>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
