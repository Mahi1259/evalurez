import Image from "next/image";
import FirstPage from "./(app)/firstPage/page";
import SecondPage from "./(app)/secondPage/page";
import ThirdPage from "./(app)/thirdPage/page";
import FourthPage from "./(app)/fourthPage/page";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-10"
      style={{ overflowX: "hidden" }}
    >
      <div className="flex flex-col gap-20">
        <FirstPage />
        <SecondPage />
        <ThirdPage />
        <FourthPage />
      </div>
    </main>
  );
}
