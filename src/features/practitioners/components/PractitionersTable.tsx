"use client";
import React, { useEffect, useState, useMemo } from "react";
import PractitionersColumns from "@/features/practitioners/components/PractitionersColumns";
import { BundleEntry } from "@/types/Bundle";
import { Practitioner } from "@/types/Practitioner";
import { DataTable } from "@/components/DataTable/DataTable";
import Concept from "@/types/Concept";
import { getResourceBundle } from "@/server/getResourceBundle";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function PractitionersTable() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const [entryData, setEntryData] = useState<BundleEntry<Practitioner>[]>([]);

  const tableHeader = {
    title: "Practitioners",
    description: "Manage your practitioners and view their details.",
  };

  const addButton = {
    href: "/practitioners/create",
    label: "Create Practitioner",
  };

  const filters: {
    columnId: string;
    options: Concept[];
  }[] = [
    {
      columnId: "active",
      options: [
        { code: "true", display: "true" },
        { code: "false", display: "false" },
      ],
    },
  ];

  const columns = useMemo(
    () =>
      PractitionersColumns({
        data: entryData,
        setData: setEntryData,
        tableTitle: tableHeader.title,
      }),
    [entryData, tableHeader.title]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getResourceBundle({
          resourceType: "Practitioner",
          access_token: session?.user?.access_token,
        });
        setEntryData(res.entry ?? []);
      } catch (error) {
        console.error("Error fetching practitioners:", error);
      }
    }
    fetchData();
  }, [session?.user?.access_token]);

  return (
    <DataTable
      columns={columns}
      data={entryData}
      tableHeader={tableHeader}
      addButton={addButton}
      filters={filters}
    />
  );
}

export default PractitionersTable;
