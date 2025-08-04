from flask import jsonify, redirect, render_template_string, request, url_for
from flask_cors import cross_origin
from flask_login import UserMixin, login_user, login_required, logout_user, current_user
from . import login_bp


users = {
    'admin': {'password': 'secret'},
    'user1': {'password': 'password123'}
}

# ----- User Class -----
class User(UserMixin):
    def __init__(self, username):
        self.id = username

# Required by Flask-Login (loaded in main/app.py)
def load_user(user_id):
    if user_id in users:
        return User(user_id)
    return None


@login_bp.route('/', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        user = users.get(username)
        if user and user['password'] == password:
            login_user(User(username))
            return "Login Successful"
            #return redirect(url_for("login.dashboard"))
        return "Invalid credentials", 401

    return render_template_string("""
        <form method="post" style="display:flex; flex-direction: column; width: 200px;">
            <input name="username" placeholder="Username">
            <input name="password" type="password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
    """)

@login_bp.route('/login', methods=['POST'])
def posst_login():

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = users.get(username)
    if user and user['password'] == password:
        login_user(User(username))
        return jsonify(message="Login Successful", status=200), 200
        #return redirect(url_for("login.dashboard"))
    return jsonify(message="Invalid credentials", status = 401), 401


@login_bp.route('/dashboard')
@login_required
def dashboard():
    return f"Welcome, {current_user.id}! <a href='/logout'>Logout</a>"

@login_bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for("login.login"))