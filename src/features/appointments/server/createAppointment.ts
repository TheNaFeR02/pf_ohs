import { Appointment } from "@/types/Appointment";
import { parseURL } from "@/utils/parseURL";

export async function createAppointment(appointment: Appointment) {
  console.log("parsed url:", parseURL("/Appointment"));
  try {
    const res = await fetch(parseURL("/Appointment"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    const data = await res.json();

    console.log("Response:", data);
  } catch (error) {
    console.error(error);
  }
}
