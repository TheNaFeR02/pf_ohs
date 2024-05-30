import { ReactElement } from "react";

export default function QuestionnaireResponseLayout({children}: {children: ReactElement }): ReactElement {
    return (
        <div className="w-1/2 mx-auto">

            <div className="border-b border-stroke px-6.5">
                <h3 className="font-medium">
                    Información del Paciente
                </h3>
            </div>

            <div className="rounded-2xl border shadow-default mt-4">
                <div className="flex justify-center p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}