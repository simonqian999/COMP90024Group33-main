# 2022 COMP90024 Group 33 

# Team members:

# Ke Yang (Student ID: 1219623) - city: Anhui

# Yimeng Liu (Student ID: 1074206) - city: Guangdong

# Jintong Liu (Student ID: 1074498) - city: Hebei

# Keang Xu (Student ID: 1008807) - city: Hubei

# Xinwei Qian (Student ID: 1068271) - city: Jiangsu


from distutils import text_file
from cloudant.client import CouchDB
from cloudant.view import View
from cloudant.result import Result
import json
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer
import re
import time
import datetime
import requests


def textProcess(text):
    text = re.sub(r'(https|http)?:\/\/(\w|\.|\/|\?|\=|\&|\%)*\b', " ", text)  # remove URL
    text = text.lower() # lowercase the text
#         text = re.sub(r'@[^ ]+', ' ', text) # replace mention
    # text = re.sub(r'#', '', text) # remove hashtag
    text = re.sub(r'([a-z])\1{2,}', r'\1', text) # character normalization
    text = re.sub(r'[^a-z#@0-9 ]', ' ', text) # remove non-letter characters
    text = text.strip()
    return text

# def couchdb_init():
#     USERNAME = 'user'
#     PASSWORD = 'pass'
#     client = CouchDB(USERNAME, PASSWORD, url='http://172.26.132.223:5984', connect=True)
#     return client

def calculate_city_score(text):
    text = textProcess(text)
    sia = SentimentIntensityAnalyzer()
    score = sia.polarity_scores(text)
    return score



def get_sample_tweets(db_name, condition):
    get_tweets_url = "http://{username}:{password}@{host}:{port}/{database}/_find"
    host = "172.26.132.223"
    port = "5984"
    username = "user"
    password = "pass"

    return json.loads(requests.post(
        get_tweets_url.format(username=username,
                               password=password, 
                               host=host, port=port,
                               database=db_name),
                    headers={"Content-Type": "application/json"},
                    data=json.dumps(condition)
  ).content.decode("utf-8"))["docs"]

def get_new_tweets(db_name,num_of_tweets):
    condition = {
   "selector": {
      "_id": {
         "$gt": None
      }
   },
   "fields": [
      "text"
   ],
   "limit": num_of_tweets,
   "sort": [
      {
         "_id": "desc"
      }
   ]
}
    return get_sample_tweets(db_name, condition)

def tweet_analysis():
#     # count hashtags
#     citys = {}
    dbname = ["db_melbourne", "db_sydney", "db_adelaide", "db_darwin", "db_brisbane"]
#     dbname = ["db_darwin", "db_sydney", "db_adelaide", "db_darwin", "db_brisbane"]
#     design_hashtag_doc= '''
#     {
#         "_id" : "_design/text",
#         "language": "javascript",
#         "views" : {
#           "new_view" : {
#             "map": "function(doc){emit([doc.text, doc.created_at], 1)}", 
#             "reduce" : "_count"}
#         }
#     }
#     '''
#     client = couchdb_init()


    # nums = []
    numCity = {
            "db_melbourne": 5300,
            "db_sydney": 5500,
            "db_brisbane": 3000,
            "db_darwin": 160,
            "db_adelaide": 1100
            }
    for city in dbname:
        
        # citydb = client[city]
        # json_data = json.loads(design_hashtag_doc, strict=False)
        # client = couchdb_init()
        
        text_dic = {}
        compound_score = []
        neg_score = []
        neu_score = []
        pos_score = []
        text_dic = get_new_tweets(city, numCity[city])
        
        # if not json_data['_id'] in citydb:
            
        #     citydb.create_document(json_data)

        # create_view = View(citydb['_design/text'], 'new_view')


        # sevenDayAgo = (datetime.datetime.now() - datetime.timedelta(days = 7))
        # sevenDayAgoTimeStamp = int(time.mktime(sevenDayAgo.timetuple()))


        # with create_view.custom_result(group=True) as results:
        #     index = 0
            
        #     for result in results:                  
        #         create_time = result['key'][1]

        
        #         #"Tue Apr 26 14:56:27 +0000 2022",
        #         items = create_time.split(' ')
        #         # items =["Tue","Apr",....,"+0000","2022"]
        #         # 6 
        #         process_time = ""
        #         for i in range(len(items)):
        #             if i!=4:
        #                 process_time = process_time + items[i] + " "
        #         length = len(process_time)
        #         process_time = process_time[0:length-1]

    
        #         try:
        #             timestamp = int(time.mktime(time.strptime(process_time,"%a %b %d %H:%M:%S %Y")))
        #         except:
        #             print(process_time)
        #             continue
     
                
                
        #         if timestamp > sevenDayAgoTimeStamp:
        #             text_dic[index]= result['key'][0]
        #             index += 1
                
                
        c_score_sum = 0
        neg_score_sum = 0
        neu_score_sum = 0
        pos_score_sum = 0
        
        sia = SentimentIntensityAnalyzer()
        for content in text_dic.values():
            text = textProcess(content)
            score_all_dict = sia.polarity_scores(text)
            c_score_sum = c_score_sum + score_all_dict['compound']
            neg_score_sum = neg_score_sum + score_all_dict['neg']
            neu_score_sum = neu_score_sum + score_all_dict['neu']
            pos_score_sum = pos_score_sum + score_all_dict['pos']

        ave_compound_score = c_score_sum/len(text_dic.values())
        compound_score.append(ave_compound_score)
        ave_neg_score = neg_score_sum/len(text_dic.values())
        neg_score.append(ave_neg_score)
        ave_neu_score = neu_score_sum/len(text_dic.values())
        neu_score.append(ave_neu_score)
        ave_pos_score = pos_score_sum/len(text_dic.values()) 
        pos_score.append(ave_pos_score)


    
    polarity = {} 
    polarity["neg"] = neg_score
    polarity["neu"] = neu_score
    polarity["pos"] = pos_score
    
    results={}
    results["compound"] = compound_score
    results["polarity"] = polarity
    
    return results


