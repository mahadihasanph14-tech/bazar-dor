"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const next = params.get("next") || "/";
  const reason = params.get("reason");
  useEffect(() => {
    if (reason === "auth") toast.error("এই পেজ দেখতে সাইন ইন প্রয়োজন");
  }, [reason]);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
    toast.success("সাইন ইন সফল হয়েছে");
    router.push(next);
  };
  const social = async (provider: "google" | "github") => {
    const result = await authClient.signIn.social({
      provider,
      callbackURL: next,
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
        <h1 className="mt-4 text-2xl font-black">সাইন ইন</h1>
        <p className="mt-1 text-sm text-slate-500">
          আপনার বাজারদর দেখতে অ্যাকাউন্টে প্রবেশ করুন
        </p>
      </div>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="ইমেইল" type="email" value={email} onChange={setEmail} />
        <Field
          label="পাসওয়ার্ড"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <button disabled={busy} className="btn-primary w-full">
          {busy ? "সাইন ইন হচ্ছে…" : "সাইন ইন"}
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
        অ্যাকাউন্ট নেই?{" "}
        <Link className="font-bold text-brand-600" href="/signup">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
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
