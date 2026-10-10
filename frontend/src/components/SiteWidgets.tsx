"use client";

import dynamic from "next/dynamic";

import { BackToTop } from "./BackToTop";

const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

export function SiteWidgets() {
  return (
    <>
      <BackToTop />
      <ChatBot />
    </>
  );
}
