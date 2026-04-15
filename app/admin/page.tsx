import type { Metadata } from "next";
import { AdminConsole } from "@/components/admin-console";
import { getAdminDeskSnapshot } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Mesa Editorial",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const desk = await getAdminDeskSnapshot();

  return (
    <AdminConsole
      initialDirectives={desk.directives}
      systemState={desk.systemState}
    />
  );
}
