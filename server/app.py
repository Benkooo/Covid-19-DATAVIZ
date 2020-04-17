import requests
import csv
from io import StringIO
from datetime import datetime, timedelta

from collections import Counter

import random
import string

import sys

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
    except Exception as e:
        print(e, file=sys.stderr)
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
    tmp = get_daily_reports("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{}.csv".format(get_date_string()))
    if tmp['success'] != True:
        return jsonify(tmp)
    country_names = Counter(elem['Country_Region'] for elem in tmp['data']).keys()
    resp = [{'Country_Region': country_name, 'Active': 0, 'Confirmed': 0, 'Deaths': 0, 'Recovered': 0} for country_name in country_names]
    for elem in tmp['data']:
        idx = next(i for i, x in enumerate(resp) if x['Country_Region'] == elem['Country_Region'])
        resp[idx]['Active'] += int(elem['Active'])
        resp[idx]['Confirmed'] += int(elem['Confirmed'])
        resp[idx]['Deaths'] += int(elem['Deaths'])
        resp[idx]['Recovered'] += int(elem['Recovered'])
    tmp['data'] = sorted(resp, key=lambda k: k['Confirmed'], reverse=True) 
    return jsonify(tmp)

def get_time_series(url: str):
    try:
        column_names, data = get_data_from_url(url)
        data = data_to_json(column_names, data)
        resp = {}
        for elem in data:
            for key, val in elem.items():
                try:
                    dt = datetime.strptime(key, "%m/%d/%y")
                    resp[key] = resp[key] + int(val) if key in resp else int(val)
                except:
                    continue
        resp = sorted([{'date': key, 'total': val} for key, val in resp.items()], key=lambda k: datetime.strptime(k['date'], "%m/%d/%y"))
        return {'success': True, 'data': resp}
    except:
        return {'success': False}

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
    resp['data'] = {'type': 'FeatureCollection', 'features': []}

    for elem in tmp['data']:
        try:
            tmp_dict = {
                'type': 'Feature',
                'geometry': Point((float(elem['Long_']), float(elem['Lat']))),
                'properties': {
                    'FIPS': int(elem['FIPS']) if elem['FIPS'] else '',
                    'Admin2': elem['Admin2'],
                    'Province_State': elem['Province_State'],
                    'Country_Region': elem['Country_Region'],
                    'Last_Update': elem['Last_Update'],
                    'Confirmed': int(elem['Confirmed']),
                    'Deaths': int(elem['Deaths']),
                    'Recovered': int(elem['Recovered']),
                    'Active': int(elem['Active']),
                    'Combined_Key': elem['Combined_Key']
                }
            }
            for i in range(int(elem['Confirmed'])):
                resp['data']['features'].append(tmp_dict)
        except Exception as e:
            #print(e, file=sys.stderr)
            continue
    return resp['data']

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
