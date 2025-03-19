"use client"; 
import Image from "next/image";
import { useRouter } from "next/navigation";
import BMSection from "./demo/components/BMsection";
import RBMSection from "./demo/components/RBMsection";
import ProjectIntro from "./demo/components/ProjectIntro";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Boltzmann Machines & RBM</h1>
        <BMSection />
        <RBMSection />
        <ProjectIntro/>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/demo")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            See Demo
          </button>
        </div>
      </div>
    </main>
  );
}
