import { parseURL } from "@/utils/parseURL";
import {
  Bundle,
  BundleEntry,
} from "@/features/questionnaire_creator/types/Bundle";

export async function getQuestionnaires(): Promise<Bundle> {
  console.log("parsed url:", parseURL("/Questionnaire"));
  try {
    const res = await fetch(parseURL("/Questionnaire"), {
      method: "GET",
    });
    const data: Bundle = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
