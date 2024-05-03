function formatTextToUrl(text: string, prefix: string): string {
    // Convertir todo a minúsculas
    let formattedText = text.toLowerCase();

    // Reemplazar espacios por guiones bajos
    formattedText = formattedText.replace(/\s+/g, '_');

    // Eliminar caracteres especiales que no se permiten en las URLs
    formattedText = formattedText.replace(/[^a-z0-9\-_]/g, '');

    // Agregar el prefijo de la URL
    // const prefix = 'http://hl7.org/fhir/Questionnaire/';
    formattedText = prefix + formattedText;

    return formattedText;
}

export default formatTextToUrl;