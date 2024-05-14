import { OperationOutcome } from "../types/OperationOutcome";

export class FhirError extends Error {
    errorSchema?: OperationOutcome;
  
    constructor(message?:string, operationOutcome?: OperationOutcome) {
      super(message);
      this.name = 'ServerKnownError';
      this.errorSchema = operationOutcome;
    }
  }