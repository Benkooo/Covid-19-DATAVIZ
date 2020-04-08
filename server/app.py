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

def my_get_json(url):
    print("working")
    page = requests.get(url)
    csvreader = csv.reader(StringIO(str(page.text)), delimiter=',', quotechar='"')
    csvreader_lst = list(csvreader)
    column_names = csvreader_lst[0]

    my_json = []
    for elem in csvreader_lst[1:]:
        tmp = {}
        for idx, col in enumerate(elem):
            tmp[column_names[idx]] = col
        my_json.append(tmp)

    total_death = sum(int(elem['Deaths']) for elem in my_json)
    total_recov = sum(int(elem['Recovered']) for elem in my_json)
    total_confi = sum(int(elem['Confirmed']) for elem in my_json)
    resp = {
        'success': True,
        'data': my_json,
        'total_confirmed': total_confi,
        'total_death': total_death,
        'total_recovered': total_recov
    }
    return resp

app = Flask(__name__)
app.config["SECRET_KEY"] = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(128))

@app.route('/daily_reports', methods=['POST', 'GET'])
def daily_reports():
    return my_get_json("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{}.csv".format(get_date_string()))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
