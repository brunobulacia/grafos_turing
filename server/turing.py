class Turing:
    def __init__(self):
        self.estados = []
        self.alfabeto = []
        self.cinta = None
        self.cabezal = 0  # El cabezal empieza en la posición 0 de la cinta
        self.transiciones = {}
        self.estado_actual = None  # Estado actual de la máquina
        self.estado_aceptacion = None
        self.estado_rechazo = None
        self.estado_inicial = None


    def set_estado_inicial(self, estado_inicial):
        self.estado_inicial = estado_inicial
    
    def get_estado_inicial(self):
        return self.estado_inicial

    def set_estados(self, estados):
        self.estados = estados

    def set_estado_actual(self, estado):
        self.estado_actual = estado

    def set_estado_aceptacion(self, estado):
        self.estado_aceptacion = estado

    def set_estado_rechazo(self, estado):
        self.estado_rechazo = estado

    def get_estado_actual(self):
        return self.estado_actual
    
    def get_estado_aceptacion(self):
        return self.estado_aceptacion
    
    def get_estado_rechazo(self):
        return self.estado_rechazo

    def set_cabezal(self, cabezal):
        self.cabezal = cabezal

    def get_cabezal(self):
        return self.cabezal


    def get_estados(self):
        return self.estados
    
    def set_alfabeto(self, alfabeto):
        self.alfabeto = alfabeto

    def get_alfabeto(self):
        return self.alfabeto

    def set_cinta(self, cinta):
        self.cinta = list(cinta) + ['_'] 

    def get_cinta(self):
        return self.cinta  
    
    def set_transiciones(self, cadena_transiciones):
        # Inicializar la matriz dispersa
        self.transiciones = {estado: {estado_destino: 0 for estado_destino in self.estados} for estado in self.estados}
        # Dividir la cadena en líneas
        lineas = cadena_transiciones.split("\n")
        for linea in lineas:
            linea = linea.strip()  # Eliminar espacios extra al inicio y al final
            if not linea:  # Ignorar líneas vacías
                continue
            elementos = linea.split()  # Dividir en elementos por espacios
            if len(elementos) != 5:
                raise ValueError(f"Línea inválida: {linea}")
            estado_partida, simbolo_leido, simbolo_cambio, direccion, estado_destino = elementos
            # Validar que los estados y símbolos existan en la configuración
            if estado_partida not in self.estados or estado_destino not in self.estados:
                raise ValueError(f"Estado inválido en la línea: {linea}")
            if simbolo_leido not in self.alfabeto or simbolo_cambio not in self.alfabeto:
                raise ValueError(f"Símbolo inválido en la línea: {linea}")
            if direccion not in {"R", "L", "N", "r", "l", "n"}:
                raise ValueError(f"Dirección inválida en la línea: {linea}")
            # Crear la transición
            direccion = direccion.upper()
            transicion = [simbolo_leido, simbolo_cambio, direccion]
            # Agregar la transición a la matriz dispersa
            if self.transiciones[estado_partida][estado_destino] == 0:
                self.transiciones[estado_partida][estado_destino] = []
            # Validar que la transición no esté repetida
            if transicion not in self.transiciones[estado_partida][estado_destino]:
                self.transiciones[estado_partida][estado_destino].append(transicion)

    
    def get_transiciones(self):
        return self.transiciones
    
    def obtener_siguiente_estado(self, estado_actual, simbolo_leido):
        if estado_actual not in self.transiciones:
            raise ValueError(f"El estado '{estado_actual}' no existe en la función de transición.")
        for estado_destino, transiciones in self.transiciones[estado_actual].items():
            if transiciones != 0: 
                for transicion in transiciones:
                    simbolo_transicion, simbolo_cambio, direccion = transicion
                    if simbolo_transicion == simbolo_leido:
                        return estado_destino, simbolo_cambio, direccion
        raise ValueError(f"No se encontró una transición válida para el estado '{estado_actual}' con el símbolo '{simbolo_leido}'.")

    def avanzar_cinta(self, simbolo_cambio, direccion):
        self.cinta[self.cabezal] = simbolo_cambio
        if direccion == 'R' or direccion == 'r':  
            if self.cabezal < len(self.cinta):
                self.cabezal += 1            
        elif direccion == 'L' or direccion == 'l':  
            if self.cabezal == 0:  
                self.cinta.insert(0, '_')
            else:
                self.cabezal -= 1
        elif direccion == 'N' or direccion == 'n':
            pass

    def ejecutar(self):
        if (self.estado_actual != self.estado_aceptacion) and (self.estado_actual != self.estado_rechazo):
            print(f"Cinta: {self.cinta}")
            print(f"Cabezal: {self.cabezal}")
            print(f"Estado actual: {self.estado_actual}")
            simbolo_actual = self.cinta[self.cabezal]
            estado_destino, simbolo_cambio, direccion = self.obtener_siguiente_estado(self.estado_actual, simbolo_actual)
            self.cinta[self.cabezal] = simbolo_cambio
            self.estado_actual = estado_destino
            if direccion == 'R' or direccion == 'r':
                self.cabezal += 1
            elif direccion == 'L' or direccion == 'l':
                self.cabezal -= 1
            elif direccion == 'N' or direccion == 'n':
                pass
        else: 
            if self.estado_actual == self.estado_aceptacion:
                print("La máquina ha terminado en un estado de aceptación.")
                raise ValueError("La máquina ha terminado en un estado de aceptación.")
            elif self.estado_actual == self.estado_rechazo:
                print("La máquina ha terminado en un estado de rechazo.")
                raise ValueError("La máquina ha terminado en un estado de rechazo.")
            else:
                print("La máquina ha terminado en un estado no definido como aceptación o rechazo.")
                raise ValueError("La máquina ha terminado en un estado no definido como aceptación o rechazo.")
