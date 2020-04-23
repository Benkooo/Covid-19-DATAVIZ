import requests
import csv
from io import StringIO
from datetime import datetime

import copy
import threading
import time

class TimeSeries:
    def __init__(self, url: str):
        self.url = url
        self.data = []
        self.lock = threading.Lock()
        self.t = threading.Thread(target=self._do_work, args=())
        self.t.daemon = True
        self.t.start()

    def _do_work(self):
        while True:
            self._get_time_series()
            time.sleep(120)

    def _get_data_from_url(self, delimiter=',', quotechar='"'):#################################################
        try:
            page = requests.get(self.url)
            csvreader = csv.reader(StringIO(str(page.text)), delimiter=delimiter, quotechar=quotechar)
            csvreader_lst = list(csvreader)
            return csvreader_lst[0], csvreader_lst[1:]
        except:
            raise Exception("Not able to get data")

    def _data_to_json(self, column_names: list, data: list):
        return [{column_names[idx]:col for idx, col in enumerate(row)} for row in data]

    def _get_date_from_list(self, data: list):
        date_lst = []
        for elem in data:
            try:
                dt = datetime.strptime(elem, "%m/%d/%y")
                date_lst.append({'date': elem, 'World': 0})
            except:
                continue
        return date_lst

    def _time_series_dict(self, data):
        resp = sorted(self._get_date_from_list(data[0]), key=lambda k: datetime.strptime(k['date'], "%m/%d/%y"))
        for elem in data:
            country = elem['Country/Region']
            for key, val in elem.items():
                try:
                    idx = next(i for i, x in enumerate(resp) if x['date'] == key)
                    resp[idx]['World'] += int(val)
                    resp[idx][country] = resp[idx][country] + int(val) if country in resp[idx] else int(val)
                except:
                    continue
        return resp

    def _get_time_series(self):
        try:
            column_names, data = self._get_data_from_url()
            data = self._data_to_json(column_names, data)
            tmp = self._time_series_dict(data)
            self.lock.acquire()
            try:
                self.data = copy.deepcopy(tmp)
            finally:
                self.lock.release()
        except Exception as e:
            pass

    def get_data(self):
        tmp = []
        self.lock.acquire()
        try:
            tmp = copy.deepcopy(self.data)
        finally:
            self.lock.release()
        return tmp

class TimeSeriesConfirmed(TimeSeries):
    def __init__(self):
        TimeSeries.__init__(self, "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")

class TimeSeriesDeaths(TimeSeries):
    def __init__(self):
        TimeSeries.__init__(self, "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")

class TimeSeriesRecovered(TimeSeries):
    def __init__(self):
        TimeSeries.__init__(self, "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")
