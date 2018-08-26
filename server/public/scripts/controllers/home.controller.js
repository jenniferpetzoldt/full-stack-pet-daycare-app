myApp.controller('HomeController', function($http){    
    const vm = this;
    console.log('NG in home');

vm.goto = function(page) {
    vm.status = "goto" + page;
};

});// end HomeController