import QuestionnaireSelector from "@/features/medical_record/MedicalRecord";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <QuestionnaireSelector encounterID={params.id} />
    </div>
  );
};

export default Page;
