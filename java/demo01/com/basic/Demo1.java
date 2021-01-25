package com.basic;

import java.util.ArrayList;
import java.util.Collections;

public class Demo1 {

    public static void main(String[] args) throws Exception {
        ArrayList<Tips> tips = new ArrayList<>();
        Cope.create(tips);
        ArrayList<Users> list = new ArrayList<>();
        Cope.createUser(list);
        Collections.sort(tips);//排序
        Collections.sort(list);
        Cope.complement(list,tips);


    }



}
