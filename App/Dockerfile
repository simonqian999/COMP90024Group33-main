# Dockerfile - this is a comment. Delete me if you want.
FROM python:3

ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["flask", "run"]