import PageHeader from "@/components/PageHeader";
import { ReactElement } from "react";

interface QuestionnaireFormLayoutProps {
  children: ReactElement;
}

export default function QuestionnaireFormLayout({
  children,
}: QuestionnaireFormLayoutProps): ReactElement {
  return (
    <div className="w-full">
      <div className="border-b border-stroke px-6.5">
        <h3 className="font-medium">Create a New Form</h3>
      </div>

      <div className="rounded-2xl border shadow-default bg-white mt-4">
        <div className="flex p-5">{children}</div>
      </div>
    </div>
  );
}