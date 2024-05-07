import {Questionnaire} from '@/types/Questionnaire';
import { parseURL } from "@/utils/parseURL";


export async function createQuestionnaire(questionnaire: Questionnaire) {
  console.log("parsed url:", parseURL('/Questionnaire'))
  try {
    const res = await fetch(parseURL('/Questionnaire'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionnaire)
    })

    const data = await res.json()

    console.log('Response:', data)

  } catch (error) {
    console.error(error)
  }

} 