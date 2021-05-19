/* 
	加载动画插件
	version: 1.1.1
	author: 顾晨
	github: https://github.com/webdick/loadingJS
	
	建议为需隐藏的元素添加 style="display: none;" 这样效果会达到最好
	
	el:'#load',//绑定元素容器
	hide:'#app',//隐藏元素选择器 在加载完成前将该选择器下的元素全部进行隐藏 加载完成后再进行显示 起到防止未加载完却可以滚动的问题 可留空
	bindClass:'.load',//如果只想预加载有指定类名的图片就写这 不加则默认是自动预加载网页中的所有img
	wait:10000,//加载超时时间	 默认10000毫秒
	animateTime:1500,//动画淡入淡出时间 默认1500毫秒 建议不要超过delTime的时间 否则动画未加载完元素就会被彻底删除
	delTime:3000,//完全删除动画元素时间(包括容器) 默认3000毫秒
	callback:()=>{
		// 加载完成回调
		
	}

*/
;(function(){
	class Load{
		// 构造函数
		constructor(conf) {
			// 获取元素
			this.$el = conf.el.nodeType === 1?conf.el:document.querySelector(conf.el);
			// 重载信息等待时间
			this.$wait = conf.wait?conf.wait:10000;
			// 绑定类
			this.$bindClass = conf.bindClass?conf.bindClass:'img[src]';
			// 回调事件
			this.$callback = conf.callback;
			// 动画时长
			this.$animateTime = conf.animateTime?conf.animateTime/1000+'s':'1.5s';
			// 彻底删除时间
			this.$delTime = conf.delTime?conf.delTime:3000;
			
			// 如果目标元素存在
			if(this.$el){
				// 隐藏其他元素
				this.$hide = document.querySelector(conf.hide);
				if(this.$hide){
					this.$hide.style.display = "none";
				}
				// 为目标添加元素
				this.addHtml(this.$el);
				// 初始化进度和全局图片元素
				this.initData();
				
			}  
		}
		// 初始化加载
		initData(){
			// 读取页面所有图片
			let tags = document.querySelectorAll(this.$bindClass),
			loadingText = document.querySelector('#loading_tesxt > span'),
			tagsLen = tags.length,
			progress = 0,
			pices = 100 / tagsLen;
			
			// 如果未查询到目标图片
			if(tagsLen===0){
				console.log('预加载图片未命中')
				loadingText.innerHTML = "100%";
				this.loadOut();	
				return ;
			}
			// 遍历图片
			tags.forEach((v,i)=>{
				let img = new Image();
				img.src = v.src;
				// 每当图片载入成功
				img.onload = ()=>{
					progress += pices;
					loadingText.innerHTML = Math.floor(progress) + "%";
					// 当图片全部载入完成
					if(Math.floor(progress)>=99){
						console.log('预加载命中'+tagsLen+'张图片')
						this.loadOut();
						return ;
					}
				}
			});
			// 超出等待时间
			setTimeout(()=>{
				// 如果等待时间后仍处于加载状态则显示重载
				if(document.querySelector("#loading_container")){
					document.querySelector("#loading_slow").classList.add("loadFadeIn");
					console.log(document.querySelector("#loading_slow"))
				}
			}, this.$wait);
		}
		// 加载结束
		loadOut(){
			// 添加淡出动画
			document.querySelector("#loading_container").classList.add("loadFadeOut");
			if(this.$hide){
				this.$hide.style.display = "block";
			}
			// 回调延迟
			setTimeout(()=>{
				// 进行回调
				this.$callback();
			},300)
			// 删除元素
			setTimeout(()=>{
				this.$el.parentNode.removeChild(this.$el);
			},this.$delTime)	
			return ;
		}
		// 添加HTML
		addHtml(el){
			// 引入css
			let css = this.addCss();
			// 引入动画
			let animate = this.addAnimate();
			// 插入html
			el.innerHTML = `
				<div id="loading_container" style="display:'none';">
					<div id="loading_circle">
							<span id="outer">
								<span id="loading_tesxt">
									<span></span>
								</span>
								<span id="inner"></span>
								<span id="inner2"></span>
								<span id="inner3"></span>
							</span>
						<div id="load">
							L&nbsp;&nbsp;o&nbsp;&nbsp;a&nbsp;&nbsp;d&nbsp;&nbsp;i&nbsp;&nbsp;n&nbsp;&nbsp;g
						</div>
						<div id="loading_slow">
							网速有点慢，请继续等待 或 <a href="" click="location.reload()">重载</a> 网页
						</div>
					</div>
				</div>
				<style>
					${css+animate}
				</style>
			`;
		
		}
		// 添加css
		addCss(){
			return `
				div#loading_container {
				  position: fixed;
				  top: 0px;
				  left: 0px;
				  z-index: 1000;
				  width: 100%;
				  height: 100%;
				  padding: 0;
				  margin: 0;
				  text-align: center;
				  background-color: #ffffff;
				}
				div#loading_circle {
				  position: relative;
				  width: 85%;
				  margin: 30% auto;
				  text-align: center;
				  color: #555555;
				  opacity: 0.9;
				  text-transform: uppercase;
				  /*font: normal 12px/14px "ff-basic-gothic-web-pro",Arial,Helvetica,sans-serif;*/
				  font-family: "微软雅黑";
				  font-size: 12px;
				  height: 60%;
				  /*letter-spacing:7px;*/
				}
				div#loading_circle span#outer {
				  width: 50px;
				  height: 50px;
				  -webkit-border-radius: 15px;
				  -moz-border-radius: 15px;
				  border-radius: 50%;
				  display: block;
				  /*background:rgba(85,85,85,0.2);*/
				  margin: 0 auto 20px;
				  position: relative;
				  border: 1px solid rgba(0, 0, 0, 0.5)
				}
				div#loading_circle span#outer span#loading_tesxt {
				  width: 100%;
				  height: 100%;
				  position: absolute;
				  top: 0;
				  left: 0;
				  text-align: center;
				  line-height: 50px;
				}
				div#loading_circle span#outer span#loading_tesxt> span {
				  display: block;
				}
				div#loading_circle > .logoimg{
				  width: 100%;
				  text-align: center;
				}
				div#loading_circle > .logoimg img{
				  height: 100%;
				  margin-bottom: 10px;
				  display: inline-block;
				}
				
				div#loading_circle span#outer {
				  /*-webkit-animation: throbber 1.5s infinite;
				animation: throbber 1.5s infinite;*/
				}
				div#loading_circle span#outer span#inner {
				  width: 50px;
				  height: 50px;
				  display: block;
				  position: absolute;
				  -webkit-animation: xuanzhuan 1s infinite linear;
				  animation: xuanzhuan 1s infinite linear;
				  -webkit-animation-fill-mode: both;
				  animation-fill-mode: both
				}
				div#loading_circle span#outer span#inner:after {
				  content: "";
				  width: 10px;
				  height: 10px;
				  -webkit-border-radius: 10px;
				  -moz-border-radius: 10px;
				  border-radius: 50%;
				  display: block;
				  background: rgb(85, 85, 85);
				  position: absolute;
				  left: 10px;
				  top: -3px;
				}
				div#loading_circle span#outer span#inner2 {
				  width: 50px;
				  height: 50px;
				  display: block;
				  position: absolute;
				  -webkit-animation: xuanzhuan 1.5s infinite linear reverse;
				  animation: xuanzhuan 1.5s infinite linear reverse;
				}
				div#loading_circle span#outer span#inner2:after {
				  content: "";
				  width: 10px;
				  height: 10px;
				  -webkit-border-radius: 10px;
				  -moz-border-radius: 10px;
				  border-radius: 50%;
				  display: block;
				  background: rgb(85, 85, 85);
				  position: absolute;
				  left: 10px;
				  bottom: -3px;
				}
				div#loading_circle span#outer span#inner3 {
				  width: 50px;
				  height: 50px;
				  display: block;
				  position: absolute;
				  -webkit-animation: xuanzhuan 2s infinite linear;
				  animation: xuanzhuan 2s infinite linear;
				}
				div#loading_circle span#outer span#inner3:after {
				  content: "";
				  width: 10px;
				  height: 10px;
				  -webkit-border-radius: 10px;
				  -moz-border-radius: 10px;
				  border-radius: 50%;
				  display: block;
				  background: rgb(85, 85, 85);
				  position: absolute;
				  right: -5px;
				  top: 20px;
				}
				div#loading_circle div#loading_slow {
				  display: none;
				  margin: 20px 0 0;
				  letter-spacing: 0;
				  text-transform: none;
				  font: normal 12px/14px "cronos-pro-display", helvetica, arial, sans-serif;
				  font-family: "微软雅黑";
				}
				div#loading_circle div#loading_slow a {
				  text-decoration: none;
				  color: rgba(183, 47, 47, 0.7);
				}
				div#loading_circle div#loading_slow a:hover {
				  color: rgba(183, 47, 47, 0.7);
				}
				
			`;
		}
		// 添加动画
		addAnimate(){
			let time = this.$animateTime;
			return `
				@-webkit-keyframes loadFadeOut {
				  from {
				    opacity: 1;
				  }
				
				  to {
				    opacity: 0;
				  }
				}
				
				@keyframes loadFadeOut {
				  from {
				    opacity: 1;
				  }
				
				  to {
				    opacity: 0;
				  }
				}
				
				.loadFadeOut {
				-webkit-animation-duration: ${time};
				animation-duration: ${time};
				-webkit-animation-fill-mode: both;
				animation-fill-mode: both;
				  -webkit-animation-name: loadFadeOut;
				  animation-name: loadFadeOut;
				}
				
				@-webkit-keyframes loadFadeIn {
				  from {
				    opacity: 0;
				  }
				
				  to {
				    opacity: 1;
				  }
				}
				
				@keyframes loadFadeIn {
				  from {
				    opacity: 0;
				  }
				
				  to {
				    opacity: 1;
				  }
				}
				
				.loadFadeIn {
					display:block!important;
					-webkit-animation-duration: ${time};
					animation-duration: ${time};
					-webkit-animation-fill-mode: both;
					animation-fill-mode: both;
				  -webkit-animation-name: loadFadeIn;
				  animation-name: loadFadeIn;
				}
				
				@-webkit-keyframes throbber {
				  0% {
				      -webkit-transform: scale3d(1, 1, 1);
				      transform: scale3d(1, 1, 1);
				  }
				  50% {
				      -webkit-transform: scale3d(1.2, 1.2, 1.2);
				      transform: scale3d(1.2, 1.2, 1.2);
				  }
				  100% {
				      -webkit-transform: scale3d(1, 1, 1);
				      transform: scale3d(1, 1, 1);
				  }
				}
				@keyframes throbber {
				  0% {
				      -webkit-transform: scale3d(1, 1, 1);
				      transform: scale3d(1, 1, 1);
				  }
				  50% {
				      -webkit-transform: scale3d(1.2, 1.2, 1.2);
				      transform: scale3d(1.2, 1.2, 1.2);
				  }
				  100% {
				      -webkit-transform: scale3d(1, 1, 1);
				      transform: scale3d(1, 1, 1);
				  }
				}
				@-webkit-keyframes xuanzhuan {
				  0% {
				      -webkit-transform: rotate3d(0, 0, 1, 0deg);
				      transform: rotate3d(0, 0, 1, 0deg);
				  }
				  10% {
				      -webkit-transform: rotate3d(0, 0, 1, 36deg);
				      transform: rotate3d(0, 0, 1, 36deg);
				  }
				  20% {
				      -webkit-transform: rotate3d(0, 0, 1, 72deg);
				      transform: rotate3d(0, 0, 1, 72deg);
				  }
				  30% {
				      -webkit-transform: rotate3d(0, 0, 1, 108deg);
				      transform: rotate3d(0, 0, 1, 108deg);
				  }
				  40% {
				      -webkit-transform: rotate3d(0, 0, 1, 144deg);
				      transform: rotate3d(0, 0, 1, 144deg);
				  }
				  50% {
				      -webkit-transform: rotate3d(0, 0, 1, 180deg);
				      transform: rotate3d(0, 0, 1, 180deg);
				  }
				  60% {
				      -webkit-transform: rotate3d(0, 0, 1, 216deg);
				      transform: rotate3d(0, 0, 1, 216deg);
				  }
				  70% {
				      -webkit-transform: rotate3d(0, 0, 1, 252deg);
				      transform: rotate3d(0, 0, 1, 252deg);
				  }
				  80% {
				      -webkit-transform: rotate3d(0, 0, 1, 288deg);
				      transform: rotate3d(0, 0, 1, 288deg);
				  }
				  90% {
				      -webkit-transform: rotate3d(0, 0, 1, 324deg);
				      transform: rotate3d(0, 0, 1, 324deg);
				  }
				  100% {
				      -webkit-transform: rotate3d(0, 0, 1, 360deg);
				      transform: rotate3d(0, 0, 1, 360deg);
				  }
				}
				@keyframes xuanzhuan {
				  0% {
				      -webkit-transform: rotate3d(0, 0, 1, 0deg);
				      transform: rotate3d(0, 0, 1, 0deg);
				  }
				  10% {
				      -webkit-transform: rotate3d(0, 0, 1, 36deg);
				      transform: rotate3d(0, 0, 1, 36deg);
				  }
				  20% {
				      -webkit-transform: rotate3d(0, 0, 1, 72deg);
				      transform: rotate3d(0, 0, 1, 72deg);
				  }
				  30% {
				      -webkit-transform: rotate3d(0, 0, 1, 108deg);
				      transform: rotate3d(0, 0, 1, 108deg);
				  }
				  40% {
				      -webkit-transform: rotate3d(0, 0, 1, 144deg);
				      transform: rotate3d(0, 0, 1, 144deg);
				  }
				  50% {
				      -webkit-transform: rotate3d(0, 0, 1, 180deg);
				      transform: rotate3d(0, 0, 1, 180deg);
				  }
				  60% {
				      -webkit-transform: rotate3d(0, 0, 1, 216deg);
				      transform: rotate3d(0, 0, 1, 216deg);
				  }
				  70% {
				      -webkit-transform: rotate3d(0, 0, 1, 252deg);
				      transform: rotate3d(0, 0, 1, 252deg);
				  }
				  80% {
				      -webkit-transform: rotate3d(0, 0, 1, 288deg);
				      transform: rotate3d(0, 0, 1, 288deg);
				  }
				  90% {
				      -webkit-transform: rotate3d(0, 0, 1, 324deg);
				      transform: rotate3d(0, 0, 1, 324deg);
				  }
				  100% {
				      -webkit-transform: rotate3d(0, 0, 1, 360deg);
				      transform: rotate3d(0, 0, 1, 360deg);
				  }
				}
				`;
		}
		
	}
	// 暴露入口类
	window.Load = Load
})();
