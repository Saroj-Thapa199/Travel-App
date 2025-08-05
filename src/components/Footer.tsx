import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="mx-auto px-4 py-12 sm:px-8 md:px-14 lg:px-20 xl:container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-xl font-bold"
            >
              <Globe className="text-primary h-6 w-6" />
              <span>Nepal Travel</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Discover Nepal's hidden natural retreats and plan your perfect
              getaway to reconnect with nature.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20 h-8 w-8 rounded-full"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20 h-8 w-8 rounded-full"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20 h-8 w-8 rounded-full"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 text-primary hover:bg-primary/20 h-8 w-8 rounded-full"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-tips"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/add-destination"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Add Destination
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">User Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/trips"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  My Trips
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=saved"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Saved Places
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=reviews"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  My Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/profile?tab=settings"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact & Newsletter</h3>
            <ul className="mb-4 space-y-2">
              <li className="text-muted-foreground flex items-center gap-2">
                <MapPin className="text-primary h-4 w-4" />
                <span>Thamel, Kathmandu, Nepal</span>
              </li>
              <li className="text-muted-foreground flex items-center gap-2">
                <Phone className="text-primary h-4 w-4" />
                <span>+977 1 4123456</span>
              </li>
              <li className="text-muted-foreground flex items-center gap-2">
                <Mail className="text-primary h-4 w-4" />
                <span>info@nepaltravel.com</span>
              </li>
            </ul>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="bg-background" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-muted-foreground mb-4 text-sm md:mb-0">
            © {new Date().getFullYear()} Nepal Travel. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
