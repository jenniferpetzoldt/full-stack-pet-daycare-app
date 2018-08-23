myApp.controller('PetsController', function($http){
    const vm = this;
    console.log('NG in pets');
    vm.pets = [];

    //GET route to pull pets from the pets table within the database
    function getPets(){
        console.log('in getPets');
       $http({
           method: 'GET',
           url: '/pets'
       }).then(function(response){
           console.log('/pets GET success:', response.data);
           vm.pets = response.data;
       }).catch(function(error){
           console.log('/pets GET error:', error);
           alert('unable to get pets');
       })
   }
   
    //POST route to add pets to pets table within the database
    vm.addToPets = function(petToAdd) {
        console.log('in addToPets');
        $http({
            method: 'POST',
            url: '/pets',
            data: petToAdd
        }).then(function(response){
            console.log('/pets POST success:', response);
        }).catch(function (error){
            console.log('/pets POST error:', error);
            alert('unable to add pet');
        });
    };// end POST route
    

getPets();    
});// end PetsController