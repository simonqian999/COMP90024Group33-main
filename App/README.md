# COMP90015_2022_SM1_Assignment2

# Group Members:  
- Ke Yang (Student ID: 1219623) - city: Anhui
- Yimeng Liu (Student ID: 1074206) - city: Guangdong
- Jintong Liu (Student ID: 1074498) - city: Hebei
- Keang Xu (Student ID: 1008807) - city: Hubei
- Xinwei Qian (Student ID: 1068271) - city: Jiangsu

## Directory structure
## Repo Structure 
- `/data`
  - `/language` : preprocessing language distribution in 5 different cities 
  - And some processed old tweets data stored in CSV 
- `/old_tweets`
  - Code used to process the old tweet data
- `/static`
  - `/css`: CSS styles for frontend
  - `/font`:  font for frontend
  - `/geo`: australia geograohical map
  - `/images`: frontend background image 
  - `/js`: js for frontend web
  - `/json`: language code json
  - `/picture`: frontend loading images
- `/templates` : template for frontend
- `/test`: unused analysis code


## How to run
### Ubuntu
Using the following command to run the app
1. ```sh
   cd App
   ```
2. ```sh
   python3 -m venv venv
   ```
3. ```sh
   . venv/bin/activate
   ```
4. ```sh
   pip install -r requirements.txt
   ```
5. ```sh
   pip install flask
   ```
6. ```sh
   pip install python-dotenv
   ```
7. ```sh
   flask run
   ```

