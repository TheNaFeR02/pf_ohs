"use client";
import FormOrganizationupdate from "@/features/organizations/update_companies/components/formDone";
import React from "react";


const Page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <FormOrganizationupdate id={params.id}/>
        </div>
    );
    
};

export default Page