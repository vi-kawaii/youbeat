import useSWR from "swr";
import Image from "next/image";
import fetcher from "../utils/fetcher";
import getYouTubeVideoId from "../utils/yt";

export default function Card({ videoURL, onChangeVideo }) {
  const { data } = useSWR(
    `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${getYouTubeVideoId(
      videoURL
    )}`,
    fetcher
  );

  const onClick = () => {
    onChangeVideo(videoURL);
    scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  if (!data) {
    return null;
  }

  return (
    <button onClick={onClick} className="w-full block">
      <div className="relative aspect-w-16 aspect-h-9">
        <Image
          className="rounded-2xl"
          alt=""
          src={data.thumbnail_url}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
        />
      </div>
      <div className="mt-2 line-clamp-1">{data.title}</div>
      <div className="text-neutral-500 mb-4">{data.author_name}</div>
    </button>
  );
}
