import React from "react";
import QuestionnaireResponsesTable from "@/features/medical_record/QuestionnaireResponseTable";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <QuestionnaireResponsesTable encounterID={params.id} />
    </div>
  );
};

export default Page;
