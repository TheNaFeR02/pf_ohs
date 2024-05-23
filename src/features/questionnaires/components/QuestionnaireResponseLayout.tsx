import { ReactElement } from "react";

export default function QuestionnaireResponseLayout({children}: {children: ReactElement }): ReactElement {
    return (
        <div className="w-full">

            <div className="border-b border-stroke px-6.5">
                <h3 className="font-medium">
                    Información del Paciente
                </h3>
            </div>

            <div className="rounded-2xl border shadow-default mt-4">
                <div className="flex pr-2 pl-5 pt-5">
                    {children}
                </div>
            </div>
        </div>
    )
}