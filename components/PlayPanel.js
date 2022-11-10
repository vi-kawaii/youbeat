import { useState } from "react";
import random from "../utils/random";
import useInterval from "../utils/useInterval";

const bgColors = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"];
const textColors = [
  "text-red-500",
  "text-yellow-500",
  "text-green-500",
  "text-blue-500",
];

export default function PlayPanel({ bpm, duration, ready, pause }) {
  const [index, setIndex] = useState(0);
  const [randomGroups] = useState(random(bpm, duration));
  const [score, setScore] = useState(0);
  const [scoreColor, setScoreColor] = useState(0);

  useInterval(
    () => {
      setIndex((i) => i + 1);
      setScoreColor(Math.floor(Math.random() * bgColors.length));
    },
    ready && !pause ? (60 / bpm) * 1000 : null
  );

  const onClick = () => setScore((s) => s + 1);

  return (
    <>
      <div
        className={`text-2xl font-bold mt-2 flex justify-center ${textColors[scoreColor]}`}
      >
        {score}
      </div>
      <div className="flex gap-4 mb-6 mt-2 h-52 bg-neutral-800 rounded-2xl">
        {randomGroups[index].map((pad, i) =>
          !pad ? (
            <div className="w-full" key={i}></div>
          ) : (
            <button
              onClick={onClick}
              key={i}
              className={`${
                bgColors[Math.floor(Math.random() * bgColors.length)]
              } h-[208px] w-full rounded-2xl`}
            ></button>
          )
        )}
      </div>
    </>
  );
}
