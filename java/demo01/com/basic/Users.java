package com.basic;

import java.util.ArrayList;
//创建Users标准类
public class Users implements Comparable<Users> {
    private String userID;
    private int zone;
    private int yearOfBirth;
    private int sex;
    private ArrayList<Tips> tips = new ArrayList<>();//使用集合装载trips对象

    @Override
    public String toString() {
        return "Users{" +
                "userID='" + userID + '\'' +
                ", zone=" + zone +
                ", yearOfBirth=" + yearOfBirth +
                ", sex=" + sex +
                ", tips=" + tips +
                '}';
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public int getZone() {
        return zone;
    }

    public void setZone(int zone) {
        this.zone = zone;
    }

    public int getYearOfBirth() {
        return yearOfBirth;
    }

    public void setYearOfBirth(int yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public Users() {
    }

    public ArrayList<Tips> getTips() {
        return tips;
    }

    public void setTips(Tips tips) {
        this.tips.add(tips);
    }

    public Users(String userID, int zone, int yearOfBirth, int sex) {
        this.userID = userID;
        this.zone = zone;
        this.yearOfBirth = yearOfBirth;
        this.sex = sex;
    }
    @Override
    public int compareTo(Users o) {
        int i = userID.compareTo(o.userID);
        return i;
    }


}
