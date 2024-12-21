/* export function validar(transiciones) {
  const lineas = transiciones.split("\n"); // Dividimos la cadena en líneas
  const conjuntoPermitido = new Set(["R", "r", "L", "l", "N", "n"]); // Conjunto válido para el tercer elemento
  for (let i = 0; i < lineas.length; i++) {
    const elementos = lineas[i].trim().split(/\s+/); // Dividimos los elementos de la línea ignorando espacios extra
    // Validar si la línea tiene exactamente 5 elementos
    if (elementos.length !== 5) {
      return false; // Si no tiene 5 elementos, la cadena es inválida
    }
    // Validar que cada elemento tenga al menos 1 carácter
    for (const elemento of elementos) {
      if (elemento.length < 1) {
        return false; // Si algún elemento no cumple, la cadena es inválida
      }
    }
    // Validar que el tercer elemento pertenezca al conjunto permitido
    if (!conjuntoPermitido.has(elementos[3])) {
      return false; // Si el tercer elemento no es válido, la cadena es inválida
    }
  }
  return true; // Si todas las líneas son válidas, la cadena es válida
}
 */
export function validar(transiciones) {
  const lineas = transiciones.split("\n"); // Dividimos la cadena en líneas
  const conjuntoPermitido = new Set(["R", "r", "L", "l", "N", "n"]); // Conjunto válido para el tercer elemento

  for (let i = 0; i < lineas.length; i++) {
    const elementos = lineas[i].trim().split(/\s+/); // Dividimos los elementos de la línea ignorando espacios extra

    // Validar si la línea tiene exactamente 5 elementos
    if (elementos.length !== 5) {
      return false; // Si no tiene 5 elementos, la cadena es inválida
    }

    // Validar que cada elemento tenga al menos 1 carácter
    for (const elemento of elementos) {
      if (elemento.length < 1) {
        return false; // Si algún elemento no cumple, la cadena es inválida
      }
    }

    // Validar que el tercer elemento pertenezca al conjunto permitido
    if (!conjuntoPermitido.has(elementos[3])) {
      return false; // Si el tercer elemento no es válido, la cadena es inválida
    }

    // Validar que el segundo y tercer elemento tengan una longitud máxima de 1
    if (elementos[1].length > 1 || elementos[2].length > 1) {
      return false; // Si alguno de ellos tiene más de un carácter, la cadena es inválida
    }
  }

  return true; // Si todas las líneas son válidas, la cadena es válida
}
