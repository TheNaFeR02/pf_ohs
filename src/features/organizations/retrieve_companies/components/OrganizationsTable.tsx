"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getResourceBundle } from "@/server/getResourceBundle";
import OrganizationsColumns from "@/features/organizations/retrieve_companies/components/OrganizationsColumns";
import { BundleEntry } from "@/types/Bundle";
import { Organization } from "@/types/Organization";
import { DataTable } from "@/components/DataTable/DataTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function OrganizationsTable() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const [entryData, setEntryData] = useState<BundleEntry<Organization>[]>([]);

  const tableHeader = {
    title: "Organizations",
    description: "Manage your organizations and view their details.",
  };

  const addButton = {
    href: "/organizations/create",
    label: "Create Organization",
  };

  const columns = useMemo(
    () =>
      OrganizationsColumns({
        data: entryData,
        setData: setEntryData,
        tableTitle: tableHeader.title,
      }),
    [entryData, tableHeader.title]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getResourceBundle({
          resourceType: "Organization",
          access_token: session?.user?.access_token,
        });
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };
    fetchData();
  }, [session?.user?.access_token]);

  return (
    <DataTable
      columns={columns}
      data={entryData}
      tableHeader={tableHeader}
      addButton={addButton}
    />
  );
}

export default OrganizationsTable;
