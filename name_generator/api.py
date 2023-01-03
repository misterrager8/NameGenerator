from flask import current_app, render_template, request

from .models import Generator


@current_app.route("/")
def index():
    return render_template("index.html")


@current_app.route("/generate")
def generate():
    format_ = request.args.get("format", default="pascal")
    return Generator.generate(format_)
