var banner = {

  //记录当前图片索引
  index: 0,

  //保存定时器序号
  timer: null,

  //自动切换图片时间
  duration: 3000,

  //获取元素
  query: function (selector) {
    //selector: css选择器
    return document.querySelectorAll(selector);
  },

  //绑定事件
  addEvent: function (selector, type, fn) {
    //selector: css选择器
    //type: 事件类型
    //fn: 事件执行函数
    var elements = this.query(selector);

    for (var i = 0; i < elements.length; i++) {
      elements[i]['on' + type] = fn;
    } 
  },

  //切换图片
  toggleImage: function () {

    //切换图片索引
    var lis = this.query('.list>li');

    //获取所有图片元素
    var imgBoxs = this.query('.img-box>div');

    //去除激活的li的激活状态
    this.query('.list>li.active')[0].className = '';

    //隐藏 已显示的图片
    this.query('.img-box>div:not(.hide)')[0].className = 'hide';
   
    //激活当前li
    lis[this.index].className = 'active';

    //显示 当前图片
    imgBoxs[this.index].className = '';

  },

  //自动轮播
  autoPlay: function () {

    var self = this;

    this.timer = setInterval(function () {
      //this指向window
       //下一张

      //修改index
      self.index = self.index == 3 ? 0 : ++self.index;

      //切换图片
      self.toggleImage();

    }, this.duration);

  },

  //初始化
  init: function () {

    var self = this;

    //绑定索引点击事件
    this.addEvent('.list>li', 'click', function () {
      // console.log('this ==> ', this);
      //this指向li

      //如果当前li激活的，直接拦截
      if (this.className == 'active') {
        return;
      }

      //查找激活的li
      var activeLi = self.query('.active')[0];

      //获取激活的li的索引值
      var activeNum = activeLi.dataset.num;

      //移除active类
      activeLi.className = '';

      //激活当前的li
      this.className = 'active';

      //获取当前li的索引值
      var currentNum = this.dataset.num;

      //获取所有图片元素
      var imgBoxs = self.query('.img-box>div');

      //隐藏 已显示的图片
      imgBoxs[activeNum].className ='hide';

      //显示 当前图片
      imgBoxs[currentNum].className = '';

      //修改index
      self.index = currentNum;

      // console.log('self.index ==> ', self.index);
    })


    //上下切换
    this.addEvent('.arrow', 'click', function () {
      var currentName = this.getAttribute('name');

      if (currentName == 'prev') {
        //上一张

         //修改index
         self.index = self.index == 0 ? 3 : --self.index;

      } else if (currentName == 'next') {
        //下一张

        //修改index
        self.index = self.index == 3 ? 0 : ++self.index
        
      }

       //切换图片
       self.toggleImage();

    })

    //开启自动轮播
    this.autoPlay();

    //banner绑定鼠标进入事件
    this.addEvent('.banner', 'mouseenter', function () {
      //清除定时器
      clearInterval(self.timer);
      self.timer = null;

      //显示左右切换按钮
      self.query('.arrows')[0].style.display = 'block';
    })

    //banner绑定鼠标离开事件
    this.addEvent('.banner', 'mouseleave', function () {
      //开启自动轮播
      self.autoPlay();

      //隐藏左右切换按钮
      self.query('.arrows')[0].style.display = 'none';
    })

  }

};