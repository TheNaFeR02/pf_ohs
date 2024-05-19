import { parseURL } from "@/utils/parseURL";
import { Appointment, appointmentSchema } from "@/types/Appointment";
import { OperationOutcomeSchema } from "@/types/OperationOutcome";
import { FhirError } from "@/errors/FhirError";

async function getAppointment(id: string): Promise<Appointment> {
  try {
    const res = await fetch(parseURL("/Appointment/" + id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    const data: Appointment = await res.json();
    const appointment = appointmentSchema.safeParse(data);
    if (appointment.success) {
      console.log("Successful retrieve of Appointment", appointment.data);
      return data;
    }
    const fhirError = OperationOutcomeSchema.safeParse(data);
    if (fhirError.success) {
      console.log(
        console.error("Server responded with FHIR error: ", fhirError.data)
      );
      throw new FhirError("", fhirError.data);
    }

    throw new Error(
      "Unexpected server response during retrieve of Appointment."
    );
  } catch (error) {
    throw error;
  }
}

export default getAppointment;
