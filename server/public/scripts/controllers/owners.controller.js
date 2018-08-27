myApp.controller('OwnersController', function ($http, $mdDialog) {
    const vm = this;
    vm.owners = [];
    getOwners();

    //GET route to server to retieve owner data from database
    function getOwners() {
        $http({
            method: 'GET',
            url: '/owners'
        }).then(function (response) {
            console.log('back from server with: owners', response.data)
            vm.owners = response.data;
        }).catch(function (error) {
            console.log('error getting owners:', error);
            alert('Error retrieving owners from server.');
        });// end GET route
    };// end getOwners

    //POST route to add owner data to database
    vm.addToOwners = function (ownerToAdd) {
        $http({
            method: 'POST',
            url: '/owners',
            data: ownerToAdd
        }).then(function (response) {
            console.log('/owner POST success:', response);
            getOwners(); //updates the owner view with current owner information
        }).catch(function (error) {
            console.log('/owners POST error:', error);
            alert('unable to add owner');
        });// end POST route
    };// end addToOwners

    //DELETE route to remove an owner from the owners table within the databse
    vm.deleteOwner = function (id) {
        $http({
            method: 'DELETE',
            url: '/owners/' + id
        }).then(function(response){
            console.log('/owners DELETE success:', response);
            getOwners();
        }).catch(function(error){
            console.log('/owners DELETE error:', error);
            vm.showDeleteAlert();
        });//end DELETE route
    }//end deleteOwner


    vm.showDeleteAlert = function() {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Request to delete owner:')
            .textContent('You can not delete an owner with registered pets.')
            .ariaLabel('Delete Owner')
            .ok('Got it!')
            .targetEvent()
        );
      };
 
});// end OwnersController