import { OK, CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } from "http-status";
import { HttpResponse } from "../protocols/http";
import { ServerError } from "../errors/server-error";

export const ok = (data: any): HttpResponse => ({
    statusCode: OK,
    body: data
})

export const created = (data: any): HttpResponse => ({
    statusCode: CREATED,
    body: data
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: BAD_REQUEST,
    body: error
})

export const serverError = (): HttpResponse => ({
    statusCode: INTERNAL_SERVER_ERROR,
    body: new ServerError
})