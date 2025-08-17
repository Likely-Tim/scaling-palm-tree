#!/bin/bash
set -e

docker-compose down
pip freeze > requirements.txt
docker-compose up --build -d
