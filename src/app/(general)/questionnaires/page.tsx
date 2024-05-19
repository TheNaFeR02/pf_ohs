import React from "react";
import QuestionnairesTable from "@/features/questionnaire_creator/components/QuestionnairesTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Questionnaires</h1>
      {/* Create new questionnaire button */}
      <div className="flex justify-center mt-4">
        <Link href="/questionnaires/create">
          <Button>Create New Questionnaire</Button>
        </Link>
      </div>

      <QuestionnairesTable />
    </div>
  );
};

export default page;
