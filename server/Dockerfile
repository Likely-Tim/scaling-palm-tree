# Use an official Python base image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Run the application
CMD python3 manage.py migrate && \
    python3 manage.py create_superuser && \
    python3 manage.py runserver 0.0.0.0:8000