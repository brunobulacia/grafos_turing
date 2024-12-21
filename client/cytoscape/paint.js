import {
  getEstadosAPI,
  getTransicionesAPI,
  getEstadoActualAPI,
  getEstadoRechazoAPI,
  getEstadoAceptacionAPI,
  getEstadoInicialAPI,
} from "../js/connection.js";
import { cy, initializeCytoscape } from "./graph.js";
let estados = [];
export async function inicializarGrafo() {
  initializeCytoscape();
  await cargarEstados();
  await cargarTransiciones();
  ajustarGrafo();
  await pintarEstadosEspeciales();
}

async function pintarEstadosEspeciales() {
  let estadoInicial = await getEstadoInicialAPI();
  cy.nodes("#" + estadoInicial).style("background-color", "#fbc531");
  cy.nodes("#" + estadoInicial).style("border-color", "#2f3640");

  let estadoRechazo = await getEstadoRechazoAPI();
  cy.nodes("#" + estadoRechazo).style("background-color", "#e74c3c");
  cy.nodes("#" + estadoRechazo).style("border-color", "#c0392b");
  cy.nodes("#" + estadoRechazo).style("shape", "round-rectangle");

  let estadoAceptacion = await getEstadoAceptacionAPI();
  cy.nodes("#" + estadoAceptacion).style("background-color", "#2ecc71");
  cy.nodes("#" + estadoAceptacion).style("border-color", "#27ae60");
  cy.nodes("#" + estadoAceptacion).style("shape", "round-rectangle");
}

async function cargarEstados() {
  estados = await getEstadosAPI();
  if (estados && estados.length > 0) {
    // console.log("Estados cargados:", estados);
    let dEstados = [];
    for (let i = 0; i < estados.length; i++) {
      dEstados.push({
        group: "nodes",
        data: { id: estados[i] },
      });
    }
    cy.add(dEstados);
  } else {
    console.error("No hay estados cargados");
  }
}

async function cargarTransiciones() {
  let transiciones = await getTransicionesAPI();
  if (transiciones) {
    // console.log("Transiciones cargadas:", transiciones);
    let dTransiciones = [];
    for (let i = 0; i < transiciones.length; i++) {
      let inicial = transiciones[i][0];
      let final = transiciones[i][1];
      if (transiciones[i][2] != 0) {
        for (let j = 0; j < transiciones[i][2].length; j++) {
          const edgeId = `${inicial}-${final}-${j}`; // Genera un ID único
          dTransiciones.push({
            group: "edges",
            data: {
              id: edgeId,
              source: inicial,
              target: final,
              label:
                transiciones[i][2][j][0] +
                "; " +
                transiciones[i][2][j][1] +
                ", " +
                transiciones[i][2][j][2],
            },
          });
        }
      }
    }
    cy.add(dTransiciones);
    // console.log("Aristas añadidas:", dTransiciones);
  } else {
    console.error("No se pudieron cargar las transiciones");
  }
}

function ajustarGrafo() {
  const layout = cy.layout({
    name: "circle",
    // fit: true,
    spacingFactor: 0.4,
    animate: true,
    animationDuration: 500,
    animationEasing: "ease-in-out",
  });

  layout.run();

  // cy.fit(); // Ajustar la vista para mostrar todos los nodos

  // Configurar límites de zoom dependiendo del número de nodos
  if (estados.length >= 8) {
    cy.minZoom(0.5);
  } else {
    cy.minZoom(0.8);
    cy.maxZoom(1.5);
  }
}
