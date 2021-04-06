## 标准类
> Tips

trips的类（少了r）能升序排序

> Users

User的类（多了s）也能升序排序

---

> Cope

用来创建user和trips对象

> Demo1

demo

## 接口

#### 登陆

http://47.110.95.97:8080/log         method:post   
###### 内容
`{  
    "username":"admin",  
    "password":"admin"  
}`
###### 返回 
`{
    "code": 200,
    "msg": "成功",
    "data": "6010102f16c3449da3a651c3b3582d59"
}`
###### 帐号错误
`{
    "code": 500202,
    "msg": "用户名不存在",
    "data": null
}`
###### 密码错误
`{
    "code": 500203,
    "msg": "密码错误",
    "data": null
}`
http://47.110.95.97:8080/login/{username}/{password} method:get
###### 返回同上

http://47.110.95.97:8080/index/getUser method:get
###### 返回
`{
    "username": "admin",
    "password": "admin",
    "id": 10
}`
