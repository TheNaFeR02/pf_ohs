"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getResourceBundle } from "@/server/getResourceBundle";
import OrganizationsColumns from "@/features/organizations/retrieve_companies/components/OrganizationsColumns";
import { BundleEntry } from "@/types/Bundle";
import { Organization } from "@/types/Organization";
import { DataTable } from "@/components/DataTable/DataTable";

function OrganizationsTable() {
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
        const res = await getResourceBundle({ resourceType: "Organization" });
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };
    fetchData();
  }, []);

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
