"use client";
import FormOrganizationupdate from "@/features/companies/update_companies/components/formDone";
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from "next/router";


const Page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <FormOrganizationupdate id={params.id}/>
        </div>
    );
};

export default Page