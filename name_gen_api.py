import click
import requests


@click.command()
@click.option("-c", "--case_", default="kebab")
def main(case_):
    adj = requests.get(
        "https://random-word-form.herokuapp.com/random/adjective"
    ).json()[0]
    noun = requests.get("https://random-word-form.herokuapp.com/random/noun").json()[0]

    match case_:
        case "pascal":
            word = f"{adj.capitalize()}{noun.capitalize()}"
        case "kebab":
            word = f"{adj}-{noun}"
        case "snake":
            word = f"{adj}_{noun}"
        case "camel":
            word = f"{adj}{noun.capitalize()}"

    click.secho(word, fg="magenta")
