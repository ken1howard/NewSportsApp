import psycopg2
import bcrypt

# Establish a database connection (replace with your database configuration)
connection = psycopg2.connect(
    host="localhost",
    database="Football_Stats_App",
    user="postgres",
    password="Malik852?!?"
)

def register_user(username, email, password):
    try:
        # Hash the password securely using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create a cursor to interact with the database
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

# Example usage:
username = "exampleUser"
email = "user@example.com"
password = "securePassword"

if register_user(username, email, password):
    print("Registration successful")
else:
    print("Registration failed")
