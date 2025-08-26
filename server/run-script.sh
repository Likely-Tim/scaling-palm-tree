#!/bin/bash
set -e

docker-compose down
source ./env/bin/activate && pip3 freeze > requirements.txt
docker-compose up --build -d
