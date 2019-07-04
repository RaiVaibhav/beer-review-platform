# Beer Review App

- A platform which is build on top of Angular 7 and Django 2.1.2 and helps user in review their experience with beers and track record of all their previous reviews.
- Start app `Register > Verify account (use backend/django logs) > Login >     Review`.
- Backend endpoints are authenticated using [`djangorestframework-jwt`](https://github.com/GetBlimp/django-rest-framework-jwt)

- Using [`django-rest-auth`](https://github.com/Tivix/django-rest-auth) auth endpoints are pre-integrated.

- In frontend authenticaed state is managed using (JWT token is being stored in local storage) [`ngrx store`](https://ngrx.io/guide/store)

- [`Angular material`](https://material.angular.io/) is being used for web interface and responsiveness.


## Run Backend

- Clone repository
- Create and enable a virtual environment (python3)

```bash

$ cd backend
$ pip install -r requirements.txt
$ python manage.py makemigrations
# If you are using your own database
$ python manage.py migrate 
# If you are using your own database
```
(Currenlty from admin page you will have to manually create a bear names, for the testing purpose you can directly use `database` which is in root of `backend` i.e., run `python manage.py runserver` with username-`test123`    password-`qwerty@123` without migrations and migrate step)

## Run Frontend

In new terminal window -

```bash
$ cd frontend
$ npm i
$ ng serve
# or npm start

```

## Work needs to be done

Currently this plaatform don't give a option to upload the image of the beer during review (why? `Django creates a string field in the database (usually VARCHAR), containing the reference to the actual file which is being uploaded, which limits the dynamic storage behaviour`).

### Motivation
- Add a feature to upload image of beer(during review) to save it on custom   server (like AWS S3) and save the mapped url in django backend.

- Custome django command to populate the bear names.


- *Update* -> Added beta version of file upload capability (using media storage)
- *Update* -> Add s3 support for the image upload (under progress - add auth support for image url from s3) option to run it- 


First enable the created virtual environment, reinstall requirements using

```bash

$ cd backend
$ pip install -r requirements.txt
$ python manage.py makemigrations
# If you are using your own database
$ python manage.py migrate 
# If you are using your own database

```
- First create a s3 bucket without any permission , under the                 Permissions>Access control List>Public Access>Everyone select `List objects` and save

```bash
AWS_ACCESS_KEY_ID = 'your iam access key id'
AWS_SECRET_ACCESS_KEY = 'your iam secret access key'
AWS_STORAGE_BUCKET_NAME = 'bucket name'

```
Add above configuration in your settings.py file of `backend` i.e., (backend>sample>settings.py)


- Run `python manage.py runserver`