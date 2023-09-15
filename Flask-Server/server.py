from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/black')
def hello_world():
    message = "hello world!"
    return jsonify(message=message)

if __name__ == "__main__":
    app.run(debug=True)
