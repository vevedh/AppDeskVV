AppDesk.factory('GUI', function() {
  return require('nw.gui');
})
.factory('GUIWin', ['GUI',
  function(gui) {
    return gui.Window.get();
  }
])
.factory('GUIMenu',['GUI',
  function(gui) {
    return gui.Window.get().menu;
  }
])
.factory('myServices',function($http, $rootScope){
    //$http.defaults.useXDomain = true;
    /*$http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        };*/
    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With'];
    /*
    $ionicPlatform.ready(function () {
        document.addEventListener('deviceready', function () {
            //console.log("PhoneGap is now loaded/1");
            jQuery.support.cors = true;
            //$.mobile.allowCrossDomainPages = true;
            //$("body").mobileTemplate({tdomain: sdomain});
            //console.log("PhoneGap is now loaded/2");
        }, false);
    });
    */
    return {
        mydata: {},
        getHello: function() {
            return 'Hello World';
        },
        getPrinters: function(imp) {
            //alert('avt'+imp);
            var impquery = '';
            if (imp.toString().length >= 10 ) {
                impquery = imp.toString().substr(0,9) + '*';
            } else {
                impquery = imp.toString() + '*';
            }
            //alert('aprs'+impquery);
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'lstOutqArr',
                'parameters': [impquery]
            });
            var self = this;

            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {

                    var dataret = $.parseJSON(JSON.stringify(data));
                    self.mydata = dataret;
                    $rootScope.$broadcast('printersResult');
            }).error(function(data, status, headers, config) {

                self.mydata = status;
                $rootScope.$broadcast('printersResult');
            });

        },
        doMemDevice: function(uid,nom,prenom,dev,cdate,ctime){
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'mob_connect',
                'parameters': [uid,nom,prenom,dev,cdate,ctime]
            });
            var self = this;

            /*$.ajax({
                url: callURL,
                type: 'post',
                data: callData,
                contentType: 'application/json',
                dataType:'json',
                error: function (request, state, error) {
                    self.mydata = state;
                    $rootScope.$broadcast('asyncResult');
                },
                success: function (result) {
                    var dataret = $.parseJSON(JSON.stringify(result));
                    self.mydata = dataret;
                    $rootScope.$broadcast('asyncResult');
                }
            });*/
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(JSON.stringify(data));
                var dataret = $.parseJSON(JSON.stringify(data));
                self.mydata = dataret;
                $rootScope.$broadcast('memDevResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('memDevResult');
            });

        },
        //-------------
        mob_getInfos: function(guid) {
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'mob_getInfos',
                'parameters': [guid]
            });
            var self = this;
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(data);
                var dataret = $.parseJSON(JSON.stringify(data));
                self.mydata = dataret;
                $rootScope.$broadcast('getInfosResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('getInfosResult');
            });
        },
        //-------------autoEdtMsgw()
        doAutoEdtMsgw: function() {
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'autoEdtMsgw',
                'parameters': []
            });
            var self = this;
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(data);
                var dataret = $.parseJSON(JSON.stringify(data));
                self.mydata = dataret;
                $rootScope.$broadcast('doAutoEdtMsgwResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('doAutoEdtMsgwError');
            });
        },
        getIpImp: function(imp) {
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'getIpImp',
                'parameters': [imp]
            });
            var self = this;
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(data);
                //var dataret = $.parseJSON(JSON.stringify(data));
                self.mydata = data;
                $rootScope.$broadcast('ipImpResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('ipImpResult');
            });
        },
        //---------
        chkIp:function(ipval) {
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'chkIp',
                'parameters': [ipval]
            });
            var self = this;
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(data);
                //var dataret = $.parseJSON(JSON.stringify(data));
                var dataret = 'positive';
                if ( data.toString()=="false" ) {
                    dataret = 'assertive';
                }
                //alert(dataret);
                self.mydata = dataret;
                $rootScope.$broadcast('chkIpResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('chkIpResult');
            });
        },
        //----------
        startEditeur: function(imp) {
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'startEditeur',
                'parameters': [imp]
            });
            var self = this;
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(data);
                //var dataret = $.parseJSON(JSON.stringify(data));
                self.mydata = data;
                $rootScope.$broadcast('startEditeurResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('startEditeurResult');
            });
        },
        stopEditeur: function(imp) {
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'stopEditeur',
                'parameters': [imp]
            });
            var self = this;
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(data);
                //var dataret = $.parseJSON(JSON.stringify(data));
                self.mydata = data;
                $rootScope.$broadcast('stopEditeurResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('stopEditeurError');
            });
        },
        getMagByEns: function(ens) {
            var callURL = "http://3hservices.hhhgd.com/Amfphp/?contentType=application/json";
            var callData = JSON.stringify({
                'serviceName': 'vvproxy_new',
                'methodName': 'query_AS400JSON',
                'parameters': ["select * from vvbase/vvmobmagip where ENSNOM like '"+ens+"%' "]
            });
            var self = this;
            $http({
                url: callURL,
                method: 'POST',
                data: callData,
                headers: {
                    'Content-Type': 'application/json'
                },
                async: true,
                responseType: 'json'
            }).success(function(data, status, headers, config) {
                //alert(data);
                self.mydata =  $.parseJSON(JSON.stringify(data));
                $rootScope.$broadcast('getMagByEnsResult');
            }).error(function(data, status, headers, config) {
                //alert(status);
                self.mydata = status;
                $rootScope.$broadcast('getMagByEnsError');
            });
        }
    }
});
