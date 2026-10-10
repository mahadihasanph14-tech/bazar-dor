import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
export default async function Profile() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin?next=/profile&reason=auth");
  return (
    <div className="container-main py-10">
      <div className="mx-auto max-w-2xl">
        <div className="card p-7 sm:p-10">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-2xl">
              👤
            </div>
            <div>
              <p className="text-xs text-slate-500">আমার প্রোফাইল</p>
              <h1 className="text-2xl font-black">{session.user.name}</h1>
              <p className="text-sm text-slate-500">{session.user.email}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">নাম</p>
              <p className="mt-1 font-bold">{session.user.name}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">ইমেইল</p>
              <p className="mt-1 font-bold">{session.user.email}</p>
            </div>
          </div>
          <Link href="/profile/update" className="btn-primary mt-7">
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
