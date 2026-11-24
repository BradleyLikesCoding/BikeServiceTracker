import eel
from random import randint

eel.init("web")

@eel.expose
def random_python():
    return randint(1, 100)

eel.start("index.html")