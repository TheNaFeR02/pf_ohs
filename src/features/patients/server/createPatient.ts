import { parseURL } from "@/utils/parseURL";
import {
  Patient,
} from "@/types/Patient";
export async function createPatient(patient: Patient) {
  console.log("parsed url:", parseURL("/Patient"));
  try {
    const res = await fetch(parseURL("/Patient"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });

    const data = await res.json();

    console.log("Response:", data);
  } catch (error) {
    console.error(error);
  }
}
