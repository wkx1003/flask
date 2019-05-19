from flask import Flask, render_template, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_login import UserMixin, current_user, login_user, logout_user, LoginManager
from flask_babelex import Babel
from model import User, Driver, Staff, Car
app = Flask(__name__)
login = LoginManager(app)
babel = Babel(app)
app.config['BABEL_DEFAULT_LOCALE'] = 'zh_CN'
#配置ORM
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:wkx1003@localhost/car'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '12345678'
db = SQLAlchemy(app)


@login.user_loader
def load_user(id):
    return Admin_car.query.get(id)


class Admin_car(db.Model, UserMixin):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(20), unique=True)
    pwd = db.Column(db.String(20))

'''class MyModelViewUser(ModelView):
    column_display_pk = True
    column_display_all_relations = True
    column_searchable_list = (User.email,User.id)'''


class ModelViewUser(ModelView):
    column_display_pk = True
    column_display_all_relations = True
    column_searchable_list = (User.id, User.name)
    column_labels = {
        'id': u'序号',
        'name': u'姓名',
        'sex': u'性别',
        'age': '年龄',
        'id_car': '身份证号',
        'info': '联系地址',
        'phone': '联系电话',
        'zu_car': '所租车辆',
        'day': '租车时间（天）',
        'money': '押金',
        'create_time': '租车时间',
        'end_time': '还车时间',
        'cost': '费用',

    }

    def is_accessible(self):
        return current_user.is_authenticated

class ModelViewCar(ModelView):
    column_display_pk = True
    column_display_all_relations = True
    column_searchable_list = (Car.id, Car.p_id, Car.car_name, Car.car_state)
    column_labels = {
        'id': u'编号',
        'car_name': u'车辆',
        'type': u'车辆类型',
        'p_id': '车牌号',
        'name': '驾驶员',
        'phone': '联系电话',
        'bx_date': '保险截止日期',
        'cos': '租金（天）',
        'car_state': '车辆租凭状态',
    }

    def is_accessible(self):
        return current_user.is_authenticated


class ModelViewDriver(ModelView):
    column_display_pk = True
    column_display_all_relations = True
    column_searchable_list = (Driver.name, Driver.id_car)
    column_labels = {
        'id': u'编号',
        'name': u'姓名',
        'sex': u'性别',
        'age': '年龄',
        'id_car': '身份证号',
        'info': '家庭地址',
        'phone': '联系电话',
        'num': '驾驶证号',
        'date': '审验到期日',
        'fw_id': '服务车号',
        'accident': '事故记录',

    }
    def is_accessible(self):
        return current_user.is_authenticated

class ModelViewStaff(ModelView):
    column_display_pk = True
    column_display_all_relations = True
    column_searchable_list = (Staff.name, Staff.id_car)
    column_labels = {
        'id': u'员工编号',
        'name': u'姓名',
        'info': '家庭地址',
        'phone': '联系电话',
        'lei': u'员工类别',
        'company': u'职务岗位',
        'sex': u'性别',
        'age': '年龄',
        'id_car': '身份证号',
        'edu': '学历',
        'sc': '毕业院校',
        'major': '毕业专业',
        'nation': '民族',
        'marriage': '婚姻状况',
        'politics': '政治面貌',
        'time': '入职时间',

    }
    def is_accessible(self):
        return current_user.is_authenticated

class MyAdminIndexView(AdminIndexView):

    def is_accessible(self):
        return current_user.is_authenticated


admin = Admin(app, name='后台管理系统', index_view=MyAdminIndexView())
admin.add_view(ModelViewCar(Car, db.session, name='车辆管理'))
admin.add_view(ModelViewUser(User, db.session, name='客户管理'))
admin.add_view(ModelViewDriver(Driver, db.session, name='司机管理'))
admin.add_view(ModelViewStaff(Staff, db.session, name='员工管理'))


@app.route('/login/', methods=['POST', 'GET'])
def login():
    if request.method == 'GET':
        return render_template('index.html')
    else:
        user_eail = request.form.get("username")
        user_passwd = request.form.get("passwd")
        my_id = Admin_car.query.filter_by(email=user_eail, pwd=user_passwd).first()
        if my_id:
            login_user(my_id)
            return redirect('/admin')
        else:
            return '用户名或密码错误！'


@app.route('/reset/', methods=['POST', 'GET'])
def reset():
    if request.method == 'GET':
        return render_template('reset.html')
    else:
        pwd = request.form.get("passwd")
        set_pwd1 = request.form.get("passwd1")
        set_pwd2 = request.form.get("passwd2")
        my_passwd = Admin_car.query.filter_by(pwd=pwd).first()
        if my_passwd:
            if set_pwd1 == set_pwd2:
                my_passwd.pwd = set_pwd2
                db.session.commit()
                return '密码修改成功！'
            else:
                return '两次密码输入不一致，请重新输入！'
        else:
            return '密码输入错误！'


@app.route('/logout/')
def logout():
    logout_user()
    # flash('注销成功！')
    return redirect('login')


if __name__ == '__main__':
    app.run(debug=True)
