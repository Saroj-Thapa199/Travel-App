import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="scroll-smooth">
        <Navbar />
        {children}
        <Footer />
      </div>
    </SessionProvider>
  );
}
