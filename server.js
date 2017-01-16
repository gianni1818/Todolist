// Fichier "server.js" 

    // ================================================
    // Chargement des modules 
    // ================================================
    var express  = require('express');               // Charge Express
    var app      = express();                        // Créé notre application Express             
    var mongoose = require('mongoose');              // Charge mongoose pour mongoDB
    var morgan = require('morgan');                  // Charge les détails d'enregistrement (Express4)
    var bodyParser = require('body-parser');         // Charge le middleware de gestion des paramètres
    var methodOverride = require('method-override'); // Simule DELETE et PUT (Express4)


    // ================================================
    // Configuration du serveur 
    // ================================================
    mongoose.connect('mongodb://admin:admin@jello.modulusmongo.net:27017/emabuG4u');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // Définit les fichiers statiques emplacement / public / img sera / img pour les utilisateurs
    app.use(morgan('dev'));                                         // Enregistre toutes les requêtes à la console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // Analyse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // Analyse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Analyse application/vnd.api+json as json
    app.use(methodOverride());                                      // Permet l'usage des verbes HTTP tels que PUT ou DELETE 


    // ================================================
    // Port utiliser par le serveur 
    // (Lancer l'application en excutant la commande   node server.js) 
    // ================================================
    app.listen(8080);
    console.log("L'application utilise le port 8080");  //Affiche le message


    // ================================================
    // Définition du modèle 
    // ================================================
    var Todo = mongoose.model('Todo', {
        text : String
    });
    
    
    // ================================================
    // Routes et API
    // ================================================

    // Evènement :
    // Obtention des éléments de la liste via un GET
    app.get('/api/todos', function(req, res) {

        // Usage de mongoose pour obtenir tous les éléments todos de la BDD
        Todo.find(function(err, todos) {

            if (err)
                res.send(err); /* Si une erreur est trouvée, envoie l'erreur puis
                plus rien n'est executé après la commande "res.send(err)" */
                 

            res.json(todos); /* Une fois la recherche finie, 
            retourne tous les éléments trouver sous format JSON */
        });
    });

    // Evènement :
    // Création de la todo list et affichage des éléments obtenus apparavant
    app.post('/api/todos', function(req, res) {

        // Création d'une liste, 
        // Les informations viennent d'une requête AJAX depuis Angular 
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });

    });

    // Evènement :
    // Suppression d'un élément de la liste
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // Prend et retourne tous les éléments après la création d'un autre
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });
    });
    
    // ================================================
    // Application 
    // ================================================
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // Charge fichier "index.html" lorsque l'on se connecte
    });