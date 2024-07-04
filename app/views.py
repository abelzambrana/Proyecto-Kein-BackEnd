from flask import jsonify


def index():
    return '<h1>Hola mundo con flask abellllll</h1>'


def get_all_cereal():
    cereal = [
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

    return  jsonify(cereal)


def get_cereal():
    pass

def create_cereal():
    pass

def update_cereal():
    pass

def delete_cereal():
    pass