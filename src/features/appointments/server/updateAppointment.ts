import { parseURL } from "@/utils/parseURL";
import { Appointment } from "@/types/Appointment";

interface updateAppointmentProps {
  id: string;
  data: Appointment;
}

export async function uptateAppointment({ id, data }: updateAppointmentProps) {
  console.log("Updating appointment:", data);
  try {
    const res = await fetch(parseURL("/Appointment/" + id), {
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
