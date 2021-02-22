package com.basic.begin;

import com.basic.cope.AboutRouse;

import java.util.LinkedHashSet;
/*
* 本次更改了StationMap，AboutRouse，Test
* 输出的是最短路径+n个站点的较近路径
* n在StationMap 439行处更改
* */
public class Test {
    public static void main(String[] args) throws Exception{
        for (LinkedHashSet<String> set : AboutRouse.deal("Sta80", "Sta144")) {
            System.out.println(set);
        }
    }


}
