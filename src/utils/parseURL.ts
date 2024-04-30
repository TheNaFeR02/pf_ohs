export function parseURL(url: string): string {
    //eslint-disable-next-line
    const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const regex = new RegExp(urlExpression);

    if (url.match(regex)) {
        return url;
    }
    var mainURL = "http://localhost:8080/fhir";
    if (mainURL === undefined) return "";
    if (mainURL.charAt(mainURL.length - 1) !== "/") mainURL += "/"

    if (url.length > 0 && url.charAt(0) === "/") url = url.substring(1, url.length);
    return mainURL + url;
}