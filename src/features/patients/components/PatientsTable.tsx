"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getResourceBundle } from "@/server/getResourceBundle";
import PatientsColumns from "@/features/patients/components/PatientsColumns";
import { BundleEntry } from "@/types/Bundle";
import { Patient } from "@/types/Patient";
import { DataTable } from "@/components/DataTable/DataTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function PatientsTable() {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const [entryData, setEntryData] = useState<BundleEntry<Patient>[]>([]);

  const tableHeader = {
    title: "Patients",
    description: "Manage your patients and view their details.",
  };

  const addButton = {
    href: "/patients/create",
    label: "Create Patient",
  };

  const columns = useMemo(
    () =>
      PatientsColumns({
        data: entryData,
        setData: setEntryData,
        tableTitle: tableHeader.title,
      }),
    [entryData, tableHeader.title]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getResourceBundle({ resourceType: "Patient", access_token: session?.user?.access_token });
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching patients:", error);
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

export default PatientsTable;
