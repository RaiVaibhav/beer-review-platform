# Beer Review App

- A platform which is build on top of Angular 7 and Django 2.1.2 and helps user in review their experience with beers and track record of all their previous experience.
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