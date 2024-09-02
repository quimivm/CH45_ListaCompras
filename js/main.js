//para cumplir con los objetivos ocupamos que se ejecute al hacer click en el botón

//definimos el const para el boton Agregar y lo que vayamos ocupando
//añadimos el event listener con click y su funcion para que el click sea el detonante de las validaciones


const btnAgregar = document.getElementById("btnAgregar");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }//length==0

    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN

    if(Number(txtNumber.value)<=0){
        return false;
    }//mayor que 0

    return true;
}//validarCantidad


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
        txtName.style.border="";
        txtNumber.style.border="";
        alertValidacionesTexto.innerHTML="";
        alertValidaciones.style.display="none";

//vamo'a validar el nombre del producto

    if(txtName.value.length<3){
        txtName.style.border="solid red medium";
            alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto.<br/>";
            alertValidaciones.style.display="block";
        //return false;
    } 
    //Name<3 indica que no es un item válido dos letras
    //agregar .trim() al .value{}.lenght quita los espacios 
    //aquí cierra el if length<3

//vamo' a validar la cantidad

    if(! validarCantidad()){
        txtNumber.style.border="solid red medium";
            alertValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta.<br/>";
            alertValidaciones.style.display="block";
    }//! validarCantidad
    
//podemos usar el+= para hacer la cadena pq son dos eslabones, no es demasiada carga para el procesador,no vale la pena hacer un insertHTML


}) //btnAgregar.addEventListener


//blur es cuando el campo pierde el foco (nos cambiamos a otro)
txtName.addEventListener("blur",function(event){
    txtName.value = txtName.value.trim();
}); //txtName.addEventListener <-- notación para marcar el cierre de ese bloque de código y que sea más evidente

txtNumber.addEventListener("blur",function(event){
    txtNumber.value = txtNumber.value.trim();
}); //txtNumber.addEventListener
