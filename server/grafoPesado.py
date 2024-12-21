class Vertice:
    def __init__(self, vertice_id):
        self.id = vertice_id
        self.vecinos = {}  # Usar un conjunto para evitar duplicados y mejorar eficiencia.

    def add_vecino(self, vecino, peso):
        self.vecinos[vecino] = peso  # Inserción rápida con un set.

    def get_vecinos(self):
        return self.vecinos  # Devolver los vecinos.

    def remove_vecino(self, vecino):
        self.vecinos.remove(vecino)

    def existe_vecino(self, vecino):
        return vecino in self.vecinos

    def get_peso(self, vecino):
        return self.vecinos.get(vecino, None)

class Grafo:
    def __init__(self):
        self.vertices = {}

    def add_vertice(self, vertice):
        if not isinstance(vertice, Vertice):
            raise ValueError("El vértice debe ser una instancia de la clase Vertex.")
        if vertice.id in self.vertices:
            raise ValueError("El vértice ya existe.")
        self.vertices[vertice.id] = vertice
        return True
    
    
    def remove_vertice(self, vertice_id):
        if vertice_id not in self.vertices:
            # return False  # Vértice no existe.
            raise KeyError("El vértice no existe.")
        
        vertice = self.vertices[vertice_id]

        # Hacer una copia de los vecinos antes de modificar el conjunto
        vecinos_copia = list(vertice.get_vecinos())

        print(vecinos_copia)

        # Eliminar todas las aristas que le llegan al vértice
        for verticeCopy in self.vertices:
            self.remove_arista(verticeCopy, vertice_id)

        # Eliminar todas las aristas que salen del vértice
        for vecino in vecinos_copia:
            self.remove_arista(vertice_id, vecino)

        # Finalmente, eliminar el vértice del grafo
        del self.vertices[vertice_id]

        return True


    def add_arista(self, v1, v2, peso):
        if v1 not in self.vertices or v2 not in self.vertices:
            raise KeyError("Ambos vértices deben existir en el grafo.")
        if self.vertices[v1].existe_vecino(v2):
            raise ValueError("La arista ya existe.")
        self.vertices[v1].add_vecino(v2, peso)
        return True
    

    def remove_arista(self, v1, v2):
        if v1 not in self.vertices or v2 not in self.vertices:
            raise KeyError("Ambos vértices deben existir en el grafo.")
        self.vertices[v1].vecinos.discard(v2)
        self.vertices[v2].vecinos.discard(v1)
        return True


    def get_vertices(self):
        return list(self.vertices.keys())  # Devolver como lista.

    def __iter__(self):
        return iter(self.vertices.values())  # Iterar sobre los objetos Vertex.

    def __str__(self):
        """Representación del grafo como una lista de adyacencia."""
        return "\n".join(
            f"{vertice.id}: {sorted(vertice.vecinos)}" for vertice in self.vertices.values()
        )

    def get_grafo(self):
        return {
            vertice.id: [(vecino, peso) for vecino, peso in vertice.vecinos.items()]
            for vertice in self.vertices.values()
        }

    def clear(self):
        self.vertices.clear()
    
    