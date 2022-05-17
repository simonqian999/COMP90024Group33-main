# 2022 COMP90024 Group 33 

# Team members:

# Ke Yang (Student ID: 1219623) - city: Anhui

# Yimeng Liu (Student ID: 1074206) - city: Guangdong

# Jintong Liu (Student ID: 1074498) - city: Hebei

# Keang Xu (Student ID: 1008807) - city: Hubei

# Xinwei Qian (Student ID: 1068271) - city: Jiangsu


import time

from cloudant.client import CouchDB
from textblob import TextBlob
import nltk
import json
import os
from datetime import datetime
USERNAME = 'admin'
PASSWORD = 'comp90024'
client = CouchDB(USERNAME, PASSWORD, url='http://127.0.0.1:5984/', connect=True)


def couchdb_init():
    USERNAME = 'admin'
    PASSWORD = 'comp90024'
    client = CouchDB(USERNAME, PASSWORD, url='http://127.0.0.1:5984', connect=True)
    return client

def create_db():
    # create a database for each city   
    name = "comp90024_test_2"
    db = client.create_database(name)



def process_and_save(client):
    # client = couchdb_init()
    dbname = "comp90024_test_1"
    citydb = client[dbname]
    json_name = "../data/tweet_4_12_clear_all.json"
    with open(json_name,'r',encoding='utf-8') as f:
        json_data = json.load(f)
    len_json = len(json_data.keys())
    #print(len_json)
    for i in range(len_json):
        line = json_data[str(i)]
        date = line["created_at"]
        author_id = line["author_id"]
        process_json = {"_id": str(line["id"]), "date": date,
                        "timezone": "+0000", "user_id": author_id,
                        "tweet": line["text"],
                        "language": line["lang"],
                        "geo": line["geo"],
                        "attachments":line["attachments"]
                        }
        doc = citydb.create_document(process_json)
        
    print('finish the saving part')

