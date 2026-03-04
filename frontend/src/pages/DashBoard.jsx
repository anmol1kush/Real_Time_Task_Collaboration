import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import api from "../services/api";
import Navbar from "../components/Nav/Navbar";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with: api.get("/projects").then(res => { setProjects(res.data); setLoading(false); });
    setTimeout(() => {
      setProjects([
        {
          id: "1",
          name: "Real-Time Collaboration",
          description: "Edit code & documents together",
          span: "col-span-12 sm:col-span-4",
          height: "h-[300px]",
          cover:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: "2",
          name: "Task Management",
          description: "Organize & track project tasks",
          span: "col-span-12 sm:col-span-4",
          height: "h-[300px]",
          cover:
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: "3",
          name: "Progress Tracking",
          description: "Monitor your team's progress",
          span: "col-span-12 sm:col-span-4",
          height: "h-[300px]",
          cover:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: "4",
          name: "Video Conferencing",
          description: "Connect with your team instantly",
          span: "col-span-12 sm:col-span-5",
          height: "h-[300px]",
          cover:
            "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&q=80&w=800",
        },
        {
          id: "5",
          name: "Visual Studio Code",
          description: "Experience seamless collaboration on the most loved code editor.",
          span: "col-span-12 sm:col-span-7",
          height: "h-[300px]",
          cover:
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white">

        <div className="px-[8%] pt-10 pb-20">
          <h2 className="text-5xl font-medium my-5">Projects</h2>

          {loading ? (
            <div className="grid grid-cols-12 gap-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`${n <= 3 ? "col-span-12 sm:col-span-4" : n === 4 ? "col-span-12 sm:col-span-5" : "col-span-12 sm:col-span-7"} h-[300px] bg-zinc-900 rounded-xl animate-pulse`}
                />
              ))}
            </div>
          ) : (
            <div className="gap-8 grid grid-cols-12 grid-rows-2 mb-14">
              {projects.map((p) => (
                <Link
                  to={`/project/${p.id}`}
                  key={p.id}
                  className={`${p.span} ${p.height}`}
                >
                  <Card className={`bg-black w-full ${p.height} hover:scale-105 transition duration-300`}>
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                      <p className="text-tiny text-white/60 uppercase font-bold">
                        {p.name}
                      </p>
                      <h4 className="text-white font-medium text-large">
                        {p.description}
                      </h4>
                    </CardHeader>
                    <Image
                      removeWrapper
                      alt={p.name}
                      className="z-0 w-full h-full object-cover"
                      src={p.cover}
                    />
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}