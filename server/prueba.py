class Turing:
    def __init__(self):
        self.estados = []
        self.alfabeto = []
        self.cinta = []
        self.cabezal = 0
        self.estado_actual = ""
        self.estado_aceptacion = ""
        self.estado_rechazo = ""
        self.transiciones = {}

    def set_estados(self, estados):
        self.estados = estados

    def set_alfabeto(self, alfabeto):
        self.alfabeto = alfabeto

    def set_cinta(self, cinta):
        self.cinta = list(cinta) + ['_']  # Agrega un espacio en blanco al final

    def set_estado_actual(self, estado):
        self.estado_actual = estado

    def set_estado_aceptacion(self, estado):
        self.estado_aceptacion = estado

    def set_estado_rechazo(self, estado):
        self.estado_rechazo = estado

    def set_transiciones(self, transiciones):
        for linea in transiciones.strip().split("\n"):
            estado, lectura, escritura, direccion, siguiente = linea.split()
            self.transiciones[(estado, lectura)] = (escritura, direccion, siguiente)

    def ejecutar(self):
        print('Transiciones', self.transiciones)
        while self.estado_actual != self.estado_aceptacion and self.estado_actual != self.estado_rechazo:
            print(f"Cinta: {self.cinta}")
            print(f"Cabezal: {self.cabezal}")
            print(f"Estado actual: {self.estado_actual}")
            input("Presiona Enter para continuar...")

            simbolo_actual = self.cinta[self.cabezal]
            if (self.estado_actual, simbolo_actual) in self.transiciones:
                escritura, direccion, siguiente = self.transiciones[(self.estado_actual, simbolo_actual)]
                self.cinta[self.cabezal] = escritura
                self.estado_actual = siguiente
                if direccion == 'R':
                    self.cabezal += 1
                elif direccion == 'L':
                    self.cabezal -= 1
            else:
                print(f"No se encontró una transición válida para el estado '{self.estado_actual}' con el símbolo '{simbolo_actual}'.")
                break

        if self.estado_actual == self.estado_aceptacion:
            print("La máquina ha terminado en un estado de aceptación.")
        elif self.estado_actual == self.estado_rechazo:
            print("La máquina ha terminado en un estado de rechazo.")
        else:
            print("La máquina ha terminado en un estado no definido como aceptación o rechazo.")

estados = ['q0', 'q1', 'qa', 'qr']
alfabeto = ['0', '1', '_']

transiciones = """
q0 0 _ R q1
q0 1 1 R q0
q0 _ _ R qa
q1 0 _ R q0
q1 1 1 R q1
q1 _ _ R qr
"""

# Configurar la Máquina de Turing
turing = Turing()
turing.set_estados(estados)
turing.set_alfabeto(alfabeto)
turing.set_cinta('0000')  # Cambia la cinta para probar diferentes casos
turing.set_estado_actual('q0')
turing.set_estado_aceptacion('qa')
turing.set_estado_rechazo('qr')
turing.set_transiciones(transiciones)

turing.ejecutar()
