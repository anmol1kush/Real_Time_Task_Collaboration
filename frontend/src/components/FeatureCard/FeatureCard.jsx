import React from "react";
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";

export default function FeatureCard() {
  return (
    <>
      <h2
        id="scroll-to-features"
        className="text-5xl font-medium my-5 px-[8%]"
      >
        Features
      </h2>

      <div className="px-[8%] bg-black gap-8 grid grid-cols-12 grid-rows-2 mb-14">
        {/* Repeatable Card */}
        <Card className="bg-black col-span-12 sm:col-span-4 h-[300px] hover:scale-105 transition">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-xl font-bold text-white">Real-time Collaboration</p>
            <h4 className="text-sm text-gray-300">
              Edit code & documents together
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            className="w-full h-full object-cover"
            src="https://simplea.com/getmedia/d13d6154-e506-4cf6-a619-49728dcc2323/2_3_62_Simplea_com_blog_article_Is_Real_Time_Collaboration_a_real_thing_cover_800x400.jpg.aspx"
          />
        </Card>

        {/* Other cards remain same pattern (no logic change) */}
      </div>
    </>
  );
}