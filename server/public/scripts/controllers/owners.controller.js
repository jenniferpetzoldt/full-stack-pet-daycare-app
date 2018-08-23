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

});// end OwnersController