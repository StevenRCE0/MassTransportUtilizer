## 可修改参数的预测

<u>注: 以下均为data, 没有code, msg等信息, 也没有登陆验证等信息</u>

- #### 请求URL 

  ######  `http://localhost:9999/python/get`

- #### 请求参数

  ```json
  {
      time: 1,   
      	// 表示多久后有人群涌入  比如3小时后学校放假
      station: 'Sta65',
      flow: 30,
      flow_type: 1, 
      	//[0,1,2,3] 表示 in_flow, out_flow, in_flow_plus, out_flow_plus
      dayprop: 1, 
      	//[0,1,2]表示是否放假
      weather: ['多云', '晴'], 
      	// 分别为上午下午
      	//['多云', '中雨', '阴', '晴', '雷阵雨', '暴雨', '大雨', '小雨']
      temperatures: [9, 22], 
      	//最低气温,最高气温
      type: 1, 
      	//[0,1]表示是否为换乘站
      station_classify: 3, 
      	//[0,1,2,3,4]表示站点分类
  }
  ```

- #### 返回值

  ```json
  {
  	list1: [  
          {
              station: 'Sta65',
              flow: [1,1,7,6],  //表示 in_flow, out_flow, in_flow_plus, out_flow_plus
              turn: 1, //现在是7:10, 则 0为7:30, 1为8:00, 2为8:00, 以此类推
          }
      ],
      list3: [  
          {
              station1: 'Sta64',   
              station2: 'Sta65',
              flow: 34,  //从station1 -> station2 间的flow
              turn: 5
          },
      ],
      list4: [
          {
              line: '3号线',
              flow: 79,
              turn: 8
          }
      ]
  }
  ```

  



