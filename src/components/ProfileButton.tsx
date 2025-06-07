import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logOut from "@/app/(auth)/actions";
import { useTheme } from "next-themes";
import { Check, Monitor, Moon, Sun } from "lucide-react";

interface ProfileButtonProps {
  src?: string;
}

const ProfileButton = ({ src }: ProfileButtonProps) => {
  const { setTheme, themes, theme: currentTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {src ? (
            <>
              {" "}
              <AvatarImage src={src} alt="avatar" />
            </>
          ) : (
            <Image src={avatarPlaceholder} alt="avatar" />
          )}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="min-w-fit">
              {themes.map((theme, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setTheme(theme)}
                  className="capitalize"
                >
                  {theme === currentTheme ? (
                    <Check />
                  ) : theme === "light" ? (
                    <Sun />
                  ) : theme === "dark" ? (
                    <Moon />
                  ) : (
                    <Monitor />
                  )}
                  <DropdownMenuShortcut className="font-semibld text-primary ml-0">
                    {theme}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
