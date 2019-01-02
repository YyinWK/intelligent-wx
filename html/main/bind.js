define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('main/bind_view'),
        data: {
            num:"",
            password:""
        },
        ready: function() {
        },
        methods: {
            bind: function(){
                var num = $("#num").val();
                var password = $("#password").val();
                console.log(num)
                console.log(password)
                Http.ajax({
                    url: "student/activate.do",
                    async: false,
                    data: {
                        student:{
                            num:num,
                            password:password,
                            wetchatOpenId:"wxf0e81c3bee622d60"
                        }

                    },
                    success: function(res){
                        console.log(res)
                        if(res.msg == "绑定成功！" || res.msg == "首次绑定成功！"){
                            //消息提示
                            Http.ajax({
                                url: "student/login.do",
                                async: false,
                                data: {
                                        num:num,
                                        password:password
                                },
                                success: function(res){
                                    console.log('success')
                                    console.log(res)
                                    sessionStorage.setItem("token",res.data.token);
                                                           
                                    var student = JSON.stringify(res.data.student);
                                    sessionStorage.setItem("student",student);

                                    layer.open({
                                        content: '绑定成功！',
                                        skin: 'msg',
                                        time: 1
                                    })

                                    setTimeout(function(){api.openWin({
                                        url: "index_frame.html"
                                    })},1000)
            
                                    
                                },
                                error: function(res){
                                    console.log(res)
                                } 
                            })
                        }else if(res.msg == "解绑成功！"){
                            layer.open({
                                content: '解绑成功！',
                                skin: 'msg',
                                time: 2
                            })
                        }

                    },
                    error: function(res){
                        
                        console.log(res)
                    } 
                })
            }
        }
    });
    
    module.exports = {};
})