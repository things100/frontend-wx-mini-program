// pages/thing-group-add/thing-group-add.js

import {
    thingGroup,
    thingGroupPage
} from '../../data/data';

import {
    request
} from '../../utils/http-client';

import Toast from '@vant/weapp/toast/toast';

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        titleColor: '',
        description: '',
        descriptionColor: '',
        cover: null,
        open: true,
        coverType: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.whitOutServer) {
            let record = thingGroupPage.data.records[0];
            this.setData({
                title: record.title,
                description: record.description,
                cover: [{
                    name: '背景图',
                    url: record.cover,
                    isImage: true,
                    deletable: true
                }]
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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
    /**
     * 选择背景图片
     */
    changeImg(event) {
        console.log(event)
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                this.setData({
                    cover: res.tempFilePaths[0]
                })
            }
        })
    },
    submitThingGroup(event) {
        console.log(event);
        request('/thingsGroup', {
            "title": this.data.title,
            "description": this.data.description,
            "cover": this.data.cover[0].url,
            "coverType": this.data.coverType,
            "open": this.data.open
        }, 'POST', true).then((res) => {
            console.log(res)
        })
    },
    openChange(event) {
        this.setData({
            open: !this.data.open
        })
    },
    afterRead(event) {
        console.log(event)
        this.setData({
            cover: [{
                url: event.detail.file.url
            }]
        })
    },
    deleteBgImg(event) {
        console.log(event)
        this.setData({
            cover: null
        })
    },

    onChangeInput(event) {
        switch (event.currentTarget.dataset.inputType) {
            case 'title':
                this.setData({
                    title: event.detail
                });
                break;
            case 'description':
                this.setData({
                    description: event.detail
                });
                break;
        }
    }
})