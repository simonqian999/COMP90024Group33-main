import tweepy
import json
import time
import random
from datetime import datetime
from tweepy import Client
def account_info():

    account = {
        "accounts": {
            "xwqian": {
                "consumer_key": "GrmxI5klhXEdyVFueGVzscw7l",
                "consumer_secret": "x5XHP4ZKV2aqyJrzjQNoQ9Z5eMmosd0ymUKgBi3VlSOti6tGYJ",
                "access_token": "1511617716427272198-bmrfxjJuDiDPWWxC4fewGtBYYc0aZD",
                "access_token_secret": "LHDoLmnVvIkXlbjnTaitkY2Xvl8BHenmEk0J1uMhdjXqW",
                "bearer_token":"AAAAAAAAAAAAAAAAAAAAAPPBbAEAAAAAqTGj1Wqqd57XnxMzOc08jfu7TRU%3D7RHr77dxXvmaijjoSarasRzBLRdSkQzjMlTW5y9JKmCSnUexfR"
            }
        },
        "db": {
            "user": "admin",
            "password": "comp90024",
            "url": "http://127.0.0.1:5984"
        }
    }

    return account


def run_spider():
    bearer_token = (account_info())["accounts"]["xwqian"]["bearer_token"]
    print("start")
    #print(bearer_token)
    if not bearer_token:
        raise RuntimeError("Not found bearer token")
    tweet_result_dict = {}
    all_count = 0
    # if in range(20) that means 20*max_results = 2000 tweets
    # https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query
    #search tweet with melbourne
    query = "melbourne"
    #query = point_radius = c(-122.33795253639994, 47.60900846404393, 25)
    #max_results between 10-100
    max_results = 100
    #limit use to control if we next token
    limit = 30
    counter = 0
    client = Client(bearer_token)
    # https://docs.tweepy.org/en/stable/client.html#search-tweets
    #put info we need in tweet_fields
    resp = client.search_recent_tweets(query, tweet_fields=["geo","created_at","author_id","attachments","lang"], max_results=max_results)
    if resp.errors:
        raise RuntimeError(resp.errors)
    if resp.data:
        for tweet in resp.data:
            tweet_info = {}
            tweet_info["index"] = all_count
            tweet_info["text"] = tweet.text
            tweet_info["geo"] = tweet.geo
            tweet_info["author_id"] = tweet.author_id
            tweet_info["created_at"] = str(tweet.created_at)
            tweet_info["attachments"] = tweet.attachments
            tweet_info["lang"] = tweet.lang
            tweet_result_dict[all_count] = tweet_info
            #print(tweet_info)
            all_count += 1
            counter += 1

    while resp.meta["next_token"] and counter < limit:
        resp = client.search_recent_tweets(query, max_results=max_results, next_token=resp.meta["next_token"],tweet_fields=["geo","created_at","author_id"])
        if resp.errors:
            raise RuntimeError(resp.errors)
        if resp.data:
            for tweet in resp.data:
                print(tweet.__repr__())
                counter += 1
    last_id = tweet_result_dict[all_count-1]["author_id"]
    #print("last id is",last_id)
    file_name = "../data/tweet_collect_4_14.json"
    print("we get",all_count,"tweets, write to",file_name)
    with open(file_name, "w") as outfile:
        json.dump(tweet_result_dict, outfile)