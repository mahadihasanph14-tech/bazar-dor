"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের দিন");
    setBusy(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setBusy(false);
    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    toast.success("রেজিস্ট্রেশন সফল হয়েছে");
    router.push("/signin");
  };
  const social = async (provider: "google" | "github") => {
    const result = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (result?.error)
      toast.error(result.error.message || "Social login ব্যর্থ হয়েছে");
  };
  return (
    <div className="card w-full max-w-md p-7 sm:p-9">
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-2xl">
          🛒
        </div>
        <h1 className="mt-4 text-2xl font-black">সাইন আপ</h1>
        <p className="mt-1 text-sm text-slate-500">
          আজকের বাজারদর দেখতে নতুন অ্যাকাউন্ট তৈরি করুন
        </p>
      </div>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="নাম" value={name} onChange={setName} />
        <Field label="ইমেইল" type="email" value={email} onChange={setEmail} />
        <Field
          label="পাসওয়ার্ড"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <button disabled={busy} className="btn-primary w-full">
          {busy ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        অথবা
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => social("google")} className="btn-outline">
          Google
        </button>
        <button onClick={() => social("github")} className="btn-outline">
          GitHub
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        অ্যাকাউন্ট আছে?{" "}
        <Link className="font-bold text-brand-600" href="/signin">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
function Field({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-3 font-normal outline-none focus:border-brand-500"
      />
    </label>
  );
}
