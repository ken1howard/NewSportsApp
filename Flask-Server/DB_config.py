from psycopg2 import connect

# Configure the database connection
db_connection = connect(
    dbname="NFL Logos",
    user="postgres",
    password="Malik852?!?",
    host="localhost",
    port="5432",  # Default PostgreSQL port
)

db_config = {
    "host":"localhost",
    "database":"Football_Stats_App",
    "user":"postgres",
    "password":"Malik852?!?",
}
