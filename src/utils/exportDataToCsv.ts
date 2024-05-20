import React from "react";
import flattenObject from "./flattenObject";
import { generateCsv, download, mkConfig } from "export-to-csv";

interface ExportDataToCsvProps {
  data: any[];
  resourceType: string;
}
const exportDataToCsv = ({ data, resourceType }: ExportDataToCsvProps) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: `${resourceType}-${new Date().toISOString()}`,
  });

  const flatData = data.map((d) => flattenObject(d));
  const csv = generateCsv(csvConfig)(flatData);
  download(csvConfig)(csv);
};

export default exportDataToCsv;
