'use client'
import React from "react";
import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";
import { getQuestionnaires } from "@/features/questionnaire_creator/server/getQuestionnaires";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <QuestionnaireForm />
      <Button type="button" onClick={getQuestionnaires}>
        Get Questionnaires
      </Button>
    </div>
  );
}
