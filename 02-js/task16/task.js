/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById('aqi-city-input');
var aqiInput = document.getElementById('aqi-value-input');
var table = document.getElementById('aqi-table');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function trimStr(str){
 	return str.replace(/(^\s*)|(\s*$)/g,"");
 }
function addAqiData() {
	var cityInputVal=trimStr(cityInput.value);
	var aqiVal=trimStr(aqiInput.value);
	//console.log(cityInputVal);
	var patt1 = new RegExp(/^[A-Za-z\u4E00-\u9FA5]+$/);
	var patt2 = new RegExp(/^\d+$/);
	if(cityInputVal){
		if(!patt1.test(cityInputVal)){
			alert('城市名必须为中英文字符');
			cityInput.focus();
			return;
		}
		//console.log(cityInputVal)
	}else{
		alert('城市名必须不为空');
		cityInput.focus();
		return;
	}
	if(aqiVal){
		if(!patt2.test(aqiVal)){
			alert('空气指数必须为整数');
			aqiInput.focus();
			return;
		}
	}else{
		alert('空气指数必须不为空');
		aqiInput.focus();
		return;
	}
	aqiData[cityInputVal] = aqiVal;
	//console.log(aqiData)
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var items='<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>';
	for (var city in aqiData){
		items +='<tr><td>'+city+'</td><td>'+aqiData[city]+'</td><td><button data-city="'+city+'" onclick="delBtnHandle(this)">删除</button></td></tr>'
	}
	table.innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
  // do sth.
  var city = obj.getAttribute('data-city')
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').addEventListener('click', addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();