myApp.controller('PetsController', function ($http) {
    const vm = this;

    vm.pets = [];
    getPets();

    //GET route to pull pets from the pets table within the database
    function getPets() {
        console.log('in getPets');
        $http({
            method: 'GET',
            url: '/pets'
        }).then(function (response) {
            console.log('/pets GET success:', response.data);
            vm.pets = response.data;
        }).catch(function (error) {
            console.log('/pets GET error:', error);
            alert('unable to get pets');
        });// end GET route
    };// end getPets

    //POST route to add pets to pets table within the database
    vm.addToPets = function (petToAdd) {
        console.log('in addToPets');
        $http({
            method: 'POST',
            url: '/pets',
            data: petToAdd
        }).then(function (response) {
            console.log('/pets POST success:', response);
            getPets();// will update the view with current pet information in database
        }).catch(function (error) {
            console.log('/pets POST error:', error);
            alert('unable to add pet');
        });// end POST route
    };// end addToPets

    //DELETE route to remove a pet from the pets table within the database
    vm.deletePet = function (id) {
        console.log('in deletePet');
        $http({
            method: 'DELETE',
            url: '/pets/' + id //the pet with matching id will be deleted from database
        }).then(function (response) {
            console.log('/pets DELETE success:', response);
            getPets();// will update the view with current pet information in database
        }).catch(function (error) {
            console.log('/pets DELETE error:', error);
            alert('unable to delete pet');
        });//end DELETE route
    };//end deletePet

});// end PetsController