"use client";
import React, { useEffect, useState, useMemo } from "react";
import QuestionnairesColumns from "@/features/questionnaire_creator/components/QuestionnairesColumns";
import { BundleEntry } from "@/types/Bundle";
import { Questionnaire } from "@/types/Questionnaire";
import { DataTable } from "@/components/DataTable/DataTable";
import Concept from "@/types/Concept";
import { statusObj } from "@/constants/statusCodeDisplay";
import { getResourceBundle } from "@/server/getResourceBundle";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function QuestionnairesTable() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const [entryData, setEntryData] = useState<BundleEntry<Questionnaire>[]>([]);

  const tableHeader = {
    title: "Questionnaires",
    description: "Manage your questionnaires and view their details.",
  };

  const addButton = {
    href: "/questionnaires/create",
    label: "Create Questionnaire",
  };

  const filters: {
    columnId: string;
    options: Concept[];
  }[] = [
    {
      columnId: "status",
      options: statusObj,
    },
  ];

  const columns = useMemo(
    () =>
      QuestionnairesColumns({
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
          resourceType: "Questionnaire",
          access_token: session?.user?.access_token,
        });
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
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

export default QuestionnairesTable;
