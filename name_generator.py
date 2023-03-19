import click
import requests


@click.command()
@click.option("--verbose", "-v", is_flag=True)
@click.option("--case_", "-c", default="kebab")
@click.option("--limit", "-l", default=1)
def generate_name(verbose, case_, limit):
    words = []
    adjective = requests.get(
        "http://random-word-form.herokuapp.com/random/adjective",
        params={"count": limit},
    ).json()
    noun = requests.get(
        "http://random-word-form.herokuapp.com/random/noun", params={"count": limit}
    ).json()

    for i, j in zip(adjective, noun):
        match case_:
            case "kebab":
                words.append(f"{i}-{j}")
            case "snake":
                words.append(f"{i}_{j}")
            case "camel":
                words.append(f"{i}{j.capitalize()}")
            case "pascal":
                words.append(f"{i.capitalize()}{j.capitalize()}")

    if verbose:
        for i in words:
            click.secho(i, fg="magenta")
    else:
        return words


if __name__ == "__main__":
    generate_name()
