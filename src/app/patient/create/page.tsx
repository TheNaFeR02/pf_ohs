import PatientForm from "@/features/medical_record/PatientForm";
import { questionnaireResponseSchema } from "@/features/medical_record/types/QuestionnaireResponse";
import { FC, ReactElement } from "react";
import formData from "@/features/medical_record/questionnaireEx.json"; // for now instead of fetching from the server
import { questionnarieSchema } from "@/features/medical_record/types/Questionnarie";
import ResponseForm from "@/features/medical_record/ResponseForm";
import { generateQResponseFromQuestionnaire } from "@/features/medical_record/utils/generateQResponseFromQuestionnaire";

const CreatePatientPage: FC = (): ReactElement => {
  const result = questionnarieSchema.safeParse(formData);
  if (result.success) {
    console.log(result.data);
    console.log("✅ Form data is valid");
    const defaultResponseValues = generateQResponseFromQuestionnaire(result.data);
    return <ResponseForm questionnaire={result.data} defaultQuestionnaireResponse={defaultResponseValues}/>;
  } else {
    console.error(result.error);
    console.error("❌ Form data is invalid");
  }

  return (
    <div>
      <PatientForm />
    </div>
  );
}

export default CreatePatientPage;