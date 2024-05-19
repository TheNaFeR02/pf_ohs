import { parseURL } from "@/utils/parseURL";

export async function deleteAppointment(id: string) {
  try {
    const res = await fetch(parseURL("/Appointment/" + id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log("Response:", data);
  } catch (error) {
    console.error(error);
  }
}
