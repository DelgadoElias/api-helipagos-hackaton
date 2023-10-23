class ResponseHandler {
    static get ResourceCreated(){
        return { message : 'Recurso creado correctamente', status: 200};
    }

    static BadRequest(properties: string){
        return { message:  'Propiedades faltantes: ' + properties, status: 400};
    }
}