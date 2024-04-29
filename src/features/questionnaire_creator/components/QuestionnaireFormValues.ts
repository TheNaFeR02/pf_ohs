interface QuestionnaireFormValues {
  resourceType: string;
  title: string;
  url: string;
  status: string;
  subjectType: string[];
  date: Date;
  item: {
    linkId: string;
    text: string;
    type: string;
    answerOption: {
      id: string;
      valueCoding: {
        code: string;
        display: string;
      };
    }[];
  }[];
}

export default QuestionnaireFormValues;