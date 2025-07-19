import os
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def main():
    return {"Hello": "World"}

@app.get("/env")
def env_info():
    return {
        "Hello": "World",
        "CONFIG_1": os.environ.get("CONFIG_1"),
        "SECRET_1": os.environ.get("SECRET_1"),
    }
