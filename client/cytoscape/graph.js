import {
  getEstadoAceptacionAPI,
  getEstadoRechazoAPI,
} from "../js/connection.js";
export let cy;
export function initializeCytoscape() {
  cy = cytoscape({
    container: document.getElementById("cy"), // container to render in
    elements: [],

    style: [
      // Estilo para nodos
      {
        selector: "node",
        style: {
          "background-color": "#3498db", // Azul claro para nodos
          "border-width": 3,
          "border-color": "#2980b9", // Azul oscuro para bordes
          "text-halign": "center",
          "text-valign": "center",
          label: "data(id)", // Mostrar el nombre del estado
          "font-size": 18,
          "font-weight": "bold",
          color: "#ffffff", // Texto blanco
          width: 50,
          height: 50,
        },
      },

      // Estilo para nodos de aceptación y rechazo
      /*  {
        selector: "node[id='qa'], node[id='qr']",
        style: {
          "background-color": "#2ecc71", // Verde para aceptación
          "border-color": "#27ae60", // Verde más oscuro
          shape: "round-rectangle", // Forma diferente
        },
      },
      {
        selector: "node[id='qr']",
        style: {
          "background-color": "#e74c3c", // Rojo para rechazo
          "border-color": "#c0392b", // Rojo más oscuro
        },
      }, */

      // Estilo para aristas
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "#8e44ad", // Morado para líneas
          "target-arrow-color": "#8e44ad",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          label: "data(label)", // Etiquetas de transición
          "font-size": 12,
          "font-weight": "bold",
          color: "#344950", // Texto gris oscuro", // Texto gris oscuro
          "text-background-opacity": 1,
          "text-background-color": "#ecf0f1", // Fondo blanco claro
          "text-border-color": "#34495e",
          "text-border-width": 1,
          "text-rotation": "autorotate",
          "text-margin-y": -10,
        },
      },
    ],

    layout: {
      name: "circle",
      directed: true,
      fit: true,
      spacingFactor: 2,
      avoidOverlap: true,
    },
    minZoom: 1, // Zoom mínimo
    maxZoom: 1.2, // Zoom máximo
  });
  cy.fit();
  cy.viewport({
    zoom: 1.2,
    pan: { x: 500, y: 100 },
  });
  cy.nodes().forEach((node) => {
    node.ungrabify(); // Makes the node not draggable
  });
}
