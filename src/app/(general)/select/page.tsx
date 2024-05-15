"use client"
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// enum GenderEnum {
//   female = "female",
//   male = "male",
//   other = "other",
// }

// type IFormInput = {
//   gender: GenderEnum
// }

type IFormInput = {
  item: [{
    answer: [
      {
        valueCoding: {
          code: string
          display: string
        }
      }
    ]
  }]
}

export default function SelectPage(): ReactElement {
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    console.log(values)
  } 

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Choose Gender</label>
        <select {...register("item.0.answer.0.valueCoding.code")} onChange={e => console.log(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}