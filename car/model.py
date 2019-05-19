from flask import Flask
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#配置ORM
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:wkx1003@localhost/web'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '12345678'
db = SQLAlchemy(app)


class User(db.Model, UserMixin):
    __tablename__ = 'user'
    #客户信息
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    sex = db.Column(db.String(10))
    age = db.Column(db.String(10))
    id_car = db.Column(db.String(18), unique=True)
    info = db.Column(db.Text)
    phone = db.Column(db.String(11), unique=True)
    zu_car = db.Column(db.String(100))
    day = db.Column(db.String(20))
    money = db.Column(db.String(50))
    create_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    cost = db.Column(db.String(20))


class Car(db.Model, UserMixin):
    __tablename__ = 'car'
    id = db.Column(db.Integer, primary_key=True)
    car_name = db.Column(db.String(20))
    type = db.Column(db.String(20))
    p_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(20))
    phone = db.Column(db.String(11), unique=True)
    bx_date = db.Column(db.Date)
    cos = db.Column(db.String(10))
    car_state = db.Column(db.String(20))


class Driver(db.Model, UserMixin):
    __tablename__ = 'driver'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    sex = db.Column(db.String(10))
    age = db.Column(db.String(10))
    id_car = db.Column(db.String(18), unique=True)
    info = db.Column(db.Text)
    phone = db.Column(db.String(11), unique=True)
    num = db.Column(db.String(20),)
    date = db.Column(db.Date)
    fw_id = db.Column(db.String(10))
    accident = db.Column(db.String(20))


class Staff(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    info = db.Column(db.Text)
    id_car = db.Column(db.String(18), unique=True)
    phone = db.Column(db.String(11), unique=True)
    lei = db.Column(db.String(20))
    company = db.Column(db.String(50))
    sex = db.Column(db.String(10))
    age = db.Column(db.String(10))
    edu = db.Column(db.String(20))
    sc = db.Column(db.String(50))
    major = db.Column(db.String(30))
    nation = db.Column(db.String(10))
    marriage = db.Column(db.String(10))
    politics = db.Column(db.String(10))
    time = db.Column(db.Date)

'''class Admin_car(db.Model,UserMixin):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(20), unique=True)
    pwd = db.Column(db.String(20))'''


if __name__ == '__main__':
    db.create_all()