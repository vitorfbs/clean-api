import { BAD_REQUEST } from "http-status";
import { HttpResponse } from "../protocols/http";

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: BAD_REQUEST,
        body: error
    }
}