from flask import Flask, request, redirect, render_template

app = Flask(__name__)


@app.route('/')
def choose_number():
    return render_template('index.html')


@app.route('/game', methods=['POST', 'GET'])
def memory_cards():
    number_of_cards = int(request.form['choosen_num']) *2
    return render_template('index.html', number_of_cards=number_of_cards)


if __name__ == '__main__':
    app.run(
        debug=True,
        port=5000
    )