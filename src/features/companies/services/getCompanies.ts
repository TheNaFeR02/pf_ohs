import { parseURL } from "@/utils/parseURL";
import { Organization, OrganizationSchema} from "@/features/companies/types/organization";
import { jsonverify } from "@/features/companies/types/jsonverify";

export async function getOrganization(): Promise<Organization[]> {
  console.log("Fetching Organization details...");
  try {
    const res = await fetch(parseURL("/Organization"), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch Organization details.');
      throw new Error('Failed to fetch Organization details.');
    }

    const organizationDetails = await res.json(); // response gives the Organization details.
    const organizationEntries = organizationDetails["entry"];
    // console.log("Organization details: ", organizationEntries);
    let resources: Organization[] = [];

    try {
      organizationEntries.forEach(({ resource }: { resource: jsonverify }) => {
        if (resource) { // Verificar si resource está definido
          // console.log("Resource: ", resource);
          resources.push(OrganizationSchema.parse(resource));
          // console.log(resources);
        }
      });

      console.log("Organization type correctly parsed. \n Organization details", resources);
      return resources;
    } catch (error) {
      console.error("Error parsing Organization details: ", error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Organization details: ", error);
    throw error;
  }
}

