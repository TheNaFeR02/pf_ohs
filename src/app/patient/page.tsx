import PatientsTable from "@/features/patients/components/PatientsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Patients</h1>
      <div className="flex justify-center mt-4">
        <Link href="/patient/create">
          <Button>Create New Patient</Button>
        </Link>
      </div>
      <PatientsTable />
    </div>
  );
};

export default page;
