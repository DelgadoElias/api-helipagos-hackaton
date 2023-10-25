class ResponseHandler {
  static get ResourceCreated() {
    return { message: "Recurso creado correctamente", status: 200 };
  }

  static BadRequest(properties: string) {
    return { message: "Propiedades faltantes: " + properties, status: 400 };
  }

  static ResourceUpdated(value: any) {
    return { message: "Recurso actualizado", oldValue: value };
  }

  static Accepted(value: any) {
    return { message: "Recurso encontrado", value };
  }

  static get InternalError() {
    return { message: "Error interno del servidor", status: 500 };
  }
}

export default ResponseHandler;
