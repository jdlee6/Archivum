<h1 align="center">Welcome to Archivum:wave:</h1>
<p>
</p>

> Archivum is a minimalist web application that displays a collection of lookbooks from various clothing brands built with Django & React.js

## :sparkles: Demo
https://youtu.be/oJ7nv2pxFWY

<img src="https://imgur.com/99LusHb.jpg" width="350">

### Frontend

- React v16
- React Router v5

### Backend

- Django v3.01
- Django-rest-framework v3.11

### API endpoints

```
List of available API at /api
* /api/brands/
* /api/brands/{brandname}
* /api/brands/{brandname}/lookbooks/
* /api/brands/{brandname}/lookbooks/{season}/
* /api/brands/{brandname}/lookbooks/{season}/{uuid}
```

### Database & Utilities

- PostgreSQL
- AWS S3
- AWS Cloudfront

## :gear: Installation

Make sure the following are installed

- Python 3
- Node.js
- NPM/Yarn
- Git

#### 1. Clone the repository

```
git clone https://github.com/jdlee6/Archivum.git
```

#### 2. Install the required backend dependencies

```
cd Archivum/backend
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```

#### 3. Set environment variables

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

and change this section in settings.py to point to your local database

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'archivum',
        'USER': 'joe',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

#### 4. Install all the required frontend dependencies

```
cd ../frontend
npm install
```

## Running Backend on Local Server

#### 1. Activate virtual environment

```
cd backend
source env/bin/activate
```

#### 2. Run the server and you can now access the api endpoint via http://localhost:8000/api/

```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Running Frontend on Local Server

#### 1. Start development server

```
cd frontend
npm start
```

## Future Developments

- Archivum is still a work in progress. Please take a look at the TODO.txt to stay updated.

## Author

👤 **Joe Lee**

- Website: https://www.imjoelee.com/
- Github: [@jdlee6](https://github.com/jdlee6)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

```

```
