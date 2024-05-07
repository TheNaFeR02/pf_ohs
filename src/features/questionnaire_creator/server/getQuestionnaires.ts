import { parseURL } from "@/utils/parseURL";
import { Bundle } from "@/features/questionnaire_creator/types/Bundle";

export async function getQuestionnaires() {
  console.log("parsed url:", parseURL("/Questionnaire"));
  try {
    const res = await fetch(parseURL("/Questionnaire"), {
      method: "GET",
    });

    const data: Bundle = await res.json();

    console.log("Response:", data);
  } catch (error) {
    console.error(error);
  }
}
