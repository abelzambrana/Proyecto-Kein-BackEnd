from app.database import get_db

class Cereal:

    def __init__(self, id_cereal=None, nombre=None, fabricante=None, due_date=None, banner=None):

        self.id_cereal=id_cereal
        self.nombre=nombre
        self.fabricante=fabricante
        self.due_date=due_date
        self.banner=banner
 
    @staticmethod
    def get_all():

        db = get_db()
        cursor = db.cursor()
        query = "SELECT * FROM cereal"
        cursor.execute(query)
        rows = cursor.fetchall() #me permite obtener todos los resultados que fueron ejecutados por la query, devuelve una lista de tuplas
        cursor.close()
        
        return rows

    def get_by_id(id_cereal):
        pass

    def save():
        pass

    def delete():
        pass
