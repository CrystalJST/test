
var app = getApp();
var request = require('../../utils/requestServer');
//var indexPwdType = 'printerpsd';
Page({
  data: {
    shopId: -1,
    owner: {},
    userInfo: '',
    focus: false,
    waitEdit: true,

    mesEdit:true,
    iconEdit: false,//只上传图标
    hasIconChange: false,
    index: 0,
    isShowPassword: true,
     waitSubmit:true
   // BackgroundImg: "/imgs/printer/show2.png",
    //passwordType: indexPwdType,
  },
  onLoad: function (data) {
    console.log(data);
    var shopId = wx.getStorageSync('s_id');
    console.log(shopId);
    this.setData({
      shopId: shopId,
    });
    this.getOwnerInfo(this.data.shopId);
    this.setData({
      nowtab: data.toTab,
    });
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  toEditPrinter: function () {
    console.log('进入修改函数');
    this.setData({
      waitEdit: false,
      iconEdit: false,
      focus: true,
      mesEdit:false
    });
  },

  testPrinter: function (e) {
    console.log(e);
    this.setData({
      waitEdit: true,
      focus: false,
      mesEdit: false
    });
    var that = this;
    var shopId = wx.getStorageSync('s_id');
    var url = '/Wxmanager/testExistPrinter?s_id=' + shopId;
    request.sendRequest(url, 'GET', {}, {})
      .then(function (res) {
        console.log(res.data);
        that.setData({
          attention: res.data,
        });
      }, function (error) {
        console.log(error);
      });
  },

  
  // submitPrinter: function() {
   
  //   this.setData({
  //     //waitSubmit: false,
  //     waitEdit:false
  //   });
  // },
  //删除打印机
  deletePrinter:function(){
    console.log('进入删除函数');
    var that = this;
    var shopId = wx.getStorageSync('s_id');
    var url = '/Wxmanager/deleteExistPrinter?s_id=' + shopId;
    request.sendRequest(url, 'GET', {}, {})
      .then(function (res) {
        console.log(res.data);
        that.setData({
          Test: res.data,
        });
      }, function (error) {
        console.log(error);
      });
    
  },
  //获取商家信息
  getOwnerInfo: function (e) {
    console.log('shop_id:' + e);
    var that = this;
    var url = '/Wxmanager/getOwnerInfo?s_id=' + e;
    request.sendRequest(url, 'GET', e, {})
      .then(function (res) {
        console.log(res.data);
        that.setData({
          owner: res.data,
        });
      }, function (error) {
        console.log(error);
      });
  },
  
  



  //提交修改后信息
  //提交表单（包括头像）
  formSubmit: function (e) {
    console.log(e);
    this.setData({
      waitEdit: true,
      focus: false,
      mesEdit:false
    });
    this.data.owner.printername = e.detail.value.printername;
    this.data.owner.printerpsd = e.detail.value.printerpsd;
    var that = this;
    var shopId = wx.getStorageSync('s_id');
    var printername = this.data.owner.printername;
    var printerpsd = this.data.owner.printerpsd;
    var url = '/Wxmanager/bindPrinterTest?s_id=' + shopId + '&printername=' + printername + '&printerpsd=' + printerpsd;
    request.sendRequest(url, 'GET', {}, {})
      .then(function (res) {
        console.log(res.data);
        that.setData({
          attention: res.data,
        });
      }, function (error) {
        console.log(error);
      });
  },


// testTap: function () {
//   if (indexPwdType == 'printerpsd') {
//     indexPwdType = 'text';
//     var show = "/imgs/printer/show2.png";
//     this.setData({
//       passwordType: 'text',
//       BackgroundImg: show
//     });
//   } else {
//     indexPwdType = 'printerpsd';
//     var noshow = "/imgs/printer/no_show.png";
//     this.setData({
//       passwordType: 'printerpsd',
//       BackgroundImg: noshow
//     });
//   }
// }
  // /////显示密码或者隐藏密码的图片控住函数
  // showPassword: function () {
  //   if (this.data.isShow) {   //如果this.data.isShow为true,则表示为密码小黑点
  //     this.setData({
  //       isShow: false,
  //       show: "owner.printerpsd"
  //     })
  //   } else {
  //     this.setData({
  //       isShow: true,
  //       show: "text"
  //     })
  //   }
  // },

  // //密码输入检测
  // getPassWord: function (e) {
  //   var password = e.detail.value;
   
  //   this.setData({
  //     password: owner.printerpsd
  //   })
  // },

  toggleShowPassword: function (e) {
    var isShowPassword = !this.data.isShowPassword;
    this.setData({
      isShowPassword: isShowPassword
    });
  },



})
