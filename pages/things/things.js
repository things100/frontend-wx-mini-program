// pages/things/things.js
import {
    request
} from '../../utils/http-client'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        perPage: 15,
        thingGroupId: '',
        thingGroup: null,
        things: [],
        progress: 0,
        title: '',
        sortNum: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            thingGroupId: options.thingGroupId
        });
        this.loadData();
        this.loadProgress();
    },

    loadData() {
        request('/thing/page/group', {
                page: this.data.page,
                perPage: this.data.perPage,
                thingGroupId: this.data.thingGroupId
            }, 'GET', false)
            .then((res) => {
                this.setData({
                    thingGroup: res.data.thingGroup,
                    things: res.data.thingPage.records
                });
                wx.setNavigationBarTitle({
                    title: this.data.thingGroup.title,
                })
            });
    },
    loadProgress() {
        request('/thing/completePercent/' + this.data.thingGroupId, {}, 'GET', false).then((res) => {
            this.setData({
                progress: parseInt(res.data * 100)
            })
        })
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
        this.loadData();
        this.loadProgress()
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
    addThing(event) {
        this.setData({
            showAddThing: true
        })
        // wx.navigateTo({
        //     url: '/pages/thing-add/thing-add?thingGroupId=' + this.data.thingGroupId,
        // })
    },
    onCloseAddThing() {
        this.setData({
            showAddThing: false,
            title: null,
            sortNum: null
        })
    },
    onCompleteChange(event) {
        console.log(event)
        let _things = this.data.things
        console.log(_things)
        console.log(event.currentTarget.dataset.index)
        _things[event.currentTarget.dataset.index].complete = event.detail

        request('/thing/complete', {
            'id': _things[event.currentTarget.dataset.index].id,
            'complete': event.detail
        }, 'PUT', false).then((res) => {});
        this.setData({
            things: _things
        });
        this.loadProgress();
    },
    onChangeInput(event) {
        console.log(event)
        switch (event.currentTarget.dataset.inputType) {
            case 'stepper':
                this.setData({
                    sortNum: event.detail
                });
                break;
            case 'title':
                this.setData({
                    title: event.detail
                })
                break;
        }

    },
    submit(event) {
        request(
            '/thing', {
                title: this.data.title,
                thingGroupId: this.data.thingGroupId,
                sortNum: this.data.sortNum
            }, 'POST', true
        ).then((res) => {
            
        });
        this.onCloseAddThing();
        this.loadData();
    },
    onThingTitleClick(event){
        console.log(event)
        this.setData({
            activeNames:event.detail
        })
    }
})