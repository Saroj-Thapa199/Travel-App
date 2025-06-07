import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Facebook, Globe, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { Input } from './ui/input'

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="xl:container mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-xl flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <span>Nepal Travel</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Discover Nepal's hidden natural retreats and plan your perfect getaway to reconnect with nature.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className="text-muted-foreground hover:text-primary transition-colors">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/add-destination" className="text-muted-foreground hover:text-primary transition-colors">
                  Add Destination
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">User Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/trips" className="text-muted-foreground hover:text-primary transition-colors">
                  My Trips
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=saved" className="text-muted-foreground hover:text-primary transition-colors">
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
            <h3 className="font-semibold mb-4">Contact & Newsletter</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Thamel, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+977 1 4123456</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@nepaltravel.com</span>
              </li>
            </ul>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="bg-background" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Nepal Travel. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer