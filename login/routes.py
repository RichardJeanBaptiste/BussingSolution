from flask import Blueprint, render_template, redirect, url_for

login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/')
def login():
    return "Login Page"