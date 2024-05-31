"use client";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  router.push("/encounters");
};

export default page;
