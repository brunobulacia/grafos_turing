def sacar_estados_de_transiciones(transiciones):
    # Crear una lista para almacenar los primeros y últimos elementos
    estados = []
    
    # Dividir la cadena de texto por líneas
    lineas = transiciones.split("\n")
    
    # Iterar sobre cada línea
    for linea in lineas:
        # Dividir la línea en palabras, eliminando los espacios extras
        palabras = linea.split()
        
        if palabras:
            # Obtener el primer y último elemento de la línea
            primero = palabras[0]
            ultimo = palabras[-1]
            
            # Añadir al final de la lista si no se ha añadido antes
            if primero not in estados:
                estados.append(primero)
            if ultimo not in estados:
                estados.append(ultimo)
    return estados



def sacar_simbolos_del_alfabeto(transiciones):
    # Crear una lista para almacenar los símbolos (segundo y tercer elemento)
    simbolos = []
    
    # Dividir la cadena de texto por líneas
    lineas = transiciones.split("\n")
    
    # Iterar sobre cada línea
    for linea in lineas:
        # Dividir la línea en palabras, eliminando los espacios extras
        palabras = linea.split()
        
        # Comprobar que la línea tiene al menos 3 elementos
        if len(palabras) >= 3:
            segundo = palabras[1]
            tercero = palabras[2]
            
            # Añadir el segundo y tercer elemento a la lista si no están ya
            if segundo not in simbolos:
                simbolos.append(segundo)
            if tercero not in simbolos:
                simbolos.append(tercero)
    return simbolos
