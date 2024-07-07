from app.database import get_db

class Cereal:

    def __init__(self, id_cereal=None, nombre=None, fabricante=None, due_date=None, banner=None):

        self.id_cereal=id_cereal
        self.nombre=nombre
        self.fabricante=fabricante
        self.due_date=due_date
        self.banner=banner
 
    def serialize(self):
        return {
            'id_cereal': self.id_cereal,
            'nombre': self.nombre,
            'fabricante': self.fabricante,
            'due_date': self.due_date,   #.strftime('%Y-%m-%d'),
            'banner': self.banner
        }

    @staticmethod
    def get_all():

        db = get_db()
        cursor = db.cursor()
        query = "SELECT * FROM cereal"
        cursor.execute(query)
        rows = cursor.fetchall() #me permite obtener todos los resultados que fueron ejecutados por la query, devuelve una lista de tuplas
        
        cereal = [ Cereal(id_cereal=row[0], nombre=row[1], fabricante=row[2], due_date=row[3], banner=row[4])
                  for row in rows]
        
        cursor.close()

        return cereal



    @staticmethod
    def get_by_id(cereal_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM cereal WHERE id_cereal = %s", (cereal_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Cereal(id_cereal=row[0], nombre=row[1], fabricante=row[2], due_date=row[3], banner=row[4])
        return None
       



    """
    Insertar un registro si no existe el atributo id_movie
    """
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_cereal:
            cursor.execute("""
                UPDATE cereal SET nombre = %s, fabricante = %s, due_date = %s, banner = %s
                WHERE id_cereal = %s
            """, (self.nombre, self.fabricante, self.due_date, self.banner, self.id_cereal))
        else:
            cursor.execute("""
                INSERT INTO cereal (nombre, fabricante, due_date, banner) VALUES (%s, %s, %s, %s)
            """, (self.nombre, self.fabricante, self.due_date, self.banner))
            self.id_cereal = cursor.lastrowid
        db.commit()
        cursor.close()


    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM cereal WHERE id_movie = %s", (self.id_cereal,))
        db.commit()
        cursor.close()

