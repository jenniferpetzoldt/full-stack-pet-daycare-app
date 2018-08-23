myApp.controller('OwnersController', function ($http) {
    const vm = this;
    vm.owners = [];
    getOwners();

    //GET route to server to retieve owner data from database
    function getOwners() {
        console.log('in getOwners');
        $http({
            method: 'GET',
            url: '/owners'
        }).then(function (response) {
            console.log('back from server with: owners', response.data)
            vm.owners = response.data;
        }).catch(function (error) {
            console.log('error getting owners:', error);
            alert('Error retrieving owners from server.');
        });
    };// end getOwners

    //POST route to add owner data to database
    vm.addToOwners = function(ownerToAdd) {
        $http({
            method: 'POST',
            url: '/owners',
            data: ownerToAdd
        }).then(function(response){
            console.log('/owner POST success:', response);
            getOwners(); //updates the owner view with current owner information
        }).catch(function(error){
            console.log('/owners POST error:', error);
            alert('unable to add owner');
        });
    };// end POST route

});// end OwnersController