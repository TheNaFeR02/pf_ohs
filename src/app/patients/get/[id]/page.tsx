"use client";
import Dashboardpatient from "@/features/patients/components/PatientGet";
import React from "react";


const Page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <Dashboardpatient id={params.id}/>
        </div>
    );
    
};

export default Page