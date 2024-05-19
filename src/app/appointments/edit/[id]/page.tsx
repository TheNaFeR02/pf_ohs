import AppointmentForm from "@/features/appointments/components/AppointmentForm";
import getAppointment from "@/features/appointments/server/getAppointment";

export default async function AppointmentsIdPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const Appointment = await getAppointment(params.id);

    return <AppointmentForm data={Appointment} id={params.id} />;
  } catch (error) {
    return <div>Error fetching Appointment.</div>;
  }
}
