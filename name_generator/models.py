import random
from pathlib import Path


class Generator:
    @classmethod
    def get_adjectives(cls) -> list:
        return [
            i.strip().lower()
            for i in open(Path(__file__).parent / "adjectives.txt").readlines()
            if i.strip()
        ]

    @classmethod
    def get_nouns(cls) -> list:
        return [
            i.strip().lower()
            for i in open(Path(__file__).parent / "nouns.txt").readlines()
            if i.strip()
        ]

    @classmethod
    def generate(cls, format_: str = "pascal"):
        if format_ == "pascal":
            return f"{random.choice(Generator.get_adjectives()).capitalize()}{random.choice(Generator.get_nouns()).capitalize()}"
        elif format_ == "kabab":
            return f"{random.choice(Generator.get_adjectives())}-{random.choice(Generator.get_nouns())}"
        elif format_ == "camel":
            return f"{random.choice(Generator.get_adjectives())}{random.choice(Generator.get_nouns()).capitalize()}"
        elif format_ == "snake":
            return f"{random.choice(Generator.get_adjectives())}_{random.choice(Generator.get_nouns())}"
