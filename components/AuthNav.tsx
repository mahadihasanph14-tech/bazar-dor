"use client";
import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthNav() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending)
    return (
      <div className="flex gap-2">
        <span className="h-9 w-20 animate-pulse rounded-lg bg-slate-100" />
        <span className="h-9 w-20 animate-pulse rounded-lg bg-slate-100" />
      </div>
    );
  if (!session?.user)
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn-outline">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn-primary">
          সাইন আপ
        </Link>
      </div>
    );
  const logout = async () => {
    const { error } = await authClient.signOut();
    if (error) toast.error("লগআউট করা যায়নি");
    else toast.success("লগআউট সফল হয়েছে");
  };
  return (
    <div className="flex items-center gap-2">
      <Link href="/profile" className="btn-outline">
        <UserRound size={16} /> প্রোফাইল
      </Link>
      <button onClick={logout} className="btn-primary">
        <LogOut size={16} /> বের হন
      </button>
    </div>
  );
}
