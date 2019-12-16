var validForm = {

  //邮箱验证
  isEmail: function (value) {

    //value: 需要验证的邮箱

    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return reg.test(value);
  },

  //手机号验证
  isPhone: function (value) {
    //value: 需要验证的手机号

    var reg = /^(\+86|0)?1[3-9]\d{9}$/;

    return reg.test(value);
  },

  //验证匿名, 汉字字母数字，并且含有大写字母 (4-8)  gjhd1245哈Aasaaqqq
  isNickname: function (value) {
    //value: 需要验证的匿名

    var reg = /^(?=.*[A-Z])[A-Za-z0-9\u4e00-\u9fa5]{4,8}$/;

    return reg.test(value);
  },

  //验证密码, 字母数字 (6-16)
  isPassword: function (value) {
    //value: 需要验证的密码
    var reg = /^[A-Za-z0-9]{6,16}$/;
    return reg.test(value);
  },

  //验证两值相等
  isEqual: function (v1, v2) {
    //v1, v2 需要判断相等的两个值

    return v1 == v2;
  }


};