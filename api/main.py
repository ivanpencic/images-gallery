"""API"""
import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

load_dotenv("./.env.local")
app = Flask(__name__)
CORS(app)

UNSPLASHED_KEY = os.environ.get("UNSPLASH_KEY")
UNSPLASHED_URL = "https://api.unsplash.com/photos/random"

gallery = mongo_client.gallery
images_collection = gallery.images


@app.route("/")
def home():
    """Demo home"""
    return "<p>Hello, World123!</p>"


@app.route("/new-image")
def new_image():
    """New image"""
    word = request.args.get("query")

    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {UNSPLASHED_KEY}",
    }
    params = {"query": word}

    response = requests.get(
        UNSPLASHED_URL, params=params, headers=headers, timeout=15
    ).json()

    return response


@app.route("/images", methods=["GET", "POST"])
def images():
    """Images"""
    if request.method == "GET":
        imgs = images_collection.find({})
        return jsonify([x for x in imgs])

    if request.method == "POST":
        image = request.get_json()
        image["_id"] = image["id"]
        res = images_collection.insert_one(image)
        return {"inserted_id": res.inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    """Image"""
    if request.method == "DELETE":
        res = images_collection.delete_one({"_id": image_id})
        if res and not res.deleted_count:
            return {"error": "Image not found"}, 404

        return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
