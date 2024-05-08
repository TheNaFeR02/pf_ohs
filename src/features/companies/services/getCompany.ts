import { parseURL } from "@/utils/parseURL";
import { Organization, OrganizationSchema } from "@/features/companies/types/organization";

export async function getOrganizationById(id: string): Promise<Organization> {
  try {
    const res = await fetch(parseURL(`/Organization/${id}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch Organization details.');
      throw new Error('Failed to fetch Organization details.');
    }
  
    const organizationDetails = await res.json(); // response gives the Organization details.
    const organization: Organization = OrganizationSchema.parse(organizationDetails);
    return organization;
  } catch (error) {
    console.error("Error fetching/parsing Organization details: ", error);
    throw error;
  }
}
