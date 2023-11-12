// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/index/',         url: 'index.html',  },
      {path: '/registro/',      url: 'registro.html',  },
      {path: '/confirmacion/',  url: 'confirmacion.html',  },
      {path: '/info/',          url: 'info.html',  },
      {path: '/inicio/',        url: 'inicio.html',  },
      {path: '/nuevopoint/',    url: 'nuevopoint.html',  },
      {path: '/points/',        url: 'points.html',  },
      {path: '/capturas/',      url: 'capturas.html',  },
      {path: '/nuevacaptura/',  url: 'nuevacaptura.html',  },
      {path: '/login/',         url: 'login.html',  },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
      $$('#btnRegistro').on("click",fnRegistro);
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
    $$('#btnFinReg').on("click", fnFinRegistro);
})

$$(document).on('page:init', '.page[data-name="confirmacion"]', function (e) {
    $$("#confNombre").text(nombre)
    $$("#confEmail").text(email)
})

$$(document).on('page:init', '.page[data-name="info"]', function (e) {

})

$$(document).on('page:init', '.page[data-name="points"]', function (e) {

})

$$(document).on('page:init', '.page[data-name="nuevopoint"]', function (e) {

})

$$(document).on('page:init', '.page[data-name="nuevacaptura"]', function (e) {

})

$$(document).on('page:init', '.page[data-name="capturas"]', function (e) {

})


$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  $$('#btnInicioSesion').on("click",fnIniciarSesion);
})





 /*  FUNCIONES */
 var email, clave, nombre, apellido;
  
  function fnIniciarSesion (){
      email = $$("#loginEmail").val()
      clave = $$("#loginClave").val()

      if (email!="" && clave!=""){
          firebase.auth().signInWithEmailAndPassword(email, clave)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
        
            mainView.router.navigate("/Inicio/")
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        
            console.error(errorCode);
                console.error(errorMessage);
          });
      
      }
    }



  function fnRegistro(){
    email = $$("#indexEmail").val()
    clave = $$("#indexClave").val()

    if (email!="" && clave!=""){

      firebase.auth().createUserWithEmailAndPassword(email, clave)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Bienvenid@!!! " + email);
            // ...
            mainView.router.navigate('/Inicio/');
          })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
            if (errorCode == "auth/email-already-in-use") {
                console.error("el mail ya esta usado");
            }
            // ..
          });


      // mainView.router.navigate("/registro/")
    }

  }




  function fnFinRegistro(){
    nombre = $$("#regNombre").val()
    clave = $$("#regApellido").val()

    if (nombre!="" && apellido!=""){
      mainView.router.navigate("/confirmacion/")
    }

  }


