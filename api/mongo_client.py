import os

from pymongo import MongoClient
from dotenv import load_dotenv


load_dotenv("./.env.local")


MONGO_HOST = os.environ.get("MONGO_HOST")
MONGO_USER = os.environ.get("MONGO_USER")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD")
MONGO_PORT = os.environ.get("MONGO_PORT")

mongo_client = MongoClient(
    host=MONGO_HOST, username=MONGO_USER, password=MONGO_PASSWORD, port=int(MONGO_PORT)
)


def insert_test_document():
    """Insert test data to test collection"""
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one({"test": 123, "name": "Ivan"})
    print(res)
