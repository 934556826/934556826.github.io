//'2019-10-10 10:10:10'  'yyyy-MM-dd hh:mm:ss'

Date.prototype.format = function (rule) {

	//rule: 'yyyy-MM-dd hh:mm:ss'

	//替换年份
	var year = this.getFullYear();

	var yearReg = /(y+)/;

	if (yearReg.test(rule)) {
		console.log('RegExp.$1 ==> ', RegExp.$1);

		var groupContent = RegExp.$1;

		rule = rule.replace(groupContent, year);

	}


	//月，日，时，分，秒
	var o = {
		'M': this.getMonth() + 1, //月
		'd': this.getDate(), //日
		'h': this.getHours(), //时
		'm': this.getMinutes(), //分
		's': this.getSeconds() //秒
	};

	//替换 月，日，时，分，秒
	for (var key in o) {
		var reg = new RegExp('(' + key + '+)');

		if (reg.test(rule)) {

			//获取匹配组内容
			var content = RegExp.$1;

			var value = o[key];

			rule = rule.replace(content, value >= 10 ? value : content.length >= 2 ? '0' + value : value);

		}
	}

	return rule;

}

//添加留言
function AddMessage() {
	//标记留言板的状态
	this.status = false;

	//保存留言实例
	this.message = [];

	//查看留言标记
	this.index = null;

	//添加留言或编辑留言
	this.isAdd = true;

	// 记录编辑的留言
	this.editIndex = null;
}
// 获取元素
AddMessage.prototype.elements = function (selector, parent) {
	return (parent !== undefined && parent.nodeType == 1 ? parent : document).querySelectorAll(selector);
}
//显示或隐藏元素
AddMessage.prototype.toggle = function (selector, status) {
	var elements = this.elements(selector);

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.display = status;
	}
}

//绑定事件
AddMessage.prototype.addEvent = function (selector, type, fn) {
	var elements = this.elements(selector);

	for (var i = 0; i < elements.length; i++) {
		elements[i]['on' + type] = fn;
	}
}
//创建对象
AddMessage.prototype.create = function (tagName) {
	return document.createElement(tagment);
}

//清空元素的内容
AddMessage.prototype.clear = function (selector) {
	var elements = this.elements(selector);

	for (var i = 0; i < elements.length; i++) {
		elements[i].value = '';
	}
}

//生成留言面板
AddMessage.prototype.generateWrite = function (message) {
	var fragment = document.createDocumentFragment();

	for (var i = 0; i < message.length; i++) {
		//生成留言面板
		var item = this.create('div');
		item.className = 'item';

		var str = `<div class="t">
        <span class="write-date">${message[i].writeDate}</span>
        <span class="read">阅读次数：<span class="read-count">${message[i].readCount}</span></span>
      </div>
      <div class="title">标题：<span class="write-title">${message[i].writeTitle}</span></div>
      <div class="b">
        <div class="l">
          <div class="name one-text"><span class="writer-name">${message[i].writer}</span>说：</div>
          <div class="content one-text write-content">${message[i].writeContent}</div>
        </div>
        <div class="r">
          <span class="readed" data-index="${i}">查看</span>
          <span class="edited" data-index="${i}">编辑</span>
          <span class="removed" data-index="${i}">删除</span>
        </div>
	  </div>`;
	  
	  item.innerHTML = str;

	  //查看留言
	  this.read('.readed',item);

	  //删除留言
	  this.remove('.removed',item);

	  //编辑留言
	  this.edit('.edited',item);

	  fragment.appendChild(item);
	}

	this.elements('.right')[0].appendChild(fragment);
}

//查看留言
AddMessage.prototype.read = function(selector,item){
	var self = this;

	var element = this.elements(selector,item)[0];

	element.onclick = function(){
		//获取当前的留言信息
		var currentMessage = self.message[this.dataset.index];

		console.log('currentMessage ==> ',currentMessage);

		//如果当前是查看状态，直接拦截，已查看为1，未查看为0
		if(currentMessage.readStatus == 1){
			return;
		}
		//当前留言查看状态
		currentMessage.readStatus = 1;

		//修改上一次查看留言的标记
		if(self.index != null){
			self.message[self.index].readStatus = 0;
		}

		self.toggle('.add-edit','none');
		self.toggle('.reading','block');
		self.status = false;

		//修改当前查看留言的标记
		self.index = this.dataset.index;

		currentMessage.readCount++;

		//显示留言信息
		for(var key in currentMessage){
			if(key == 'readCount' || key == 'readStatus'){
				continue;
			}

			self.elements("#" + key)[0].textContent = currentMessage[key];

		}

		var parent = this.parentNode.parentNode.parentNode;
		self.elements('.read-count',parent)[0].textContent = currentMessage.readCount;

		//修改本地存储数据的阅读次数
		var localMsg= JSON.parse(localStorage.getItem('message'));
		localMsg[this.dataset.index].readCount = currentMessage.readCount;

		localStorage.setItem('message',JSON.stringify(localMsg));
	}
}
//删除留言
AddMessage.prototype.remove = function(selector,item){
	var self = this;

	var element = this.elements(selector,item)[0];

	element.onclick = function(){
		this.parentNode.parentNode.parentNode.remove();

		console.log(self.message[this.dataset.index]);
	}
}

AddMessage.prototype.init = function(){
	var self = this;

	//获取本地存储留言实例
	var localMsg = localStorage.getItem('message');
}