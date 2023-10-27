import CardPrototype from "@/components/ui/CardPrototype";
import ClientController from "@/controllers/employer";
import React from "react";
import Image from "next/image";
import EditorJsonComponents from "../../component/EditorJson";

export default async function SingleBlog({ params }: any) {
  const Requirements = new ClientController();
  const data = await Requirements.getBLogs(params?.Slug);
   console.log("data", data?.author_name);
  return (
    <div>
      <CardPrototype>
        <div className="">
          <div className=" w-full justify-between mt-4">
            <div className="h-58 overflow-hidden flex gap-2 justify-between">
              <div className="text-5xl text-gray-600 w-[50%] font-serif capitalize flex flex-col justify-">
                <h1 className="text-base flex items-center gap-2  bg-white text-gray-600 px-2  rounded-md my-2  font-serif capitalize">
                  {data.category.title}{" "}
                  <span className="bg-gray-600 h-[1px] w-8" />
                </h1>
                <div>{data.title}</div>
                <div className="flex items-center text-gray-600 text-sm mt-4">
                  <div className="mr-4">
                    <strong>Author:</strong> John Doe
                  </div>
                  <div>
                    <strong>Published on:</strong> October 27, 2023
                  </div>
                </div>
                <p className="text">
                  <EditorJsonComponents
                    style={"text-base font-[400] text-gray-900 font-sans"}
                    jsonData={JSON.parse(data.body)}
                  />
                </p>
              </div>

              <Image
                alt="img"
                src={data.feature_image_url}
                width={700}
                height={600}
                className="rounded-lg w-[50%]"
              />
            </div>
          </div>
        </div>
      </CardPrototype>

      {/* <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <header className="bg-indigo-700 text-white py-4 w-full">
          <h1 className="text-xl left-left font-extrabold">
            {data.category.title}
          </h1>
        </header>
        <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-800">
            Unlocking the Secrets of Quantum Computing
          </h2>
          <div className="flex items-center text-gray-600 text-sm mt-4">
            <div className="mr-4">
              <strong>Author:</strong> John Doe
            </div>
            <div>
              <strong>Published on:</strong> October 27, 2023
            </div>
          </div>
          <img
            src="your-blog-image.jpg"
            alt="Blog Image"
            className="w-full h-auto rounded-lg mt-6"
          />
          <div className="text-gray-700 mt-6 text-lg leading-relaxed">
            <p>
              Quantum computing is at the forefront of technological
              advancement, offering the potential to revolutionize various
              industries. In this blog post, we'll dive into the intriguing
              world of quantum computing and explore its secrets.
            </p>
            <p className="mt-4">
              With quantum bits (qubits) and quantum gates, quantum computers
              have the capability to perform complex calculations that were once
              thought impossible for classical computers.
            </p>
            <p className="mt-4">
              As we journey through this quantum landscape, we'll uncover the
              principles, challenges, and potential applications of quantum
              computing in areas like cryptography, optimization, and more.
            </p>
            <p className="mt-4">
              Get ready to embark on an exciting adventure into the quantum
              realm!
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
