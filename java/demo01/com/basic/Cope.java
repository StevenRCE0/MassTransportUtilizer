package com.basic;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;


public class Cope {

    // 连接数据库，创建trips对象
    public static void create(ArrayList<Tips> tips){
        Connection conn = null;

        SimpleDateFormat llk = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Class.forName("com.mysql.jdbc.Driver");
            long start = System.currentTimeMillis();
            conn = DriverManager.getConnection("jdbc:mysql://124.70.94.200:3306/library1", "root", "Maker0000");
            long end = System.currentTimeMillis();
            System.out.println(conn);
            System.out.println("建立连接耗时：  " + (end - start) + "ms  毫秒");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from trips");
            while (rs.next()) {
                //System.out.println(rs.getString(1) + "\t\t" + rs.getString(2) + "\t" + rs.getString(3) + "\t\t" + rs.getString(4) + rs.getString(5) + "\t\t" + rs.getString(6) + "\t" + rs.getString(7) +"\t");
                tips.add(new Tips(rs.getString(1),rs.getString(2),llk.parse(rs.getString(3)),rs.getString(4),llk.parse(rs.getString(5)),Integer.parseInt(rs.getString(6)),Integer.parseInt(rs.getString(7))));
            }

        } catch (SQLException | ClassNotFoundException | ParseException e) {
            e.printStackTrace();
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        System.out.println("Tips集合构建完成");

    }
    //连接数据库创建user对象
    public static void createUser(ArrayList<Users> list){
        Connection conn =null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            long start = System.currentTimeMillis();
            conn = DriverManager.getConnection("jdbc:mysql://124.70.94.200:3306/library1", "root", "Maker0000");
            long end = System.currentTimeMillis();
            System.out.println(conn);
            System.out.println("建立连接耗时：  " + (end - start) + "ms  毫秒");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from user");
            while (rs.next()) {
                //System.out.println(rs.getString(1) + "\t\t" + rs.getString(2) + "\t" + rs.getString(3) + "\t\t" + rs.getString(4) + rs.getString(5) + "\t\t" + rs.getString(6) + "\t" + rs.getString(7) +"\t"+(aaa++));
                list.add(new Users(rs.getString(1),Integer.parseInt(rs.getString(2)),Integer.parseInt(rs.getString(3)),Integer.parseInt(rs.getString(4))));
            }

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        System.out.println("User集合构建完成");

    }
    //对user统计trips
    public static void complement (ArrayList<Users> users,ArrayList<Tips> tips){

        for (Users user : users) {


            for (int i = 0; i < tips.size(); i++) {
                if (user.getUserID().equals(tips.get(i).getUserID())){
                    user.setTips(tips.remove(i));
                }
            }
            System.out.println("已成功一次");
        }


        System.out.println("tips="+tips.size());

    }


}