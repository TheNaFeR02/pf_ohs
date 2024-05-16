// const fetch = require('node-fetch');
const fs = require('fs');

function fetchAndSave(names, urls) {
  if (names.length !== urls.length) {
    console.error('Los arrays de nombres y URLs deben tener la misma longitud.');
    return;
  }

  names.forEach((name, index) => {
    const url = urls[index];
    fetch(url)
      .then(response => response.json())
      .then(data => {
        fs.writeFile(`${name}.json`, JSON.stringify(data, null, 2), err => {
          if (err) {
            console.error(`Error al escribir el archivo ${name}.json:`, err);
          } else {
            console.log(`Archivo ${name}.json guardado correctamente.`);
          }
        })
      })
      .catch(error => {
        console.error(`Error al obtener los datos de ${url}:`, error);
      });
  });
}

// Uso de la función
const names = [
    'GeneralPersonExample',
    'Patient1ForLinking',
    'Patient2ForLinking',
    'DeceasedPatientTime',
    'DeceasedPatientBoolean',
    'StockPeople',
    'ExamplePeopleCypressProject',
    'SecondPersonExample',
    'XDSPatient',
    'AnimalExample',
    'DICOMSample',
    'IHEPCDExample',
    'RealWorldPatientExample1',
    'RealWorldPatientExample2',
    'GlossyExample',
    'GeneticRiskAssessmentPerson',
    'AdditionalGeneticsExample',
    'ChineseContentExample',
    'NewbornPatientExample',
    'MotherOfNewbornPatientExample',
    'NewbornEldestTwinExample',
    'NewbornYoungestTwinExample',
    'PreBirthFetalInfantExample',
    'MotherOfInfantTwinsAndFetalInfant'
  ]; // Agrega el resto de tus nombres aquí

const urls = [
  'https://fhir-ru.github.io/patient-example.json',
  'https://fhir-ru.github.io/patient-example-a.json',
  'https://fhir-ru.github.io/patient-example-b.json',
  'https://fhir-ru.github.io/patient-example-c.json',
  'https://fhir-ru.github.io/patient-example-d.json',
  'https://fhir-ru.github.io/patient-examples-general.json',
  'https://fhir-ru.github.io/patient-examples-cypress-template.json',
  'https://fhir-ru.github.io/patient-example-xcda.json',
  'https://fhir-ru.github.io/patient-example-xds.json',
  'https://fhir-ru.github.io/patient-example-animal.json',
  'https://fhir-ru.github.io/patient-example-dicom.json',
  'https://fhir-ru.github.io/patient-example-ihe-pcd.json',
  'https://fhir-ru.github.io/patient-example-f001-pieter.json',
  'https://fhir-ru.github.io/patient-example-f201-roel.json',
  'https://fhir-ru.github.io/patient-glossy-example.json',
  'https://fhir-ru.github.io/patient-example-proband.json',
  'https://fhir-ru.github.io/patient-genetics-example1.json',
  'https://fhir-ru.github.io/patient-example-chinese.json',
  'https://fhir-ru.github.io/patient-example-newborn.json',
  'https://fhir-ru.github.io/patient-example-mom.json',
  'https://fhir-ru.github.io/patient-example-infant-twin-1.json',
  'https://fhir-ru.github.io/patient-example-infant-twin-2.json',
  'https://fhir-ru.github.io/patient-example-infant-fetal.json',
  'https://fhir-ru.github.io/patient-example-infant-mom.json'
];

fetchAndSave(names, urls)