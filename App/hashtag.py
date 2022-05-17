# 2022 COMP90024 Group 33 

# Team members:

# Ke Yang (Student ID: 1219623) - city: Anhui

# Yimeng Liu (Student ID: 1074206) - city: Guangdong

# Jintong Liu (Student ID: 1074498) - city: Hebei

# Keang Xu (Student ID: 1008807) - city: Hubei

# Xinwei Qian (Student ID: 1068271) - city: Jiangsu


from cloudant.client import CouchDB
from cloudant.view import View
from cloudant.result import Result
import json
from collections import Counter
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer

def couchdb_init():
    USERNAME = 'user'
    PASSWORD = 'pass'
    client = CouchDB(USERNAME, PASSWORD, url='http://172.26.132.223:5984', connect=True)
    return client

def calculate_city_score(hashtag_list):
    text = ""
    for hashtag in hashtag_list:
        text = text + " " + hashtag["name"]
    sia = SentimentIntensityAnalyzer()
    score = sia.polarity_scores(text)
    return score

def hashtags_analysis():
    # count hashtags
    citys = {}
    dbname = ["db_melbourne", "db_sydney", "db_adelaide", "db_darwin", "db_brisbane"]
    design_hashtag_doc= '''
    {
      "_id" : "_design/hash",
      "language": "javascript",
      "views" : {
        "count_hash":{
          "map": "function(doc){if (doc.lang) {
        
            if (doc.entities) {
                if (doc.entities.hashtags) {
                    if (doc.entities.hashtags.length > 0) {
                        for (var idx in doc.entities.hashtags) {
                            emit(doc.entities.hashtags[idx].text, 1);
                        }
                    }
                
                }
            }
        }
        }",  
          "reduce" : "_count"}
      }
    }
    '''
    client = couchdb_init()
    for city in dbname:
        citydb = client[city]
        hashtag_num = {}
        top_hashtags = []
        json_data = json.loads(design_hashtag_doc, strict=False)
        if not json_data['_id'] in citydb:
            citydb.create_document(json_data)

        create_view = View(citydb['_design/hash'], 'count_hash')
        with create_view.custom_result(group=True) as results:
            for result in results:
                hashtag_num[result['key']] = result['value']

            hashtag_sorted = dict(sorted(hashtag_num.items(), key=lambda item: item[1], reverse = True)[:10])
            
        for key in hashtag_sorted:
            format_dic = {}
            format_dic["name"] = key
            format_dic["value"] = hashtag_sorted[key]
            top_hashtags.append(format_dic)
        citys[city] = top_hashtags

    dict_change = {"db_melbourne": "melbourne","db_sydney": "sydney", "db_brisbane": "brisbane", "db_darwin": "darwin","db_adelaide": "adelaide"}
    for old, new in dict_change.items():
        citys[new] = citys.pop(old)
    
    
    return citys