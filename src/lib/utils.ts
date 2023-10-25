class UtilTools {
  // Esta función recibe un objeto y un array de strings
  // y verifica si el objeto tiene todas las propiedades del array
  static hasMissingProperties(
    objeto: any,
    propiedades: string[]
  ): { value: boolean; message: string } {
    // Creamos un array vacío para guardar las propiedades que faltan
    let faltantes: string[] = [];
    // Recorremos el array de propiedades
    for (let propiedad of propiedades) {
      // Si el objeto no tiene la propiedad, la agregamos al array de faltantes
      if (!objeto.hasOwnProperty(propiedad)) {
        faltantes.push(propiedad);
      }
    }
    // Si el array de faltantes está vacío, significa que el objeto tiene todas las propiedades
    if (faltantes.length === 0) {
      // Devolvemos un objeto con value true y message "ok"
      return { value: false, message: "ok" };
    } else {
      // Si no, devolvemos un objeto con value false y message con las propiedades que faltan
      return {
        value: true,
        message: "Faltan las propiedades: " + faltantes.join(", "),
      };
    }
  }
}

export default UtilTools;
