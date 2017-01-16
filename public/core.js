// public/core.js

/* Création d'un module, d'un contrôleur et de la définition des fonctions 
* pour gérer le tous. Cela sera utile lors de la mise en vue pour l'utilisateur */

var scotchTodo = angular.module('giaTodo', []); // module angulaire

//Création des fonctions
function mainController($scope, $http) {
    $scope.formData = {};

    // Lorsqu'on va sur la page, tous les éléments de la liste sont chargés et affichés
    $http.get('/api/todos')         // Obtention via un GET
        .success(function(data) {       // Si succès, mise à jour des éléments
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {         // Si erreur, message d'erreur
            console.log('Error: ' + data);  
        });

    // Lors d'un ajout via le formulaire, envoye vers le Node API
    
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)   // Ajout via un POST
            .success(function(data) {       // Si succès, mise à jour des éléments
                $scope.formData = {};       
                $scope.todos = data;        
                console.log(data);
            })
            .error(function(data) {         // Si erreur, message d'erreur
                console.log('Error: ' + data);  
            });
    };

    // Supprime un élément après analyse 
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)   // Suppression via un DELETE
            .success(function(data) {       // Si succès, mise à jour des éléments
                $scope.todos = data;    
                console.log(data);
            })
            .error(function(data) {         // Si erreur, message d'erreur
                console.log('Error: ' + data);  
            });
    };

}