"use client";

import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast, { Toaster } from "react-hot-toast";

interface UrlShorterProp {
  fetchurl: () => Promise<void>;
}

export default function UrlShorter({ fetchurl }: UrlShorterProp) {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    setIsLoading(true);

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      fetchurl();
      setTimeout(() => {
        toast.success("url shortened!");
      }, 1000);
      setUrl("");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-2xl mx-auto mt-20 shadow-md py-6 rounded-md">
        <form onSubmit={submit} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2 px-1 sm:flex-row gap-x-2 max-w-md w-full mx-auto">
            <label htmlFor="url-input" className="sr-only">
              Enter URL to shorten
            </label>
            <Input
              id="url-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the link here"
              required
              aria-describedby="url-error"
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>
          {error && (
            <p id="url-error" className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <p className="text-sm text-slate-400 text-center max-w-md w-full mx-auto">
            smallUrl is a free tool to shorten URLs and generate short links.
            URL shortener allows to create a shortened link making it easy to
            share.
          </p>
        </form>
      </div>
    </>
  );
}
