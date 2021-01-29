'''
stations[
	{
		id: id,
		x: x,
		y: y,
		level: level,
		type: type,
		line: line,
		station: station
	},
	…
]
id 用于识别的标识符
x 站点在地图上的横坐标（相对）
y 站点在地图上的纵坐标（相对）
level 站点的等级，会以大小/热力形式显示
type 站点类型（没想好
line 线路 
station 站名
'''
routes = {
    '1号线': ['Sta65', 'Sta49', 'Sta149', 'Sta74', 'Sta128', 'Sta34', 'Sta106', 'Sta110', 'Sta97', 'Sta80', 'Sta89', 'Sta64', 'Sta150', 'Sta154', 'Sta107', 'Sta83', 'Sta108', 'Sta159', 'Sta1'], 
    '2号线': ['Sta129', 'Sta9', 'Sta163', 'Sta53', 'Sta79', 'Sta18', 'Sta47', 'Sta123', 'Sta127', 'Sta81', 'Sta27', 'Sta48', 'Sta151', 'Sta68', 'Sta52', 'Sta76', 'Sta57', 'Sta71', 'Sta139', 'Sta105', 'Sta51', 'Sta24'], 
    '3号线': ['Sta143', 'Sta156', 'Sta61', 'Sta50', 'Sta119', 'Sta66', 'Sta12', 'Sta161', 'Sta21', 'Sta133', 'Sta22', 'Sta138', 'Sta41', 'Sta30', 'Sta67', 'Sta144', 'Sta29', 'Sta126', 'Sta40', 'Sta131', 'Sta39', 'Sta100', 'Sta167', 'Sta113', 'Sta141', 'Sta142', 'Sta158', 'Sta44', 'Sta117', 'Sta147', 'Sta42', 'Sta35', 'Sta109', 'Sta33', 'Sta112', 'Sta153', 'Sta125', 'Sta121', 'Sta11'], 
    '10号线': ['Sta157', 'Sta114', 'Sta168', 'Sta135', 'Sta134', 'Sta85', 'Sta2', 'Sta4', 'Sta103', 'Sta145', 'Sta88', 'Sta87', 'Sta94', 'Sta160', 'Sta7', 'Sta6', 'Sta8', 'Sta75', 'Sta102'], 
    '4号线': ['Sta84', 'Sta59', 'Sta19', 'Sta62', 'Sta165', 'Sta38', 'Sta58'], 
    '5号线': ['Sta43', 'Sta10', 'Sta96', 'Sta132', 'Sta37', 'Sta16', 'Sta69', 'Sta54'], 
    '11号线': ['Sta77', 'Sta122', 'Sta36', 'Sta28', 'Sta124', 'Sta166', 'Sta99', 'Sta45', 'Sta152', 'Sta164', 'Sta82', 'Sta111', 'Sta140', 'Sta13', 'Sta70', 'Sta55', 'Sta20', 'Sta23', 'Sta56', 'Sta118', 'Sta115', 'Sta162', 'Sta15', 'Sta86', 'Sta46', 'Sta63', 'Sta3', 'Sta25', 'Sta146', 'Sta130', 'Sta120'], 
    '12号线': ['Sta136', 'Sta137', 'Sta101', 'Sta31', 'Sta17', 'Sta26', 'Sta90', 'Sta95', 'Sta72', 'Sta93', 'Sta92', 'Sta116', 'Sta32', 'Sta91', 'Sta60', 'Sta148', 'Sta73']
}
import csv
print(len(routes['2号线']))
coordinate = {
    '1号线':{
        19: [604, 142],
        18: [604, 200],
        17: [604, 291],
        16: [605, 369],
        15: [604, 448],
        14: [538, 448],
        13: [469, 448],
        12: [469, 528],
        11: [469, 595],
        10: [469, 639],
        9: [470, 675],
        8: [469, 707],
        7: [470, 742],
        6: [470, 776],
        5: [471, 810],
        4: [470, 845],
        3: [470, 878],
        2: [469, 912],
        1: [470, 945],
    },
    "2号线":{
        1: [811, 250],
        2: [773, 249],
        3: [741, 251],
        4: [708, 251],
        5: [677, 249],
        6: [644, 249],
        7: [604, 249],
        8: [566, 250],
        9: [565, 316],
        10: [566, 383],
        11: [521, 384],
        12: [476, 385],
        13: [431, 385],
        14: [387, 384],
        15: [343, 384],
        16: [297, 384],
        17: [251, 383],
        18: [207, 384],
        19: [161, 385],
        20: [117, 384],
        21: [73, 384],
        22: [26, 384],
    },
    '3号线': {
        1: [898, 20],
        2: [897, 53],
        3: [898, 85],
        4: [898, 118],
        5: [898, 152],
        6: [898, 184],
        7: [899, 217],
        8: [898, 250],
        9: [898, 281],
        10: [828, 284],
        11: [770, 284],
        12: [707, 282],
        13: [706, 317],
        14: [706, 352],
        15: [705, 375],
        16: [705, 399],
        17: [706, 430],
        18: [706, 458],
        19: [738, 507],
        20: [770, 508],
        21: [805, 506],
        22: [838, 507],
        23: [921, 507],
        24: [958, 508],
        25: [995, 508],
        26: [1035, 507],
        27: [1073, 507],
        28: [1111, 508],
        29: [1151, 508],
        30: [1188, 510],
        31: [1188, 538],
        32: [1190, 568],
        33: [1190, 627],
        34: [1189, 654],
        35: [1190, 678],
        36: [1191, 698],
        37: [1190, 717],
        38: [1190, 738],
        39: [1191, 756],
    },
    '10号线': {
        1: [786, 409],
        2: [813, 442],
        3: [847, 478],
        4: [875, 508],
        5: [903, 540],
        6: [938, 573],
        7: [970, 601],
        8: [1014, 601],
        9: [1058, 602],
        10: [1101, 603],
        11: [1145, 602],
        12: [1190, 602],
        13: [1233, 603],
        14: [1233, 634],
        15: [1232, 668],
        16: [1232, 706],
        17: [1232, 745],
        18: [1233, 786],
        19: [1233, 833],
    },
    '4号线': {
        1: [902, 628],
        2: [902, 669],
        3: [962, 668],
        4: [1013, 667],
        5: [1049, 669],
        6: [1096, 669],
        7: [1137, 668],
    },
    '5号线': {
        1: [859, 730],
        2: [858, 699],
        3: [857, 667],
        4: [858, 646],
        5: [858, 613],
        6: [858, 565],
        7: [812, 565],
        8: [766, 564],
    },
    '11号线': {
        1: [869, 1037],
        2: [871, 1003],
        3: [870, 966],
        4: [870, 930],
        5: [870, 893],
        6: [870, 859],
        7: [870, 822],
        8: [1285, 786],
        9: [1180, 787],
        10: [1109, 786],
        11: [1035, 785],
        12: [960, 785],
        13: [871, 786],
        14: [777, 787],
        15: [704, 785],
        16: [705, 710],
        17: [705, 655],
        18: [705, 594],
        19: [706, 563],
        20: [705, 528],
        21: [706, 486],
        22: [756, 467],
        23: [850, 423],
        24: [849, 387],
        25: [850, 351],
        26: [849, 316],
        27: [849, 250],
        28: [850, 216],
        29: [849, 184],
        30: [850, 151],
        31: [850, 117],
    },
    '12号线': {
        1:  [418, 596],
        2:  [510, 595],
        3:  [557, 597],
        4:  [607, 597],
        5:  [657, 596],
        6:  [796, 595],
        7:  [901, 595],
        8:  [901, 474],
        9:  [893, 402],
        10:  [892, 352],
        11:  [819, 318],
        12:  [786, 317],
        13:  [745, 316],
        14:  [644, 316],
        15:  [521, 316],
        16:  [477, 316],
        17:  [432, 316],
    }


}
stations = []
for route in routes.keys():
    # if route != '1号线':
    #     continue
    for i,needsta in enumerate(routes[route]):
        with open('data/station.csv') as f:
            f = csv.reader(f)
            for row in f:
                # ['编号', '站点名称', '线路', '行政区域']
                sta = row[1]
                if sta==needsta:
                    if sta in routes[route]:
                        index = routes[route].index(sta)
                        xy = coordinate[route][index+1]
                        stations.append(
                            {
                                'id':int(row[0]),
                                'x': xy[0],
                                'y': xy[1],
                                'leval': '',
                                'type': '',
                                'line': row[2],
                                'station':row[1],
                                'dist':row[3],
                            }
                        )
                        break
# for i,item in enumerate(stations) :
#     print(i, ' ' ,item)


import json
import os
def write_list_to_json(list, json_file_name, json_file_save_path):
    """
    将list写入到json文件
    :param list:
    :param json_file_name: 写入的json文件名字
    :param json_file_save_path: json文件存储路径
    :return:
    """
    os.chdir(json_file_save_path)
    with open(json_file_name, 'w', encoding='utf-8') as  f:
        json.dump(list, f)
write_list_to_json(stations, 'stations.json', './')



# paths[
# 	{
# 		id: id,
# 		x1: x1,
# 		y1: y1,
# 		x2: x2,
# 		y2: y2,
# 		level: level,
# 		line: line
# 	},
# 	…
# ]
# id 用于识别的标识符
# x1 起始点在地图上的横坐标（相对）
# y1 起始点在地图上的纵坐标（相对）
# x2 结束点在地图上的横坐标（相对）
# y2 结束点在地图上的纵坐标（相对）
# level 路径的等级，会以粗细显示
# line 线路
routes = {
    '1号线': ['Sta65', 'Sta49', 'Sta149', 'Sta74', 'Sta128', 'Sta34', 'Sta106', 'Sta110', 'Sta97', 'Sta80', 'Sta89', 'Sta64', 'Sta150', 'Sta154', 'Sta107', 'Sta83', 'Sta108', 'Sta159', 'Sta1'], 
    '2号线': ['Sta129', 'Sta9', 'Sta163', 'Sta53', 'Sta79', 'Sta18', 'Sta47', 'Sta123', 'Sta127', 'Sta81', 'Sta27', 'Sta48', 'Sta151', 'Sta68', 'Sta52', 'Sta76', 'Sta57', 'Sta71', 'Sta139', 'Sta105', 'Sta51', 'Sta24'], 
    '3号线': ['Sta143', 'Sta156', 'Sta61', 'Sta50', 'Sta119', 'Sta66', 'Sta12', 'Sta161', 'Sta21', 'Sta133', 'Sta22', 'Sta138', 'Sta41', 'Sta30', 'Sta67', 'Sta144', 'Sta29', 'Sta126', 'Sta40', 'Sta131', 'Sta39', 'Sta100', 'Sta167', 'Sta113', 'Sta141', 'Sta142', 'Sta158', 'Sta44', 'Sta117', 'Sta147', 'Sta42', 'Sta35', 'Sta109', 'Sta33', 'Sta112', 'Sta153', 'Sta125', 'Sta121', 'Sta11'], 
    '10号线': ['Sta157', 'Sta114', 'Sta168', 'Sta135', 'Sta134', 'Sta85', 'Sta2', 'Sta4', 'Sta103', 'Sta145', 'Sta88', 'Sta87', 'Sta94', 'Sta160', 'Sta7', 'Sta6', 'Sta8', 'Sta75', 'Sta102'], 
    '4号线': ['Sta84', 'Sta59', 'Sta19', 'Sta62', 'Sta165', 'Sta38', 'Sta58'], 
    '5号线': ['Sta43', 'Sta10', 'Sta96', 'Sta132', 'Sta37', 'Sta16', 'Sta69', 'Sta54'], 
    '11号线': ['Sta77', 'Sta122', 'Sta36', 'Sta28', 'Sta124', 'Sta166', 'Sta99', 'Sta45', 'Sta152', 'Sta164', 'Sta82', 'Sta111', 'Sta140', 'Sta13', 'Sta70', 'Sta55', 'Sta20', 'Sta23', 'Sta56', 'Sta118', 'Sta115', 'Sta162', 'Sta15', 'Sta86', 'Sta46', 'Sta63', 'Sta3', 'Sta25', 'Sta146', 'Sta130', 'Sta120'], 
    '12号线': ['Sta136', 'Sta137', 'Sta101', 'Sta31', 'Sta17', 'Sta26', 'Sta90', 'Sta95', 'Sta72', 'Sta93', 'Sta92', 'Sta116', 'Sta32', 'Sta91', 'Sta60', 'Sta148', 'Sta73']
}
paths = []
middlesta_before = {
     'Stta136':'Sta89',
    'Sta108': 'Sta47',
    'Sta91':'Sta127', 
    'Sta32':'Sta41',
    'Sta126':'Sta115',
    'Sta17':'Sta23', 
    'Sta63':'Sta129',
    'Sta93':'Sta3',
    'Sta162':'Sta114',
    'Sta72':'Sta15',
    'Sta95':'Sta134',
    'Sta90':'Sta84',
    'Sta100':'Sta135',
    'Sta35':'Sta87',
    'Sta99': 'Sta140',
    'Sta45':'Sta75',
}
middlesta_after = {
    'Sta89':'Sta137',
    'Sta47':'Sta159',
    'Sta127':'Sta60',
    'Sta41':'Sta91',
    'Sta115':'Sta40',
    'Sta23':'Sta26',

    'Sta3':'Sta92',
    'Sta114':'Sta15',
    'Sta15':'Sta95',
    'Sta134':'Sta90',

    'Sa135':'Sta167',
    'Sta87':'Sta109',
    'Sta75':'152',
}
for i,station in enumerate(stations):
    sta = station['station']
    
    if station['station'] in middlesta_before.keys():
        for nextstation in stations:
            if nextstation['station']==middlesta_before[station['station']]:
                paths.append({
                    'id': i,
                    'x1': station['x'],
                    'y1': station['y'],
                    'x2': nextstation['x'],
                    'y2': nextstation['y'],
                    'leval': '',
                })
    elif station['station'] in middlesta_after.keys():
        for nextstation in stations:
            if nextstation['station']==middlesta_after[station['station']]:
                paths.append({
                    'id': i,
                    'x1': station['x'],
                    'y1': station['y'],
                    'x2': nextstation['x'],
                    'y2': nextstation['y'],
                    'leval': '',
                })
    try:
        if station['line'] != stations[i+1]['line']:
            # 这条线路结束
            continue 
        else:
            try:
                paths.append({
                    'id': i,
                    'x1': station['x'],
                    'y1': station['y'],
                    'x2': stations[i+1]['x'],
                    'y2': stations[i+1]['y'],
                    'leval': '',
                })
            except:
                pass
    except:
        pass
   
    
for item in paths:
    print(item)
# print(paths)
write_list_to_json(paths, 'paths.json', './')
