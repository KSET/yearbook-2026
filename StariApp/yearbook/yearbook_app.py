import json
import os

from flask import Flask, render_template, g

app = Flask(__name__)
app.config.from_mapping(
        SECRET_KEY='dev',
    )

YEARS = ['2016', '2019', '2022']


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")


@app.route('/<year>', methods=['GET'])
def gallery_index(year):
    if year in YEARS:
        g.year = year
    return render_template('index.html')


@app.route('/<year>/<section>/', methods=['GET'])
def gallery_section_index(year, section):
    if year in YEARS:
        g.year = year

    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "static/json/%s" % year, "%s.json" % section)
    data = json.load(open(json_url, encoding='utf-8'))
    return render_template('members_gallery.html', members_data=data, section=section)


@app.context_processor
def inject_user():
    return dict(years=YEARS)


if __name__ == '__main__':
    app.run()
