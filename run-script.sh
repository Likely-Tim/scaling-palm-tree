#!/bin/bash
set -e

pip freeze > requirements.txt
docker-compose up --build -d
