import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSessionUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};

const requireRole = async (role) => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};

const RecruiterLayout = async ({ children }) => {
  await requireRole("recruiter");

  return <>{children}</>;
};

export default RecruiterLayout;