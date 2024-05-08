import { parseURL } from "@/utils/parseURL";
import { Organization, OrganizationSchema } from "@/features/companies/types/organization";

export async function updateOrganization(id: string, organizationData: Organization): Promise<Organization> {
  try {
    const res = await fetch(parseURL(`/Organization/${id}`), {
      method: 'PUT', // Cambiar el método HTTP a "PUT"
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organizationData) // Incluir los datos de la organización en el cuerpo de la solicitud
    });

    if (!res.ok) {
      console.error('Failed to update Organization.');
      throw new Error('Failed to update Organization.');
    }
  
    const updatedOrganization = await res.json(); // La respuesta contiene los detalles actualizados de la organización
    const organization: Organization = OrganizationSchema.parse(updatedOrganization);
    return organization;
  } catch (error) {
    console.error("Error updating Organization: ", error);
    throw error;
  }
}
