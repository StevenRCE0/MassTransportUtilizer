package com.basic;

import java.util.Date;
import java.util.Objects;
//创建Trips标准类
public class Tips implements Comparable<Tips>{
    private String userID;
    private String pitName;
    private Date pitTime;
    private String outboundName;
    private Date departureTime;
    private int channelType;
    private int ticketPrice;
    private static int aa = 0;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tips tips = (Tips) o;
        return channelType == tips.channelType && ticketPrice == tips.ticketPrice && Objects.equals(userID, tips.userID) && Objects.equals(pitName, tips.pitName) && Objects.equals(pitTime, tips.pitTime) && Objects.equals(outboundName, tips.outboundName) && Objects.equals(departureTime, tips.departureTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, pitName, pitTime, outboundName, departureTime, channelType, ticketPrice);
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getPitName() {
        return pitName;
    }

    public void setPitName(String pitName) {
        this.pitName = pitName;
    }

    public Date getPitTime() {
        return pitTime;
    }

    public void setPitTime(Date pitTime) {
        this.pitTime = pitTime;
    }

    public String getOutboundName() {
        return outboundName;
    }

    public void setOutboundName(String outboundName) {
        this.outboundName = outboundName;
    }

    public Date getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Date departureTime) {
        this.departureTime = departureTime;
    }

    public int getChannelType() {
        return channelType;
    }

    public void setChannelType(int channelType) {
        this.channelType = channelType;
    }

    public int getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(int ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public Tips(String userID, String pitName, Date pitTime, String outboundName, Date departureTime, int channelType, int ticketPrice) {
        this.userID = userID;
        this.pitName = pitName;
        this.pitTime = pitTime;
        this.outboundName = outboundName;
        this.departureTime = departureTime;
        this.channelType = channelType;
        this.ticketPrice = ticketPrice;

    }

    public Tips() {
    }

    @Override
    public String toString() {
        return (++aa)+"  "+"Tips{" +
                "userID='" + userID + '\'' +
                ", pitName='" + pitName + '\'' +
                ", pitTime=" + pitTime +
                ", outboundName='" + outboundName + '\'' +
                ", departureTime=" + departureTime +
                ", channelType=" + channelType +
                ", ticketPrice=" + ticketPrice +
                '}';
    }

    @Override
    public int compareTo(Tips o) {
        int i = userID.compareTo(o.userID);
        return i;
    }
}
