import { parseURL } from "@/utils/parseURL";
import { Questionnaire } from "../../../types/Questionnaire";

interface updateQuestionnaireProps {
  id: string;
  data: Questionnaire
}

export async function uptateQuestionnaire({ id, data }: updateQuestionnaireProps) {
  console.log("Updating questionnaire:", data);
  try {
    const res = await fetch(parseURL("/Questionnaire/" + id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    console.log("Response:", response);
  } catch (error) {
    console.error(error);
  }
}
