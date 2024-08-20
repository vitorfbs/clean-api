import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
    requiredFields?: Array<string>
    
    handle (httpRequest: HttpRequest): HttpResponse
} 