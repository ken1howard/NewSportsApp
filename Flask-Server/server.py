from flask import Flask, request, jsonify
import psycopg2
import bcrypt

app = Flask(__name__)

# Replace with your database configuration
db_config = {
    "host":"localhost",
    "database":"Football_Stats_App",
    "user":"postgres",
    "password":"Malik852?!?",
}

def register_user(username, email, password):
    try:
        # Hash the password securely using bcrypt
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

        # Establish a database connection
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()

        # Define an SQL query to insert user data into the 'users' table
        insert_query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s);"

        # Execute the query with the provided user data
        cursor.execute(insert_query, (username, email, hashed_password))

        # Commit the transaction to save the changes in the database
        connection.commit()

        # Close the cursor and database connection
        cursor.close()
        connection.close()

        return True  # Registration successful
    except Exception as error:
        print(f"Error registering user: {error}")
        return False  # Registration failed

@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        username = data["username"]
        email = data["email"]
        password = data["password"]

        if register_user(username, email, password):
            return jsonify({"message": "Registration successful"}), 200
        else:
            return jsonify({"error": "Registration failed"}), 500
    except Exception as error:
        print(f"Registration error: {error}")
        return jsonify({"error": "Registration failed"}), 500

if __name__ == "__main__":
    app.run()
