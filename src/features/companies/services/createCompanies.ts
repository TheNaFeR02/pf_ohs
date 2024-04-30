import { Organization } from "../types/organization";
import { parseURL } from "@/utils/parseURL";


export async function createOrganization(organization: Organization){
    console.log("parsed url:", parseURL('/Organization'));
    try {
        const res = await fetch(parseURL('/Organization'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(organization)
        })
    
        const data = await res.json()
    
        console.log(data)
    
      } catch (error) {
        console.error(error)
      }
}