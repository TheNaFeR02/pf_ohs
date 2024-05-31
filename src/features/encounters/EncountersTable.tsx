"use client";
import React, { useEffect, useState, useMemo } from "react";
import EncountersColumns from "@/features/encounters/EncountersColumns";
import { BundleEntry } from "@/types/Bundle";
import { Encounter } from "@/types/Encounter";
import { DataTable } from "@/components/DataTable/DataTable";
import Concept from "@/types/Concept";
import { encounterStatusObj } from "@/constants/encounterStatusCodeDisplay";
import { getResourceBundle } from "@/server/getResourceBundle";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function EncountersTable() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const [entryData, setEntryData] = useState<BundleEntry<Encounter>[]>([]);

  const tableHeader = {
    title: "Encounters",
    description: "Manage your encounters and view their details.",
  };

  const addButton = {
    href: "/encounters/create",
    label: "Create Encounter",
  };

  const filters: {
    columnId: string;
    options: Concept[];
  }[] = [
    {
      columnId: "status",
      options: encounterStatusObj,
    },
  ];

  const columns = useMemo(
    () =>
      EncountersColumns({
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
          resourceType: "Encounter",
          access_token: session?.user?.access_token,
        });
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching encounters:", error);
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
      filters={filters}
    />
  );
}

export default EncountersTable;
