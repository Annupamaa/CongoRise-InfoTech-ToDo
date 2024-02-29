from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    task_text = request.json.get('task')
    if task_text:
        tasks.append(task_text)
        return jsonify({'message': 'Task added successfully'}), 201
    else:
        return jsonify({'error': 'Task text is required'}), 400

@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    if 0 <= index < len(tasks):
        del tasks[index]
        return jsonify({'message': 'Task deleted successfully'}), 200
    else:
        return jsonify({'error': 'Invalid task index'}), 404

if __name__ == '__main__':
    app.run(debug=True)
