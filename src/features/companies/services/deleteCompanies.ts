import { parseURL } from "@/utils/parseURL";

export async function deleteOrganizationById(id: string): Promise<void> {
  try {
    const res = await fetch(parseURL(`/Organization/${id}`), {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error('Failed to delete Organization.');
      throw new Error('Failed to delete Organization.');
    }

    console.log('Organization deleted successfully.');
  } catch (error) {
    console.error('Error deleting Organization: ', error);
    throw error;
  }
}
