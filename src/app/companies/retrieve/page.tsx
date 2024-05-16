"use client";
import DemoPage from "@/features/companies/retrieve_companies/components/table";
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const Page = () => {
    return (
        <div>
            <QueryClientProvider client={new QueryClient()}>
                <DemoPage />
            </QueryClientProvider>
        </div>
    );
};

export default Page