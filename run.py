from flask import Flask
from flask_cors import CORS
from app.views import *
from app.database import init_app

#inicialización del proyecto flask

app= Flask(__name__)

init_app(app)
CORS(app)

app.route('/',methods=['GET'])(index)
app.route('/api/cereal/',methods=['GET'])(get_all_cereal)
app.route('/api/cereal/<int:cereal_id>', methods=['GET'])(get_cereal)
app.route('/api/cereal/',methods=['POST'])(create_cereal)
app.route('/api/cereal/<int:cereal_id>', methods=['PUT'])(update_cereal)
app.route('/api/cereal/<int:cereal_id>', methods=['DELETE'])(delete_cereal)

if  __name__=='__main__':
    app.run(debug=True)


#@app.route('/')

#def index():
#    return '<h1>Hola mundo con flask </h1>'

#@app.route('/api')

#def api():
#    return '<h1>Hola API con flask </h1>'

#@app.route('/api/cereal')

#def api_cereal():
#    return '<h1>Hola API/Cereal con flask </h1>' 



