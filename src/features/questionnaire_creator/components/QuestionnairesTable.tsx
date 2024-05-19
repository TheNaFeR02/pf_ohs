"use client";
import React, { useEffect, useState, useMemo } from "react";
import QuestionnairesColumns from "@/features/questionnaire_creator/components/QuestionnairesColumns";
import { BundleEntry } from "@/types/Bundle";
import { Questionnaire } from "@/types/Questionnaire";
import { DataTable } from "@/components/DataTable/DataTable";
import Concept from "@/types/Concept";
import { statusObj } from "@/constants/statusCodeDisplay";
import { getResourceBundle } from "@/server/getResourceBundle";

function QuestionnairesTable() {
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
    [entryData]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getResourceBundle({ resourceType: "Questionnaire" });
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
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
      filters={filters}
    />
  );
}

export default QuestionnairesTable;
