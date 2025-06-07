"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { MessageSquare, Plus, PlusCircle } from "lucide-react";
import ProfileButton from "./ProfileButton";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import PublicMenubar from "./PublicMenubar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  console.log(session);

  const links = [
    { id: "home", label: "Home", href: "/" },
    { id: "destinations", label: "Destinations", href: "/#destinations" },
    { id: "reviews", label: "Reviews", href: "#", LogoIcon: MessageSquare },
    { id: "travel-tips", label: "Travel Tips", href: "#" },
    {
      id: "add-destination",
      label: "Add Destinations",
      href: "/#add-destination",
      LogoIcon: PlusCircle,
    },
  ];

  const [active, setActive] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/destinations") setActive("destinations");
  }, []);

  useEffect(() => {
    const index = links.findIndex((link) => link.id === active);
    const currentLink = linkRefs.current[index];
    if (currentLink) {
      setUnderlineStyle({
        left: currentLink.offsetLeft,
        width: currentLink.offsetWidth,
      });
    }
  }, [active]);

  return (
    <nav
      className={cn(
        "text-secondary dark:text-primary fixed top-0 right-0 left-0 z-100 text-sm transition-all duration-300",
        isScrolled || pathname !== "/"
          ? "text-slightly-muted bg-background/95 border-b py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex w-full items-center justify-between px-4 sm:px-8 xl:container">
        <div className="relative flex h-full gap-10">
          <span className="flex items-center">LOGO</span>
          <div className="hidden items-center justify-stretch gap-6 md:flex">
            {links.map(({ id, href, label, LogoIcon }, i) => (
              <Link
                key={id}
                href={href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                className={cn(
                  {
                    "text-primary":
                      (active === id && isScrolled) || `/${id}` === pathname,
                  },
                  "py-2 font-medium",
                )}
                onClick={(e) => {
                  // e.preventDefault();
                  setActive(id);
                }}
              >
                {LogoIcon ? (
                  <div className="flex items-center gap-1">
                    <LogoIcon className="size-4" /> <span>{label}</span>
                  </div>
                ) : (
                  label
                )}
              </Link>
            ))}
            <span
              className={cn(
                "absolute bottom-0 h-0.5 transition-all duration-300",
                isScrolled || (pathname !== "/" && !pathname.startsWith("/#"))
                  ? "bg-primary"
                  : "bg-secondary",
              )}
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!session?.user && (
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              className={
                !isScrolled
                  ? "bg-primary/10 text-primary-foreground border-primary/20 hover:bg-secondary/20 dark:hover:bg-primary/20 hover:text-primary"
                  : ""
              }
            >
              <Link href={"/login"}>Sign In</Link>
            </Button>
          )}
          <Button className="cursor-pointer rounded-sm">
            <Plus />
            <span>Plan a trip</span>
          </Button>
          {session?.user ? <ProfileButton /> : <PublicMenubar />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
