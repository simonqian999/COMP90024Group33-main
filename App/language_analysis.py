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

file_path = './language_code.json'

def couchdb_init():
    USERNAME = 'user'
    PASSWORD = 'pass'
    client = CouchDB(USERNAME, PASSWORD, url='http://172.26.132.223:5984', connect=True)
    return client

### get language distribution each city
def lang_count_for_city():
    with open(file_path, encoding="utf-8") as f:
      lang_code = json.load(f)
    client = couchdb_init()
    dbname = ["db_melbourne", "db_sydney", "db_adelaide", "db_darwin", "db_brisbane"]
    design_lang_doc= '''
    {
      "_id" : "_design/language",
      "language": "javascript",
      "views" : {
        "count_lang" : {
          "map" : "function(doc){emit(doc.lang)}",  
          "reduce" : "_count"}
      }
    }
    '''
    ##"options": {"partitioned": False}
    ## "map" : "function(doc){emit(doc.lang, doc)}

    lang_dict = {}
    lang_num = {}
    for city in dbname:
        citydb = client[city]
        json_data = json.loads(design_lang_doc)
        if not json_data['_id'] in citydb:
            citydb.create_document(json_data)

        create_view = View(citydb['_design/language'], 'count_lang')
        with create_view.custom_result(group=True) as results:
            for result in results:
                if result['key'] != 'en' and result['key'] != 'und':
                    lang_num[result['key']] = result['value']
            lang_sorted = sorted(lang_num.items(),key = lambda x:x[1],reverse = True)
        
        # get most frequent languages
        for i in range(len(lang_sorted)):
            for j in lang_code:
                if lang_sorted[i][0] == j['639-1']:
                    lang_sorted[i] = (j['ISO language name'].split(", ")[0],lang_sorted[i][1])
        lang_sorted_list = list(Counter(key for key, num in lang_sorted for idx in range(num)).items())
        lang_dict[city] = dict(lang_sorted_list[:10])
    
    dict_change = {"db_melbourne": "melbourne","db_sydney": "sydney", "db_brisbane": "brisbane", "db_darwin": "darwin","db_adelaide": "adelaide"}
    for old, new in dict_change.items():
        lang_dict[new] = lang_dict.pop(old)
    return lang_dict
