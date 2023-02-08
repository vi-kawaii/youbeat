import { useState } from "react";
import useInterval from "../utils/useInterval";
import { StarIcon } from "@heroicons/react/24/outline";
import { motion, useSpring } from "framer-motion";

const bgColors = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"];
const textColors = [
  "text-red-500",
  "text-yellow-500",
  "text-green-500",
  "text-blue-500",
];
const strokeColors = [
  "stroke-red-500",
  "stroke-yellow-500",
  "stroke-green-500",
  "stroke-blue-500",
];

export default function PlayPanel({ bpm, ready, pause }) {
  const [padColor, setPadColor] = useState("");
  const [padIndex, setPadIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreColor, setScoreColor] = useState(0);
  const [beat, setBeat] = useState(100);

  useInterval(
    () => {
      setBeat((b) => (b === 100 ? 50 : 100));
    },
    ready && !pause ? (60 / bpm) * 500 : null
  );

  useInterval(
    () => {
      let newPadColor = bgColors[Math.floor(Math.random() * bgColors.length)];
      while (newPadColor === padColor) {
        newPadColor = bgColors[Math.floor(Math.random() * bgColors.length)];
      }
      setPadColor(newPadColor);

      let newPadIndex = Math.floor(Math.random() * 4);
      while (newPadIndex === padIndex) {
        newPadIndex = Math.floor(Math.random() * 4);
      }
      setPadIndex(newPadIndex);

      let newScoreColor = Math.floor(Math.random() * bgColors.length);
      while (newScoreColor === scoreColor) {
        newScoreColor = Math.floor(Math.random() * bgColors.length);
      }
      setScoreColor(newScoreColor);
    },
    ready && !pause ? (60 / bpm) * 1000 : null
  );

  const onClick = (e) => {
    setScore((s) => s + 1);
    e.target.disabled = true;
  };

  return (
    <>
      <div
        className={`text-xl font-bold mt-2 flex justify-center ${textColors[scoreColor]}`}
      >
        <StarIcon className={`w-6 mr-4 ${strokeColors[scoreColor]}`} />
        {score}
        <StarIcon className={`w-6 ml-4 ${strokeColors[scoreColor]}`} />
      </div>
      <div className="flex gap-4 mb-6 mt-2 h-52 bg-neutral-800 rounded-2xl">
        {[...Array(4).keys()].map((i) =>
          padIndex !== i ? (
            <div className="w-full" key={i}></div>
          ) : (
            <motion.button
              onClick={onClick}
              key={i}
              className={`${padColor} h-[208px] w-full rounded-2xl`}
              animate={{ scale: beat / 100}}
              transition={{delay: 0.002}}
            ></motion.button>
          )
        )}
      </div>
    </>
  );
}
