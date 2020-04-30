import requests

import copy
import threading
import time

class UsInfos:
    def __init__(self, url = 'https://covidtracking.com/api/v1/states/current.json'):
        self.url = url
        self.data = []
        self.to_remove = ['hash', 'notes']
        self.lock = threading.Lock()
        self.t = threading.Thread(target=self._do_work, args=())
        self.t.daemon = True
        self.t.start()

    def _do_work(self):
        while True:
            self._get_us_infos()
            time.sleep(120)

    def _get_us_infos(self):
        try:
            page = requests.get(self.url)
            data = page.json()
            for elem in data:
                for key in self.to_remove:
                    del elem[key]
            self.lock.acquire()
            try:
                self.data = copy.deepcopy(data)
            finally:
                self.lock.release()
        except Exception as e:
            pass

    def get_data(self):
        data = []
        self.lock.acquire()
        try:
            data = copy.deepcopy(self.data)
        finally:
            self.lock.release()
        return data
