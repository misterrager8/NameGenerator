import webbrowser

import click
import pyperclip

from . import config, create_app
from .models import Generator


@click.group()
def cli():
    pass


@cli.command()
@click.option("--case", "-c", type=click.Choice(["pascal", "snake", "camel", "kebab"]))
def generate(case="pascal"):
    name_ = Generator.generate(case)
    pyperclip.copy(name_)
    print(name_)


@cli.command()
@click.option("--debug", "-d", is_flag=True)
def web(debug: bool):
    app = create_app(config)
    if not debug:
        webbrowser.open(f"http://localhost:{config.PORT}")
    app.run(debug=debug, port=config.PORT)
