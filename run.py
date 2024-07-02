from flask import Flask

#inicialización del proyecto flask

app= Flask(__name__)

@app.route('/')

def index():
    return '<h1>Hola mundo con flask </h1>'

@app.route('/api')

def api():
    return '<h1>Hola API con flask </h1>'

@app.route('/api/cereal')

def api_cereal():
    return '<h1>Hola API/Cereal con flask </h1>'

if  __name__=='__main__':
    app.run(debug=True)