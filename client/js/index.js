import {
  getCintaAPI,
  getCabezalAPI,
  getEstadosAPI,
  Ejecutar,
  getEstadoAceptacionAPI,
  getEstadoRechazoAPI,
  setCintaAPI,
} from "./connection.js";

document.addEventListener("DOMContentLoaded", async () => {
  const btnGrafo = document.getElementById("btnGrafo");
  const graph = document.getElementById("graph");
  const reinciarTuring = document.getElementById("reiniciarTuring");
  const transicionesContainer = document.getElementById(
    "transicionesContainer"
  );
  const transicionesControles = document.getElementById(
    "transicionesControles"
  );

  const estadosAPI = await getEstadosAPI();
  if (estadosAPI.length === 0) {
    btnGrafo.style.display = "none";
    reinciarTuring.style.display = "none";
    graph.style.display = "none";
  }

  btnGrafo.addEventListener("click", () => {
    if (btnGrafo.innerText === "Ver Grafo") {
      graph.style.visibility = "visible";
      transicionesContainer.style.display = "none";
      transicionesControles.style.display = "none";
      graph.style.display = "flex";
      btnGrafo.innerText = "Ocultar Grafo";
    } else {
      graph.style.visibility = "hidden";
      graph.style.display = "none";
      transicionesContainer.style.display = "flex";
      transicionesControles.style.display = "flex";
      btnGrafo.innerText = "Ver Grafo";
    }
  });

  const cintaContainer = document.getElementById("cinta");
  cintaContainer.style.position = "relative";
  cintaContainer.style.display = "flex";
  cintaContainer.style.flexDirection = "column"; // Apilar elementos verticalmente
  cintaContainer.style.alignItems = "center"; // Centrar horizontalmente
  cintaContainer.style.gap = "10px"; // Espacio entre la cinta y el botón
  cintaContainer.innerHTML = "";

  // Llamar a la API para obtener los estados
  const cintaAPI = await getCintaAPI();
  const copiaCintaAPI = cintaAPI;
  let cabezalAPI = await getCabezalAPI();
  const estadoAceptacionAPI = await getEstadoAceptacionAPI();
  const estadoRechazoAPI = await getEstadoRechazoAPI();
  // console.log(cintaAPI);
  // console.log("Pos cabezal: " + cabezalAPI);

  // Crear cinta
  const cinta = document.createElement("div");
  cinta.style.display = "flex";
  cinta.style.width = "80%";
  cinta.style.height = "80px";
  cinta.style.border = "2px solid #1e3a8a";
  cinta.style.backgroundColor = "#ffffff";
  cinta.style.margin = "0 auto";
  cinta.style.position = "relative";

  if (cintaAPI && cintaAPI.length <= 5) {
    cinta.style.width = "25%";
  }

  for (let i = 0; i < cintaAPI.length; i++) {
    const cuadro = document.createElement("div");
    cuadro.style.flex = "1";
    cuadro.style.borderRight =
      i < cintaAPI.length - 1 ? "2px solid #1e3a8a" : "none";
    cuadro.style.display = "flex";
    cuadro.style.alignItems = "center";
    cuadro.style.justifyContent = "center";
    cuadro.style.fontSize = "1.5rem";
    cuadro.style.fontWeight = "bold";
    cuadro.style.height = "100%";
    cuadro.style.backgroundColor = i === cabezalAPI ? "#1e3a8a" : "#ffffff";
    cuadro.style.color = i === cabezalAPI ? "#ffffff" : "#1e3a8a";
    // Si el índice actual coincide con la posición del cabezal
    if (i === cabezalAPI) {
      cuadro.style.transform = "scale(1.2)"; // Agrandar el cuadro (ancho y alto)
      cuadro.style.transition = "transform 0.3s ease-in-out"; // Suavizar la animación
    }
    cuadro.textContent = cintaAPI[i]; // Establece el valor del estado
    cuadro.setAttribute("data-index", i);
    cuadro.className = "cuadro-cinta";
    cinta.appendChild(cuadro);
  }

  // Crear botón de avanzar
  const avanzar = document.createElement("button");
  avanzar.style.display = "block"; // Asegura que se comporte como un bloque para el centrado
  avanzar.style.margin = "10px auto"; // Centrado horizontal y separación inferior
  avanzar.style.width = "100px"; // Ajustar ancho del botón
  avanzar.style.height = "40px"; // Ajustar alto del botón
  avanzar.style.backgroundColor = "#1e3a8a";
  avanzar.style.color = "#ffffff";
  avanzar.style.fontSize = "1rem";
  avanzar.style.fontWeight = "bold";
  avanzar.style.cursor = "pointer";
  avanzar.style.border = "none"; // Quitar bordes
  avanzar.style.borderRadius = "5px"; // Bordes redondeados
  avanzar.style.transition = "background-color 0.3s ease-in-out";
  avanzar.innerHTML = "RUN";

  avanzar.addEventListener("click", async () => {
    try {
      //VER LO DEL ESTADO FINAL MY NIGGA
      const cintaActualizada = await Ejecutar();
      console.log("Cinta: " + cintaActualizada[0]);
      console.log("Cabezal: " + cintaActualizada[1]);

      actualizarCintaUI(cintaActualizada[0], cintaActualizada[1]);
    } catch (error) {
      console.error("Error al mover la cinta:", error);
    }
  });

  // Agregar cinta y botón al contenedor
  cintaContainer.appendChild(cinta);
  cintaContainer.appendChild(avanzar);
  cintaContainer.style.paddingTop = "20px";
});

function actualizarCintaUI(cintaAPI, cabezalAPI) {
  const cintaContainer = document.getElementById("cinta");
  const cuadros = cintaContainer.querySelectorAll(".cuadro-cinta");

  cuadros.forEach((cuadro, index) => {
    cuadro.style.backgroundColor = index === cabezalAPI ? "#1e3a8a" : "#ffffff";
    cuadro.style.color = index === cabezalAPI ? "#ffffff" : "#1e3a8a";

    if (index === cabezalAPI) {
      cuadro.style.transform = "scale(1.2)";
    } else {
      cuadro.style.transform = "scale(1)";
    }

    cuadro.textContent = cintaAPI[index];
  });
}
