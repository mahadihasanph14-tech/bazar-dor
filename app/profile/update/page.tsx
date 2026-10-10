import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
export default async function UpdateProfile() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin?next=/profile/update&reason=auth");
  return (
    <div className="container-main py-10">
      <ProfileUpdateForm initialName={session.user.name} />
    </div>
  );
}
