from flask import jsonify, request
from app.models import Cereal

def index():
    return '<h1>Hola mundo con flask abellllll</h1>'


def get_all_cereal():
 
    cereal = Cereal.get_all()
    list_cereal = [cer.serialize() for cer in cereal ]
    return  jsonify(list_cereal)

"""   cereal = [
               {
                  'id_cereal': 1,
                  'nombre':'serenisimo',
                  'release_date':'07-07-2024',
                  'banner':'cereal.png',
               },

               {
                  'id_cereal': 2,
                  'nombre':'yogurisimo',
                  'release_date':'06-06-2024',
                  'banner':'cerealyogurisimo.png',
               }
             ]

    return  jsonify(cereal)  """


def get_cereal():
    pass

def create_cereal():
    #recepcionando los datos enviados en la petición en formato json y los convierte en un diccionario
    data = request.json
    new_cereal = Cereal(
        nombre=data['nombre'],
        fabricante=data['fabricante'], 
        due_date=data['due_date'],
        banner=data['banner']   
    )
    new_cereal.save()
    return jsonify({'message':'Producto creado con exito'}), 201    #se envia un codigo 201 por que es el cod de resp a htpp cdo se indica que un registro a sido creado



def update_cereal():
    pass

def delete_cereal():
    pass