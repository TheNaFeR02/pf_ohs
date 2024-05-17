import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { items } from "@/constants/linkItems";


export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Welcome!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
            className="w-full h-56"
            size="lg"
            >{item.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
