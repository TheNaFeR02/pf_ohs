import React from "react";
import QuestionnairesTable from "@/features/questionnaire_creator/components/QuestionnairesTable";

const page = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Questionnaires</h1>
      <QuestionnairesTable />
    </div>
  );
};

export default page;