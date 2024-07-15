"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";

import { ChefHat, ChevronDownIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

import { UserButton } from "./navbar/user-button";
import { Categories } from "@/categoryData";
import { getIconComponent } from "@/lib/iconMap";

export default function NavbarC() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const router = useRouter();

  const path = usePathname();

  // CATEGORY DATA
  const categories = Categories;

  // CATEGORY COLORS -- NOT THE BEST BUT STILL WORKS
  const colors = [
    "text-indigo-500",
    "text-red-700",
    "text-yellow-500",
    "text-amber-800",
    "text-gray-700",
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <Link href="/">
          <NavbarBrand className="mr-4">
            <ChefHat className="mr-2" />
            <p className="hidden sm:block font-bold text-inherit">
              TARİF DÜNYASI
            </p>
          </NavbarBrand>
        </Link>
        <NavbarContent className="hidden sm:flex gap-3">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<ChevronDownIcon size={16} />}
                  radius="sm"
                  variant="light"
                >
                  Kategoriler
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {categories.map((category,index) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <DropdownItem
                    onClick={() => router.push(`/c/${category.slug}`)}
                    key={category.id}
                    description={category.description}
                    startContent={
                      IconComponent && (
                        <IconComponent
                          className={colors[index]}
                          fill="currentColor"
                          size={30}
                        />
                      )
                    }
                  >
                    {category.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>

          <NavbarItem isActive={path === "/dokumantasyon" ? true : false}>
            <Link href="/dokumantasyon" aria-current="page">
              Dökümantasyon
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Ne aramak istiyorsun ?.."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {/* User Button */}
        <UserButton />
      </NavbarContent>
    </Navbar>
  );
}
