<h1 align="center">Archivum</h1>
<p>
</p>

> A minimalist web application that displays a collection of lookbooks from various brands built with Django & React.js

## Demo

```
https://youtu.be/oCsnpDc2Wnc
```

<img src="https://i.imgur.com/MR6V4hG.jpg" width="350">

## Frontend

- React v16
- React Router v5

## Backend

- Django v3.01
- Django-rest-framework v3.11

## API endpoints

```
List of available API at /api
* /api/brands/
* /api/brands/{brandname}
* /api/brands/{brandname}/lookbooks/
* /api/brands/{brandname}/lookbooks/{season}/
* /api/brands/{brandname}/lookbooks/{season}/{uuid}
```

## Database & Utilities

- PostgreSQL
- AWS S3
- AWS Cloudfront

## Installation

---

Make sure the following are installed

- Python 3
- Node.js
- NPM/Yarn
- Git

#### 1. Clone the repository

```
git clone https://github.com/jdlee6/Archivum
```

#### 2. Install the required backend dependencies

```
cd archivum/backend
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

---

#### 1. Activate virtual environment

```
cd backend
source env/bin/activate
```

#### 2. Run the server and you can now access the api endpoint via http://localhost:8000/api/

```
python manage.py runserver
```

## Running Frontend on Local Server

---

#### 1. Start development server

```
cd frontend
npm start
```

## Future Developments

---

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
