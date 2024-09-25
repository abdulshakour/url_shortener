"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

interface Url {
  id: string;
  shortCode: string;
  originalUrl: string;
  createAt: string;
}

interface UrlViewProps {
  urls: Url[];
  loading: boolean;
}

export default function UrlView({ urls, loading }: UrlViewProps) {
  const [isCopied, setIsCopied] = useState("");
  console.log("URLS", urls);
  const shortenerUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const copyToClipboard = async (shortcode: string) => {
    try {
      await navigator.clipboard.writeText(shortcode);
      setIsCopied(shortcode);
      toast.success("URL copied to clipboard!", {
        duration: 2000,
        position: "top-center",
      });
      setTimeout(() => setIsCopied(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy URL", {
        duration: 2000,
        position: "bottom-center",
      });
    }
  };

  if (loading) {
    console.log("LOADING");
    return (
      <>
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-300/40">
          <Skeleton className="w-[200px] h-[20px] mb-6" />
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-[445px] h-[50px]" />
            <Skeleton className="w-[50px] h-[50px]" />
          </div>
        </div>
      </>
    );
  }

  if (urls.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-medium text-slate-300 text-center mt-6">
          NO shortened urls
        </h1>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {console.log("FROM_REAL")}
      <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-300/40">
        <h2 className="text-md font-semibold mb-4  text-gray-800">
          Resent Shortened URL
        </h2>

        {urls.map((url) => (
          <div
            key={url.shortCode}
            className="flex items-center justify-between gap-y-2 border border-gray-300/50 mb-4 p-2 rounded-md"
          >
            <Link
              href={`/${url.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate flex-grow"
            >
              {shortenerUrl(url.shortCode)}
            </Link>
            <Button
              onClick={() => copyToClipboard(shortenerUrl(url.shortCode))}
              className={`flex items-center gap-2 transition-colors ${
                isCopied === shortenerUrl(url.shortCode)
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isCopied === shortenerUrl(url.shortCode) ? "Copied!" : "Copy"}
              </span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
