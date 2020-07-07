import requests
import csv
from io import StringIO
from datetime import datetime, timedelta

from collections import Counter

import random
import string

import sys

import copy
import threading
import time

class DailyReports:
    def __init__(self):
        self.data = []
        self.lock = threading.Lock()
        self.t = threading.Thread(target=self._do_work, args=())
        self.t.daemon = True
        self.t.start()

    def _do_work(self):
        while True:
            self._get_dailyreports()
            time.sleep(120)

    def _get_dailyreports(self):
        try:
            tmp = self._get_daily_reports(self._get_date_string())
            if tmp['success'] != True:
                raise Exception('ERROR')
            country_names = Counter(elem['Country_Region'] for elem in tmp['data']).keys()
            resp = [{'Country_Region': country_name, 'Active': 0, 'Confirmed': 0, 'Deaths': 0, 'Recovered': 0} for country_name in country_names]
            for elem in tmp['data']:
                idx = next(i for i, x in enumerate(resp) if x['Country_Region'] == elem['Country_Region'])
                resp[idx]['Active'] += int(elem['Active'] if elem['Active'] != '' else '0')
                resp[idx]['Confirmed'] += int(elem['Confirmed'])
                resp[idx]['Deaths'] += int(elem['Deaths'])
                resp[idx]['Recovered'] += int(elem['Recovered'])
            tmp['data'] = sorted(resp, key=lambda k: k['Confirmed'], reverse=True)
            self.lock.acquire()
            try:
                self.data = copy.deepcopy(tmp)
            finally:
                self.lock.release()
        except:
            pass


    def _get_date_string(self):
        dt = datetime.now() - timedelta(days=1)
        return "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/{}.csv".format(dt.strftime("%m-%d-%Y"))

    def _get_daily_reports(self, url: str):
        resp = {
            'success': False,
            'data': []
        }
        try:
            column_names, data = self._get_data_from_url(url)
            data_formated = self._data_to_json(column_names, data)
            resp['data'] = data_formated
            resp['total_death'] = sum(int(elem['Deaths']) for elem in data_formated)
            resp['total_recovered'] = sum(int(elem['Recovered']) for elem in data_formated)
            resp['total_confirmed'] = sum(int(elem['Confirmed']) for elem in data_formated)
            resp['nb_countries'] = len(Counter(elem['Country_Region'] for elem in data_formated).keys())
            resp['success'] = True
        except Exception as e:
            raise Exception(str(e))
        return resp

    def _get_data_from_url(self, url: str, delimiter=',', quotechar='"'):##############################
        try:
            page = requests.get(url)
            csvreader = csv.reader(StringIO(str(page.text)), delimiter=delimiter, quotechar=quotechar)
            csvreader_lst = list(csvreader)
            return csvreader_lst[0], csvreader_lst[1:]
        except:
            raise Exception("Not able to get data")

    def _data_to_json(self, column_names: list, data: list):###########################################
        return [{column_names[idx]:col for idx, col in enumerate(row)} for row in data]################

    def get_data(self):
        tmp = []
        self.lock.acquire()
        try:
            tmp = copy.deepcopy(self.data)
        finally:
            self.lock.release()
        return tmp
