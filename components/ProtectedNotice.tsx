"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
export default function ProtectedNotice() {
  useEffect(() => {
    toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
  }, []);
  return null;
}
