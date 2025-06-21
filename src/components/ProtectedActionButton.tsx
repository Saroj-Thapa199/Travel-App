"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button, ButtonProps } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ProtectedActionButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ProtectedActionButton = ({
  children,
  className,
  onClick,
  ...props
}: ProtectedActionButtonProps) => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <Button onClick={onClick} {...props} className={className}>
        {children}
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props} className={className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Required!</DialogTitle>
          <DialogDescription>
            You need to be signed in to perform this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button asChild>
            <Link href={"/login"}>Go to SignIn</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProtectedActionButton;
