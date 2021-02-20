package com.basic.cope;

import java.util.ArrayList;

public class Rouse{
    //String[]长度为记录每一步的起点和终点，例如两个相邻换乘站
    private ArrayList<String[]> rouse = new ArrayList<>();

    // 每到达十字路口进行复制rouse，然后迭代
    public Rouse(Rouse aRouse) {
        for (String[] strings : aRouse.getRouse()) {
            rouse.add(strings);
        }
    }

    public Rouse() {
    }

    public ArrayList<String[]> getRouse() {
        return rouse;
    }

    public void setRouse(String key, String value) {
        String[] strings = {key,value};
        rouse.add(strings);
    }




}
