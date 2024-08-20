export interface HttpResponse {
    statusCode: number
    body: (string | object)
}

export interface HttpRequest {
    body?: any
}