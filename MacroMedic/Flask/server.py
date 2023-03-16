import numpy as np
import pandas as pd
import os
import pickle
from flask import Flask, jsonify, request, json, session
from functools import wraps
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"": {"origins": "*"}})

@app.route('/report/analysis', methods=['POST'])
@cross_origin()
def predictDisease():
    return jsonify({"hello": "world"})

if __name__ == "__main__":
    app.run(debug=True, port=8000)