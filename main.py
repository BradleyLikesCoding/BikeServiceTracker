import eel
from database import Database
database = Database()

eel.init("web")

@eel.expose
def get_database():
    return dict(database)

@eel.expose
def add_bike(bike, value=[]):
    database[bike] = value
    database.write()
    return dict(database)

@eel.expose
def remove_bike(bike):
    del database[bike]
    database.write()
    return dict(database)

@eel.expose
def set_bike(bike, value):
    database[bike] = value
    database.write()
    return dict(database)

eel.start("index.html")