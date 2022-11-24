




cerrar.onclick =()=>{
    const Respuesta = window.confirm("¿Quiere Cerrar Sesion?")
    if(Respuesta){
        window.location="../Index"
    }else{
        console.log("No Salio");
    }
}