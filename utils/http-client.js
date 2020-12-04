const app = getApp();

function request(path, param, method, showSuccessToast) {
    // 获取当前登录的用户的Token
    let userToken = wx.getStorageSync('user-token');
    console.log('--------')
    // 发起请求w
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.globalData.basicUrl + path,
            data: param,
            method: method,
            dataType: method == 'POST' ? 'json' : '',
            header: {
                "Authorization": userToken,
                "Content-Type": "application/json"
            },
            success: (res) => {
                console.log(res)
                if (200 == res.statusCode) {
                    if (0 != res.data.code) {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 3000
                        })
                    };
                    console.log("showSuccessToast")
                    console.log(showSuccessToast)
                    if (showSuccessToast) {
                        console.log("应该显示遮罩")
                        wx.showToast({
                            mask: true,
                            title: '成功',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                    resolve(res.data)
                } else {
                    wx.showToast({
                        title: "系统繁忙，请稍后再试" + res.statusCode,
                        icon: 'none',
                        duration: 3000
                    })
                }
            },
            fail: (res) => {
                console.log("请求接口失败" + JSON.stringify(res))
                wx.showToast({
                    title: "系统繁忙，请稍后再试",
                    icon: 'none',
                    duration: 3000,
                    duration: 2000
                })
                reject(res);
            }
        })
    })
}


export {
    request
}