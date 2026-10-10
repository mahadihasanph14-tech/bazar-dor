"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function ProfileUpdateForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখুন");
    setBusy(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setBusy(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট হয়নি");
    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.push("/profile");
  };
  return (
    <form onSubmit={submit} className="card mx-auto max-w-lg p-7 sm:p-9">
      <h1 className="text-2xl font-black">তথ্য আপডেট</h1>
      <p className="mt-1 text-sm text-slate-500">
        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
      </p>
      <label className="mt-7 block text-sm font-semibold">
        নাম
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 outline-none focus:border-brand-500"
        />
      </label>
      <button disabled={busy} className="btn-primary mt-5 w-full">
        {busy ? "আপডেট হচ্ছে…" : "Update Information"}
      </button>
    </form>
  );
}
