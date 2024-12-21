import { validar } from "./validaciones.js";
export let transiciones;

export async function getEstadosAPI() {
  try {
    const response = await fetch("http://localhost:5000/estados");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const estados = await response.json(); // Actualiza el arreglo global de estados
    return estados; // Retorna los estados para su uso
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function reiniciarAPI() {
  try {
    const response = await fetch("http://localhost:5000/reiniciar", {
      method: "POST",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function getTransicionesAPI() {
  try {
    const response = await fetch("http://localhost:5000/get_transiciones");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const transiciones = await response.json(); // Actualiza el arreglo global de estados
    return transiciones; // Retorna los estados para su uso
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function getCintaAPI() {
  try {
    const response = await fetch("http://localhost:5000/get_cinta");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const cinta = await response.json();
    // console.log(cinta);
    return cinta;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function nextEstadoAPI(estado, simbolo) {
  try {
    const response = await fetch("http://localhost:5000/next_estado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado, simbolo }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert(error.message);
    return null;
  }
}

export async function getCabezalAPI() {
  try {
    const response = await fetch("http://localhost:5000/get_cabezal");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const cabezalPos = await response.json();
    return cabezalPos;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function setCabezalAPI(cabezal) {
  try {
    const response = await fetch("http://localhost:5000/set_cabezal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cabezal }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function avanzarCintaAPI(simbolo, direccion) {
  try {
    let datos = { simbolo, direccion };
    const response = await fetch("http://localhost:5000/avanzar_cinta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datos }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function getEstadoActualAPI() {
  try {
    const response = await fetch("http://localhost:5000/get_estado_actual");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const estadoActual = await response.json();
    return estadoActual;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function getEstadoAceptacionAPI() {
  try {
    const response = await fetch("http://localhost:5000/get_estado_aceptacion");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const estadoAceptacion = await response.json();
    return estadoAceptacion;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function getEstadoRechazoAPI() {
  try {
    const response = await fetch("http://localhost:5000/get_estado_rechazo");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const estadoRechazo = await response.json();
    return estadoRechazo;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function setEstadoActualAPI(estado) {
  try {
    const response = await fetch("http://localhost:5000/set_estado_actual", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function setEstadoRechazoAPI(estado) {
  try {
    const response = await fetch("http://localhost:5000/set_estado_rechazo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function setEstadoAceptacionAPI(estado) {
  try {
    const response = await fetch(
      "http://localhost:5000/set_estado_aceptacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function setEstadoInicialAPI(estado) {
  try {
    const response = await fetch("http://localhost:5000/set_estado_inicial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const data = await response.json();
    alert(data);
    console.log(data);
    return data;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function getEstadoInicialAPI() {
  try {
    const response = await fetch("http://localhost:5000/get_estado_inicial");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const estadoInicial = await response.json();
    return estadoInicial;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

//ENDPOINTS MAS IMPORTANTES
export async function Ejecutar() {
  try {
    const response = await fetch("http://localhost:5000/ejecutar");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    const avanzarV2 = await response.json();
    return avanzarV2;
  } catch (error) {
    alert(error.message);
    return null;
  }
}

export async function setTransicionesAPI(transicionesAPI) {
  try {
    console.log(JSON.stringify(transicionesAPI));
    if (!validar(transicionesAPI)) return alert("Transiciones invalidas");
    const response = await fetch("http://localhost:5000/set_transiciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transicionesAPI }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }
    transiciones = await response.json();
    alert(transiciones);
    console.log(transiciones);
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}

export async function setCintaAPI(cinta) {
  try {
    const response = await fetch("http://localhost:5000/set_cinta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cinta }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error en la respuesta del servidor");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("Error al conectar con el servidor: " + error.message);
    return null;
  }
}
