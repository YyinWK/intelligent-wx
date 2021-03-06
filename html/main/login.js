define(function (require, exports, module) {
    var Http = require('U/http');

    var main = new Vue({
        el: '#main',
        template: _g.getTemplate('/html/main/login_view.html'),
        data: {
            num:"",
            password:""
        },
        ready: function() {
        },
        methods: {
            login: function(){
                var num = $("#num").val();
                var password = $("#password").val();

                Http.ajax({
                    url: "student/login.do",
                    async: false,
                    data: {
                            num:num,
                            password:password
                    },
                    success: function(res){
                        if(res.code == 200){
                            localStorage.setItem("token",res.data.token);
                                               
                            var student = JSON.stringify(res.data.student);
                            localStorage.setItem("student",student);
    
                            Dialog.init(res.msg,1000)
    
                            setTimeout(function(){api.openWin({
                                url: "/html/main/index_frame.html"
                            })},1000)
                        }else{
                            Dialog.init(res.msg,1000)
                        }
                    },
                    error: function(res){
                        Dialog.init(res.msg,1000)
                    }
                })
            }
        }
    });
    
    module.exports = {};
})