import Link from "next/link";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Header({ home }) {
  return (
    <div className="flex items-center py-4 max-w-md mx-auto px-4">
      <svg
        width="36"
        height="36"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="500" height="500" rx="100" fill="#FF4646" />
        <rect
          x="172.781"
          y="277"
          width="102.928"
          height="102.928"
          rx="10"
          transform="rotate(45 172.781 277)"
          fill="white"
        />
        <path
          d="M291.094 102.142C291.094 93.2331 301.865 88.7714 308.165 95.0711L382.21 169.116C388.51 175.416 384.048 186.187 375.139 186.187H301.094C295.571 186.187 291.094 181.71 291.094 176.187V102.142Z"
          fill="white"
        />
        <rect x="260" y="92" width="16" height="258" rx="8" fill="white" />
      </svg>
      <span className="font-bold ml-3">YouBeat</span>
      <div className="ml-auto">
        {home ? (
          <Link href="/new">
            <PlusCircleIcon className="w-6" />
          </Link>
        ) : (
          <Link href="/">
            <XCircleIcon className="w-6" />
          </Link>
        )}
      </div>
    </div>
  );
}
