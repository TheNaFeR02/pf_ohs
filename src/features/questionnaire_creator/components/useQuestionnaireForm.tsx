import QuestionnaireFormValues from "./QuestionnaireFormValues";
import { useForm } from "react-hook-form";

function useQuestionnaireForm() {
  const methods = useForm<QuestionnaireFormValues>({
    defaultValues: {
      resourceType: "Questionnaire",
      title: "",
      url: "",
      status: "",
      subjectType: [],
      date: new Date(),
      item: [],
    },
  });

  const handleSubmit = (values: QuestionnaireFormValues) => {
    console.log("Datos del formulario", values);
    // Mostrar en formato JSON los datos del formulario
    console.log(JSON.stringify(values));
  };

  return { handleSubmit: methods.handleSubmit(handleSubmit), methods };
}

export default useQuestionnaireForm;