myApp.controller('PetsController', function($http){
    const vm = this;
    console.log('NG in pets');

   function getPets(){
       $http({
           method: 'GET',
       })
   }
   
    //POST route to add pets to pets table in database
    vm.addToPets = function(pet) {
        console.log('in addToPets');
        $http({
            method: 'POST',
            url: '/pets',
            data: {name: name, color: color, breed: breed}
        }).then(function(response){
            console.log('/pets POST success:', response);
        }).catch(function (error){
            console.log('/pets POST error:', error);
            alert('unable to add pet');
        });
    };// end POST route
    

});// end PetsController