import React from "react";
import MedicalRecord from "@/features/medical_record/MedicalRecord";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <MedicalRecord />
    </div>
  );
};

export default Page;
