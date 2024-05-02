import { zodResolver } from "@hookform/resolvers/zod";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { questionnarieSchema } from "./types/Questionnarie";




const OccupationalInformationForm: FC = (): ReactElement => {

  
  return (
    <div>
      <h1>Testing</h1>
    </div>
  );
}

export default OccupationalInformationForm;