
import os, json, csv, calendar
import pandas  as pd
import numpy as np
import matplotlib.pyplot as plt
import multiprocessing as mp
import shortestpass

transfer_stations = ['Sta89', 'Sta127', 'Sta41', 'Sta134', 'Sta3', 'Sta15', 'Sta140', 'Sta75', 'Sta90', 'Sta47', 'Sta23', 'Sta56', 'Sta115', 'Sta63', 'Sta114', 'Sta135', 'Sta87']

def write_list_to_json(list, json_file_name, json_file_save_path):
    os.chdir(json_file_save_path)
    with open(json_file_name, 'w', encoding='utf-8') as  f:
        json.dump(list, f)


def main():
    trips = pd.DataFrame(pd.read_csv('./data/new_trips.csv'))
    stations = pd.DataFrame(pd.read_csv('./data/station.csv', encoding='gbk'))

    year = 2020
    flow = {}  
    for month in [1,2,3,4,5,6,7,8,12]:
        flow[month] = {}
        # 获取该月的所有trips数据
        res = calendar.monthrange(year,month)
        df = pd.DataFrame(trips.loc[trips['inmonth'] == month])
        for day in range(1, res[1]):
            # 获取该天的所有trips数据
            df_day = df.loc[df['inday'] == day]
            df_day = df_day.loc[df_day['inhour']==8]
            print(month ,'-' , day)

            list1_1,list1_2,list2_1,list2_2,list3 = [],[],[],[],[]
            temp, temp2, temp3 = {}, {}, {}
            transfer_stations_temp, transfer_stations_temp2 = {}, {}

            
            for index, row in df_day.iterrows():
                print(index)
                stain, staout = row[2], row[4]
                # 统计啥
                # 根据输入时间给出
                # 全网站点和路径的客流(level)
                # 加入A~B花费时间的推算

                # 1. 站点 进站/出站 流量
                # 2. 线路客流
                # 3. 换乘客流
                
                # 1.
                if stain == staout :
                    continue
                if stain in temp.keys():
                    temp[stain][0] += 1
                else:
                    temp[stain] = [1, 0]
                if staout in temp.keys():
                    temp[staout][1] += 1
                else:
                    temp[staout] = [0, 1]
                # print(temp)
                # 2.
                if (stain, staout) in temp2.keys():
                    temp2[(stain,staout)] += 1
                else:
                    temp2[(stain,staout)] = 1
                # 3/4
                # print(stain,staout)
                try:
                    namelist = shortestpass.main(stain, staout)   
                except:
                    continue
                # print(namelist)           
                for i in range(len(namelist)):
                    if i!=0 and i!=len(namelist):
                        if namelist[i] in transfer_stations:
                            # 1_2
                            if namelist[i] in transfer_stations_temp.keys():
                                transfer_stations_temp[namelist[i]] += 1
                            else:
                                transfer_stations_temp[namelist[i]] = 1
                            # 2_2
                            if (stain, namelist[i]) in transfer_stations_temp2.keys():
                                transfer_stations_temp2[(stain, namelist[i])] += 1
                            else:
                                transfer_stations_temp2[(stain, namelist[i])] = 1
                            if (namelist[i], staout) in transfer_stations_temp2.keys():
                                transfer_stations_temp2[(namelist[i], staout)] += 1
                            else:
                                transfer_stations_temp2[(namelist[i], staout)] = 1

                    if i != len(namelist)-1:
                        if (namelist[i], namelist[i+1]) in temp3.keys():
                            temp3[(namelist[i], namelist[i+1])] += 1
                        else:
                            temp3[(namelist[i], namelist[i+1])] = 1

            a = 0

            # 1_1
            for key in temp.keys():
                list1_1.append({'station':key,'in':temp[key][0], 'out':temp[key][1]})
                a += temp[key][0]
            # 1_2
            for key in transfer_stations_temp.keys():
                try:
                    temp[key][0] += transfer_stations_temp[key]
                    temp[key][1] += transfer_stations_temp[key]
                except:
                    temp[key] = [transfer_stations_temp[key], transfer_stations_temp[key]]
            for key in temp.keys():
                list1_2.append({'station':key,'in':temp[key][0], 'out':temp[key][1]})        

            # 2_1  
            for key in temp2.keys():
                list2_1.append({'stain':key[0], 'staout': key[1], 'flow':temp2[key]})
            # 2_2
            for key in transfer_stations_temp2.keys():
                try:
                    temp2[key] += transfer_stations_temp2[key]
                except:
                    temp2[key] = transfer_stations_temp2[key]
            for key in temp2.keys():
                list2_2.append({'stain':key[0], 'staout': key[1], 'flow':temp2[key]})   

            # 3
            for key in temp3.keys():
                list3.append({'x1':key[0], 'x2': key[1], 'flow':temp3[key]})
        
            write_list_to_json(list1_1, 'list1_1.json', './')
            write_list_to_json(list1_2, 'list1_2.json', './')

            write_list_to_json(list2_1, 'list2_1.json', './')
            write_list_to_json(list2_2, 'list2_2.json', './')

            write_list_to_json(list3, 'list3.json', './')

            print(a)
            break
            # print(df_day)
            # df_day.to_csv(f'./day_trips/{month}-{day}.csv')   
        break

def job(stain,staout):
    temp, temp2, temp3 = {}, {}, {}
    transfer_stations_temp = {}
    if stain == staout :
        return
    if stain in temp.keys():
        temp[stain][0] += 1
    else:
        temp[stain] = [1, 0]
    if staout in temp.keys():
        temp[staout][1] += 1
    else:
        temp[staout] = [0, 1]
    # print(temp)
    # 2.
    if (stain, staout) in temp2.keys():
        temp2[(stain,staout)] += 1
    else:
        temp2[(stain,staout)] = 1
    # 3/4
    # print(stain,staout)
    try:
        namelist = shortestpass.main(stain, staout)   
    except:
        return
    # print(namelist)           
    for i in range(len(namelist)):
        if i!=0 and i!=len(namelist):
            if namelist[i] in transfer_stations:
                if namelist[i] in transfer_stations_temp.keys():
                    transfer_stations_temp[namelist[i]] += 1
                else:
                    transfer_stations_temp[namelist[i]] = 1
        if i != len(namelist)-1:
            if (namelist[i], namelist[i+1]) in temp3.keys():
                temp3[(namelist[i], namelist[i+1])] += 1
            else:
                temp3[(namelist[i], namelist[i+1])] = 1

def pool():
    p1 = mp.Process(target=job,args=(1,2))
    p1.start()
    p1.join()

if __name__=='__main__':
    main()