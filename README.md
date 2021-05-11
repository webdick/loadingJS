# loading.js
为你的网页添加图片加载进度动画 目标图片均加载完成后自动删除动画窗
原生Js 不依赖任何其它插件
> 如果你在使用过程中遇到问题或者有更好的建议,请联系我.

> 觉得好用不要忘记给我点个Star~
![image](https://user-images.githubusercontent.com/37569121/117770442-7f2d8f80-b267-11eb-95fb-9652a84e55de.png)
## 快速使用
你只要引入js即可 无需引入任何其它文件
```html
<script src="loading.js"></script>
```
在页面中提供一个容器给加载动画元素
```html
<body>
  <div id="load"></div>
  ...
</body>
```
绑定容器ID并实例化即可 开箱即用
```html
<script type="text/javascript">
var load = new Load({
  el:'#load',//绑定元素容器
})
</script>
```
## 详细配置参数
```html
<script type="text/javascript">
var load = new Load({
  el:'#load',//绑定元素容器
  hide:'#app',//隐藏元素选择器 在加载完成前将该选择器下的元素全部进行隐藏 加载完成后再进行显示 起到防止滚动的作用
  bindClass:'.load',//如果只想预加载有指定类名的图片就写这 不加则默认是自动预加载网页中的所有img
  wait:10000,//加载超时时间	 默认10000毫秒
  animateTime:'1.5s',//动画淡入淡出时间 默认1.5s 建议不要超过delTime的时间 否则动画未加载完元素就会被彻底删除
  delTime:3000,//完全删除动画元素时间(包括容器) 默认3000毫秒
  callback:()=>{}// 加载完成回调事件
})
</script>
```
 参数 | 必填 | 默认 | 描述
------------- | ------------- | ------------- | -------------
el  | 是 | 无 | 绑定元素容器ID
hide  | 否 | 无 | 隐藏元素选择器 在加载完成前将该选择器下的元素全部进行隐藏 加载完成后再进行显示 起到防止滚动的作用
bindClass  | 否 | 无 | 如果只想预加载有指定类名的图片就写这 不加则默认是自动预加载网页中的所有img
wait  | 否 | 10000 | 加载超时时间
animateTime  | 否 | 1.5s | 动画淡入淡出时间 默认1.5s 建议不要超过delTime的时间 否则动画未加载完元素就会被彻底删除
delTime  | 否 | 3000 | 完全删除动画元素时间(包括容器) 默认3000毫秒
callback  | 否 | 无 | 加载完成回调事件

## 优化建议

- 尽量保持loadingJS不被其它js嵌套
- 尽量将你的其它的js写在loadingJS的callback(回调事件)中
- 如果发现在加载动画中你依旧可以进行上下滚动 请为你的其它元素添加display:none;并将它的父容器类名写进hide参数 这样加载完后将自动显示隐藏元素
