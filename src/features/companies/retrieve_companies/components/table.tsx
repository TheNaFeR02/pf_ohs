"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/features/companies/retrieve_companies/components/data-table";
import { columns } from "@/features/companies/retrieve_companies/components/columns";
import { getOrganization } from "@/features/companies/services/getCompanies";
import { Organization } from "@/features/companies/types/organization";
import { deleteOrganizationById } from "@/features/companies/services/deleteCompanies";
import { useToast } from "@/components/ui/use-toast";
import { FormOrganizationupdate } from "@/features/companies/update_companies/components/formDone";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const [data, setData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizationData = await getOrganization();
        setData(organizationData); // Actualiza el estado local con los nuevos datos
        setLoading(false);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };
    fetchData();
  }, []); // Asegúrate de que useEffect se ejecute nuevamente cuando cambie queryClient

function onDelete(organization: Organization) {
    try {
      toast({
        title: `Organización ${organization.id} eliminada`,
        description: "The organization has been deleted",
        variant: "destructive",
      });
      setData((prevData) =>
        prevData.filter((org) => org.id !== organization.id)
      );
    deleteOrganizationById(organization.id ?? "");
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast({
        title: `Error deleting organization ${organization.id}`,
        description: "An error occurred while deleting the organization",
        variant: "destructive",
      });
    }
  }

function onEdit(organization: Organization) {
    // Assuming FormOrganizationupdate is a component that takes props
    router.push(`/companies/update/${organization.id}`);
  }

  const column = columns({ onEdit, onDelete });
  

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5 text-right">
        <Button className="bg-blue-500 hover:bg-blue-700">
          <Link href="/companies/create">Añadir organización</Link>
        </Button>
      </div>
      <DataTable data={data} columns={column} />
    </div>
  );
}
