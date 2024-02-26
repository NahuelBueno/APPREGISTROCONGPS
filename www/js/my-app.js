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

var db = firebase.firestore();
var colPersonas = db.collection("PERSONAS");
var colPoints = db.collection("POINTS");
var colCapturas = db.collection("CAPTURAS");


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


/*
// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})
*/


// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
      $$('#btnRegistro').on("click",fnRegistro);

      // sembrarDatos();

      //cargarusuariosEjemplo();
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
  mostrarPointsUsuario();
})

$$(document).on('page:init', '.page[data-name="nuevopoint"]', function (e) {
  $$('#btnGuardarPoint').on("click", cargarPoint);
})

$$(document).on('page:init', '.page[data-name="nuevacaptura"]', function (e) {
  $$('#btnGuardar').on("click", cargarCaptura);
})

$$(document).on('page:init', '.page[data-name="capturas"]', function (e) {
    mostrarCapturasUsuario();
})


$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  $$('#btnInicioSesion').on("click",fnIniciarSesion);
})

$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
  cargarDatosUsarioLogueado();
})

/* Prueba base de datos*/

/*
var db = firebase.firestore();
var dato = {
  nombre: "Nahuel",
  rol: "Dev",
  }
  var miId = "nahu@nahu.com";

  db.collection("personas").doc(miId).set(dato)
  .then( function(docRef){
    console.log("Doc creado con el id: " + docRef.id);
  })
  .catch(function(error){
    console.log("Error: " + error);
  })

  */

/* SEMBRADO DE DATOS */

function sembrarDatos(){

  var dato = { rol: "Desarrollador", color:"Verde"}
  var miId = "DEV";
  
  colRoles.doc(miId).set(dato)
  .then( function (docRef) {
    console.log("Doc creado con el id: " + docRef.id);
  })
  .catch(function(error) {
    console.log("Error: " + error);
  })

}


 /*  FUNCIONES */
 var email, clave, nombre, apellido, cargaNombre, cargaEspecie, cargaTamaño, cargaMarca;
  
  function fnIniciarSesion (){
      email = $$("#loginEmail").val()
      clave = $$("#loginClave").val()

      if (email!="" && clave!=""){
          firebase.auth().signInWithEmailAndPassword(email, clave)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Bienvenido " + email)
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
            mainView.router.navigate('/registro/');
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
    nombre = $$("#regNombre").val();
    clave = $$("#regApellido").val();

    if (nombre!="" && apellido!=""){
        
      var datos = { nombre: nombre, rol: "PESCADOR" }
      var elID = email;

      colPersonas.doc(elID).set(datos)
      .then( function(docRef){
        mainView.router.navigate("/confirmacion/")
      })
      .catch(function(error){
        console.log("Error: " + error);
      })

      
    }

  }


    function cargarusuariosEjemplo(){
      colPersonas.get()
      .then( function(qs){
        qs.forEach (function(elDoc){
          nombre = elDoc.data().nombre;
          email = elDoc.id;
          rol = elDoc.data().rol;
          $$("#listaUsuarios").append("<hr>" + nombre + "/" + rol + "/" + email)
        })
      })
      .catch(function(error) {
        console.log("Error: " + error);
      })
    }


  function cargarDatosUsarioLogueado (){
    colPersonas.doc(email).get()
    .then(function(unDoc){
        //console.log(unDoc);
        nombre = unDoc.data().nombre;
        email = unDoc.id;
        rol = unDoc.data().rol;
        $$("#infoDatos").html("<hr>" + "Bienvenido "+ nombre )
    } )
    .catch(function(error) {
      console.log("Error: " + error);
    })
  }


  function mostrarCapturasUsuario (){
    colCapturas.doc(email).collection("CapturasUsuario").get()
    .then(function(docCapt){
      docCapt.forEach(function(docCaptura){
        info = docCaptura.data();
        console.log(info);
        $$("#infoCapturas").append("<hr>" + info.nombre + " - " + info.especie + " - " + info.tamaño + " - Marca:  " + info.marca)
      })
      
      /* nombre = docCapt.data().nombre
      especie = docCapt.data().especie
      tamaño = docCapt.data().tamaño
      marca = docCapt.data().marca
 */
      /* $$("#infoCapturas").html("<hr>" + nombre + " - " + especie + " - " + tamaño + " - " + marca)
 */
    })

  }

  /* --- FUNCIONA 

  function mostrarPointsUsuario (){
    colPoints.doc(email).collection("PointsUsuario").get()
    .then(function(docPoints){
      docPoints.forEach(function(docPoints){
        info = docPoints.data();
        console.log(info);
        $$("#infoPoints").append("<hr>" + info.nombre + " - " + info.latitud + " - " + info.longitud + " - " + info.descripcion + " - " + docPoints.id)
      })
    })
  }

    FUNCIONA------*/




    /*--------- Prueba CON CARD ---- */

  
  function mostrarPointsUsuario (){
      colPoints.doc(email).collection("PointsUsuario").get()
      .then(function(docPoints){
        docPoints.forEach(function(docPoints){
          info = docPoints.data();
          console.log(info);
          $$("#infoPoints").append("<hr>" + info.nombre + " - " + info.latitud + " - " + info.longitud + " - " + info.descripcion + " - " + docPoints.id)
        })
      })
    }





  function cargarCaptura(){

    cargaNombre = $$("#CapturaNombre").val();
    cargaEspecie = $$("#CapturaEspecie").val();
    cargaTamaño = $$("#CapturaTamaño").val();
    cargaMarca = $$("#CapturaMarca").val();

    var dato = { nombre:cargaNombre, 
      especie: cargaEspecie ,
      tamaño: cargaTamaño,
      marca:cargaMarca,
    }
    console.log(dato);
    console.log("Nueva captura: " + cargaNombre + cargaEspecie + cargaTamaño + cargaMarca);
    colCapturas.doc(email).collection("CapturasUsuario").add(dato)
    .then( function (docRef) {
      console.log("Doc creado con el id: " + docRef.id);
      mainView.router.navigate("/capturas/")
    })
    .catch(function(error) {
      console.log("Error: " + error);
    })

    console.log("Nueva captura: " + cargaNombre + cargaEspecie + cargaTamaño + cargaMarca);
  }


 /* -------------------- PRUEBA GPS --------------- */ 




  function cargarPoint(){
     /* -------------------- PRUEBA GPS ---------------  */ 

    var onSuccess = function(position) {
      alert('Latitude: ' + position.coords.latitude          + '\n' +
      'Longitude: ' + position.coords.longitude         + '\n' +
      'Altitude: ' + position.coords.altitude          + '\n' +
      'Accuracy: ' + position.coords.accuracy          + '\n' +
      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      'Heading: ' + position.coords.heading           + '\n' +
      'Speed: ' + position.coords.speed             + '\n' +
      'Timestamp: ' + position.timestamp                + '\n');

      
  };
  
  function onError(error) {
  alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }
  
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
   /* -------------------- PRUEBA GPS --------------- */ 

 cargaNombre = $$("#NombrePoint").val();
 cargaLatitud = $$("#LatitudPoint").val();
 cargaLongitud = $$("#LongitudPoint").val();
 cargaDescripcion = $$("#DescripcionPoint").val();


 /* -------------------- Original --------------- 
    cargaNombre = $$("#NombrePoint").val();
    cargaLatitud = $$("#LatitudPoint").val();
    cargaLongitud = $$("#LongitudPoint").val();
    cargaDescripcion = $$("#DescripcionPoint").val();
    cargaLatitud+Longitud = $$("")
 /* -------------------- Original --------------- */ 

    var dato = { nombre:cargaNombre, 
      latitud: cargaLatitud ,
      longitud: cargaLongitud,
      descripcion: cargaDescripcion,
    }
    console.log(dato);
    console.log("Nuevo point: " + cargaNombre + cargaLatitud + cargaLongitud + cargaDescripcion);
    colPoints.doc(email).collection("PointsUsuario").add(dato)
    .then( function (docRef) {
      console.log("Doc creado con el id: " + docRef.id);
      mainView.router.navigate("/points/")
    })
    .catch(function(error) {
      console.log("Error: " + error);
    })

  }