package com.basic.cope;

import java.io.*;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
/*
* 为了展示热力图需要从trips表统计出每隔一个时间段在列车上的人
* 从2019.12.25到2020.7.16共有30万分钟，每分钟作为一个时间点
* 通过判断时间点是否在trips的时间范围内来统计每一个时间点所对应的小trips表
* 建表，存数据
* */

public class NewTables {
    public static void main(String[] args) {
        ArrayList<Tips> tips = new ArrayList<>();
        ArrayList<Date> dateArrayList;
        ArrayList<ArrayList<Tips>> ttp;
        Connection conn = null;
        SimpleDateFormat llk = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat kkl = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        try {
            Date op = llk.parse("2019-12-25 23:30:00");
            Date ed = llk.parse("2020-07-16 23:30:00");
            dateArrayList = getDateArray(op, ed); // 创建Data集合
            Cope.create(tips);  //根据trips表创建trips集合
            Collections.sort(tips);  // trips按照入站时间升序排序
            ttp = piPei(dateArrayList, tips);  // 这一步大概需要半小时
/*
* 由于直接连接数据库建表存数太慢 大概29小时
* 所以先导出成.sql文件后上传
* .sql文件大小2g多*/

//            Class.forName("com.mysql.jdbc.Driver");
//            long start = System.currentTimeMillis();
//            conn = DriverManager.getConnection("jdbc:mysql://rm-bp11labi01950io698o.mysql.rds.aliyuncs.com/library2", "maker0", "Maker0000");
//            long end = System.currentTimeMillis();
//            System.out.println(conn);
//            System.out.println("建立连接耗时：  " + (end - start) + "ms  毫秒");
//            Statement stmt = conn.createStatement();
            File f = new File("C:\\Users\\I\\Desktop\\mysql.sql"); // I为用户名
            FileOutputStream fop = new FileOutputStream(f);
            OutputStreamWriter writer = new OutputStreamWriter(fop,"UTF-8");

            //相桌面写.sql文件
            for (int i = 0; i < dateArrayList.size(); i++) {
                String name = kkl.format(dateArrayList.get(i));
               writer.append("CREATE TABLE `" + name + "` (\n" +
                        "  `用户ID` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n" +
                        "  `进站名称` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n" +
                        "  `进站时间` datetime NOT NULL,\n" +
                        "  `出站名称` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n" +
                        "  `出站时间` datetime NOT NULL,\n" +
                        "  `渠道类型` tinyint(3) unsigned NOT NULL,\n" +
                        "  `票价` smallint(5) unsigned NOT NULL\n" +
                        ") ENGINE=CSV DEFAULT CHARSET=utf8\n" +
                        ";");
               writer.append("\r\n");
                if (ttp.get(i).size() != 0) {
                    writer.append("insert into `" + name + "`(`用户ID`,`进站名称`,`进站时间`,`出站名称`,`出站时间`,`渠道类型`,`票价`) values\n" +
                            getString(ttp.get(i)));
                }
            }


        } catch (/*SQLException | ClassNotFoundException|*/ ParseException | IOException e) {
            e.printStackTrace();
//        } finally {
//            try {
//                if (conn != null) {
//                    conn.close();
//                }
//            } catch (SQLException e) {
//                e.printStackTrace();
//            }
        }

    }

    public static ArrayList<Date> getDateArray(Date op, Date ed) {  // 获取从2019.12.25 到 2020.07.16 的所有分钟
        long open = op.getTime();
        long end = ed.getTime();
        System.out.println("op=" + open + "  ed=" + end + "  ed - op =" + (end - open));
        ArrayList<Date> list = new ArrayList<>();
        for (; open <= end; open += 60000) {
            list.add(new Date(open));
        }
        System.out.println("Data list made over");
        return list;
    }

    public static ArrayList<ArrayList<Tips>> piPei(ArrayList<Date> dates, ArrayList<Tips> tips) { //对所有时间点匹配trips记录
        System.out.println("act piPei");
        ArrayList<ArrayList<Tips>> arrayLists = new ArrayList<>();
        long proDay, time;
        int op, ed;
        for (Date date : dates) {
            ArrayList<Tips> ti = new ArrayList<>();
            op = 0;
            ed = 0;
            time = date.getTime();
            proDay = time - 86400000L;
            for (int i = 0; i < tips.size(); i++) {
                if (time < tips.get(i).getPitTime().getTime() || i == tips.size() - 1) {
                    ed = i;
                    break;
                }
            }
            for (int i = ed; i > -1; i--) {
                if (proDay > tips.get(i).getPitTime().getTime() || i == 0) {
                    op = i;
                    break;
                }
            }
            for (; op <= ed; op++) {
                if (tips.get(op).getPitTime().getTime() <= time && tips.get(op).getDepartureTime().getTime() >= time) {
                    ti.add(tips.get(op));
                }
            }
            arrayLists.add(ti);

        }
        System.out.println("end piPei");
        return arrayLists;
    }
    // 用来写SQL语句
    public static String getString(ArrayList<Tips> tips) {
        String fg = "";
        for (int i = 0; i < tips.size() - 1; i++) {
            fg += tips.get(i).toString() + ",\n";
        }
        return fg + tips.get(tips.size() - 1) + ";";
    }


}
