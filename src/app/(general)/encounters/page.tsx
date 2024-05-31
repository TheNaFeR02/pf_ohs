"use client";
import React, { useEffect, useState } from "react";
import { Bundle, bundleSchema } from "@/types/Bundle";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { executeBundle } from "@/server/executeBundle";
import { createResource } from "@/server/createResource";
import { getResource } from "@/server/getResource";
import { getResourceBundle } from "@/server/getResourceBundle";
import {
  QuestionnaireResponse,
  questionnaireResponseSchema,
} from "@/types/QuestionnaireResponse";
import EncountersTable from "@/features/encounters/EncountersTable";
const Page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const data: Bundle = {
    resourceType: "Bundle",
    type: "transaction",
    entry: [
      {
        fullUrl: "urn:uuid:patient-1",
        request: {
          method: "POST",
          url: "Patient",
        },
        resource: {
          resourceType: "Patient",
          identifier: [
            {
              system: "https://www.ministeriodeproteccionsocial.gov.co/",
              value: "200083451",
            },
          ],
          active: true,
          name: [
            {
              family: "Esponja",
              given: ["Bob"],
            },
          ],
          telecom: [
            {
              system: "phone",
              value: "3114002600",
            },
            {
              system: "email",
              value: "acunafer.02@gmail.com",
            },
          ],
          gender: "male",
          birthDate: "2024-05-15",
          address: [
            {
              text: "Calle 64 # 45 - 23",
              city: "Barranquilla",
              district: "Atlántico",
              country: "Colombia",
            },
          ],
          maritalStatus: {
            coding: [
              {
                code: "I",
                display: "Interlocutory",
              },
            ],
            text: "Interlocutory",
          },
          photo: [
            {
              contentType: "image/png",
              data: "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",
            },
          ],
          contact: [
            {
              name: {
                family: "Barbosa",
                given: ["Dayanna"],
              },
              telecom: [
                {
                  system: "phone",
                  value: "3004595355",
                },
                {
                  system: "email",
                  value: "dayannamin0903@gmail.com",
                },
              ],
              address: {
                text: "Calle 50 # 27 -48",
                city: "Barranquilla",
                district: "Atlántico",
                country: "170",
              },
              gender: "female",
            },
          ],
        },
      },
      {
        fullUrl: "urn:uuid:encounter-1",
        request: {
          method: "POST",
          url: "Encounter",
        },
        resource: {
          resourceType: "Encounter",
          status: "in-progress",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "IMP",
            display: "inpatient encounter",
          },
          subject: {
            reference: "urn:uuid:patient-1",
          },
        },
      },
    ],
  };

  const questionnaireR: QuestionnaireResponse = {
    resourceType: "QuestionnaireResponse",
    encounter: {
      reference: "Encounter/81fde32a-1a27-4d94-b401-22945402144e",
    },
    status: "completed",
    authored: "2024-04-26T14:30:00Z",
    item: [
      {
        linkId: "1",
        answer: [
          {
            valueCoding: {
              code: "CC",
              display: "Cédula de ciudadanía",
            },
          },
        ],
      },
      {
        linkId: "2",
        answer: [
          {
            valueInteger: 123456789,
          },
        ],
      },
      {
        linkId: "3",
        answer: [
          {
            valueString: "John Doe",
          },
        ],
      },
    ],
  };

  const submitMedicalRecord = () => {
    try {
      const response = createResource<QuestionnaireResponse>({
        data: questionnaireR,
        schema: questionnaireResponseSchema,
        access_token: session?.user?.access_token,
      });
      console.log("Data sent");
      console.log("Response: ", response);
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  const [response, setResponse] = useState<any>();

  const onSubmit = () => {
    try {
      const response = executeBundle<Bundle>({
        data: data,
        schema: bundleSchema,
        access_token: session?.user?.access_token,
      });
      setResponse(response);
      console.log("Data sent");
      console.log("Response: ", response);
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  const [questionnaireResponse, setQuestionnaireResponse] = useState<any>();

  return (
    <div>
      <Button onClick={onSubmit}>Submit</Button>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      <div>
        <h3>Medical Record:</h3>
      </div>
      <Button onClick={submitMedicalRecord}>Submit Medical Record</Button>
      Get QuestionnaireResponse
      {questionnaireResponse && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(questionnaireResponse, null, 2)}</pre>
        </div>
      )}
      <Button
        onClick={() => {
          try {
            const response = getResourceBundle({
              resourceType: "QuestionnaireResponse",
              access_token: session?.user?.access_token,
              query: "encounter=81fde32a-1a27-4d94-b401-22945402144e",
            });
            console.log("Response: ", response);
            setQuestionnaireResponse(response);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        }}
      >
        Get QuestionnaireResponse
      </Button>

      <EncountersTable />
    </div>
  );
};

export default Page;
