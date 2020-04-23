from collections import Counter

import random
import string

import sys

from geojson import Point


from flask import Flask, jsonify
from flask_cors import CORS

import time

import timeseries
import dailyreports


d = dailyreports.DailyReports()
ts_confirmed = timeseries.TimeSeriesConfirmed()
ts_deaths = timeseries.TimeSeriesDeaths()
ts_recovered = timeseries.TimeSeriesRecovered()
time.sleep(2)


app = Flask(__name__)
app.config["SECRET_KEY"] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))
CORS(app)


@app.errorhandler(404)
def not_found(e):
    return {'success': False, 'message': str(e)}

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
