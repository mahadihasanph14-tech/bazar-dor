"use client";
import { Toaster } from "react-hot-toast";
export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2600,
        style: { fontFamily: "inherit", borderRadius: 14 },
      }}
    />
  );
}
