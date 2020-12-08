// pages/thing-group/thing-group.js

import {
    request
} from '../../utils/http-client';

import {
    thingGroupPage
} from '../../data/data'
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        thingsGroup: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadThingList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('thingGroup-ready')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('thingGroup-show')
        this.loadThingList();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('thingGroup-hide')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log('thingGroup-unload')
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    addThingGroup(event) {
        wx.navigateTo({
            url: '/pages/thing-group-add/thing-group-add',
        })
    },
    loadThingList() {
        console.log(thingGroupPage)
        if (app.globalData.whitOutServer) {
            this.setData({
                thingsGroup: thingGroupPage.data.records
            })
        } else {
            request('/thingGroup/page', {
                    page: 1,
                    perPage: 15
                }, 'GET')
                .then((res) => {
                    this.setData({
                        thingsGroup: res.data.records
                    })
                })
        }
    },
    jumpToThings(event){
        wx.navigateTo({
          url: '/pages/things/things?thingGroupId='+event.currentTarget.dataset.thingGroupId,
        })
    }
})