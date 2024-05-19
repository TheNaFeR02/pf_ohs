"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useMemo } from "react";

const ITEMS_TO_DISPLAY = 3;

export default function DinamicBreadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract the items from the URL
  const items = useMemo(() => {
    const parts = pathname.split("/").filter((part) => part !== "");
    return parts.map((part, index) => ({
      label: part,
      href: `/${parts.slice(0, index + 1).join("/")}`,
    }));
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {/* <BreadcrumbLink> */}
            <Link href="/">Home</Link>
          {/* </BreadcrumbLink> */}
        </BreadcrumbItem>
        {items.map((item, index) => {
          if (index < items.length - ITEMS_TO_DISPLAY) {
            return null;
          }
          return (
            <React.Fragment key={item.label}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* <BreadcrumbLink> */}
                  <Link href={item.href}>{item.label}</Link>
                {/* </BreadcrumbLink> */}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
