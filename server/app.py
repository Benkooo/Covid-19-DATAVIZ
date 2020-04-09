import requests
import csv
from io import StringIO
from datetime import datetime, timedelta


import random
import string


from flask import Flask

"""
https://stackoverflow.com/questions/2227169/are-python-built-in-containers-thread-safe
http://effbot.org/zone/thread-synchronization.htm
"""

def get_date_string():
    dt = datetime.now() - timedelta(days=1)
    return dt.strftime("%m-%d-%Y")

def data_to_json(column_names, data):
    return [{column_names[idx]:col for idx, col in enumerate(row)} for row in data]

def get_data_from_url(url, delimiter=',', quotechar='"'):
    try:
        page = requests.get(url)
        csvreader = csv.reader(StringIO(str(page.text)), delimiter=delimiter, quotechar=quotechar)
        csvreader_lst = list(csvreader)
        return csvreader_lst[0], csvreader_lst[1:]
    except:
        raise Exception("Not able to get data")

def get_daily_reports(url):
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
        resp['success'] = True
    except:
        return resp
    return resp

def get_time_series(url):
    resp = {
        'success': False,
        'data': []
    }

    try:
        column_names, data = get_data_from_url(url)
        resp['data'] = data_to_json(column_names, data)
        resp['success'] = True
    except:
        return resp
    return resp

app = Flask(__name__)
app.config["SECRET_KEY"] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))


@app.errorhandler(404)
def not_found(e):
    return {'success': False, 'message': 'route not found'}

@app.route('/daily_reports', methods=['POST', 'GET'])
def daily_reports():
    return get_daily_reports("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{}.csv".format(get_date_string()))

@app.route('/time_series_confirmed', methods=['POST', 'GET'])
def time_series_confirmed():
    return get_time_series("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")

@app.route('/time_series_death', methods=['POST', 'GET'])
def time_series_death():
    return get_time_series("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")

@app.route('/time_series_recovered', methods=['POST', 'GET'])
def time_series_recovered():
    return get_time_series("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
