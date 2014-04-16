describe('dfModelStorage', function() {
	beforeEach(module('dfModelStorage'));
	var scope;
	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));
	
	var testData = 'test data';
	var newTestData = 'new test data';
	
	describe('save data on storage', function() {
		it('should save data on session storage', inject(function () {
			inject(function ($compile, $window) {
				var element = $compile('<input type="text" data-ng-model="testValue" data-df-model-storage>')(scope);
				scope.$apply();
				scope.testValue = testData;
				scope.$apply();
				expect(scope.testValue).toEqual(element.val());
				expect(scope.$eval($window.sessionStorage.getItem("testValue"))).toEqual(testData);
			});
		}))
	})
	
	describe('update data on storage', function() {
		it('should update data on session storage', inject(function () {
			inject(function ($compile, $window) {
				var element = $compile('<input type="text" data-ng-model="testValue" data-df-model-storage>')(scope);
				scope.$apply();
				scope.testValue = testData;
				scope.$apply();
				expect(scope.testValue).toEqual(element.val());
				expect(scope.$eval($window.sessionStorage.getItem("testValue"))).toEqual(testData);
				scope.testValue = newTestData;
				scope.$apply();
				expect(scope.testValue).toEqual(element.val());
				expect(scope.$eval($window.sessionStorage.getItem("testValue"))).toEqual(newTestData);
				expect(scope.$eval($window.sessionStorage.getItem("testValue"))).not.toEqual(testData);
			});
		}))
	})
})