"use client";

import { useState } from "react";

export default function Page() {
  const [copy, setCopy] = useState(0);
  const data = [
    {
      id: 1,
      originalUrl: "https://www.google.com",
      shortUrl: "https://smurl.co/abc123",
    },
    {
      id: 2,
      originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      shortUrl: "https://smurl.co/rick45",
    },
    {
      id: 3,
      originalUrl: "https://www.github.com/username/project",
      shortUrl: "https://smurl.co/git123",
    },
  ];

  const handleClick = (id: number) => {
    console.log("CLICKT", id);
    setCopy(id);
    setTimeout(() => setCopy(0), 1000);
  };
  return (
    <>
      <h1> Click texting</h1>
      <div>
        {data.map((data) => (
          <ul className="   " key={data.id}>
            <li className="bg-gray-500/40 p-2 mb-2 flex items-cener justify-between">
              {data.shortUrl}
              <button
                className={`cursor-pointer rounded-md  py-2 px-4 ${copy === data.id ? "bg-green-600" : "bg-blue-600"}`}
                onClick={() => handleClick(data.id)}
              >
                {copy === data.id ? "Copied" : "Copy"}
              </button>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
