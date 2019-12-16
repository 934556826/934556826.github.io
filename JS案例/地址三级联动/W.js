var W = {

	//通过css选择器获取所有元素
	query: function(selector, parent) {
		//selector: css选择器

		//在parent元素下查找元素
		//parent: 父元素
		return(parent !== undefined && parent.nodeType == 1 ? parent : document).querySelectorAll(selector);
	},

	//获取box的同胞元素(含有.a)
	siblings: function(selector, brotherSelector) {
		//selector: 元素的css选择器；
		//brotherSelector: 同级元素的css选择器；

		//获取selector的父级元素;
		var parent = this.query(selector)[0].parentNode;

		//获取父级元素中含的brotherSelector的所有后代;
		var bro = this.query(brotherSelector, parent);

		//遍历所有后代元素;当它的父级元素和selector的父级元素相等时，则为同级元素;
		var wen = [];

		for(var i = 0; i < bro.length; i++) {

			var broparent = bro[i].parentNode;

			if(broparent === parent) {

				wen.push(bro[i]);
			}
		}
		return wen;
	},

	//创建元素
	create: function(tagName) {
		//标签名称
		return document.createElement(tagName);
	},

	event: function(selector, type, fn) {
		//selector: css选择器
		//type: 事件类型
		//fn: 事件执行函数
		var elements = this.query(selector);

		for(var i = 0; i < elements.length; i++) {
			elements[i]['on' + type] = fn;
		}

	},

	provinc: function(parent) {

		var provinc = this.query(parent)[0];

		for(var i = 0; i < data.provinces.length; i++) {

			var option = this.create('option');

			option.value = data.provinces[i].name;

			option.textContent = data.provinces[i].title;

			provinc.appendChild(option);

		}

	},

	init: function() {

		var self = this;

		var citya = self.query('#city')[0];

		var areas = self.query('#area')[0];

		this.provinc('#provinces');

		var obj = {};

		var province = {};

		var city = {};

		var area = {};

		var detial = {};

		var wen = false;

		var www = this.query('.address').value !== undefined;

		//省级和市级和区级的联动
		this.event('#provinces', 'change', function() {

			var value = this[this.selectedIndex].value;

			var textcon = this[this.selectedIndex].textContent;

			//每换一个省份则重置城市和区/县
			citya.innerHTML = '<option value="cities">城市</option>';

			areas.innerHTML = '<option value="areas">区/县</option>';

			if(value == 'default') {

				return;
			} else {

				//把当前选中的信息存储于对象中;
				province.name = value;

				province.title = textcon;

				obj.province = province;

				//添加城市
				var cities = data.cities[value];

				for(var i = 0; i < cities.length; i++) {

					var option = self.create('option');

					option.value = cities[i].name;

					option.textContent = cities[i].title;

					citya.appendChild(option);
				}

			}

		})

		this.event('#city', 'change', function() {

			var value = this[this.selectedIndex].value;

			var textcon = this[this.selectedIndex].textContent;

			//每换一个城市则重置区/县
			areas.innerHTML = '<option value="areas">区/县</option>';

			if(value == 'cities') {

				return;

			} else {

				//把当前选中的信息存储于对象中;
				city.name = value;

				city.title = textcon;

				obj.city = city;

				//添加区/县
				var areaa = data.areas[value];

				for(var i = 0; i < areaa.length; i++) {

					var option = self.create('option');

					option.value = areaa[i].name;

					option.textContent = areaa[i].title;

					areas.appendChild(option);
				}

			}

		})

		this.event('#area', 'change', function() {

			var value = this[this.selectedIndex].value;

			var textcon = this[this.selectedIndex].textContent;

			area.name = value;

			area.title = textcon;

			obj.area = area;

			if(value == 'areas') {
				wen = false;
			} else {
				wen = true;
			}

		})

		this.event('.address', 'input', function() {

			var title = {};

			title.title = this.value;

			if(this.value == '') {
				wen = false;
				www = false;
			} else {
				wen = true;
				www = true;
			}

			obj.detial = title;

		})

		this.event('#submit', 'click', function() {

			var box = self.query('.box')[0];

			var alert = self.query('.alert')[0];

			var alertText = self.query('#alert')[0];

			if(wen && www) {

				console.log(obj);

				box.style.border = '2px solid coral';

				var add = obj.province.title + obj.city.title + obj.area.title + obj.detial.title;

				alertText.innerHTML = add;

				alert.style.display = 'block';

			} else {
				alert('请输入完整地址');
			}

		})

	},

}