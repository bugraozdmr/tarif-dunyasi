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

import {
  ChefHat,
  ChevronDownIcon,
  LockIcon,
  ScaleIcon,
  SearchIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

import { UserButton } from "./navbar/user-button";

export default function NavbarC() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const router = useRouter();

  const path = usePathname();

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
                  Features
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
              <DropdownItem
                key="autoscaling"
                description="Açıklama yazılcak"
                startContent={
                  <ScaleIcon
                    className="text-warning"
                    fill="currentColor"
                    size={30}
                  />
                }
              >
                Autoscaling
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                startContent={
                  <LockIcon
                    className="text-success"
                    fill="currentColor"
                    size={30}
                  />
                }
              >
                Usage Metrics
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
                startContent={
                  <LockIcon
                    className="text-success"
                    fill="currentColor"
                    size={30}
                  />
                }
              >
                Production Ready
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
                startContent={
                  <LockIcon
                    className="text-success"
                    fill="currentColor"
                    size={30}
                  />
                }
              >
                +99% Uptime
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
                startContent={
                  <LockIcon
                    className="text-success"
                    fill="currentColor"
                    size={30}
                  />
                }
              >
                +Supreme Support
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavbarItem isActive={path === "/iletisim" ? true : false}>
            <Link href="/iletisim" aria-current="page">
              İletişim
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
          placeholder="Type to search..."
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
