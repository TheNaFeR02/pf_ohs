interface CodeSystem {
  resourceType: string;
  url: string;
  version: string;
  name: string;
  title: string;
  status: string;
  content: string;
  count: number;
  filter: string;
  concept: Concept[];
}

interface Concept {
  code: string;
  display: string;
  definition: string;
  designation: Designation[];
}

interface Designation {
  language: string;
  value: string;
}

export async function getSubjectTypes(): Promise<CodeSystem | undefined> {
  try {
    const res = await fetch(
      "https://fhir-ru.github.io/codesystem-publication-status.json",
      {
        method: "GET",
      }
    );

    const data:CodeSystem = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }

  return undefined;
}
