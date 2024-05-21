"use client";
import Dashboard from "@/features/organizations/get_companies/components/Organizationget";
import React from "react";


const Page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <Dashboard id={params.id}/>
        </div>
    );
    
};

export default Page