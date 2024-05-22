import AppointmentForm from "@/features/appointments/components/AppointmentForm";
import { getResource } from "@/server/getResource";
import { appointmentSchema } from "@/types/Appointment";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function AppointmentsIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  try {
    const Appointment = await getResource({
      id: params.id,
      resourceType: "Appointment",
      schema: appointmentSchema,
      access_token: session?.user?.access_token,
    });
    if (!Appointment) {
      return <div>Appointment not found.</div>;
    }

    return <AppointmentForm data={Appointment} id={params.id} />;
  } catch (error) {
    return <div>Error fetching Appointment.</div>;
  }
}
