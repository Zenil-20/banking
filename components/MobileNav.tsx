'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"; // Ensure this path is correct
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants'; // Ensure this is set up correctly
import { cn } from '@/lib/utils'; // Ensure this utility is correctly implemented

interface MobileNavProps {
  user: {
    firstName: string;
    lastName: string;
  };
}

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] bg-white p-4">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-4">
            <Link href="/" className="flex items-center gap-2 px-4 mb-4">
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon logo"
              />
              <h1 className="text-lg font-bold text-black">Horizon</h1>
            </Link>

            <div className="mobilenav-links">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(item.route);
                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      className={cn('mobilenav-sheet_close w-full', {
                        'bg-bank-gradient': isActive,
                      })}
                    >
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={20}
                        height={20}
                        className={cn('brightness-[0.8] invert-0', {
                          'invert': isActive,
                        })}
                      />
                      <p className={cn("text-16 font-semibold text-black-2", { "text-white": isActive })}>
                        {item.label}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </nav>

          <div className="mt-4">
            USER
          </div>
          <div className="mt-4">
            FOOTER
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
