"use client";
import FormOrganizationupdate from "@/features/companies/update_companies/components/formDone";
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from "next/router";


const Page = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
                
                <FormOrganizationupdate id={"5"}/>
        </div>
    );
};

export default Page