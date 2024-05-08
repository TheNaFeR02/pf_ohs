"use client";
import FormOrganizationupdate from "@/features/companies/update_companies/components/formDone";
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const Page = () => {
    return (
        <div>
                <FormOrganizationupdate id={"5"}/>
        </div>
    );
};

export default Page