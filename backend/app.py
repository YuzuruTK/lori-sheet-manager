from flask import Flask, jsonify, request
import os
import json
import uuid
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_players', methods=['GET'])
def get_classes():
    try:
        # Abrir o arquivo JSON e carregá-lo
        with open(json_file, 'r') as file:
            data = json.load(file)
        # Retornar o conteúdo como JSON
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/add_player', methods=['POST'])
def receive_data():
    try:
        # Receber o JSON enviado na requisição POST
        data = request.get_json()

        # Gerar um nome de arquivo único usando UUID
        unique_filename = f"{uuid.uuid4()}.json"
        file_path = os.path.join(new_classes_folder, unique_filename)
        
        # Salvar os dados no arquivo
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        
        # Retornar uma resposta de sucesso
        return jsonify({'message': 'Dados recebidos e salvos com sucesso!', 'filename': unique_filename}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/modify-player', methods=['POST'])
def receive_data():
    try:
        # Receber o JSON enviado na requisição POST
        data = request.get_json()

        # Gerar um nome de arquivo único usando UUID
        unique_filename = f"{uuid.uuid4()}.json"
        file_path = os.path.join(new_classes_folder, unique_filename)
        
        # Salvar os dados no arquivo
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        
        # Retornar uma resposta de sucesso
        return jsonify({'message': 'Dados recebidos e salvos com sucesso!', 'filename': unique_filename}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
