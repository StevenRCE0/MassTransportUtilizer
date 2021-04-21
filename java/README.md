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
```
{  
    "username":"admin",  
    "password":"admin"  
}
```
###### 返回 
```
{
    "code": 200,
    "msg": "成功",
    "data": "6010102f16c3449da3a651c3b3582d59"
}
```
###### 帐号错误
```{
    "code": 500202,
    "msg": "用户名不存在",
    "data": null
}
```
###### 密码错误
```
{
    "code": 500203,
    "msg": "密码错误",
    "data": null
}
```
###### 请求为get时
```
{
    "code": 500100,
    "msg": "服务端异常",
    "data": null
}
```

http://47.110.95.97:8080/login/{username}/{password} method:get

###### 返回同上
##### 获取当前登陆用户
http://47.110.95.97:8080/index/getUser method:get
###### 返回
```
{
    "username": "admin",
    "password": "admin",
    "id": 10
}
```
## 数据接口
##### 提交多维度数据
（请按照维度编写一个接口，在用户选择发生变化时提交）

##### 返回地图
格式: **paths**, **stations**

##### 返回当前整体客流强度
格式: **dashboardOne**

##### 返回客流强度最高站点的客流强度
格式: **dashboardOne**

##### 返回客流强度最高的四个区
格式: **dashboard**


##### 用户选择时间时

http://localhost:8080/time/json metmod:post
```
{
    "year":"2020",      // year的数据只有2020年的
    "month":"3",        // month的数据只有3-6月的
    "day":"15",
    "hour":"1"          // hour 的数据只有6:00 - 22:30的
    "minute":"30"       // 0 <= minute <= 60
}
```
###### 返回
```json
{
    "msg":{"code": 200,"msg": "成功","data": null},
    "overallFlow": 50,
    "highestTime": "9:00",
    "highestFlow": {"name": "Sta5","value": 50},
    "highestDist4": [{"name": "dist1","value": 50},...],
    "lineFlow": [{"linename": "1号线","flow": 50},...],
    "hotPowerGraph":[{"id": 1004,"level":50,"x":12,"y":45,"line": "1\u53f7\u7ebf","station": "Sta65","type":0,"dist":"Dist1"},...], // 热力图数据

    "age":[{
     "id": 1004,
    "in":[1,54,1,0,0,...],
    "out":[1,54,1,0,0,...],
    "station": "Sta65",
    "x":12,
    "y":45,
    },...]
    
}

当查询的数据不在可查范围内时：
{
    "result": {
        "code": 500301,
        "msg": "查询不到数据",
        "data": null
    },
    "overallFlow": null,
    "highestTime": null,
    "highestFlow": null,
    "highestDist4": null,
    "hotPowerGraph": null,
    "lineFlow": null,
    
    "age":[{
     "id": 1004,
    "in":null,
    "out":null,
    "station": "Sta65",
    "x":12,
    "y":45,
    },...],
    
    "sevenFlow":[
                    {"name":"1号线"，"values":[54,1,82,2,65,8,11]},...
                ]  
        /*
         *     返回的数组里面有7个数组， 当前时间的线路客流在中间，前三个是过去-1.5，-1，-0.5小时的站点客流（如果现在是6:00则前三个都是[]）
         *     后三个是当前时间+ 0.5，1，1.5 个小时的预测数据（如果现在是半夜3点 则返回[[],[],[],[],[],[],[]]）
         */
}
```

