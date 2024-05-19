"use client";
import React, { useEffect, useState, useMemo } from "react";
import AppointmentsColumns from "@/features/appointments/components/AppointmentsColumns";
import { BundleEntry } from "@/types/Bundle";
import { Appointment } from "@/types/Appointment";
import { DataTable } from "@/components/DataTable/DataTable";
import Concept from "@/types/Concept";
import { appointmentStatusObj } from "@/constants/appointmentStatusCodeDisplay";
import { getResourceBundle } from "@/server/getResourceBundle";

function AppointmentsTable() {
  const [entryData, setEntryData] = useState<BundleEntry<Appointment>[]>([]);

  const tableHeader = {
    title: "Appointments",
    description: "Manage your appointments and view their details.",
  };

  const addButton = {
    href: "/appointments/create",
    label: "Create Appointment",
  };

  const filters: {
    columnId: string;
    options: Concept[];
  }[] = [
    {
      columnId: "status",
      options: appointmentStatusObj,
    },
  ];

  const columns = useMemo(
    () =>
      AppointmentsColumns({
        data: entryData,
        setData: setEntryData,
        tableTitle: tableHeader.title,
      }),
    [entryData]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getResourceBundle({ resourceType: "Questionnaire" })
        setEntryData(res.entry || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
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

export default AppointmentsTable;
