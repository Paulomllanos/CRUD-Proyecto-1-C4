//LLAMAMOS A LA FUNCION ANTES PARA QUE SE CARGUE ENSEGUIDA LA LISTA DE USUARIOS

mostrarUser();
let addUserInput = document.getElementById("addUserInput");
let addUserBtn = document.getElementById("addUserBtn");

let saveUserButton = document.getElementById("saveUserButton");


//al momento de darle click al boton:

addUserBtn.addEventListener("click", function(){
    let userObject = []
    //capturamos el valor del input

    const addUserInputValue = addUserInput.value;

    //CONDICIONAL el cual añade a un usuario
    if(addUserInputValue){
        // creo una propiedad o key para almacenar informacion dentro de localStorage
        let webUser = localStorage.getItem("localUser");
       
        //Creamos una codicional donde vamos a hacer un array vacio para que se llene con los nuevos usuarios que voy agregando
        if(webUser == null){
            userObject
           
        }
        // Si no agrego a ninguno quiero que me muestre los que ya estan agregados
        else{
            //transforma el json a objetos en js
            userObject = JSON.parse(webUser);
        }
        // hace un push a este array vacio, con objetos
        userObject.push({
            
            'user': addUserInputValue,
        });
		
        //añado este nuevo usuario que ingrese en el input a mi localStorage como json y borro lo que contiene el input
        localStorage.setItem("localUser", JSON.stringify(userObject));
        addUserInput.value = '';
    }

    //llamo a la funcion mostrar usuarios para ver enseguida al usuario que añadi
    mostrarUser();
})

// mostrarUser
function mostrarUser(){

    let userObject = []
    //señalo donde quiero obtener la informacion
    let webUser = localStorage.getItem("localUser");

    //Creo una condicional el que me permite saber si tengo el localStorage vacio o no
    if(webUser == null){
        userObject
    }
    else{
        userObject = JSON.parse(webUser);
    }

    //creo una variable html dodne va a conetener un string vacio , el cual voy a querer crear dentro de el por uso de los backticks html
    let html = '';

    //selecciono mi etiqueta de tabla que cree en el index.html 
    let addedUserList = document.getElementById("addedUserList");

    //Recorro con foreach cada usuario que se encuentre en mi localStorage y lo coloco en mi tabla
    userObject.forEach((item, index) => {
        //Llamos a html , y con ayuda de += va añadiendo cada usuario que se va creando en mi lista
        html += `<tr>
                    <th scope="row">${index+1}</th>

                    <td>${item.user}</td>

                    <td><button type="button" onclick="editUser(${index})" class="text-primary"><i class="fa fa-edit"></i>Editar</button></td>
                    
                    <td><button type="button" onclick="deleteUser(${index})" class="text-danger"><i class="fa fa-trash"></i>Eliminar</button></td>
                </tr>`;
    });

    // le especificamos que queremos agregar un innerHtml para que se muestre nuestar tabla y no coloque como string mis etiquetas creadas
    addedUserList.innerHTML = html;
}

// editUser
function editUser(index){
    let saveIndex = document.getElementById("saveIndex");
    let webUser = localStorage.getItem("localUser");
    let userObject = JSON.parse(webUser);

    //le decimos que aparesca en el input el nombre que queremos editar y que al momento de dar al boton de guardar, se modifica el nuevo valor.
    
    saveIndex.value = index;
    addUserInput.value = userObject[index]['user'];

    //estilos para que aparesca el boton
    addUserBtn.style.display="none";
    saveUserButton.style.display="inline-block";
}

// saveEditUser
//Hacemos un evento para que cuando le demos click al boton guardar volvamos a poder agregar nuevos usuarios 

saveUserButton.addEventListener("click", function(e){
    let webUser = localStorage.getItem("localUser");
    let userObject = JSON.parse(webUser); 
    //Saveindex guarda la posicion donde fue editado el usuario
    let saveIndex = document.getElementById("saveIndex").value;
   
    console.log(userObject)

    //recorremos cada propiedad del objeto a traves de in(Iteracion sobre objetos), que nos permite entrar al array del localStorage y le decimos que solo nos devuelva el que estamos editando al valor que estamos colocando en el input
    for (keys in userObject[saveIndex]) {
        if(keys == 'user'){
            userObject[saveIndex].user = addUserInput.value;
        }
      }
    //estilo para que se muestre despues de guardar el boton de añadir
    saveUserButton.style.display="none";
    addUserBtn.style.display="inline-block";
    //Ahora guardamos el dato actualizado en el local , ojo pero como strigify , que tome el formato json
    localStorage.setItem("localUser", JSON.stringify(userObject));
    // reseteamos el valor del input
    addUserInput.value = '';
    //Y lo mostramos nuevamente
    mostrarUser();
})

// deleteUser
function deleteUser(index){
    let webUser = localStorage.getItem("localUser");
    let userObject = JSON.parse(webUser);
    //le pido que empieze del indice solicitado, y que borre 1 (ese)
    userObject.splice(index, 1);
    //ahora que modifique el localstorage
    localStorage.setItem("localUser", JSON.stringify(userObject));
    mostrarUser();
}

// deletAll
let deleteAllButton = document.getElementById("deleteAllButton");

deleteAllButton.addEventListener("click", function(e){

    let saveUserButton = document.getElementById("saveUserButton");
    let addUserBtn = document.getElementById("addUserBtn");
    let webUser = localStorage.getItem("localUser");
    let userObject = JSON.parse(webUser);

    if(webUser == null){
        userObject = [];
    }
    else{
        userObject = JSON.parse(webUser);
        userObject = [];
    }

    saveUserButton.style.display="none";
    addUserBtn.style.display="inline-block";

    localStorage.setItem("localUser", JSON.stringify(userObject));
    mostrarUser();

})


// serachlist
// let searchUserBox = document.getElementById("searchUserBox");

// searchUserBox.addEventListener("input", function(e){

//     let trList = document.querySelectorAll("tr");

//     Array.from(trList).forEach(function(item){

//         let searchedtext = item.getElementsByTagName("td")[0].innerText;

//         let searchUserBoxval = searchUserBox.value;

//         let re = new RegExp(searchUserBoxval, 'gi');

//         if(searchedtext.match(re)){
//             item.style.display="table-row";
//         }

//         else{
//             item.style.display="none";
//         }
//     })
// })