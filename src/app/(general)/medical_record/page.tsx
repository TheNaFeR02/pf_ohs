import QuestionnaireForm from "@/features/questionnaire_creator/components/QuestionnaireForm";
import { FC, ReactElement } from "react"


const MedicalRecordPage: FC = (): ReactElement => {
    // 
    return(
        // Create Tabs. + to Add new form for medical_record.
        <div>
            {/*  */}
            
            <QuestionnaireForm />
        </div>
    )
}

export default MedicalRecordPage;