"use client"
import { useCallback, useMemo, useEffect, useState } from 'react';
import { DataTable } from '@/features/companies/retrieve_companies/components/data-table';
import { columns } from '@/features/companies/retrieve_companies/components/columns';
import { getOrganization } from '@/features/companies/services/getCompanies';
import { Organization } from '@/features/companies/types/organization';
import { deleteOrganizationById } from '@/features/companies/services/deleteCompanies';
import { useQueryClient, useMutation, InvalidateQueryFilters } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { FormOrganizationupdate } from '@/features/companies/update_companies/components/formDone';
import router from 'next/router';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { Delete } from 'lucide-react';


export default function DemoPage() {
    const [data, setData] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const organizationData = await getOrganization();
                setData(organizationData); // Actualiza el estado local con los nuevos datos
                setLoading(false);
            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        };
        fetchData();
    }, [queryClient]); // Asegúrate de que useEffect se ejecute nuevamente cuando cambie queryClient
    

    const deleteMutation = useMutation({
        mutationFn: deleteOrganizationById,
        onSuccess: async () => {
            toast({ description: 'Organization deleted successfully' });
            await queryClient.invalidateQueries({});
        },
        onError: () => {
            toast({ description: 'Failed to delete Organization.', variant: 'destructive' });
        },
    });
    

    const onDelete = useCallback(async (organization: Organization) => {
        try {
            await deleteMutation.mutateAsync(organization.id || '');
            setData(prevData => prevData.filter(item => item.id !== organization.id));
        } catch (error) {
            console.error('Error deleting organization:', error);
        }
        
    }, []);
    const onEdit = useCallback((organization: Organization) => {
        // Assuming FormOrganizationupdate is a component that takes props

    }, []);
    const column = useMemo(() => columns({ onEdit, onDelete }), [onEdit, onDelete]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div className="container mx-auto py-10">
            <div className="mb-5 text-right" >
                <Button className='bg-blue-500 hover:bg-blue-700'>
                    <Link href="/companies/create">Añadir organización</Link>
                </Button>
            </div>
            <DataTable data={data} columns={column}  />
        </div>
    );
}
