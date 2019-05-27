$(document).ready(function() {
	$.ajax({
		url: "https://api.danjiguanjia.com/active/index/getGoods",
		dataType: "json",
		data: {},
		type: "post",
		success: function(data) {
			// $("body>img").attr("src",data["data"][0].image);
			var ctx = $("#canvas")[0].getContext("2d");
			var ctxhidden = $("#hidden")[0].getContext("2d");
			//动态获取数据，用canvas画转盘
			draw();
			function draw() {
				ctx.beginPath();
				ctx.arc(300, 300, 150, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(248,147,137)";
				ctx.fill();
				ctx.closePath();
				var numb = data["data"].length; //获取奖项个数，方便平分圆盘
				console.log(numb)
				var deg = 2 * Math.PI / numb; //获取平分角度
				deg = Math.PI / numb - 0.5 * Math.PI; //初始化第一个奖品位置在正上方
				var color = "";
				var color2 = "";
				var title = "";
				for(var i = 0; i < numb; i++) { //循环预加载图片
					var img = new Image();
					img.src = data["data"][i].image;
					ctxhidden.drawImage(img, -24, -168, 48, 48);
				}
				//下面开始画扇形区域
				setTimeout(function() {
					for(var i = 0; i < numb; i++) {
						//if判断圆盘扇形区域的颜色
						if(i % 2 == 0) {
							color = "rgb(254,104,105)";
							color2 = "white";
						} else {
							color = "rgb(254,117,117)";
							color2 = "white";
						}
						//画扇形；
						ctx.save();
						ctx.translate(300, 300);
						ctx.beginPath();
						ctx.arc(0, 0, 220, (deg - 2 * Math.PI / numb), deg, false);
						ctx.save();
						ctx.rotate(deg);
						ctx.moveTo(220, 0);
						ctx.lineTo(0, 0);
						ctx.restore();
						ctx.save();
						ctx.rotate((deg - 2 * Math.PI / numb));
						ctx.lineTo(220, 0);
						ctx.restore();
						ctx.fillStyle = color;
						ctx.fill();
						ctx.closePath();
						ctx.restore();
						//写文字和贴图标
						title = data["data"][i].title;
						ctx.save();
						ctx.translate(300, 300);
						ctx.rotate(deg - (Math.PI / numb) + (0.5 * Math.PI));
						ctx.beginPath();
						ctx.font = "24px bold";
						ctx.fillStyle = color2;
						ctx.textAlign = "center";
						ctx.textBaseline = "top";
						ctx.fillText(title, 0, -200);
						ctx.closePath();
						var img = new Image();
						img.src = data["data"][i].image;
						ctx.drawImage(img, -24, -168, 48, 48);
						ctx.restore();
						deg += 2 * Math.PI / numb;
					}
				}, 500);
			};
			//点击抽奖触摸提示
			$(".runner>a").on("touchstart", function() {
				$(this).css("transform", "scale(0.95)")
			});
			$(".runner>a").on("touchend", function() {
				$(this).css("transform", "scale(1)")
			})
		}
	});
	//定位图片
	var heightv;
	heightv = $(window).height();
	if(heightv > 551) {
		$("body").css({
			"height": heightv + "px",
			"padding-top": 20 + heightv - 551 + "px"
		});
		$(".r-text").css("top", 430 + heightv - 551 + "px");
		$(".r-outer>p").css("top", 365 + heightv - 551 + "px");
	}
	$.ajax({
		url: "https://api.danjiguanjia.com/v1/app/getwinningrecord",
		dataType: "json",
		data: {},
		type: "post",
		success: function(data) {
			myhheight = data['data'].length * 15;
			$("#WinningRecord").css("height", "1000px");
			var html = '';
			var gift = '';
			var mobile_phone = '';
			if(data["retcode"] == 2000) {
				for(e in data["data"]) {
					gift = data['data'][e].gift;
					mobile_phone = data['data'][e].mobile_phone;
					html += "<li style='height: 15px; box-sizing: border-box; margin: 0px;'><div class='l'>";
					html += "恭喜  <span>" + mobile_phone + "</span>";
					html += "</div><div class='r'>";
					html += "获得  <span>" + gift + "</span>";
					html += "</div></li>";
				}
				html = '<marquee direction="up" behavior="scroll" scrollamount="1" scrolldelay="0" loop="-1" width="100%" height="30" hspace="0" vspace="0"><ul id="WinningRecord" style="height:' + myhheight + 'px;">' + html + "</div></li></ul></marquee>";
				$("#myscoll").html(html);
			}
		}
	});
	var $btn = $('.playbtn');
	var $modal = $('.modal_box'),
			$panel = $('#canvas');
	var playnum = 5; //初始次数，由后台传入
	var isture = false;
	var a = new popHandler(),
			b = new popHandler();

	$.ajax({
		url: "https://api.danjiguanjia.com/active/index/getGoods",
		dataType: "json",
		data: {},
		type: "post",
		success: function(data) {
			// var clickfunc = function(num) {
			//     rotateFunc(num,(num-1)*360/data["data"].length, '恭喜您获得'+data["data"][num-1].title+'!');
			// };

			var clickfunc = function(num) {

				if(data["data"][num - 1].title != "谢谢参与") {
					rotateFunc(num, (num - 1) * 360 / data["data"].length, '恭喜您获得' + data["data"][num - 1].title + '!');
				} else {
					rotateFunc(num, (num - 1) * 360 / data["data"].length, data["data"][num - 1].title + '!');
				}
			};
			$(".modal_bg").bind("click", function() {
				$modal.hide();
			});

			$btn.click(function() {
				uid = $('#uid').val();
				//b.showConfirm("本次抽奖将消耗10鸡蛋",function() {
				if(isture) return; // 如果在执行就退出
				isture = true; // 标志为 在执行
				//先判断是否登录,未登录则执行下面的函数

				if(uid == "NULL" || uid == "") {
					a.showAlert("请先登录");
					isture = true;
				} else { //登录了就执行下面
					//
					$.getJSON('https://api.danjiguanjia.com/active/index/gailvs', {
						'uid': uid
					}, function(msg) {
						//获取次数
						// alert(msg['data']['count']);
						//console.log(msg);
						isture = false;
						num = msg['data']['rid'];
						id = msg['data']['jp_log_id'];
						total = msg['data']['num'];
						time = msg['data']['time'];

						if(msg['data']['count'] >= 3) { //当抽奖次数为0的时候执行
							//if(msg['data']['count'] >= 100) {
							a.showAlert('今天没有次数');
							//}
						}
						else if(msg['data']['count'] == 2) { //当抽奖次数为0的时候执行
							//==================修改=========================================
							$.getJSON('https://api.danjiguanjia.com/active/index/share_logs',{'uid': uid} , function(msgs) {
								if(msgs.retcode == 2000){
									clickfunc(num);  //num就是获奖的id
								}else if(msgs.retcode == 3000){
									a.showAlert('分享资讯文章后可继续抽奖');
								}
							})
							//==================修改=========================================
						}
						else {
							clickfunc(num);
						}
						// if(time <= 20170303){
						//alert(msg['data']['count']);
						// if(msg['data']['count'] >=3) { //当抽奖次数为0的时候执行
						//     a.showAlert('今天没有次数了');
						// }else if(msg['data']['count'] == 2) { //当抽奖次数为0的时候执行
						//     //==================修改=========================================

						//          b.showConfirm("本次抽奖将消耗10枚积蛋",function() {
						//                  $.getJSON('https://api.danjiguanjia.com/active/index/jifen',
						//                       {'uid':uid,'score':10},function(msg){
						//                          if(msg == 2000){
						//                             clickfunc(num);
						//                          }else{
						//                              a.showAlert('你的积分不足');
						//                          }
						//                      })
						//             })

						//     //==================修改=========================================

						// }else if(msg['data']['count']== 1) { //当抽奖次数为0的时候执行
						//     //==================修改=========================================
						//     //扣除积分
						//     time = msg['data']['time'];

						//            b.showConfirm("本次抽奖将消耗5枚积蛋",function() {
						//                  $.getJSON('https://api.danjiguanjia.com/active/index/jifen',{'uid':uid,'score':5},function(msg){
						//                      if(msg == 2000){
						//                          clickfunc(num);
						//                      }else{
						//                          a.showAlert('你的积分不足');
						//                      }

						//                  })
						//              })

						//     //==================修改=========================================

						// } else if(msg['data']['count']== 0) { //当抽奖次数为0的时候执行
						//     //扣除积分
						//     clickfunc(num);
						// }
						//  }else{

						// if(msg['data']['count'] >=3) { //当抽奖次数为0的时候执行
						//     a.showAlert('今天没有次数了');
						// }else if(msg['data']['count'] == 1) { //当抽奖次数为0的时候执行
						//     //==================修改=========================================

						//                  $.getJSON('https://api.danjiguanjia.com/active/index/jifen',
						//                       {'uid':uid,'score':10},function(msg){
						//                          if(msg == 2000){
						//                             clickfunc(num);
						//                          }else{
						//                              a.showAlert('分享热点资讯文章后可继续使用');
						//                          }
						//                      })

						//     //==================修改=========================================

						// }else{
						//      clickfunc(num);
						// }
						// }
					})
				}
			})
			var rotateFunc = function(awards, angle, text) {
				//console.log(1111);
				isture = true;
				$panel.stopRotate();
				$panel.rotate({
					angle: 0,
					duration: 4000, //旋转时间
					animateTo: -(angle + 1440), //让它根据得出来的结果加上1440度旋转
					callback: function() {
						$('.playnum').html(total);
						//console.log(awards);
						isture = false; // 标志为 执行完毕
						if(awards == 2 || awards == 4 || awards == 10) {
							//if(text != "谢谢参与!") {
							a.showAlert(text, function() {
								$modal.show();

								$('#submit').click(function() {

									name = $('input[name="name"]').val();
									mobile = $('input[name="mobile"]').val();
									email = $('input[name="email"]').val();
									address = $('#address').val();

									var reg = /^1[3|4|5|7|8]\d{9}$/;

									if(!reg.test(mobile)) {
										a.showAlert('你填的手机号有误，请重新填写');
										return false;
									}

									if(name == '') {
										a.showAlert('姓名不能为空');
										return false;
									}
									if(address == '') {
										a.showAlert('地址不能为空');
										return false;
									}
									if(name != '' && mobile != "" && address != "") {
										$.getJSON('https://api.danjiguanjia.com/active/index/addjp', {
											'uid': uid,
											'jp_id': num,
											'name': name,
											'mobile': mobile,
											'address': address,
											'email': email,
											'id': id
										}, function(msg) {

											if(msg['retcode'] == 2000) {
												a.showAlert(text);
												$('.modal_box').remove();
											}

										})
									}

								});

							});
							//}
						} else {
							$.getJSON('https://api.danjiguanjia.com/active/index/addjp', {
								'uid': uid,
								'jp_id': num
							}, function(msg) {
								//alert(msg);
								if(msg['retcode'] == 2000) {
									a.showAlert(text);
									$('.playnum').html(msg['data']['num']);
									//location.reload(true);
								}
							})

						}
						/**/

					}
				});
			};

		}
	});

})