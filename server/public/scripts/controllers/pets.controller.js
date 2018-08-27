myApp.controller('PetsController', function ($http) {
    const vm = this;

    vm.pets = [];
    vm.owners = [];


    getPets();
    getOwners();

    //GET route to pull pets from the pets table within the database
    function getPets() {
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

    //GET route to server to retieve owner data from database
    function getOwners() {
        $http({
            method: 'GET',
            url: '/pets/owners'
        }).then(function (response) {
            console.log('back from server with: owners', response.data)
            vm.owners = response.data;
        }).catch(function (error) {
            console.log('error getting owners:', error);
            alert('Error retrieving owners from server.');
        });// end GET route
    };// end getOwners

    //POST route to add pets to pets table within the database
    vm.addToPets = function (petToAdd) {
        $http({
            method: 'POST',
            url: '/pets',
            data: petToAdd
        }).then(function (response) {
            console.log('/pets POST success:', response);
            getPets();// will update the view with current pet information in database
            clearInputs();//clears input fields after submit button clicked
            getOwners();// repopulates DOM with updated data
        }).catch(function (error) {
            console.log('/pets POST error:', error);
            alert('unable to add pet');
        });// end POST route
    };// end addToPets

    //DELETE route to remove a pet from the pets table within the database
    vm.deletePet = function (id) {
        $http({
            method: 'DELETE',
            url: '/pets/' + id //the pet with matching id will be deleted from database
        }).then(function (response) {
            console.log('/pets DELETE success:', response);
            getPets();// will update the view with current pet information in database
            getOwners();//updates DOM with accurate data
        }).catch(function (error) {
            console.log('/pets DELETE error:', error);
            alert('unable to delete pet');
        });//end DELETE route
    };//end deletePet

    vm.showCheckIn = function (id) {
        let data = { check_in: 'In' };
        $http.put('/pets/' + id, data)
            .then(function (response) {
                getPets();
            }).catch(function (error) {
                console.log('/pets UPDATE error:', error);
                alert('unable to update pet to checked in');
            });
    };

    vm.hideCheckIn = function (id) {
        let data = { check_in: 'Out' };
        $http.put('/pets/' + id, data)
            .then(function (response) {
                getPets();
            }).catch(function (error) {
                console.log('/pets UPDATE error:', error);
                alert('unable to update pet to checked in');
            });
    }

    function clearInputs() {
        vm.petToAdd.name = '';
        vm.petToAdd.breed = '';
        vm.petToAdd.color = '';
        vm.petToAdd.owner_id = '';
        vm.petToAdd.notes = ''
    };

});// end PetsController