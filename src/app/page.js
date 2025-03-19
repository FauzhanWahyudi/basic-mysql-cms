import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen gap-4 justify-center items-center bg-gray-50">
      <Link
        href={"/soal-1"}
        className="text-2xl border-2 hover:bg-black/10 active:bg-black/20 active:border-gray-400 active:border-[3px] rounded-full px-4 py-2"
      >
        Soal 1
      </Link>
      <Link
        href={"/soal-2"}
        className="text-2xl border-2 hover:bg-black/10 active:bg-black/20 active:border-gray-400 active:border-[3px] rounded-full px-4 py-2"
      >
        Soal 2
      </Link>
    </div>
  );
}
