import React from "react";
// import QuestionnaireForm from "@/features/questionnaire_creator/old/QuestionnaireForm";
import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";
import ItemsForm from "@/features/questionnaire_creator/components/ItemsForm";
import { Item } from "@radix-ui/react-select";

export default function Home() {
  return (
    <div>
      {/* <ItemsForm /> */}
      <QuestionnaireForm />
    </div>
  );
}
