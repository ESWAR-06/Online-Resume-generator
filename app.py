from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = []  # temporary storage

# 🔹 POST - Register
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Check if user already exists
    for user in users:
        if user["username"] == username:
            return jsonify({"message": "User already exists"}), 400

    users.append({"username": username, "password": password})
    return jsonify({"message": "Registration successful"}), 200


# 🔹 POST - Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({"message": "Login successful"}), 200

    return jsonify({"message": "Invalid credentials"}), 401


# 🔹 GET - View all users (for Postman testing)
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)


if __name__ == '__main__':
    app.run(debug=True)