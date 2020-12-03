// pages/thing-group-add/thing-group-add.js

import {
    thingGroup,
    thingGroupPage
} from '../../data/data'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        titleColor: '',
        description: '',
        descriptionColor: '',
        cover: '',
        ruleForm:{
            title: '',
        description: '',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.lin.initValidateForm(this);
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
    chooseBgImg() {
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

    submit(event) {
        console.log(event)
    },
    reset(event) {
        console.log(event)
        wx.lin.resetForm('thingGroupAddForm');
    }
})