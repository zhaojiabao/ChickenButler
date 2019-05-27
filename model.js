$(function() {
	// 药敏试验判断
	$("#ymsyTable td").keyup(function(){
		if($(this).index() == 2){
			var val = $(this).text();
			var mgd = '未检';
			if(val>0 && val < 6){
				mgd = '耐药';
			}else if(val>=6 && val <= 9){
				mgd = '低敏';
			}else if(val>=10 && val <= 15){
				mgd = '中敏';
			}else if(val>=16 && val <= 20){
				mgd = '高敏';
			}else if(val>20){
				mgd = '极敏';
			}
			$(this).next().text(mgd);	
		}
		
	})
	
	// 血凝血抑自动计算
	$("div[name=xnxy] table td").keyup(function(){
		create1($(this).parents('table')[0]);
	})
	
	
	
    //计算数据按钮定位
    $(".create").each(function(n, elm) {
        var roootf = parseInt($(elm).parents(".model").css("height")); //model的高度
        var tableh = parseInt($(elm).parents(".table").css("height")); //表格的高度
        var my_top = roootf - tableh;
        $(elm).css({
            display: "block",
            position: "absolute",
            right: "0px",
            top: my_top + 20 + "px"
        });
    });
    //初始化宽度样式
    var width_p = parseInt($(".model").parent().css("width"));
    $(".model").css("width", width_p * 0.85 + "px");
    $(window).resize(function() {
        width_p = parseInt($(".model").parent().css("width"));
        $(".model").css("width", width_p * 0.85 + "px");
    });
    mycss();
    change1();
    change2();
    change3();
    change4();
    change5();
    change6();
    change7();
    //初始化表格样式
    function mycss() {
        $(".model .table").css("width", "1000px"); // 表格宽度
        // $(".model .table>table th,.table>table td").attr("contenteditable", "true").css("text-align", "center");
        $(".model .table>table th,.table>table td").css("text-align", "center"); //文本居中
        $(".model td").each(function() {
            if ($(this).text() != '') {
                $(this).css("font-weight", $(this).css("font-weight")); //文本不为空时文字加粗
            }
        });
        $(".model th").each(function() {
            if ($(this).text() != '') {
                $(this).css("font-weight", $(this).css("font-weight")); //表格头不为空时文字加粗
            }
        });
    }
    //血凝血抑 xnxy
    function change1() {
        //初始化样式
        mycss();
        //操作单元格
        //增加行
        $(".addr1").click(function() {
            var nowl = $(this).parents(".table1").find("tr").length;
            nowl -= 5;
            var nowc = $(this).parents(".table1").find("tr:first-of-type").find("th").length;
            var $html = "<tr><td>" + nowl + "</td>";
            for (var i = 1; i < nowc; i++) {
                $html += '<td contenteditable="true"></td>';
            }
            $html += "</tr>";
            $(this).parents(".table1").find("tr:nth-child(" + nowl + ")").after($html);
            mycss(); //初始化样式
        });
        //增加列
        var cl = 0;
        $(".addc1").click(function() {
            cl += 1;
            var nowl = $(this).parents(".table1").find("tr").length;
            $(this).parents(".table1").find("tr:first-of-type").append("<th>新增列" + cl + "</th>");
            for (var i = 2; i <= nowl; i++) {
                var mypro = $(this).parents(".table1").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mypro);
                if (mypro != undefined) {
                    mynum += 1;
                    $(this).parents(".table1").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                } else {
                    $(this).parents(".table1").find("tr:nth-child(" + i + ")").append("<td></td>");
                }
            }
            mycss(); //初始化样式
            $(".table").css("width", $(".class1 table").css("width")); //初始化.table宽
        });
        //删除行
        $(".deleter1").click(function() {
            var nowl = $(this).parents(".table1").find("tr").length;
            nowl -= 5;
            if (nowl > 2) {
                $(this).parents(".table1").find("tr:nth-child(" + nowl + ")").remove();
            }
        });
        //删除列
        $(".deletec1").click(function() {
            var nowl = $(this).parents(".table1").find("tr").length;
            var nowc = $(this).parents(".table1").find("tr:first-of-type").find("th").length;
            if (nowc > 2) {
                $(this).parents(".table1").find("tr:first-of-type").find("th:last-of-type").remove();
                for (var i = 2; i <= nowl; i++) {
                    var mypro = $(this).parents(".table1").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                    var mynum = parseInt(mypro);
                    if (mypro > 0) {
                        mynum -= 1;
                        $(this).parents(".table1").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                    } else {
                        $(this).parents(".table1").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    }
                }
            }
            $(".table").css("width", $(".class1 table").css("width")); //初始化.table宽
        });
    }
    //ELISSA检测
    function change2() {
        //初始化样式
        mycss();
        //操作单元格
        //增加行
        $(".addr2").click(function() {
            var nowl = $(this).parents(".table2").find("tr").length;
            nowl -= 7;
            var nowc = $(this).parents(".table2").find("tr:nth-child(3)").find("td").length;
            var $html = "<tr><td>" + nowl + "</td>";
            for (var i = 1; i < nowc; i++) {
                if (i % 3 == 1) {
                    $html += '<td contenteditable="true"></td>';
                } else {
                    $html += '<td></td>';
                }
            }
            $html += "</tr>";
            nowl += 1;
            $(this).parents(".table2").find("tr:nth-child(" + nowl + ")").after($html);
            mycss(); //初始化样式
        });
        //增加列
        var cl = 0;
        $(".addc2").click(function() {
            cl += 1;
            var nowl = $(this).parents(".table2").find("tr").length;
            $(this).parents(".table2").find("tr:first-of-type").append("<th colspan='3'>新增列" + cl + "</th>");
            $(this).parents(".table2").find("tr:nth-child(2)").append("<th>OD值</th><th>S/P值</th><th>判定结果</th>");
            for (var i = 3; i <= nowl; i++) {
                var mypro = $(this).parents(".table2").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mypro);
                if (mypro != undefined) {
                    mynum += 1;
                    $(this).parents(".table2").find("tr:nth-child(" + i + ")").append("<td colspan='3'></td>");
                } else {
                    $(this).parents(".table2").find("tr:nth-child(" + i + ")").append("<td></td><td></td><td></td>");
                }
            }
            mycss(); //初始化样式
            $(".table").css("width", $(".class2 table").css("width")); //初始化.table宽
        });
        //删除行
        $(".deleter2").click(function() {
            var nowl = $(this).parents(".table2").find("tr").length;
            nowl -= 6;
            if (nowl > 3) {
                $(this).parents(".table2").find("tr:nth-child(" + nowl + ")").remove();
            }
        });
        //删除列
        $(".deletec2").click(function() {
            var nowl = $(this).parents(".table2").find("tr").length;
            var nowc = $(this).parents(".table2").find("tr:first-of-type").find("th").length;
            if (nowc > 3) {
                $(this).parents(".table2").find("tr:nth-child(2)").find("th:last-of-type").remove();
                $(this).parents(".table2").find("tr:nth-child(2)").find("th:last-of-type").remove();
                $(this).parents(".table2").find("tr:nth-child(2)").find("th:last-of-type").remove();
                $(this).parents(".table2").find("tr:first-of-type").find("th:last-of-type").remove();
                for (var i = 3; i <= nowl; i++) {
                    var mypro = $(this).parents(".table2").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                    var mynum = parseInt(mypro);
                    if (mypro > 0) {
                        mynum -= 1;
                        $(this).parents(".table2").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    } else {
                        $(this).parents(".table2").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                        $(this).parents(".table2").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                        $(this).parents(".table2").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    }
                }
            }
            $(".table").css("width", $(".class2 table").css("width")); //初始化.table宽
        });
    }
    //default 
    function change3() {
        //初始化样式
        mycss();
        //操作单元格
        //增加行
        $(".addr3").click(function() {
            var nowl = $(this).parents(".table3").find("tr").length;
            nowl -= 1;
            var nowc = $(this).parents(".table3").find("tr:first-of-type").find("th").length;
            var $html = "<tr><td>" + nowl + "</td>";
            for (var i = 1; i < nowc; i++) {
                $html += "<td></td>";
            }
            $html += "</tr>";
            $(this).parents(".table3").find("tr:nth-child(" + nowl + ")").after($html);
            mycss(); //初始化样式
        });
        //增加列
        var cl = 0;
        $(".addc3").click(function() {
            cl += 1;
            var nowl = $(this).parents(".table3").find("tr").length;
            $(this).parents(".table3").find("tr:first-of-type").append("<th>新增列" + cl + "</th>");
            for (var i = 2; i <= nowl; i++) {
                var mypro = $(this).parents(".table3").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mypro);
                if (mypro != undefined) {
                    mynum += 1;
                    $(this).parents(".table3").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                } else {
                    $(this).parents(".table3").find("tr:nth-child(" + i + ")").append("<td></td>");
                }
            }
            mycss(); //初始化样式
            $(".table").css("width", $("table").css("width")); //初始化.table宽
        });
        //删除行
        $(".deleter3").click(function() {
            var nowl = $(this).parents(".table3").find("tr").length;
            nowl -= 1;
            if (nowl > 2) {
                $(this).parents(".table3").find("tr:nth-child(" + nowl + ")").remove();
            }
        });
        //删除列
        $(".deletec3").click(function() {
            var nowl = $(this).parents(".table3").find("tr").length;
            var nowc = $(this).parents(".table3").find("tr:first-of-type").find("th").length;
            if (nowc > 6) {
                $(this).parents(".table3").find("tr:first-of-type").find("th:last-of-type").remove();
                for (var i = 2; i <= nowl; i++) {
                    var mypro = $(this).parents(".table3").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                    var mynum = parseInt(mypro);
                    if (mypro > 0) {
                        mynum -= 1;
                        $(this).parents(".table3").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                    } else {
                        $(this).parents(".table3").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    }
                }
            }
            $(".table").css("width", $("table").css("width")); //初始化.table宽
        });
    }
    //平板凝集 pbnj
    function change4() {
        //增加行
        $(".addr4").click(function() {
            var nowl = $(this).parents(".table4").find("tr").length;
            nowl -= 1;
            var nowc = $(this).parents(".table4").find("tr:first-of-type").find("th").length;
            var $html = "<tr><td>" + nowl + "</td>";
            for (var i = 1; i < nowc; i++) {
                $html += "<td></td>";
            }
            $html += "</tr>";
            $(this).parents(".table4").find("tr:nth-child(" + nowl + ")").after($html);
            mycss(); //初始化样式
        });
        //增加列
        var cl = 0;
        $(".addc4").click(function() {
            cl++;
            var nowl = $(this).parents(".table4").find("tr").length;
            $(this).parents(".table4").find("tr:first-of-type").append("<th>新增列" + cl + "</th>");
            for (var i = 2; i <= nowl; i++) {
                var mypro = $(this).parents(".table4").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mypro);
                if (mypro != undefined) {
                    mynum += 1;
                    $(this).parents(".table4").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                } else {
                    $(this).parents(".table4").find("tr:nth-child(" + i + ")").append("<td></td>");
                }
            }
            mycss(); //初始化样式
            $(".table4").css("width", $("table4").css("width")); //初始化.table宽
        });
        //删除行
        $(".deleter4").click(function() {
            var nowl = $(this).parents(".table4").find("tr").length;
            nowl -= 1;
            if (nowl > 2) {
                $(this).parents(".table4").find("tr:nth-child(" + nowl + ")").remove();
            }
        });
        //删除列
        $(".deletec4").click(function() {
            var nowl = $(this).parents(".table4").find("tr").length;
            var nowc = $(this).parents(".table4").find("tr:first-of-type").find("th").length;
            if (nowc > 6) {
                $(this).parents(".table4").find("tr:first-of-type").find("th:last-of-type").remove();
                for (var i = 2; i <= nowl; i++) {
                    var mypro = $(this).parents(".table4").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                    var mynum = parseInt(mypro);
                    if (mypro > 0) {
                        mynum -= 1;
                        $(this).parents(".table4").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                    } else {
                        $(this).parents(".table4").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    }
                }
            }
            $(".table4").css("width", $("table4").css("width")); //初始化.table宽
        });
    }
    //饲料原料和饲料产品  sjyl
    function change5() {
        //增加行
        $(".addr5").click(function() {
            var nowl = $(this).parents(".table5").find("tr").length;
            var nowc = $(this).parents(".table5").find("tr:first-of-type").find("th").length;
            var $html = '<tr><td contenteditable="true"></td>';
            for (var i = 1; i < nowc; i++) {
                $html += '<td contenteditable="true"></td>';
            }
            $html += "</tr>";
            $(this).parents(".table5").find("tr:nth-child(" + nowl + ")").after($html);
            mycss(); //初始化样式
        });
        //增加列
        var cl = 0;
        $(".addc5").click(function() {
            cl++;
            var nowl = $(this).parents(".table5").find("tr").length;
            $(this).parents(".table5").find("tr:first-of-type").append("<th>新增列" + cl + "</th>");
            for (var i = 2; i <= nowl; i++) {
                var mypro = $(this).parents(".table5").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mypro);
                if (mypro != undefined) {
                    mynum += 1;
                    $(this).parents(".table5").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                } else {
                    $(this).parents(".table5").find("tr:nth-child(" + i + ")").append("<td></td>");
                }
            }
            mycss(); //初始化样式
            $(".table5").css("width", $("table5").css("width")); //初始化.table宽
        });
        //删除行
        $(".deleter5").click(function() {
            var nowl = $(this).parents(".table5").find("tr").length;
            if (nowl > 2) {
                $(this).parents(".table5").find("tr:nth-child(" + nowl + ")").remove();
            }
        });
        //删除列
        $(".deletec5").click(function() {
            var nowl = $(this).parents(".table5").find("tr").length;
            var nowc = $(this).parents(".table5").find("tr:first-of-type").find("th").length;
            if (nowc > 2) {
                $(this).parents(".table5").find("tr:first-of-type").find("th:last-of-type").remove();
                for (var i = 2; i <= nowl; i++) {
                    var mypro = $(this).parents(".table5").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                    var mynum = parseInt(mypro);
                    if (mypro > 0) {
                        $(this).parents(".table5").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum);
                    } else {
                        $(this).parents(".table5").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    }
                }
            }
            $(".table5").css("width", $("table5").css("width")); //初始化.table宽
        });
    }
    //环境检测 hjjc
    function change6() {
        //增加病菌行
        $(".addra").click(function() {
            var mytd = $(this).parents(".table6").find("tr:nth-child(2)").find("td").length;
            var nowl = $(this).parents(".table6").find("tr").length;
            for (var i = 1; i <= nowl; i++) {
                var mycol = $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mycol);
                var add = "<tr>";
                if (mynum == 2) {
                    var n = i - 1;
                    for (var a = 1; a <= mytd; a++) {
                        if (a == mytd) {
                            add += '<td contenteditable="true"></td></tr>'
                        } else {
                            add += '<td contenteditable="true"></td>';
                        }
                    }
                    $(this).parents(".table6").find("tr:nth-child(" + n + ")").after(add);
                    return;
                }
            }
            mycss(); //初始化样式
        });
        //增加益菌行
        $(".addrb").click(function() {
            var mytd = $(this).parents(".table6").find("tr:nth-child(2)").find("td").length;
            var nowl = $(this).parents(".table6").find("tr").length;
            var add = "<tr>";
            for (var a = 1; a <= mytd; a++) {
                if (a == mytd) {
                    add += '<td contenteditable="true"></td></tr>'
                } else {
                    add += '<td contenteditable="true"></td>';
                }
            }
            $(this).parents(".table6").find("tr:last-of-type").after(add);
            mycss(); //初始化样式
        });
        //增加列
        $(".addc6").click(function() {
            var mytd = $(this).parents(".table6").find("tr:nth-child(2)").find("td").length;
            var nowl = $(this).parents(".table6").find("tr").length;
            for (var i = 1; i <= nowl; i++) {
                var mycol = $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mycol);
                var add = "";
                if (mynum == mytd) {
                    $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum + 2);
                } else if (mynum == 2) {
                    add = "<td colspan='2'></td>";
                    $(this).parents(".table6").find("tr:nth-child(" + i + ")").append(add);
                } else {
                    var n = i - 1;
                    var a = $(this).parents(".table6").find("tr:nth-child(" + n + ")").find("td:last-of-type").attr("colspan");
                    if (a > 2) {
                        add = "<td>新增菌</td><td>比例</td>";
                        $(this).parents(".table6").find("tr:nth-child(" + i + ")").append(add);
                    } else {
                        add = "<td></td><td></td>";
                        $(this).parents(".table6").find("tr:nth-child(" + i + ")").append(add);
                    }
                }
            }
            mycss(); //初始化样式
            $(".table6").css("width", $("table6").css("width")); //初始化.table宽
        });
        //删除病菌行
        $(".deletera").click(function() {
            var mytd = $(this).parents(".table6").find("tr:nth-child(2)").find("td").length;
            var nowl = $(this).parents(".table6").find("tr").length;
            for (var i = 1; i <= nowl; i++) {
                var mycol = $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mycol);
                if (mynum == 2) {
                    var a = i - 3;
                    if ($(this).parents(".table6").find("tr:nth-child(" + a + ")").find("td:last-of-type").attr("colspan") > 2) {
                    } else {
                        var n = i - 1;
                        $(this).parents(".table6").find("tr:nth-child(" + n + ")").remove();
                    }
                    return;
                }
            }
            mycss(); //初始化样式
        });
        //删除益菌行
        $(".deleterb").click(function() {
            var mytd = $(this).parents(".table6").find("tr:nth-child(2)").find("td").length;
            var nowl = $(this).parents(".table6").find("tr").length;
            var a = nowl - 2;
            if ($(this).parents(".table6").find("tr:nth-child(" + a + ")").find("td:last-of-type").attr("colspan") > 2) {
            } else {
                $(this).parents(".table6").find("tr:last-of-type").remove();
            }
            mycss(); //初始化样式
        });
        //删除列
        $(".deletec6").click(function() {
            var mytd = $(this).parents(".table6").find("tr:nth-child(2)").find("td").length;
            var nowl = $(this).parents(".table6").find("tr").length;
            if (mytd > 7) {
                for (var i = 1; i <= nowl; i++) {
                    var mycol = $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                    var mynum = parseInt(mycol);
                    if (mynum == mytd) {
                        $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").removeAttr("colspan").attr("colspan", mynum - 2);
                    } else if (mynum == 2) {
                        $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    } else {
                        $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                        $(this).parents(".table6").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    }
                }
                mycss(); //初始化样式
                $(".table6").css("width", $("table6").css("width")); //初始化.table宽
            }
        });
    }
    //猪ELISSA检测 zelissa
    function change7() {
        //初始化样式
        mycss();
        //操作单元格
        //增加行
        $(".addr2").click(function() {
            var nowl = $(this).parents(".table7").find("tr").length;
            nowl -= 7;
            var nowc = $(this).parents(".table7").find("tr:nth-child(3)").find("td").length;
            var $html = "<tr><td>" + nowl + "</td>";
            for (var i = 1; i < nowc; i++) {
                if (i % 3 == 1) {
                    $html += '<td contenteditable="true"></td>';
                } else {
                    $html += "<td></td>";
                }
            }
            $html += "</tr>";
            nowl += 1;
            $(this).parents(".table7").find("tr:nth-child(" + nowl + ")").after($html);
            mycss(); //初始化样式
        });
        //增加列
        var cl = 0;
        $(".addc2").click(function() {
            cl += 1;
            var nowl = $(this).parents(".table7").find("tr").length;
            $(this).parents(".table7").find("tr:first-of-type").append("<th colspan='3'>新增列" + cl + "</th>");
            $(this).parents(".table7").find("tr:nth-child(2)").append("<th>OD值</th><th>S/P值</th><th>判定结果</th>");
            for (var i = 3; i <= nowl; i++) {
                var mypro = $(this).parents(".table7").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                var mynum = parseInt(mypro);
                if (mypro != undefined) {
                    mynum += 1;
                    $(this).parents(".table7").find("tr:nth-child(" + i + ")").append("<td colspan='3'></td>");
                } else {
                    $(this).parents(".table7").find("tr:nth-child(" + i + ")").append("<td></td><td></td><td></td>");
                }
            }
            mycss(); //初始化样式
            $(".table").css("width", $(".class2 table").css("width")); //初始化.table宽
        });
        //删除行
        $(".deleter2").click(function() {
            var nowl = $(this).parents(".table7").find("tr").length;
            nowl -= 6;
            if (nowl > 3) {
                $(this).parents(".table7").find("tr:nth-child(" + nowl + ")").remove();
            }
        });
        //删除列
        $(".deletec2").click(function() {
            var nowl = $(this).parents(".table7").find("tr").length;
            var nowc = $(this).parents(".table7").find("tr:first-of-type").find("th").length;
            if (nowc > 3) {
                $(this).parents(".table7").find("tr:nth-child(2)").find("th:last-of-type").remove();
                $(this).parents(".table7").find("tr:nth-child(2)").find("th:last-of-type").remove();
                $(this).parents(".table7").find("tr:nth-child(2)").find("th:last-of-type").remove();
                $(this).parents(".table7").find("tr:first-of-type").find("th:last-of-type").remove();
                for (var i = 3; i <= nowl; i++) {
                    var mypro = $(this).parents(".table7").find("tr:nth-child(" + i + ")").find("td:last-of-type").attr("colspan");
                    var mynum = parseInt(mypro);
                    if (mypro > 0) {
                        mynum -= 1;
                        $(this).parents(".table7").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    } else {
                        $(this).parents(".table7").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                        $(this).parents(".table7").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                        $(this).parents(".table7").find("tr:nth-child(" + i + ")").find("td:last-of-type").remove();
                    }
                }
            }
            $(".table").css("width", $(".class2 table").css("width")); //初始化.table宽
        });
    }
});
//保存数据按钮定位
function reposition(elm) {
    var roootf = parseInt($(elm).parents(".model").css("height")); //model的高度
    var tableh = parseInt($(elm).parents(".table").css("height")); //表格的高度
    var my_top = roootf - tableh;
    $(elm).next().css({
        display: "block",
        position: "absolute",
        right: "0px",
        top: my_top + 20 + "px"
    });
}
//增加附件
function add(obj) {
    var $str = '';
    $str += '<div class="file">';
    $str += '   <a href="javascript:void(0)" onclick="add(this)">增加附件</a>';
    $str += '   <h3 contenteditable="true">file标题</h3>';
    $str += '   <input type="file" class="file_upload"/>';
    $str += '   <p contenteditable="true">这里是备注</p>';
    $str += '</div>';
    $(obj).parents(".model").append($str);
}
///////////////////////////////////////////////////////////////////////////////////
// //如果存在便执行
// if (document.getElementsByClassName("table1")[0]) {
//     var elm1 = document.getElementsByClassName("table1")[0].getElementsByClassName("create")[0];
//     create1(elm1);
// }
// //如果存在便执行
// if (document.getElementsByClassName("table2")[0]) {
//     var elm2 = document.getElementsByClassName("table2")[0].getElementsByClassName("create")[0];
//     create2(elm2);
// }
// //如果存在便执行
// if (document.getElementsByClassName("table7")[0]) {
//     create3();
// }
//血凝血抑 保存数据 xnxy
function create1(obj) {
    var myclass = obj.parentElement.parentElement; //获取类名
    var myhtml = '';
    var xnum = myclass.getElementsByTagName("tr").length - 5; //获取 xAxis元素个数
    var myopt = myclass.getElementsByTagName("tr")[0].children.length - 1; //检测项目个数
    var array = []; //创建xAxis元素存放数组
    myclass.parentElement.getElementsByClassName("mylast")[0].style.display = "block"; //正态分布图
    //样品编号序号
    for (var i = 1; i <= xnum - 1; i++) {
        array.push(i);
    }
    //option数据存放数组；
    var options = [];
    for (i = 1; i <= myopt; i++) {
        //柱状图容器及备注区域   
        myhtml += '<div class="char">';
        myhtml += '<div class="main" style="height:400px;">';
        myhtml += '</div>';
        myhtml += '<h3 hidden="hidden">禽抗体水平柱状图(' + i + ')</h3>';
        myhtml += '<textarea class="remark" style="height: 100px; margin-top: 50px; margin-bottom: 50px; padding: 10px;" placeholder="备注"></textarea>';
        myhtml += '</div>';
        var mytext = myclass.getElementsByTagName("tr")[0].children[i].textContent; //第i个检测项目名称
        var myval1 = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("well"); //优秀率
        var myval2 = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("nice"); //合格率
        //canvas 创建option
        var arrayy = []; //创建条形图元素存放数组
        for (n = 1; n < xnum; n++) {
            var mytr = myclass.getElementsByTagName("tr")[n];
            var mytd = mytr.children[i].textContent; //按表格的列获取 填写的数据
            arrayy.push(mytd);
        }
        var option = {
            title: {
                text: mytext
            },
            xAxis: [{
                name: '编号',
                type: 'category',
                data: array //样品编号序号
            }],
            yAxis: [{
                name: 'lg2',
                type: 'value',
                max: 15,
                min: 0,
                minInterval: 1
            }],
            series: [{
                name: 'ND',
                type: 'bar',
                animation: false,
                itemStyle: { normal: { color: 'blue' } },
                data: arrayy,
                markLine: {
                    silent: false,
                    data: [{
                        yAxis: myval1,
                        lineStyle: { normal: { color: 'green' } },
                        label: { normal: { formatter: '合格率' } }
                    }, {
                        yAxis: myval2,
                        lineStyle: { normal: { color: 'red' } },
                        label: { normal: { formatter: '优秀率' } }
                    }]
                }
            }]
        };
        options.push(option);
    }
    var myclassp = myclass.parentElement;
    myclassp.getElementsByClassName("chars")[0].innerHTML = myhtml; //创建图表存放容器
    //开始循环绘柱状图
    var myoption = [];
    for (i = 0; i < myopt; i++) {
        var myChart = echarts.init(myclassp.getElementsByClassName("main")[i]);
        myoption = options[i];
        myChart.setOption(myoption);
    }
    //开始绘制正态分布图 0.0
    var myChart6 = echarts.init(myclassp.getElementsByClassName("last")[0].getElementsByClassName("main")[0]);
    var myarrayaa = []; //创建滴度统计数组
    var myarrayaaa = []; //创建滴度统计数组存放数组
    var myarraycc = [];
    //横向获取数据
    for (i = 1; i <= myopt; i++) {
        var myarraybb = [];
        for (var n = 1; n < xnum; n++) {
            var mytdbb = myclass.getElementsByTagName("tr")[n].children[i].textContent; //按行获取样品数据
            myarraybb.push(mytdbb);
        }
        myarraycc.push(myarraybb);
    }
    //数据整理
    for (i = 0; i < myopt; i++) {
        myarrayaa = [];
        for (var n = 0; n <= 15; n++) {
            n = n.toString();
            var num = 0;
            for (var e in myarraycc[i]) {
                if (myarraycc[i][e] === n) {
                    num += 1;
                }
            }
            myarrayaa.push(num);
        }
        myarrayaaa.push(myarrayaa)
    }
    //绘制正态分布图
    var myseries = [];
    var mytextbbcc = [];
    for (i = 0; i < myopt; i++) {
        var mytextbbc = myclass.getElementsByTagName("tr")[0].children[i + 1].textContent;
        var mychild = {
            name: mytextbbc,
            type: 'line',
            data: myarrayaaa[i]
        };
        myseries.push(mychild);
        mytextbbcc.push(mytextbbc);
    }
    var option6 = {
        legend: {
            data: mytextbbcc
        },
        xAxis: [{
            name: '抗体滴度',
            type: 'category',
            boundaryGap: false,
            data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        }],
        yAxis: [{
            name: '个数',
            type: 'value',
            minInterval: 1,
            min: 0,
            max: xnum - 1
        }],
        series: myseries
    };
    myChart6.setOption(option6);
    //平均值、方差等计算
    //总数xnum-1;最后一个tr下标xnum+5;
    for (i = 0; i < myopt; i++) {
        var dataarray = [];        
        //平均值
        var count = 0;
        for (var g = 0; g < myarraycc[i].length; g++) {
            dTemp  = Number(myarraycc[i][g]);
            count += dTemp;
            dataarray.push(dTemp);
        }
        var dMax  = Math.max.apply(null, dataarray),
            dMin  = Math.min.apply(null, dataarray);
        var myaverage = count / Number(dataarray.length);
        //极差
        var dStd = jsBzc(dataarray,myaverage);       
        //console.log(dMax - dMin);
        myclass.getElementsByTagName("tr")[xnum + 1].children[i + 1].textContent = myaverage.toFixed(2);
        //标准差
        myclass.getElementsByTagName("tr")[xnum + 2].children[i + 1].textContent = dStd.toFixed(2);
        //极差
        myclass.getElementsByTagName("tr")[xnum + 3].children[i + 1].textContent = dMax - dMin;
        //离散度/
        var lsd = dStd == 0?0:((dStd/myaverage)* 100).toFixed(2);
        myclass.getElementsByTagName("tr")[xnum + 4].children[i + 1].textContent = lsd + '%';
    }
    // console.log(dAvgSum);
    // console.log(dMax - dMin);
}
//计算标准差
function jsBzc(sDataList, dAvg) {               
    var dAvgSum = 0;
    for(var i = 0; i < sDataList.length; i++) {
        dAvgSum += (sDataList[i] - dAvg) * (sDataList[i] - dAvg);                    
    }
    //console.log(dAvgSum);
    //方差
    dAvgSum = dAvgSum / (sDataList.length - 1);
    //标准差        
    return Math.sqrt(dAvgSum);
}
//默认表格
function print1(obj) {
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    var event = function() {
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
    };
    window.addEventListener("scroll", event, false);
    $(".shadow").css("display", "block");
    //部分表格数据计算
    //水中微生物
    if ($(obj).parents(".model").find(".table6")) { //table6计算
        var mycount = $(obj).parents(".model").find(".table6").find("#h2").index() - 4;
        for (var i = 0; i < mycount; i++) {
            var lt = $(obj).parents(".model").find(".table6").find("tr:eq(2)").find("td").length - 3;
            var sum = Number($(obj).parents(".model").find(".table6").find("tr:eq(" + (i + 2) + ")").find("td:eq(2)").text()); //获取细菌总数
            for (var ia = 0; ia <= lt; ia++) {
                //致病菌
                if (ia <= lt / 2) {
                    var myn = Number($(obj).parents(".model").find(".table6").find("tr:eq(" + (i + 2) + ")").find("td:eq(" + (1 + ia * 2) + ")").text());
                    $(obj).parents(".model").find(".table6").find("tr:eq(" + (i + 2) + ")").find("td:eq(" + (2 + ia * 2) + ")").html((100 * (myn / sum)).toFixed(2) + "%");
                    $(obj).parents(".model").find(".table6").find("tr:eq(" + (i + 2) + ")").find("td:eq(2)").text(sum);
                }
                //有益菌
                else {
                    var myn = Number($(obj).parents(".model").find(".table6").find("tr:eq(" + (mycount + 5 + i) + ")").find("td:eq(" + (ia * 2 - lt + 1) + ")").text());
                    $(obj).parents(".model").find(".table6").find("tr:eq(" + (mycount + 5 + i) + ")").find("td:eq(" + (ia * 2 - lt + 2) + ")").html((100 * (myn / sum)).toFixed(2) + "%");
                    $(obj).parents(".model").find(".table6").find("tr:eq(" + (i + 2) + ")").find("td:eq(2)").text(sum);
                }
            }
        }
    }
    //平板凝集
    if ($(obj).parents(".model").find(".table4")) {
        if ($(obj).parents(".model").find(".table4").find("tr:eq(0)").find("th:eq(0)").text() == "样品编号") {
            if ($(obj).parents(".model").find(".table4").find("tr:eq(0)").find("th:eq(1)").text() == "检测结果") {
                var myfor = $(obj).parents(".model").find(".table4").find("tr").length - 1;
                var mysum = 0;
                var mym = 0;
                for (var k = 1; k <= myfor; k++) {
                    var myval = $(obj).parents(".model").find(".table4").find("tr:eq(" + k + ")").find("td:eq(" + 1 + ")").text();
                    if (myval == "阴性") {
                        mysum++;
                    } else if (myval == "阳性") {
                        mysum++;
                        mym++;
                    }
                }
                $(obj).parents(".model").find(".table4").find("tr:last-of-type").find("td:eq(" + 1 + ")").text((100 * (mym / mysum)).toFixed(2) + "%");
            }
        }
    }
    var mycharts = {};
    mycharts.table = [];
    mycharts.bar = [];
    mycharts.line = [];
    mycharts.file = [];
    var myopt1 = $(obj).parents(".model").find(".char").length; //动态获取检测项目个数
    var table1 = $(obj).parents(".model").find(".table").length; //表格个数 
    var line1 = $(obj).parents(".model").find(".last").length; //正态分布图个数
    var file1 = $(obj).parents(".model").find(".file").length; //文件个数
    //alert("图片生成成功，已发给后台，点击下载图片可下载！")
    var myurlarr = [];
    //表格 截取
    for (var a = 0; a < table1; a++) {
        var height = parseInt($(obj).parents(".model").find(".table:eq(" + a + ")").find("table").css("height"))
        domtoimage.toPng($(obj).parents(".model").find(".table:eq(" + a + ")").find("table")[0], { height: height + 5 })
            .then(function(dataUrl) {
                myurlarr.push(dataUrl);
            });
    }
    //柱状图 截取
    for (var i = 0; i < myopt1; i++) {
        var myurl2 = '';
        var canvas = $(obj).parents(".model").find(".char:eq(" + i + ")").find("canvas")[0];
        myurl2 = canvas.toDataURL("image/png");
        mycharts.bar.push({ title: "", url: myurl2, remark: "" });
    }
    //延时追加table其他数据、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
    setTimeout(function() {
        for (var b = 0; b < line1; b++) {
            var myurl3 = '';
            var canvas1 = $(obj).parents(".model").find(".last:eq(" + b + ")").find("canvas")[0];
            myurl3 = canvas1.toDataURL("image/png");
            mycharts.line.push({ title: "", url: myurl3, remark: "" });
        }
        for (a = 0; a < table1; a++) {
            var classname = $(obj).parents(".model").find(".table:eq(" + a + ")").attr("class");
            //获取用户填写的数据
            //针对table1 血凝血抑
            if (classname == "table table1") {
                //定义空的数据对象
                var table_data = {
                    k: [],
                    v: []
                };
                var newarr = [];
                var lt = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th").length - 1; //检测项目个数
                //获取计算的结果
                for (i = 1; i <= lt; i++) {
                    var newobj = {};
                    newobj.name = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + i + ")").text();
                    newobj.avg = $(obj).parents(".model").find(".table:eq(" + a + ")").find("#avg").find("td:eq(" + i + ")").text();
                    newobj.sda = $(obj).parents(".model").find(".table:eq(" + a + ")").find("#sda").find("td:eq(" + i + ")").text();
                    newobj.ran = $(obj).parents(".model").find(".table:eq(" + a + ")").find("#ran").find("td:eq(" + i + ")").text();
                    newobj.asd = $(obj).parents(".model").find(".table:eq(" + a + ")").find("#asd").find("td:eq(" + i + ")").text();
                    newarr.push(newobj);
                    var myurl1 = { url: myurlarr[a], info: newarr };
                    //获取检测项目的数据
                    table_data.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + i + ")").text());
                }
                //获取对应检测项目的数据
                for (w = 1; w <= $(obj).parents(".model").find(".table:eq(" + a + ")").find("#avg").index() - 2; w++) {
                    var myarr_ = [];
                    for (i = 1; i <= lt; i++) {
                        myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + w + ")").find("td:eq(" + i + ")").text())
                    }
                    table_data.v.push(myarr_);
                }
                mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
            }
            //针对table2 elissa检测
            else if (classname == "table table2") {
                var table_data = { //用户填写数据对象
                    k: [],
                    v: [],
                    yang: [],
                    yin: []
                };
                var newarr = [];
                var lt = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th").length - 1; //检测项目个数
                //获取计算的数据
                for (i = 1; i <= lt; i++) {
                    var newobj = {};
                    newobj.name = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + i + ")").text();
                    newobj.asd = $(obj).parents(".model").find(".table:eq(" + a + ")").find(".asd").find("td:eq(" + i + ")").text();
                    newobj.man = $(obj).parents(".model").find(".table:eq(" + a + ")").find(".man").find("td:eq(" + i + ")").text();
                    newarr.push(newobj);
                    //获取检测项目的数据
                    table_data.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + i + ")").text());
                }
                //获取填写的数据
                for (w = 2; w <= $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 7; w++) {
                    var myarr_ = [];
                    for (i = 0; i < lt; i++) {
                        myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + w + ")").find("td:eq(" + (3 * i + 1) + ")").text())
                    }
                    table_data.v.push(myarr_);
                }
                var new_arr;
                var wsum = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 3; //获取位置
                //获取阳性值
                new_arr = [];
                for (i = 1; i <= lt; i++) {
                    new_arr.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + wsum + ")").find("td:eq(" + i + ")").text())
                }
                table_data.yang.push(new_arr);
                //获取阴性值
                new_arr = [];
                for (i = 1; i <= lt; i++) {
                    new_arr.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (wsum + 1) + ")").find("td:eq(" + i + ")").text())
                }
                table_data.yin.push(new_arr);
                var myurl1 = { url: myurlarr[a], info: newarr };
                mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
            }
            //针对table6 环境检测
            else if (classname == "table table6") {
                var table_data = { //用户填写数据对象
                    //致病菌
                    bad: {
                        k: [],
                        v: []
                    },
                    //有益菌
                    well: {
                        k: [],
                        v: []
                    }
                };
                var mycount = $(obj).parents(".model").find(".table:eq(" + a + ")").find("#h2").index() - 4;
                //获取数据
                var newarr = [];
                for (i = 0; i < mycount; i++) {
                    newarr.push({
                        position: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (i + 2) + ")").find("td:first-of-type").text(),
                        count: []
                    });
                    var lt = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(2)").find("td").length - 3;
                    for (var ia = 0; ia <= lt; ia++) {
                        if (ia == 0) {
                            newarr[i].count.push({
                                title: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(1)").find("td:eq(" + (2) + ")").text(),
                                num: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (i + 2) + ")").find("td:eq(2)").text()
                            });
                        } else if (ia <= lt / 2) {
                            newarr[i].count.push({
                                title: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(1)").find("td:eq(" + (1 + ia * 2) + ")").text(),
                                num: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (i + 2) + ")").find("td:eq(" + (1 + ia * 2) + ")").text(),
                                per: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (i + 2) + ")").find("td:eq(" + (2 + ia * 2) + ")").text()
                            });
                        } else {
                            newarr[i].count.push({
                                title: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (mycount + 4) + ")").find("td:eq(" + (ia * 2 - lt + 1) + ")").text(),
                                num: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (mycount + 5 + i) + ")").find("td:eq(" + (ia * 2 - lt + 1) + ")").text(),
                                per: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (mycount + 5 + i) + ")").find("td:eq(" + (ia * 2 - lt + 1) + ")").text()
                            });
                        }
                    }
                }
                //获取用户填写的数据
                var ltt = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(1)").find("td").length - 1;
                for (i = 0; i <= ltt; i++) {
                    //下面获取用户填写的数据
                    table_data.bad.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(1)").find("td:eq(" + i + ")").text());
                    table_data.well.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (mycount + 4) + ")").find("td:eq(" + i + ")").text());
                }
                //下面获取用户填写的数据
                for (w = 2; w <= mycount + 1; w++) {
                    var myarr_ = [];
                    for (i = 0; i <= ltt; i++) {
                        myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + w + ")").find("td:eq(" + i + ")").text())
                    }
                    table_data.bad.v.push(myarr_);
                }
                for (w = mycount + 5; w <= $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 1; w++) {
                    var myarr_ = [];
                    for (i = 0; i <= ltt; i++) {
                        myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + w + ")").find("td:eq(" + i + ")").text())
                    }
                    table_data.well.v.push(myarr_);
                }
                var myurl1 = { url: myurlarr[a], info: newarr };
                mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
            }
            //针对table4  平板凝集
            else if (classname == "table table4") {
                var table_data = { //用户填写数据对象
                    k: [],
                    v: []
                };
                if ($(obj).parents(".model").find(".table4").find("tr:eq(0)").find("th:eq(0)").text() == "样品编号") {
                    var newarr = [];
                    if ($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + 1 + ")").text() == "检测结果") {
                        var myfor = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 1;
                        var fstl = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th").length - 1;
                        var mysum = 0;
                        var mym = 0;
                        for (i = 0; i <= fstl; i++) {
                            //下面获取用户填写的数据
                            table_data.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + i + ")").text());
                        }
                        for (var k = 1; k < myfor; k++) {
                            var myarr_ = [];
                            var myval = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + k + ")").find("td:eq(" + 1 + ")").text();
                            if (myval == "阴性") {
                                mysum++;
                            } else if (myval == "阳性") {
                                mysum++;
                                mym++;
                            }
                            for (i = 0; i <= fstl; i++) {
                                //下面获取用户填写的数据
                                myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + k + ")").find("td:eq(" + i + ")").text());
                            }
                            table_data.v.push(myarr_);
                        }
                        var newobj = {};
                        newobj.sum = mysum;
                        newobj.man = (100 * (mym / mysum)).toFixed(2) + "%";
                        newarr.push(newobj);
                    }
                    var myurl1 = { url: myurlarr[a], info: newarr };
                    mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
                }
            }
            //针对table5  默认模板
            else if (classname == "table table5") {
                //细菌分离
                if ($(obj).parents(".model").find(".table5").find("tr:eq(0)").find("th:eq(0)").text() == "项目") { //判断table5的分枝表
                    var table_data = { //用户填写数据对象
                        k: [],
                        v: []
                    };
                    var fstl = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th").length - 1;
                    for (k = 0; k <= fstl; k++) {
                        //下面获取用户填写的数据
                        table_data.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + k + ")").text());
                    }
                    var newarr = [];
                    var lt = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 1;
                    for (i = 1; i <= lt; i++) {
                        var myarr_ = [];
                        var newobj = {};
                        newobj.name = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + i + ")").find("td:eq(0)").text();
                        newobj.result = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + i + ")").find("td:eq(1)").text();
                        newarr.push(newobj);
                        //下面获取用户填写的数据
                        for (k = 0; k <= fstl; k++) {
                            //下面获取用户填写的数据
                            myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + i + ")").find("td:eq(" + k + ")").text());
                        }
                        table_data.v.push(myarr_);
                    }
                    var myurl1 = { url: myurlarr[a], info: newarr };
                    mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
                }
                //饲料原料和饲料产品
                if ($(obj).parents(".model").find(".table5").find("tr:eq(0)").find("th:eq(0)").text() == "检测项目") { //判断table5的分枝表
                    var table_data = { //用户填写数据对象
                        k: [],
                        v: []
                    };
                    var fstl = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th").length - 1;
                    for (k = 0; k <= fstl; k++) {
                        //下面获取用户填写的数据
                        table_data.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + k + ")").text());
                    }
                    var newarr = [];
                    var lt = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 1;
                    //、、、、、、、、、、、、
                    var myfor = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th").length - 1;
                    for (k = 1; k <= myfor; k++) {
                        var forarr = [];
                        for (var i = 1; i <= lt; i++) {
                            var newobj = {};
                            newobj.option = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + i + ")").find("td:eq(0)").text();
                            newobj.result = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + i + ")").find("td:eq(" + k + ")").text();
                            forarr.push(newobj);
                        }
                        newarr.push({
                            name: $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + k + ")").text(),
                            base: forarr
                        });
                    }
                    //、、、、、、、、、、、、
                    for (i = 1; i <= lt; i++) {
                        var myarr_ = [];
                        //下面获取用户填写的数据
                        for (k = 0; k <= fstl; k++) {
                            //下面获取用户填写的数据
                            myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + i + ")").find("td:eq(" + k + ")").text());
                        }
                        table_data.v.push(myarr_);
                    }
                    var myurl1 = { url: myurlarr[a], info: newarr };
                    mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
                }
                //药敏试验
                if ($(obj).parents(".model").find(".table5").find("tr:eq(0)").find("th:eq(1)").text() == "药物名称") { //判断table5的分枝表
                    var table_data = { //用户填写数据对象
                        k: [],
                        v: []
                    };
					console.log("a:"+a);
					var ym_table = $(obj).parents(".model").find(".table:eq(" + a + ")");//药敏表格
                    var fstl = ym_table.find("tr:eq(0)").find("th").length - 1;
                    for (k = 0; k <= fstl; k++) {
                        //下面获取用户填写的数据
                        table_data.k.push(ym_table.find("tr:eq(0)").find("th:eq(" + k + ")").text());
                    }
                    var newarr = [];
                    var lt = ym_table.find("tr").length - 1;
                    var newobj = {};
                    newobj.mat = { hei: [], mid: [] };
                    newobj.pro = { hei: [], mid: [] };
                    for (i = 1; i <= lt; i++) {
                        var myarr_ = [];
						var ym_table_tr = ym_table.find("tr:eq(" + i + ")");
                        if (ym_table_tr.find("td:first-of-type").text().indexOf("W") == -1 && ym_table_tr.find("td:first-of-type").text().indexOf("w") == -1) {
                            if (ym_table_tr.find("td:eq(3)").text() == "高敏") {
                                newobj.mat.hei.push(ym_table_tr.find("td:eq(1)").text())
                            } else if (ym_table_tr.find("td:eq(3)").text() == "中敏") {
                                newobj.mat.mid.push(ym_table_tr.find("td:eq(1)").text())
                            }
                        } else {
                            if (ym_table_tr.find("td:eq(3)").text() == "高敏") {
                                newobj.pro.hei.push(ym_table_tr.find("td:eq(1)").text())
                            } else if (ym_table_tr.find("td:eq(3)").text() == "中敏") {
                                newobj.pro.mid.push(ym_table_tr.find("td:eq(1)").text())
                            }
                        }
                        //下面获取用户填写的数据
                        for (k = 0; k <= fstl; k++) {
                            //下面获取用户填写的数据                            
							myarr_.push(ym_table_tr.find("td:eq(" + k + ")").text());
							
                        }						
                        table_data.v.push(myarr_);
                    }
					console.log("=====  newobj ===============");
					console.log(newobj);
					console.log("=====  table_data ===============");
					console.log(table_data);
                    newarr.push(newobj);
                    var myurl1 = { url: myurlarr[a], info: newarr };
                    mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
                }
            }
            //默认类型
            else {
                var myurl1 = { url: myurlarr[a], info: [] };
                mycharts.table.push({ title: "", data: myurl1, remark: "" });
            }
        }
    }, 3000);
    // 数据中 添加标题和备注
    setTimeout(function() {
        //表格
        for (var a = 0; a < table1; a++) {
            mycharts.table[a].title = $(obj).parents(".model").find(".table:eq(" + a + ")").find("h3").text().toString();
            mycharts.table[a].remark = $(obj).parents(".model").find(".table:eq(" + a + ")").find(".remark").val().toString();
        }
        //柱状图
        for (var i = 0; i < myopt1; i++) {
            mycharts.bar[i].title = $(obj).parents(".model").find(".char:eq(" + i + ")").find("h3").text().toString();
            mycharts.bar[i].remark = $(obj).parents(".model").find(".char:eq(" + i + ")").find(".remark").val().toString();
        }
        //正态分布图
        for (var b = 0; b < line1; b++) {
            mycharts.line[b].title = $(obj).parents(".model").find(".mylast").find(".last:eq(" + b + ")").find("h3").text().toString();
            mycharts.line[b].remark = $(obj).parents(".model").find(".mylast").find(".remark").val().toString();
        }
        //文件上传
        send();
        //数据转换json格式
        setTimeout(function() {
            var json_data = JSON.stringify(mycharts);
            var myname = $(obj).parents(".model").parent().attr("name");
            json_all.push('"' + myname + '":' + json_data + '');
            $(".shadow").css("display", "none");
            window.removeEventListener("scroll", event, false);
            alert("数据生成完毕！");
        }, 2000)
        //文件处理函数
        function send() {
            var file1 = $(obj).parents(".model").find(".file").length;
            for (var b = 0; b < file1; b++) {
                var file = obj.parentElement.parentElement.parentElement.getElementsByClassName("file")[b].getElementsByClassName("file_upload")[0];
                if (window.FileReader && file.files[0]) {
                    var my_title = $(obj).parents(".model").find(".file:eq(" + b + ")").find("h3").text();
                    var my_remark = $(obj).parents(".model").find(".file:eq(" + b + ")").find("p").text();
                    var fr = new FileReader();
                    fr.readAsDataURL(file.files[0]);
                    fr.onload = function(e) {
                        var dataURL = this.result;
                        mycharts.file.push({ title: my_title, file: dataURL, remark: my_remark });
                    };
                }
            }
        }
    }, 4500);
}
//elissa检测 保存数据
function create2(obj) {
    var myclass = obj.parentElement.parentElement;
    var myhtml = '';
    var xnum = myclass.getElementsByTagName("tr").length - 6; //获取 xAxis元素个数
    var myopt = myclass.getElementsByTagName("tr")[0].children.length - 1; //检测项目个数
    var array = []; //创建xAxis元素存放数组
    for (var i = 1; i < xnum - 1; i++) {
        array.push(i);
    }
    //option数据存放数组；
    var options = [];
    var myarraycc1 = [];
    var myarraycc_num = [];
    for (i = 1; i <= myopt; i++) {
        myhtml += '<div class="char">';
        myhtml += '<div class="main" style="height:400px;">';
        myhtml += '</div>';
        myhtml += '<h3 hidden="hidden">传染性法氏囊、败血支原体、传染性支气管炎抗体水平柱状图(' + i + ')</h3>';
        myhtml += '<textarea class="remark" style="height: 100px; margin-top: 50px; margin-bottom: 50px; padding: 10px;" placeholder="备注"></textarea>';
        myhtml += '</div>';
        var mytext = myclass.getElementsByTagName("tr")[0].children[i].textContent;
        var myval1 = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("well");
        var ty = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("ty");
        var man = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("man");
        var women = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("women");
        var arrayy = []; //创建条形图元素存放数组
        var arrayy_num = []; //创建条形图元素存放数组
        for (var n = 2; n < xnum; n++) {
            var mytr = myclass.getElementsByTagName("tr")[n];
            var mytd = mytr.children[3 * (i - 1) + 2].textContent;
            var cnum;
            x = Number(myclass.getElementsByTagName("tr")[xnum + 3].children[i].textContent);
            y = Number(myclass.getElementsByTagName("tr")[xnum + 4].children[i].textContent);
            a = Number(myclass.getElementsByTagName("tr")[n].children[3 * (i - 1) + 1].textContent);
            var myeval = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("gs"); //导入公式
            cnum = eval(myeval); //通过公式计算
            myclass.getElementsByTagName("tr")[n].children[3 * (i - 1) + 2].textContent = cnum.toFixed(2);
            if (man != "" && women != "") {
                if (eval(cnum + man)) {
                    mytr.children[3 * i].textContent = "阳性";
                    mytr.children[3 * i].style.color = "rgb(90,90,90)";
                } else if (eval(cnum + women)) {
                    mytr.children[3 * i].textContent = "阴性";
                    mytr.children[3 * i].style.color = "red";
                } else {
                    mytr.children[3 * i].textContent = "可疑";
                    mytr.children[3 * i].style.color = "sandybrown";
                }
            } else if (man == "" && women != "") {
                if (eval(cnum + women)) {
                    mytr.children[3 * i].textContent = "阳性";
                    mytr.children[3 * i].style.color = "rgb(90,90,90)";
                } else {
                    mytr.children[3 * i].textContent = "阴性";
                    mytr.children[3 * i].style.color = "red";
                }
            }
            var mytd_num = mytr.children[3 * i].textContent;
            var mytd_new = mytr.children[3 * (i - 1) + 2].textContent;
            if (mytd_new == "NaN") {
                mytd_new = 0;
            }
            arrayy.push(mytd_new);
            arrayy_num.push(mytd_num);
        }
        myarraycc1.push(arrayy);
        myarraycc_num.push(arrayy_num);
        //设置曲线图 options
        var option = {
            title: {
                text: mytext
            },
            xAxis: [{
                name: '编号',
                type: 'category',
                data: array
            }],
            yAxis: [{
                name: ty,
                type: 'value',
                max: 1.2,
                min: 0
            }],
            series: [{
                type: 'bar',
                animation: false,
                itemStyle: { normal: { color: 'blue' } },
                data: arrayy,
                markLine: {
                    silent: false,
                    data: [{
                        yAxis: myval1,
                        lineStyle: { normal: { color: 'green' } },
                        label: { normal: { formatter: '阴阳性' } }
                    }]
                }
            }]
        };
        options.push(option);
    }
    var myclassp = myclass.parentElement;
    myclassp.getElementsByClassName("chars")[0].innerHTML = myhtml; //创建图表存放容器
    //循环绘图
    for (i = 0; i < myopt; i++) {
        var myChart = echarts.init(myclassp.getElementsByClassName("main")[i]);
        var myoption = options[i];
        myChart.setOption(myoption);
    }
    //平均值、方差等计算
    //总数xnum-1;最后一个tr下标xnum+5;
    for (i = 0; i < myopt; i++) {
        var dataarray = [];
        //平均值
        var count = 0;
        for (e = 0; e < myarraycc1[i].length; e++) {
            count += Number(myarraycc1[i][e]);
            dataarray.push(Number(myarraycc1[i][e]));
        }
        var myaverage = count / Number(myarraycc1[i].length);
        myclass.getElementsByTagName("tr")[xnum].children[i + 1].textContent = myaverage.toFixed(2);
        //离散度
        var variance = jStat(dataarray).variance();
        myclass.getElementsByTagName("tr")[xnum + 1].children[i + 1].textContent = (variance / (xnum - 2)).toFixed(2);
        //阳性率
        var mynuma = 0;
        for (n = 0; n < myarraycc_num[i].length; n++) {
            if (myarraycc_num[i][n] == "阳性") {
                mynuma += 1;
            }
        }
        myclass.getElementsByTagName("tr")[xnum + 2].children[i + 1].textContent = (mynuma / (xnum - 2)).toFixed(4);
    }
}
// 猪elissa检测 初始化
function create3() {
    var table7length = document.getElementsByClassName("table7").length;
    var myoptpre = 0;
    document.getElementsByClassName("table7")[0].parentElement.getElementsByClassName("chars")[0].innerHTML = "";
    var arrayylp = []; //创建折线图元素存放总数组
    var eachl = 0; //折线图项目数去提取每个图的遍历次数
    for (var l = 0; l < table7length; l++) {
        var myclass = document.getElementsByClassName("table7")[0].parentElement.getElementsByClassName("table7")[l];
        var myhtml = '';
        var xnum = myclass.getElementsByTagName("tr").length - 6; //获取 xAxis元素个数
        // var myopt=myclass.getElementsByTagName("tr")[0].getElementsByTagName('th').length-1;//动态获取检测项目个数
        var myopt = myclass.getElementsByTagName("tr")[0].children.length - 1; //动态获取检测项目个数
        eachl = myopt;
        if (l >= 1) {
            myoptpre += document.getElementsByClassName("table7")[0].parentElement.getElementsByClassName("table7")[l - 1].getElementsByTagName("tr")[0].children.length - 1; //上一表tr个数
        }
        var array = []; //创建xAxis元素存放数组
        for (var i = 1; i < xnum - 1; i++) {
            array.push(i);
        }
        //option数据存放数组；
        var options = [];
        var myarraycc1 = [];
        var myarraycc_num = [];
        for (i = 1; i <= myopt; i++) {
            myhtml += '<div class="main" style="height:400px;">';
            myhtml += '</div>';
            myhtml += '<h3 hidden="hidden">传染性法氏囊、败血支原体、传染性支气管炎抗体水平柱状图(' + (i + myoptpre) + ')</h3>';
            myhtml += '<textarea class="remark" style="height: 100px; margin-top: 50px; margin-bottom: 50px; padding: 10px;" placeholder="备注"></textarea>';
            var myclassp = myclass.parentElement;
            var div = document.createElement("div");
            div.className = "char";
            div.innerHTML = myhtml;
            myclassp.getElementsByClassName("chars")[0].appendChild(div); //创建图表存放容器
            var mytext = myclass.getElementsByTagName("h3")[0].textContent + "·" + (myclass.getElementsByTagName("tr"))[0].children[i].innerText;
            var myval1_ = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("s_w");
            var myval2_ = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("s_m");
            var myval1, myval2;
            var ty = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("ty");
            var man = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("man");
            var women = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("women");
            var arrayy = []; //创建条形图元素存放数组
            var arrayy_num = []; //创建条形图元素存放数组
            for (var n = 2; n < xnum; n++) {
                var mytr = myclass.getElementsByTagName("tr")[n];
                var mytd = mytr.children[3 * (i - 1) + 2].textContent;
                var cnum;
                x = Number(myclass.getElementsByTagName("tr")[xnum + 3].children[i].textContent);
                y = Number(myclass.getElementsByTagName("tr")[xnum + 4].children[i].textContent);
                a = Number(myclass.getElementsByTagName("tr")[n].children[3 * (i - 1) + 1].textContent);
                var myeval = myclass.getElementsByTagName("tr")[0].children[i].getAttribute("gs"); //导入公式
                cnum = eval(myeval); //通过公式计算
                myclass.getElementsByTagName("tr")[n].children[3 * (i - 1) + 2].textContent = cnum.toFixed(2);
                var istext = myclass.getElementsByTagName("tr")[1].children[3 * (i - 1) + 1].textContent;
                //阻断率
                if (istext.indexOf("阻断率") != -1) {
                    myval1 = myval1_ * 100;
                    myval2 = myval2_ * 100;
                    myclass.getElementsByTagName("tr")[n].children[3 * (i - 1) + 2].textContent = (cnum).toFixed(2) + "%";
                }
                //其他
                else {
                    myval1 = myval1_;
                    myval2 = myval2_;
                }
                var mydatal;
                if (myval1_ != "" && myval2_ != "") {
                    mydatal = [{
                        yAxis: myval1,
                        lineStyle: { normal: { color: 'green' } },
                        label: { normal: { formatter: '阴' } }
                    }, {
                        yAxis: myval2,
                        lineStyle: { normal: { color: 'red' } },
                        label: { normal: { formatter: '阳' } }
                    }];
                } else if (myval1_ != "" && myval2_ == "") {
                    mydatal = [{
                        yAxis: myval1,
                        lineStyle: { normal: { color: 'green' } },
                        label: { normal: { formatter: '阴阳性' } }
                    }];
                }
                /////////////////////////////////////////
                if (man != "" && women != "") {
                    if (eval(cnum + man)) {
                        mytr.children[3 * i].textContent = "阳性";
                        mytr.children[3 * i].style.color = "rgb(90,90,90)";
                    } else if (eval(cnum + women)) {
                        mytr.children[3 * i].textContent = "阴性";
                        mytr.children[3 * i].style.color = "red";
                    } else {
                        mytr.children[3 * i].textContent = "可疑";
                        mytr.children[3 * i].style.color = "sandybrown";
                    }
                } else if (man == "" && women != "") {
                    if (eval(cnum + women)) {
                        mytr.children[3 * i].textContent = "阳性";
                        mytr.children[3 * i].style.color = "rgb(90,90,90)";
                    } else {
                        mytr.children[3 * i].textContent = "阴性";
                        mytr.children[3 * i].style.color = "red";
                    }
                }
                var mytd_num = mytr.children[3 * i].textContent;
                var mytd_new = mytr.children[3 * (i - 1) + 2].textContent.toString();
                var mytd_new2;
                if (mytd_new.indexOf("%") != -1) {
                    mytd_new2 = mytd_new.replace("%", "");
                    if (mytd_new2 == "NAN") {
                        mytd_new2 = 0;
                    }
                } else {
                    mytd_new2 = mytd_new;
                    if (mytd_new2 == "NAN") {
                        mytd_new2 = 0;
                    }
                }
                arrayy.push(mytd_new2);
                arrayy_num.push(mytd_num);
            }
            myarraycc1.push(arrayy);
            myarraycc_num.push(arrayy_num);
            var yname = myclass.getElementsByTagName("tr")[1].getElementsByTagName("th")[3 * (i - 1) + 1].textContent;
            var mymax;
            var mynote;
            //阻断率
            if (yname.indexOf("阻断率") != -1) {
                mymax = 100;
                mynote = "%";
            }
            //其他
            else {
                mymax = 2;
                mynote = "";
            }
            //设置canvas's options
            var option = {
                title: {
                    text: mytext,
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [{
                    name: '编号',
                    type: 'category',
                    data: array
                }],
                yAxis: [{
                    name: yname,
                    type: 'value',
                    max: mymax,
                    min: 0,
                    axisLabel: {
                        formatter: '{value}' + mynote
                    }
                }],
                series: [{
                    type: 'bar',
                    animation: false,
                    itemStyle: { normal: { color: 'blue' } },
                    data: arrayy,
                    markLine: {
                        silent: false,
                        data: mydatal
                    }
                }]
            };
            options.push(option);
        }
        //循环绘图
        var myoption;
        for (i = 0; i < myopt; i++) {
            var myChart = echarts.init(myclassp.getElementsByClassName("main")[i + myoptpre]);
            myoption = options[i];
            myChart.setOption(myoption);
        }
        //平均值、方差等计算
        //总数xnum-1;最后一个tr下标xnum+5;
        for (i = 0; i < myopt; i++) {
            var dataarray = [];
            //平均值
            var count = 0;
            for (e = 0; e < myarraycc1[i].length; e++) {
                count += Number(myarraycc1[i][e]);
                dataarray.push(Number(myarraycc1[i][e]));
            }
            var myaverage = count / Number(myarraycc1[i].length);
            myclass.getElementsByTagName("tr")[xnum].children[i + 1].textContent = myaverage.toFixed(2);
            //离散度
            var variance = jStat(dataarray).variance();
            myclass.getElementsByTagName("tr")[xnum + 1].children[i + 1].textContent = (variance / (xnum - 2)).toFixed(2);
            //阳性率
            var mynuma = 0;
            for (n = 0; n < myarraycc_num[i].length; n++) {
                if (myarraycc_num[i][n] == "阳性") {
                    mynuma += 1;
                }
            }
            myclass.getElementsByTagName("tr")[xnum + 2].children[i + 1].textContent = (mynuma / (xnum - 2)).toFixed(4);
        }
        var arrayyl = []; //创建折线图元素每个图第一项存放数组
        for (i = 1; i <= myopt; i++) {
            var el = myclass.getElementsByTagName("tr")[xnum].children[i].textContent;
            var elend;
            if (el.indexOf("NaN") != -1) {
                elend = 0;
            } else if (el.indexOf("%") != -1) {
                elend = el.replace("%", "");
            } else {
                elend = el;
            }
            arrayyl.push(elend);
        }
        arrayylp.push(arrayyl)
    }
    //画折线图
    myclassp.getElementsByClassName("mylast")[0].innerHTML = '';
    for (var z = 0; z < eachl; z++) { //一共有eachl个图
        var myltext = myclass.getElementsByTagName("tr")[1].children[3 * z + 1].textContent;
        myval1_ = myclass.getElementsByTagName("tr")[0].children[z + 1].getAttribute("s_w");
        myval2_ = myclass.getElementsByTagName("tr")[0].children[z + 1].getAttribute("s_m");
        //阻断率
        if (myltext.indexOf("阻断率") != -1) {
            myval1 = myval1_ * 100;
            myval2 = myval2_ * 100;
        }
        //其他
        else {
            myval1 = myval1_;
            myval2 = myval2_;
        }
        var mydatal;
        if (myval1_ != "" && myval2_ != "") {
            mydatal = [{
                yAxis: myval1,
                lineStyle: { normal: { color: 'green' } },
                label: { normal: { formatter: '阴' } }
            }, {
                yAxis: myval2,
                lineStyle: { normal: { color: 'red' } },
                label: { normal: { formatter: '阳' } }
            }];
        } else if (myval1_ != "" && myval2_ == "") {
            mydatal = [{
                yAxis: myval1,
                lineStyle: { normal: { color: 'green' } },
                label: { normal: { formatter: '阴阳性' } }
            }];
        }
        var linearr = []; //单个图的数据存储数组
        for (var e in arrayylp) {
            linearr.push(arrayylp[e][z]);
        }
        var mylhtml = '';
        mylhtml += '<div class="main" style="height:400px;">';
        mylhtml += '</div>';
        mylhtml += '<h3 hidden="hidden">' + myclass.getElementsByTagName("tr")[0].children[z + 1].textContent + '抗体' + myltext + '</h3>';
        mylhtml += '<textarea class="remark" style="height: 100px; margin-top: 50px; margin-bottom: 50px; padding: 10px;" placeholder="备注"></textarea>';
        var mdiv = document.createElement("div");
        mdiv.className = "last";
        mdiv.innerHTML = mylhtml;
        myclassp.getElementsByClassName("mylast")[0].appendChild(mdiv);
        var myChartl = echarts.init(myclassp.getElementsByClassName("mylast")[0].getElementsByClassName("last")[z].getElementsByClassName("main")[0]);
        var mynote; //改变折线图y轴标记的变量
        //阻断率
        if (myltext.indexOf("阻断率") != -1) {
            mymax = 100;
            mynote = "%";
        }
        //其他
        else {
            mymax = 2;
            mynote = "";
        }
        var optionl = {
            title: {
                text: myclass.getElementsByTagName("tr")[0].children[z + 1].textContent + "抗体" + myltext,
                subtext: ''
            },
            legend: {
                data: ["平均" + myltext]
            },
            xAxis: [{
                name: '年龄',
                type: 'category',
                boundaryGap: false,
                data: ['24日龄', '5周龄', '7周龄']
            }],
            yAxis: [{
                name: myltext,
                type: 'value',
                max: mymax,
                minInterval: 1,
                min: 0,
                axisLabel: {
                    formatter: '{value}' + mynote
                }
            }],
            series: [{
                name: "平均" + myltext,
                type: 'line',
                data: linearr,
                markLine: {
                    silent: false,
                    data: mydatal
                }
            }]
        };
        myChartl.setOption(optionl);
    }
}
//定义空的json对象存储所有数据
var json_all = [];
// 猪elissa检测 保存数据
function print2(obj) {
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    var event = function() {
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
    };
    window.addEventListener("scroll", event, false);
    $(".shadow").css("display", "block");
    var mycharts = {};
    mycharts.table = [];
    mycharts.bar = [];
    mycharts.line = [];
    mycharts.file = [];
    var myopt1 = $(obj).parents(".model").find(".char").length; //检测项目个数
    var table1 = $(obj).parents(".model").find(".table").length;
    var line1 = $(obj).parents(".model").find(".last").length;
    var file1 = $(obj).parents(".model").find(".file").length;
    //alert("图片生成成功，已发给后台，点击下载图片可下载！")
    var myurlarr = [];
    var delay = domtoimage.impl.util.delay;
    for (timenum = 0; timenum < table1; timenum++) {
        var height = parseInt($(obj).parents(".model").find(".table:eq(" + timenum + ")").find("table").css("height"));
        domtoimage.toPng(document.getElementsByTagName("table")[timenum], { height: height + 5 }).then(delay(1000))
            .then(function(dataUrl) {
                myurlarr.push(dataUrl);
            });
    }
    //延时追加table其他数据
    setTimeout(function() {
        //存储表格图片数据
        for (a = 0; a < table1; a++) {
            var table_data = { //用户填写数据对象
                k: [],
                v: [],
                yang: [],
                yin: []
            };
            var newarr = [];
            var lt = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th").length - 1;
            for (i = 1; i <= lt; i++) {
                var newobj = {};
                newobj.name = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + i + ")").text();
                newobj.asd = $(obj).parents(".model").find(".table:eq(" + a + ")").find(".asd").find("td:eq(" + i + ")").text();
                newobj.man = $(obj).parents(".model").find(".table:eq(" + a + ")").find(".man").find("td:eq(" + i + ")").text();
                newarr.push(newobj);
                //下面获取用户填写的数据
                table_data.k.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(0)").find("th:eq(" + i + ")").text());
            }
            for (w = 2; w <= $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 7; w++) {
                var myarr_ = [];
                for (i = 0; i < lt; i++) {
                    myarr_.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + w + ")").find("td:eq(" + (3 * i + 1) + ")").text())
                }
                table_data.v.push(myarr_);
            }
            var new_arr;
            var wsum = $(obj).parents(".model").find(".table:eq(" + a + ")").find("tr").length - 3;
            new_arr = [];
            for (i = 1; i <= lt; i++) {
                new_arr.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + wsum + ")").find("td:eq(" + i + ")").text())
            }
            table_data.yang.push(new_arr);
            new_arr = [];
            for (i = 1; i <= lt; i++) {
                new_arr.push($(obj).parents(".model").find(".table:eq(" + a + ")").find("tr:eq(" + (wsum + 1) + ")").find("td:eq(" + i + ")").text())
            }
            table_data.yin.push(new_arr);
            var myurl1 = { url: myurlarr[a], info: newarr };
            mycharts.table.push({ title: "", data: myurl1, remark: "", table_data: table_data });
        }
        //柱状图 图截取
        for (var i = 0; i < myopt1; i++) {
            var myurl2 = '';
            var canvas = $(obj).parents(".model").find(".char:eq(" + i + ")").find("canvas")[0];
            myurl2 = canvas.toDataURL("image/png");
            mycharts.bar.push({ title: "", url: myurl2, remark: "" });
        }
        //折线图 图截取
        for (var b = 0; b < line1; b++) {
            var myurl3 = '';
            var canvas1 = $(obj).parents(".model").find(".last:eq(" + b + ")").find("canvas")[0];
            myurl3 = canvas1.toDataURL("image/png");
            mycharts.line.push({ title: "", url: myurl3, remark: "" });
            mycharts.line.push({ title: "", url: myurl3, remark: "" });
        }
    }, 8000);
    //追加表格和备注
    setTimeout(function() {
        for (var a = 0; a < table1; a++) {
            mycharts.table[a].title = $(obj).parents(".model").find(".table:eq(" + a + ")").find("h3").text().toString();
            mycharts.table[a].remark = $(obj).parents(".model").find(".table:eq(" + a + ")").find(".remark").val().toString();
        }
        for (var i = 0; i < myopt1; i++) {
            mycharts.bar[i].title = $(obj).parents(".model").find(".char:eq(" + i + ")").find("h3").text().toString();
            mycharts.bar[i].remark = $(obj).parents(".model").find(".char:eq(" + i + ")").find(".remark").val().toString();
        }
        for (var b = 0; b < line1; b++) {
            mycharts.line[b].title = $(obj).parents(".model").find(".mylast").find(".last:eq(" + b + ")").find("h3").text().toString();
            mycharts.line[b].remark = $(obj).parents(".model").find(".mylast").find(".remark").val().toString();
        }
        //文件上传
        send();
        setTimeout(function() {
            var json_data = JSON.stringify(mycharts);
            var myname = $(obj).parents(".model").parent().attr("name");
            json_all.push('"' + myname + '":' + json_data + '');
            $(".shadow").css("display", "none");
            window.removeEventListener("scroll", event, false);
            alert("数据生成完毕！");
        }, 500);
        //上传文件函数
        function send() {
            var file1 = $(obj).parents(".model").find(".file").length;
            for (var b = 0; b < file1; b++) {
                var file = obj.parentElement.parentElement.parentElement.getElementsByClassName("file")[b].getElementsByClassName("file_upload")[0];
                if (window.FileReader && file.files[0]) {
                    var my_title = $(obj).parents(".model").find(".file:eq(" + b + ")").find("h3").text();
                    var my_remark = $(obj).parents(".model").find(".file:eq(" + b + ")").find("p").text();
                    var fr = new FileReader();
                    fr.readAsDataURL(file.files[0]);
                    fr.onload = function(e) {
                        var dataURL = this.result;
                        mycharts.file.push({ title: my_title, file: dataURL, remark: my_remark });
                    };
                }
            }
        }
    }, 15000);
}



			
