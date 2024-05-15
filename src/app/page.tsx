import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Welcome!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Link className="p-4 bg-gray-100 rounded-md" href="/questionnaires">
          Questionnaires
        </Link>
        <Link className="p-4 bg-gray-100 rounded-md" href="/patient/">
          Patients
        </Link>
        <Link className="p-4 bg-gray-100 rounded-md" href="/medical_record">
          Medical Record
        </Link>
        </div>
    </div>
  );
}
