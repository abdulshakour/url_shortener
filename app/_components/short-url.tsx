"use client";

import UrlShorter from "@/components/url-shorter";
import UrlView from "@/components/url-view";
import { useEffect, useState } from "react";

export default function ShortCode() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchurl = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await fetch("/api/allurl", { cache: "no-store" });
      const data = await response.json();
      console.log("DATA", data);
      setUrls(data);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    fetchurl();
  }, []);

  return (
    <>
      <UrlShorter fetchurl={fetchurl} />
      <UrlView urls={urls} loading={loading} />
    </>
  );
}
