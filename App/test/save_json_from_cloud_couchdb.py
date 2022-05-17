from cloudant.client import CouchDB
import cloudant
import json
import time
from tqdm import tqdm

def couchdb_init():
    USERNAME = 'user'
    PASSWORD = 'pass'
    client = CouchDB(USERNAME, PASSWORD, url='http://172.26.132.223:5984', connect=True)
    return client
db_name = ["db_adelaide","db_brisbane","db_darwin","db_melbourne","db_sydney"]
for i in db_name:
    time_start=time.time()
    client = couchdb_init()
    dbname = i
    citydb = client[dbname]
    file_name = dbname + ".json"
    db_city_dict = {}
    doc_count =  citydb.doc_count()
    print("start to save",dbname,"we get",doc_count,"lines")
    it = iter(citydb) 
    for i in tqdm(range(doc_count)):
        line = next(it)
        db_city_dict[line['_id']] = line
    with open(file_name, "w") as outfile:
        json.dump(db_city_dict, outfile)
    time_end=time.time()
    print("save success",file_name)
    print('time cost',time_end-time_start,'s')