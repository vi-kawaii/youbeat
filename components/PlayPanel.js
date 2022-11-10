const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"];

export default function PlayPanel() {
  const random = [[1, 0, 2, 0]];

  return (
    <div className="my-6 h-52 bg-neutral-800 rounded-2xl overflow-auto">
      {random.map((group) => (
        <div className="flex gap-4">
          {group.map((pad) =>
            pad === 0 ? (
              <div className="w-full"></div>
            ) : (
              <button
                className={`${
                  colors[Math.floor(Math.random() * colors.length)]
                } ${pad === 2 ? "h-[416px]" : "h-[208px]"} w-full rounded-2xl`}
              ></button>
            )
          )}
        </div>
      ))}
    </div>
  );
}