
import { columns } from "@/features/companies/retrieve_companies/components/columns"
import { DataTable } from "@/features/companies/retrieve_companies/components/data-table"
import { getOrganization } from "@/features/companies/services/getCompanies"
import { Organization } from "@/features/companies/types/organization"

export default async function DemoPage() {
    const data = await getOrganization()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
