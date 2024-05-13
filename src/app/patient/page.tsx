import nameUseCodeDisplay from "@/features/questionnaire_creator/constants/nameUseCodeDisplay"


export default function PatientPage() {

  // 1
  // const start1 = performance.now();
  // let nameUseList: string[] = []
  // nameUseCodeDisplay.forEach((nameUse) => {
  //   nameUseList.push(nameUse.code)
  // })
  // const end1 = performance.now();

  // console.log(`Tiempo de ejecución para JSON.stringify: ${end1 - start1} milisegundos.`);

  console.log(nameUseCodeDisplay.map((nameUse) => nameUse.code))
  


  // 2
  // const start2 = performance.now();
  // const nameUse = JSON.parse(JSON.stringify(nameUseCodeDisplay.map((nameUse) => nameUse.code)))
  // console.log(nameUse)
  // const end2 = performance.now();
  // console.log(`Tiempo de ejecución para console.log: ${end2 - start2} milisegundos.`);



  return <div>hola</div>
}