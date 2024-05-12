import PatientForm from "@/features/patients/PatientForm";


export default function PatientCreatePage() {
    return <PatientForm />
    return (

        <div className="w-full">

            <div className="border-b border-stroke px-6.5">
                <h3 className="font-medium">
                    Creación de Paciente
                </h3>
            </div>

            <div className="rounded-2xl border shadow-default bg-white mt-4">
                <div className="flex pr-2 pl-5 pt-5">
                    <PatientForm />
                </div>
            </div>
        </div>


    )
}