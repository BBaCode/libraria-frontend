"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { usePathname } from "next/navigation";
import BookSearch from "./bookSearch";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const isActive = (href: string) => {
    return usePathname() === href;
  };

  const menuItems = ["Library", "Books", "Friends"];

  return (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <a href="/" className="font-bold text-inherit">
            LIBRARIA
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color={isActive("/library") ? "primary" : "foreground"}
            href="/library"
          >
            Library
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={isActive("/books") ? "primary" : "foreground"}
            href="/books"
          >
            Books
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={isActive("/friends") ? "primary" : "foreground"}
            href="/friends"
          >
            Friends
          </Link>
        </NavbarItem>
        <NavbarItem>
          <BookSearch></BookSearch>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!user ? (
          <>
            <NavbarItem className="lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  name={user.displayName[0]}
                  as="button"
                  className="transition-transform"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
