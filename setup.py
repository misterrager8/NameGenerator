import setuptools

setuptools.setup(
    name="NameGenerator",
    version="1.0.0",
    long_description=open("README.md").read(),
    license=open("LICENSE.md").read(),
    entry_points={"console_scripts": ["namegen=name_generator.__main__:cli"]},
)
