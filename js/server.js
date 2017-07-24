/**
 * Created by 范川汇 on 2017/7/17.
 */
var http = require("http");

// 修改为您的apikey.可在官网（https://www.yunpian.com)登录后获取
var https = require('https');
var qs = require('querystring');

http.createServer(function(request, response) {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.writeHeader(200, "ok", {
		"Content-Type": "text/html;charset=utf-8"
	});
	var aa = new Array(4);
	var x = 0;
	var y = 0;
	for(var i = 0; i < aa.length; i++) {
		x = Math.round(Math.random() * 2);
		if(x == 0) {
			y = (Math.round(Math.random() * 25)) + 65;
			aa[i] = String.fromCharCode(y);
		} else if(x == 1) {
			y = (Math.round(Math.random() * 25)) + 97;
			aa[i] = String.fromCharCode(y);
		} else if(x == 2) {
			aa[i] = Math.round(Math.random() * 9);
		}
	}
  var codeStr=aa.join("");
	


	request.on("data", function(postStr) {
		// var data = qs.parse(postStr.toString());
		var data = qs.parse(postStr.toString().replace("+", ""))
		// var data = postStr.toString().split("=")[1];
		console.log(data);
       
//		 语音短信的内容
				var code = codeStr;
				var apikey = '674365236214f9f0a43eb5bf81beb433';
				// 修改为您要发送的手机号码，多个号码用逗号隔开
				var mobile = data.tel;
				// 修改为您要发送的短信内容
				var text = '【' + data.name + '】您的验证码是'+codeStr+'';
				// 指定发送的模板编号
				var tpl_id = 1;
				// 指定发送模板的内容，语音
				var tpl_value = {
					'#code#':codeStr ,
					'#company#': '大道云航'
				};
				// 查询账户信息https地址
				var get_user_info_uri = '/v2/user/get.json';
				// 智能匹配模板发送https地址
				var sms_host = 'sms.yunpian.com';
				var voice_host = 'voice.yunpian.com';
		
				send_sms_uri = '/v2/sms/single_send.json';
				// 指定模板发送接口https地址
				send_tpl_sms_uri = '/v2/sms/tpl_single_send.json';
				// 发送语音验证码接口https地址
				//send_voice_uri = '/v2/voice/send.json';
		
				query_user_info(get_user_info_uri, apikey);
		
				send_sms(send_sms_uri, apikey, mobile, text);
		
				send_tpl_sms(send_tpl_sms_uri, apikey, mobile, tpl_id, tpl_value);
		
				//send_voice_sms(send_voice_uri,apikey,mobile,code);
				function query_user_info(uri, apikey) {
					var post_data = {
						'apikey': apikey,
					}; //这是需要提交的数据
					var content = qs.stringify(post_data);
					post(uri, content, sms_host);
				}
		
				function send_sms(uri, apikey, mobile, text) {
					var post_data = {
						'apikey': apikey,
						'mobile': mobile,
						'text': text,
					}; //这是需要提交的数据
					var content = qs.stringify(post_data);
					post(uri, content, sms_host);
				}
		
				function send_tpl_sms(uri, apikey, mobile, tpl_id, tpl_value) {
					var post_data = {
						'apikey': apikey,
						'mobile': mobile,
						'tpl_id': tpl_id,
						'tpl_value': qs.stringify(tpl_value),
					}; //这是需要提交的数据
					var content = qs.stringify(post_data);
					post(uri, content, sms_host);
				}
		
				function send_voice_sms(uri, apikey, mobile, code) {
					var post_data = {
						'apikey': apikey,
						'mobile': mobile,
						'code': code,
					}; //这是需要提交的数据
					var content = qs.stringify(post_data);
					console.log(content);
					post(uri, content, voice_host);
				}
		
				function post(uri, content, host) {
					var options = {
						hostname: host,
						port: 443,
						path: uri,
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					};
					var req = https.request(options, function(res) {
						// console.log('STATUS: ' + res.statusCode);
						// console.log('HEADERS: ' + JSON.stringify(res.headers));
						res.setEncoding('utf8');
						res.on('data', function(chunk) {
							console.log('BODY: ' + chunk);
						});
					    
					});
					//console.log(content);
					req.write(content);
					req.end();
				}
	});
	response.end("" +codeStr)
}).listen(1000, () => {
	console.log(1000)
});