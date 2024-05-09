"use client";
import React, { useEffect, useState } from "react";
import { getQuestionnaires } from "@/features/questionnaire_creator/server/getQuestionnaires";
import QuestionnairesColumns from "@/features/questionnaire_creator/components/QuestionnairesColumns";
import {
  Bundle,
  BundleEntry,
} from "@/features/questionnaire_creator/types/Bundle";
import QuestionnaireDataTable from "@/features/questionnaire_creator/components/QuestionnairesDataTable";
import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";

export default function HomePage() {
  const [data, setData] = useState<Bundle>();
  const [entryData, setentryData] = useState<BundleEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getQuestionnaires();
        setData(result);
        setentryData(result.entry || []);
        console.log("result:", result.entry);

      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <QuestionnaireForm />
      {data?.total && <p>Total: {data.total}</p>}
      <QuestionnaireDataTable
        columns={QuestionnairesColumns}
        data={entryData}
      />
    </div>
  );
}
