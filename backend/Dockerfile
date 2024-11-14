FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV DATABASE_URL=postgres://postgres:root@db:5432/refill_system  

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]