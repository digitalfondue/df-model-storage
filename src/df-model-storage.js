;
(function() {
  'use strict';
  angular.module('dfModelStorage', []).directive('dfModelStorage', ['$window', '$parse', '$log',
    function($window, $parse, $log) {
      var defaultConfig = {
        onNotSupported: angular.noop,
        onNoDataFound: angular.noop,
        onParseError: angular.noop,
        onSuccess: angular.identity
      };
      return {
        require: '?ngModel',
        restrict: 'A',
        link: function dfModelStorage(scope, element, attrs, ngModel) {
          //priority to ngModel
          var watcher = ngModel ? function watchModel() {return ngModel.$modelValue;} : attrs.dfModelStorage;
          var itemName = attrs.ngModel || attrs.dfModelStorage;
          var prefix = attrs.dfPrefix || "";
          
          var config = angular.extend({}, defaultConfig, scope.dfConfig);
          
          //we expect that the itemName is defined
          if(!angular.isString(itemName) || itemName.length < 1) {
            var errorMsg = 'Missing ngModel _OR_ model name in df-model-storage attribute';
            $log.error(errorMsg, element);
            throw errorMsg;
          }
          
          // restore value from session storage
          var sessionStorageKey = prefix + itemName;
          var item = $window.sessionStorage.getItem(sessionStorageKey);
          if(item) {
            try {
              var value = angular.fromJson(item);
              $parse(itemName).assign(scope, config.onSuccess(value));
            } catch(e) {
              //$log.debug('error while parsing/assigning value', e);
              config.onParseError(sessionStorageKey, e);
            }
          } else {
            config.onNoDataFound(sessionStorageKey);
          }
          
          
          // save value in the session storage on change
          scope.$watch(watcher, function saveNewValInStorage(newValue) {
            //some browser in incognito mode block the session storage
            try {
              $window.sessionStorage.setItem(prefix + itemName, angular.toJson(newValue));
            } catch(e) {
              config.onNotSupported(sessionStorageKey);
            }
          }, true);
        }
      }
    }
  ]);
})();
