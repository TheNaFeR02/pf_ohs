function formatTextToUrl(text: string, prefix: string): string {
  let formattedText = text.toLowerCase();
  formattedText = formattedText.replace(/\s+/g, "_");

  // Gracias a Zod el texto que proviene del titulo no puede contener caracteres especiales
  //   formattedText = formattedText.replace(/[^a-z0-9\-_]/g, ""); 

  // Agregar el prefijo de la URL
  // const prefix = 'http://hl7.org/fhir/Questionnaire/';
  formattedText = prefix + formattedText;

  return formattedText;
}

export default formatTextToUrl;
