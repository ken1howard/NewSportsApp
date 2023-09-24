import psycopg2

# Replace with your database configuration
db_config = {
    "host": "localhost",
    "database": "Football_Stats_App",
    "user": "postgres",
    "password": "Malik852?!?",
}

def check_database_connection():
    try:
        # Establish a database connection
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()

        # Check if the connection is open
        if connection:
            print("Database connected successfully!")

        # Close the cursor and database connection
        cursor.close()
        connection.close()
    except Exception as error:
        print(f"Error connecting to the database: {error}")

# Call the function to check the database connection
check_database_connection()
