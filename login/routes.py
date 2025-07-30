from flask import Blueprint, render_template, redirect, render_template_string, request, url_for
from flask_login import UserMixin, login_user, login_required, current_user
from . import login_bp

#login_bp = Blueprint('login', __name__, url_prefix='/login')

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


@login_bp.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        user = users.get(username)
        if user and user['password'] == password:
            login_user(User(username))
            return redirect(url_for("login.dashboard"))
        return "Invalid credentials", 401

    return render_template_string("""
        <form method="post">
            <input name="username" placeholder="Username">
            <input name="password" type="password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
    """)

@login_bp.route('/dashboard')
@login_required
def dashboard():
    return f"Welcome, {current_user.id}! <a href='/logout'>Logout</a>"