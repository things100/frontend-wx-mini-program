const app = getApp();

function request(path, param, method) {
    // 获取当前登录的用户的Token
    let userToken = wx.getStorageSync('user-token');
    // 发起请求w
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.globalData.basicUrl + path,
            data: param,
            method: method,
            dataType: method == 'POST' ? 'json' : '',
            header: {
                Authorization: userToken
            },
            success: (res) => {
                console.log(res)
                if (200 == res.statusCode) {
                    if (0 != res.data.code) {
                        wx.showToast({
                            title: res.data.message,
                            duration: 3000,
                            mask: true,
                            icon: 'none'
                        });
                    }
                    resolve(res.data)
                } else {
                    wx.showToast({
                        title: '系统繁忙，请稍后再试' + res.statusCode,
                        duration: 3000,
                        mask: true,
                        icon: 'none'
                    });
                }
            },
            fail: (res) => {
                wx.showToast({
                    title: '系统繁忙，请稍后再试',
                    duration: 3000,
                    mask: true,
                    icon: 'none'
                });
                reject(res);
            }
        })
    })
}


export {
    request
}