package com.basic.cope;

import java.util.*;

public class AboutRouse {

    public static ArrayList<Rouse> all = new ArrayList<>();

    public static ArrayList<LinkedHashSet<String>> deal(String start, String end) {
        ArrayList<ArrayList<String>> sta = StationMap.getSta();
        // 对站点进行检查
        if (StationMap.noOne(start) == null || StationMap.noOne(end) == null) {
            System.out.println("不从在这样的站点！请重试");
        }
        // 判断是否起点和终点一样
        if (start.equals(end)) {
            LinkedHashSet<String> s = new LinkedHashSet<>();
            ArrayList<LinkedHashSet<String>> list = new ArrayList<>();
            s.add(start);
            list.add(s);
            return list;
        }
        // 判断起点和终点在一条路上
        if (StationMap.isSameRouse(start, end)) {
            Rouse rouse = new Rouse();
            rouse.setRouse(start, end);
            all.add(rouse);
            return StationMap.getMinSizeSet(all);
        }
        // 得到start站点附近的换乘站
        HashSet<String> swap = StationMap.getSwap(start);
        for (String s : swap) {
            Rouse rou = new Rouse();
            rou.setRouse(start, s);
            find(rou, end);
        }
        return StationMap.getMinSizeSet(all);
    }

    private static void find(Rouse rouse, String end) {

        String[] str = rouse.getRouse().get(rouse.getRouse().size() - 1);// 得到上一步的起点和终点
        String preStation = str[0];
        String station = str[1];
        if (StationMap.isSameRouse(station, end)) { //判断是否到达终点附近
            rouse.setRouse(station, end);
            all.add(rouse);
            return;
        }
        HashSet<String> swap = StationMap.getSwap(station); // 寻找该换乘点附近的换乘点
        ArrayList<String> remove = new ArrayList<>();
        for (String s : swap) { // 记录走过的路段
            for (String[] vector : rouse.getRouse()) {
                String[] one = StationMap.realNoOne(vector[0], vector[1]);
                if ((s.equals(one[0]) && station.equals(one[1])) || (s.equals(one[1]) && station.equals(one[0]))) {
                    remove.add(s);
                }
            }
        }
        if (remove.size() > 0) { // 删除走过的换乘点
            for (String s : remove) {
                swap.remove(s);
            }
        }
        if (swap.size() == 0) { // 没路走就掐死
            return;
        }
        for (String s : swap) { //进行迭代
            Rouse rouse1 = new Rouse(rouse);
            rouse1.setRouse(station, s);
            find(rouse1, end);
        }
    }
}
