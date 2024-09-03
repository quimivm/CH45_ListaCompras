//para cumplir con los objetivos ocupamos que se ejecute al hacer click en el botón
//paso 1: definimos el const para el boton Agregar y lo que vayamos ocupando para traer del index las cantidades que vamos a ir modificando conforme se añadan productos a la lista
//paso 2: añadimos el event listener con click y su funcion para que el click sea el detonante de las validaciones
//paso 3: dentro del event listener definimos todas las validaciones

const btnAgregar = document.getElementById("btnAgregar");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


// esta es una bandera. al ser true nos dejará agregar los datos a la tablita
//será true **en el inicio**, será false **en las validaciones** que estamos haciendo en el botón para que si no es válido, no se añada a la tablita
let isValid = true;

//vamo' a añadir el numerador de los productos (# en la tabla que vamos generando)
let contador = 0;

//vamo' a definir el precio por item
let precio = 0;

//vamo' a definir el costo total para el Resumen
let costoTotal = 0;

//vamo' a definir el total en Productos para el Resumen
let totalEnProductos = 0;


//definimos las funciones que vamos a usar aquí afuera del botón para que se puedan reusar

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }//length==0
    //este if valida que el número sea más de 0 dígitos de largo
    
    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN
    //este if valida que si el input sí sea un número

    if(Number(txtNumber.value)<=0){
        return false;
    }//mayor que 0
    //este if valida que el número que pongamos sea mayor que 0, que no compremos -24 jabones lol

    return true;
}//validarCantidad


//esta función asigna el precio unitario aleatorio de cada producto
function getPrecio(){
    return Math.round((Math.random()*10000))/100;
} //getPrecio



//Aquí empieza el botón

btnAgregar.addEventListener("click", function(event){
//esto es para "limpiar" el botón y que sólo trigeree las validaciones que vamos a definir
    event.preventDefault();
        txtName.style.border="";
        txtNumber.style.border="";
        alertValidacionesTexto.innerHTML="";
        alertValidaciones.style.display="none";
        isValid = true;

//vamo'a validar el nombre del producto

    if(txtName.value.length<3){
        txtName.style.border="solid red medium";
            alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto.<br/>";
            alertValidaciones.style.display="block";
            isValid = false;
        //return false;
    } 
    //Name<3 indica que no es un item válido dos letras, así que dispara la alerta
    //agregar .trim() al .value{aquí}.lenght quita los espacios extra que ponga el usuario 
    //aquí cierra el if length<3

//vamo' a validar la cantidad

    if(! validarCantidad()){
        txtNumber.style.border="solid red medium";
            alertValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta.<br/>";
            //podemos usar el+= para hacer la cadena pq son dos eslabones, no es demasiada carga para el procesador,no vale la pena hacer un insertHTML
            alertValidaciones.style.display="block";
            isValid = false;
            //ya definimos cómo validar la cantidad (arriba), así que sólo usamos el caso donde !no se cumple para disparar la alerta, y el contrario lo dejamos pasar
    }//! validarCantidad


//Ahora, cuando todo se cumpla, es válido, por lo que ya procedemos a recolectar los datos validados:

    if(isValid){
        contador++;
        // pone el # del producto en la lista, ++ suma de 1 en 1
        precio= getPrecio();
        // imprime el precio aleatorio obtenido

        //esto construye la tabla
        let row =   `<tr>
                        <td>${contador}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td
                    </tr>`;
        //dónde insertamos los elementos que añadimos a la lista (en qué posición): beforeend para que se añadan al último de lo que ya hemos puesto
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        
        //el precio total es la cadena de [el precio random que sacamos (unitario) * el número de productos (hence el Number, pa convertir de string a number el número de productos)]
        costoTotal += precio * Number(txtNumber.value);
        
        //es en total cuántos productos hay en el carrito
        totalEnProductos += Number(txtNumber.value);
        
        //es el total de productos DIFERENTES (o sea todos los de la lista)
        contadorProductos.innerText = contador;
        
        //estos son los textos que se muestran en resumen
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = "$ "+costoTotal;

        //vamos a guardar los valores de la lista en el local storage para que si se cierra la sesión se guarden mis datos
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos",totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal)

        //después de que se hacen todos los cálculos y se guardó la info, limpia los campos de Nombre y Cantidad para seguir añadiendo productos a la lista
        txtName.value="";
        txtNumber.value="";
        txtName.focus();

    } //if isValid

}) //btnAgregar.addEventListener


//blur es cuando el campo pierde el foco (como nos cambiamos a otro), el contrario de spotlight, es el halo azul que te dice en qué campo estás situado
txtName.addEventListener("blur",function(event){
    txtName.value = txtName.value.trim();
}); //txtName.addEventListener <-- notación para marcar el cierre de ese bloque de código y que sea más evidente en qué sección del código estamos

txtNumber.addEventListener("blur",function(event){
    txtNumber.value = txtNumber.value.trim();
}); //txtNumber.addEventListener


//hay que cargar los datos que ya estén guardados de otra sesión, cargan al cargar la página!! Se borran cuando se borra el caché
window.addEventListener("load", function(){
    if (this.localStorage.getItem("contador") !=null){
        contador = Number(this.localStorage.getItem("contador"));
    }//!=null

    if (this.localStorage.getItem("totalEnProductos") !=null){
        totalEnProductos=Number(this.localStorage.getItem("totalEnProductos"));
    }//!=null

    if (this.localStorage.getItem("costoTotal") !=null){
        costoTotal=Number(this.localStorage.getItem("costoTotal"));
    }//!=null

    //vuelvo a definir estas variables
    contadorProductos.innerText=contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText="$ "+costoTotal.toFixed(2);
}); //window load


