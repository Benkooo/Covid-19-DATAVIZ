import requests
import csv
from io import StringIO
from datetime import datetime, timedelta

from collections import Counter

import random
import string

from geojson import Point


from flask import Flask, jsonify
from flask_cors import CORS

"""
https://stackoverflow.com/questions/2227169/are-python-built-in-containers-thread-safe
http://effbot.org/zone/thread-synchronization.htm
https://flask.palletsprojects.com/en/1.1.x/testing/
"""

class TimeSeries:
    def __init__(url: str):
        self.url = url
        self.data = []
        pass

    def do_work(self):
        while True:
            get_time_series()

    def get_time_series(self, url: str):
        try:
            column_names, data = get_data_from_url(self.url)
            ##lock
            self.data = data_to_json(column_names, data)
            ##unlock
        except:
            pass

    def get_data(self):
        ##lock et unlock
        return self.data


def get_date_string():
    dt = datetime.now() - timedelta(days=1)
    return dt.strftime("%m-%d-%Y")

def data_to_json(column_names: list, data: list):
    return [{column_names[idx]:col for idx, col in enumerate(row)} for row in data]

def get_data_from_url(url: str, delimiter=',', quotechar='"'):
    try:
        page = requests.get(url)
        csvreader = csv.reader(StringIO(str(page.text)), delimiter=delimiter, quotechar=quotechar)
        csvreader_lst = list(csvreader)
        return csvreader_lst[0], csvreader_lst[1:]
    except:
        raise Exception("Not able to get data")

def get_daily_reports(url: str):
    resp = {
        'success': False,
        'data': []
    }
    try:
        column_names, data = get_data_from_url(url)

        data_formated = data_to_json(column_names, data)
        resp['data'] = data_formated
        resp['total_death'] = sum(int(elem['Deaths']) for elem in data_formated)
        resp['total_recovered'] = sum(int(elem['Recovered']) for elem in data_formated)
        resp['total_confirmed'] = sum(int(elem['Confirmed']) for elem in data_formated)
        resp['nb_countries'] = len(Counter(elem['Country_Region'] for elem in data_formated).keys())
        resp['success'] = True
    except:
        return resp
    return resp


app = Flask(__name__)
app.config["SECRET_KEY"] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))
CORS(app)


@app.errorhandler(404)
def not_found(e):
    return {'success': False, 'message': str(e)}

@app.route('/daily_reports', methods=['POST', 'GET', 'OPTIONS'])
def daily_reports():
    return jsonify(get_daily_reports("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{}.csv".format(get_date_string())))

@app.route('/time_series_confirmed', methods=['POST', 'GET'])
def time_series_confirmed():
    return get_time_series("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")

@app.route('/time_series_death', methods=['POST', 'GET'])
def time_series_death():
    return get_time_series("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")

@app.route('/time_series_recovered', methods=['POST', 'GET'])
def time_series_recovered():
    return get_time_series("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")

@app.route('/map', methods=['POST', 'GET'])
def map():
    tmp = get_daily_reports("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{}.csv".format(get_date_string()))
    if tmp['success'] == False:
        return tmp
    resp = {
        'total_death': tmp['total_death'],
        'total_recovered': tmp['total_recovered'],
        'total_confirmed': tmp['total_confirmed'],
        'nb_countries': tmp['nb_countries'],
        'success': True
    }
    resp['data'] = []
    for elem in tmp['data']:
        tmp_ = elem
        try:
            tmp_['coords'] = Point((float(tmp_['Lat']), float(tmp_['Long_'])))
            del tmp_['Lat']
            del tmp_['Long_']
            for i in range(int(elem['Confirmed'])):
                resp['data'].append(tmp_)
        except:
            continue
            #print('#################')
            #print(tmp_['Lat'])
            #print(tmp_['Long_'])
            #print(float(tmp_['Lat']))
            #print(float(tmp_['Long_']))
            #print('#################')
    #resp['data'] = [int(elem['Confirmed']) for elem in tmp['data']]
    #print(sum(resp['data']))
    return resp

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
