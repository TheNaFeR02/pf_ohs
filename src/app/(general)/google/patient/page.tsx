import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function getGooglePatient(access_token: string) {
  console.log("google access token:", access_token);

  const res = await fetch(
    "https://healthcare.googleapis.com/v1/projects/pf-ohs/locations/northamerica-northeast1/datasets/pf-ohs-test/fhirStores/pf-ohs-datastore/fhir/Patient/49f8cc87-33da-4733-8e1d-a7f2b2b0b9b3",
    {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  console.log("google patient response:", res);
  return await res.json();
}

async function createGooglePatient(access_token: string) {
  console.log(access_token);
  const body = `
    {
  "resourceType": "Patient",
  "active": true,
  "name": [{
    "family": "Janna",
    "given": ["Shalem"]
  }],
  "telecom": [
    {
      "system": "phone",
      "value": "3014072140"
    },
    {
      "system": "email",
      "value": "shalem.janna@outlook.com"
    }
  ],
  "gender": "male",
  "birthDate": "2001-07-11",
  "address": [{
    "text": "Calle 79b # 42 -322",
    "city": "Barranquilla",
    "district": "Atlántico",
    "country": "170"
  }],
  "maritalStatus": {
    "text": "soltero"
  },
  "photo": [
    {
      "contentType": "image/gif",
      "data": "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"
    }
  ],
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
              "code": "EP"
            }
          ]
        }
      ],
      "name": {
        "family": "Barbosa",
        "given": ["Dayanna"]
      },
      "telecom": [
        {
          "system": "phone",
          "value": "3004595355"
        },
        {
          "system": "email",
          "value": "dayannamin0903@gmail.com"
        }
      ],
      "address": {
        "text": "Calle 50 # 27 -48",
        "city": "Barranquilla",
        "district": "Atlántico",
        "country": "170"
      },
      "gender": "female"
    }
  ]
}
    `;
  const cloudRegion = "northamerica-northeast1";
  const projectId = "pf-ohs";
  const datasetId = "pf-ohs-test";
  const fhirStoreId = "pf-ohs-datastore";
  const resourceType = "Patient";
  const res = await fetch(
    `https://healthcare.googleapis.com/v1/projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}/fhir/Patient`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/fhir+json;charset=utf-8",
      },
      body: body,
    }
  );

  const result = await res.json();
  console.log(result);
  if (result.issue) {
    result.issue.forEach((issue: any, index: number) => {
      console.log(`Issue #${index + 1}:`);
      console.log(`Code: ${issue.code}`);
      console.log(`Details: ${JSON.stringify(issue.details, null, 2)}`);
      console.log(`Diagnostics: ${issue.diagnostics}`);
      console.log(`Severity: ${issue.severity}`);
      if (issue.expression) {
        console.log(`Expression: ${JSON.stringify(issue.expression, null, 2)}`);
      }
      console.log("\n");
    });
  }
}

export default async function GoogleFHIRPatientPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  if (!session.user?.access_token) {
    return <div>Missing access token</div>;
  }
  
  const patient = await getGooglePatient(session.user.access_token);
  // const patient = await createGooglePatient(session.user.access_token)

  return (
    <div>
      <h1>Google FHIR Patient Page</h1>
      <pre>{JSON.stringify(patient, null, 2)}</pre>
    </div>
  );
}
