import json

class Database(dict):
    def __init__(self, filename="database.json", values=None):
        self.filename = filename

        if values is not None:
            super().__init__(values)
        else:
            super().__init__(self.read())

    def write(self):
        with open(self.filename, "w", encoding="utf-8") as file:
            json.dump(dict(self), file)

    def read(self):
        with open(self.filename, "a+", encoding="utf-8") as file:
            file.seek(0)
            content = file.read()
            if content == "":
                file.write("{}")
                return {}
            else:
                return json.loads(content)