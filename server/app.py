from collections import Counter

import random
import string

import sys

from geojson import Point


from flask import Flask, jsonify, send_file, request
from flask_cors import CORS

import time

import os
import datetime

import timeseries
import dailyreports
import qrcode_gen
import us_infos


d = dailyreports.DailyReports()
ts_confirmed = timeseries.TimeSeriesConfirmed()
ts_deaths = timeseries.TimeSeriesDeaths()
ts_recovered = timeseries.TimeSeriesRecovered()
us = us_infos.UsInfos()
time.sleep(2)


app = Flask(__name__)
app.config["SECRET_KEY"] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))
CORS(app)


@app.errorhandler(404)
def not_found(e):
    return {'success': False, 'message': str(e)}

@app.route('/get_us_infos', methods=['POST', 'GET'])
def get_us_infos():
    return jsonify(us.get_data())

@app.route('/get_qrcode', methods=['POST', 'GET'])
def get_qrcode():
    print(request.json, file=sys.stderr)
    #{'surname': 'surname', 'name': 'name', 'birthdate': '2020-04-08', 'birthplace': 'azert', 'address': 'dfghj', 'city': 'city', 'postcode': '124', 'check': 0, 'dateOut': '2020-05-01', 'timeOut': ''}
    try:
        path = qrcode_gen.generate_qrcode(
            datetime.datetime(year=2020, month=4, day=28, hour=15, minute=35),
            request.json['surname'],
            request.json['name'],
            datetime.datetime.strptime(request.json['birthdate'], '%Y-%M-%d'),#datetime.datetime(year=1970, month=1, day=1),
            request.json['birthplace'],
            '{} {} {}'.format(request.json['address'], request.json['postcode'], request.json['city']),#'999 avenue de france 75001 Paris',
            datetime.datetime(year=2020, month=4, day=28, hour=15, minute=34),
            ['travail'])
        print('successsss', file=sys.stderr)
        return {'success': True, 'path': 'localhost:5000/' + str(path)}
    except Exception as e:
        print(e, file=sys.stderr)
        return {'success': False}

@app.route('/daily_reports', methods=['POST', 'GET', 'OPTIONS'])
def daily_reports():
    return jsonify(d.get_data())

@app.route('/time_series_confirmed', methods=['POST', 'GET'])
def time_series_confirmed():
    return {'success': True, 'data': ts_confirmed.get_data()}

@app.route('/time_series_death', methods=['POST', 'GET'])
def time_series_death():
    return {'success': True, 'data': ts_deaths.get_data()}

@app.route('/time_series_recovered', methods=['POST', 'GET'])
def time_series_recovered():
    return {'success': True, 'data': ts_recovered.get_data()}

@app.route('/map', methods=['POST', 'GET'])
def map():
    return {'success': True, 'data': []}
    """tmp = get_daily_reports("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{}.csv".format(get_date_string()))
    
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
    return resp['data']"""

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
