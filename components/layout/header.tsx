"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { BrandLogo } from "@/components/primitives/brand-logo";
import { siteConfig } from "@/config/site.config";

export function Header({ hasClients = false }: { hasClients?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();

  const links = siteConfig.navigation.filter(
    (link) => link.requires !== "clients" || hasClients,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`/#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-15% 0px -65% 0px",
      },
    );

    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Link
        href="/"
        className="logo-link"
        aria-label={`${siteConfig.brand.name} home`}
      >
        <BrandLogo />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links
          .filter((link) => !["/", "/#contact"].includes(link.href))
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                active === link.href ? "location" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
      </nav>

      <Link className="header-contact" href="/#contact">
        {siteConfig.cta.secondary}
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="mobile-menu-button icon-button"
            aria-label="Open navigation"
          >
            <Menu size={24} />
          </button>
        </DialogTrigger>

        <DialogContent
          className="mobile-menu"
          showCloseButton={false}
          onCloseAutoFocus={(event) => event.preventDefault()}
          style={{
            inset: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100vw",
            maxWidth: "none",
            height: "100dvh",
            transform: "none",
            translate: "none",
          }}
        >
          <div className="menu-top">
            <BrandLogo />

            <DialogClose asChild>
              <button
                className="icon-button"
                aria-label="Close navigation"
              >
                <X />
              </button>
            </DialogClose>
          </div>

          <DialogTitle className="sr-only">
            Navigation
          </DialogTitle>

          <DialogDescription className="sr-only">
            Explore the studio, work, services and contact.
          </DialogDescription>

          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span className="mono">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {link.label}

                <ArrowUpRight />
              </a>
            ))}
          </nav>

          <p className="menu-end">
            {siteConfig.brand.tagline}
          </p>
        </DialogContent>
      </Dialog>
    </header>
  );
}