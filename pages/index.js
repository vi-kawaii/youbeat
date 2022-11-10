import Layout from "../components/Layout";
import Header from "../components/Header";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import getYouTubeVideoId from "../utils/yt";
import { CursorArrowRaysIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Card from "../components/Card";
import { Counter } from "bpm-counter";
import PlayPanel from "../components/PlayPanel";

const counter = new Counter();

const historyAtom = atomWithStorage("history", []);

export default function Home() {
  const [videoURL, setVideoURL] = useState("");
  const [history, setHistory] = useAtom(historyAtom);
  const [mount, setMount] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [playMode, setPlayMode] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef();

  const changeVideoURL = ({ target: { value } }) => {
    setPlayMode(false);
    setVideoURL(value);
  };
  const changeVideo = (v) => {
    setPlayMode(false);
    setVideoURL(v);
  };
  const tap = () => {
    setRerender(!rerender);
    counter.tap();
  };
  const play = () => {
    playerRef.current.seekTo(0);
    playerRef.current.playVideo();
    setPlayMode(true);
  };
  const onReady = ({ target }) => {
    playerRef.current = target;
    setDuration(target.getDuration());
  };

  useEffect(() => {
    if (getYouTubeVideoId(videoURL)) {
      setHistory((h) => [...h.filter((v) => v !== videoURL), videoURL]);
    }
  }, [videoURL, setHistory]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <Head>
        <title>YouBeat</title>
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
                videoId={getYouTubeVideoId(videoURL)}
                onReady={onReady}
              />
              {playMode ? (
                <PlayPanel bpm={Math.round(counter.bpm)} duration={duration} />
              ) : (
                <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
                  <button
                    onClick={tap}
                    className="flex bg-neutral-500 block rounded-full py-2 px-4 mt-6 active:bg-neutral-600"
                  >
                    <CursorArrowRaysIcon className="w-6 mr-2" />
                    Набить ритм
                  </button>
                  <button
                    onClick={play}
                    className="flex bg-red-500 block rounded-full py-2 px-4 mt-6"
                  >
                    <PlayIcon className="w-6 mr-2" />
                    Играть с ритмом {Math.round(counter.bpm)} BPM
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        {mount && history.length !== 0 && (
          <>
            <div className="text-xl font-bold mb-6">Недавно просмотренные</div>
            <div className="grid sm:grid-cols-3 gap-4">
              {history
                .slice()
                .reverse()
                .map((v, i) => (
                  <Card onChangeVideo={changeVideo} videoURL={v} key={i} />
                ))}
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
