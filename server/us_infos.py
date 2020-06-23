import requests

import copy
import threading
import time

import sys


class UsInfos:
    def __init__(self, url = 'https://covidtracking.com/api/v1/states/current.json'):
        self.url = url
        self.data = []
        self.to_remove = ['hash']
        self.super_dict = {
            'AL': 'Alabama',
            'AK': 'Alaska',
            'AZ': 'Arizona',
            'AR': 'Arkansas',
            'CA': 'California',
            'CO': 'Colorado',
            'CT': 'Connecticut',
            'DE': 'Delaware',
            'FL': 'Florida',
            'GA': 'Georgia',
            'HI': 'Hawaii',
            'ID': 'Idaho',
            'IL': 'Illinois',
            'IN': 'Indiana',
            'IA': 'Iowa',
            'KS': 'Kansas',
            'KY': 'Kentucky[E]',
            'LA': 'Louisiana',
            'ME': 'Maine',
            'MD': 'Maryland',
            'MA': 'Massachusetts[E]',
            'MI': 'Michigan',
            'MN': 'Minnesota',
            'MS': 'Mississippi',
            'MO': 'Missouri',
            'MT': 'Montana',
            'NE': 'Nebraska',
            'NV': 'Nevada',
            'NH': 'New Hampshire',
            'NJ': 'New Jersey',
            'NM': 'New Mexico',
            'NY': 'New York',
            'NC': 'North Carolina',
            'ND': 'North Dakota',
            'OH': 'Ohio',
            'OK': 'Oklahoma',
            'OR': 'Oregon',
            'PA': 'Pennsylvania[E]',
            'RI': 'Rhode Island[F]',
            'SC': 'South Carolina',
            'SD': 'South Dakota',
            'TN': 'Tennessee',
            'TX': 'Texas',
            'UT': 'Utah',
            'VT': 'Vermont',
            'VA': 'Virginia[E]',
            'WA': 'Washington',
            'WV': 'West Virginia',
            'WI': 'Wisconsin',
            'WY': 'Wyoming',
            'DC': 'District of Columbia',
            'PR': 'Puerto Rico',
            'AS': 'American Samoa',
            'GU': 'Guam',
            'MP': 'Northern Mariana Islands',
            'VI': 'U.S. Virgin Islands'
        }

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
            #print(data, file=sys.stderr)
            print('before for loop', file=sys.stderr)
            for elem in data:
                for key in self.to_remove:
                    del elem[key]
                elem['state'] = self.super_dict[elem['state']]
            print('before total_test', file=sys.stderr)
            totalTests = sum(int(elem['total']) for elem in data)
            print('print befor data = ', file=sys.stderr)
            data = {'success': True, 'data': data, 'totalTests': totalTests}
            print('before lock acquire', file=sys.stderr)
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
