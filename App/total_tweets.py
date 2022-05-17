# 2022 COMP90024 Group 33 

# Team members:

# Ke Yang (Student ID: 1219623) - city: Anhui

# Yimeng Liu (Student ID: 1074206) - city: Guangdong

# Jintong Liu (Student ID: 1074498) - city: Hebei

# Keang Xu (Student ID: 1008807) - city: Hubei

# Xinwei Qian (Student ID: 1068271) - city: Jiangsu

from cloudant.client import CouchDB
from cloudant.view import View
import json
from collections import Counter

def total_twts():
    client = CouchDB('user', 'pass', url='http://172.26.132.223:5984', connect=True)
    cities = ["db_melbourne", "db_sydney", "db_adelaide", "db_darwin", "db_brisbane"]
    date = '''
    {
      "_id" : "_design/date",
      "language": "javascript",
      "views" : {
        "year_count" : {
          "map" : "function(doc){emit(doc.created_at.substr(26,30))}",
          "reduce" : "_count"}
      }
    }
    '''
    number = 0 
    total_twts = {}
    current_twts = {}
    for city in cities:
        citydb = client[city]
        djson = json.loads(date)
        if not djson['_id'] in citydb:
            citydb.create_document(djson)
        year_count = {}
        view = View(citydb['_design/date'], 'year_count')
        
        with view.custom_result(group=True) as results:
            for result in results:
                year_count[result['key']] = result['value']
                number = number + result['value']
                
        total_twts[city] = year_count
        current_twts['total_tweets'] = number
    return  total_twts, current_twts
    #
