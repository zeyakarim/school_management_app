import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="h-screen flex">
      <div className="w-1/6">
        <Navbar />
      </div>
      <main className="w-5/6 bg-slate-50">main section</main>
    </div>
  );
}
