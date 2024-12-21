from turing import Turing
from auxiliares import *
from flask import Flask, jsonify, request
from flask_cors import CORS

global turing 
turing = Turing()

app = Flask(__name__)
CORS(app) 

@app.route('/set_transiciones', methods=['POST'])
def transiciones():
    try:
        data = request.get_json()  
        estados = sacar_estados_de_transiciones(data['transicionesAPI'])
        alfabeto = sacar_simbolos_del_alfabeto(data['transicionesAPI'])
        turing.set_estados(estados)
        turing.set_alfabeto(alfabeto)
        turing.set_transiciones(data['transicionesAPI'])
        turing.set_estado_actual(estados[0])
        turing.set_estado_inicial(estados[0])
        turing.set_cabezal(0)
        return jsonify('Matriz de transiciones cargada'), 200 
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_transiciones', methods=['GET'])
def get_transiciones():
    try:
        trans = []
        for estado, destinos in turing.transiciones.items():
            for destino, transicion in destinos.items():
                trans = [*trans, [estado, destino, transicion]]
        print(trans)
        return jsonify(trans), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/set_cinta', methods=['POST'])
def cinta():
    try:
        data = request.get_json()
        estados = turing.get_estados()
        turing.set_estados([])
        turing.set_cinta(data['cinta'])
        turing.set_cabezal(0)
        turing.set_estados(estados)
        turing.set_estado_actual(turing.estados[0])
        return jsonify('Cinta cargada'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_cinta', methods=['GET'])
def get_cinta():
    try:
        return jsonify(turing.get_cinta()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/reiniciar', methods=['POST'])
def reiniciar():
    try:
        global turing  
        turing = Turing()  
        return jsonify('Máquina reiniciada'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/estados', methods=['GET'])
def estados():
    try:
        return jsonify(turing.get_estados()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/next_estado', methods=['POST'])
def next_estado():
    try:
        data = request.get_json()
        return jsonify(turing.obtener_siguiente_estado(data['estado'], data['simbolo'])), 200
    except Exception as e:
        return jsonify({'error': 'No existe un estado para el siguiente simbolo'}), 500


@app.route('/avanzar_cinta', methods=['POST'])
def avanzar_cinta():
    try:
        data = request.get_json()
        print(data['datos']['simbolo'], data['datos']['direccion'])
        turing.avanzar_cinta(data['datos']['simbolo'], data['datos']['direccion'])
        return jsonify(turing.get_cinta(), turing.get_cabezal()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500




@app.route('/ejecutar', methods=['GET'])
def avanzar():
    try:
        turing.ejecutar()
        return jsonify(turing.get_cinta(), turing.get_cabezal(), turing.get_estado_actual()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/get_cabezal', methods=['GET'])
def get_cabezal():
    try:
        return jsonify(turing.get_cabezal()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/set_cabezal', methods=['POST'])
def set_cabezal():
    try:
        data = request.get_json()
        turing.set_cabezal(data['cabezal'])
        return jsonify('Cabezal actualizado'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_estado_actual', methods=['GET'])
def get_estado_actual():
    try:
        return jsonify(turing.get_estado_actual()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/set_estado_actual', methods=['POST'])
def set_estado_actual():
    try:
        data = request.get_json()
        turing.set_estado_actual(data['estado'])
        return jsonify('Estado actual actualizado'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_estado_aceptacion', methods=['GET'])
def get_estado_aceptacion():
    try:
        return jsonify(turing.get_estado_aceptacion()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_estado_rechazo', methods=['GET'])
def get_estado_rechazo():
    try:
        return jsonify(turing.get_estado_rechazo()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/set_estado_aceptacion', methods=['POST'])
def set_estado_aceptacion():
    try:
        data = request.get_json()
        turing.set_estado_aceptacion(data['estado'])
        return jsonify('Estado de aceptacion actualizado'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/set_estado_rechazo', methods=['POST'])
def set_estado_rechazo():
    try:
        data = request.get_json()
        turing.set_estado_rechazo(data['estado'])
        return jsonify('Estado de rechazo actualizado'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_estado_inicial', methods=['GET'])
def get_estado_inicial():
    try:
        return jsonify(turing.get_estado_inicial()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/set_estado_inicial', methods=['POST'])
def set_estado_inicial():
    try:
        data = request.get_json()
        turing.set_estado_inicial(data['estado'])
        return jsonify('Estado inicial actualizado'), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Hi mom!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
