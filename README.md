<h1 align="center">Welcome to Archivum:wave:</h1>
<p>
</p>

> Archivum is a Django & React.js web application that displays a collection of lookbooks from various clothing brands where users are able to log in and share & like their favorite looks

## :sparkles: Demo

https://youtu.be/PruHZXClimU

### Demo Screenshots

![Home](/preview/frontend1.png)
![Profile](/preview/frontend2.png)
![Lookbook Season](/preview/frontend3.png)
![Brand API](/preview/backend1.png)
![User API](/preview/backend2.png)

### Frontend

- React v16
- React Router v5

### Routes

```
List of available routes

* /
* /register/
* /login/
* /password/reset/
* /password/change/<uidb64>/<token>/
* /profile/
* /profile/update/
* /<username>/profile/
* /<brandname>/
* /<brandname>/<season>/
* /<brandname>/<season>/<picture_index>/
```

### Backend

- Django v3.01
- Django-rest-framework v3.11

### API endpoints

```
List of available API

* /api/brands/
* /api/brands/<brandname>/
* /api/brands/<brandname>/lookbooks/
* /api/brands/<brandname>/lookbooks/<season>/
* /api/brands/<brandname>/lookbooks/<season>/<uuid>/
* /api/brands/upload/
* /api/users/
* /api/users/register
* /api/users/<username>/
* /api/users/<username>/update/
* /api/users/<username>/delete/
* /rest-auth/login/
* /rest-auth/logout/
* /rest-auth/password/reset/
* /password/change/<uidb64>/<token>/
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
EMAIL_HOST_USER
EMAIL_HOST_PASSWORD
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

## Backend Testing

```
cd backend
pytest
```

- Coverage reports are outputted as html files. If you'd like to view it, launch `Archivum/backend/htmlcov/index.html` in browser.

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
