import { FakePatient } from "@/app/example/types/fakePatient";
import { parseURL } from "@/utils/parseURL";

export async function createPatient(patient: FakePatient) {
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

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
