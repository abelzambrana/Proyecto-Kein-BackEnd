from flask import Flask
from app.views import index,api_cereal

#inicialización del proyecto flask

app= Flask(__name__)

app.route('/',methods=['GET'])(index)
app.route('/api/cereal',methods=['GET'])(api_cereal)


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



