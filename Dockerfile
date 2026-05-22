FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY server/ server/

EXPOSE 8047

CMD ["python", "server/wsgi.py"]