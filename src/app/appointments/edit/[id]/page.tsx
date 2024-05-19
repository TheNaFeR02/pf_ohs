import AppointmentForm from "@/features/appointments/components/AppointmentForm";
import { getResource } from "@/server/getResource";
import { appointmentSchema } from "@/types/Appointment";

export default async function AppointmentsIdPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const Appointment = await getResource({
      id: params.id,
      resourceType: "Appointment",
      schema: appointmentSchema,
    });
    if (!Appointment) {
      return <div>Appointment not found.</div>;
    }

    return <AppointmentForm data={Appointment} id={params.id} />;
  } catch (error) {
    return <div>Error fetching Appointment.</div>;
  }
}
