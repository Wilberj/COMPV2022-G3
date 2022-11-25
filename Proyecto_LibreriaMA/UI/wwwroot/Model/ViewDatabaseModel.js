class ViewCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idcompra = { type: "number", hidden: true };
    idarticulo = { type: "number", hidden: true };
    nombrearticulo = { type: "text" };
    descripcionarticulo = { type: "text" };
    activo = { type: "checkbox", hidden: true };
    nombrecategoria = { type: "text" };
    nombremarca = { type: "text" };
    iddetallecompra = { type: "number", hidden: true };
    nombreusuario = { type: "text" };
    fechadeingreso = { type: "date" };
    idusuario = { type: "number", hidden: true };
}
export { ViewCompra }

class ViewArticuloCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombrearticulo = { type: "text" };
    idarticulo = { type: "number", hidden: true };
    activo = { type: "checkbox", hidden: true };
    idtamanoxarticulo = { type: "number",hidden: true };
    descripcionarticulo = { type: "text",hidden: true  };
    nombretamano = { type: "text" };
    nombrecategoria = { type: "text" };
    nombremarca = { type: "text" };

}
export { ViewArticuloCompra }
class ViewAdminMercancia {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    precioventatemporal= { hidden: true };
    NuevaMercancia= { hidden: true };
    temporal = { hidden: true };
    existenciaorigentemporal = { hidden: true };
    newexistenciaorigentemporal = { hidden: true };
    GuardarUnidad = { hidden: true };
    GuardarUnidadOrigen = { hidden: true };
    existenciaunidadtemporal = { hidden: true };
    newexistenciaunidadtemporal = { hidden: true };
    idtamanoxarticulo = { type: "number", hidden: true };
    Seleccionar_Bodega = { type: "number", hidden: true };
    existenciasarticulounidades = { type: "number", hidden: true };
    idconvertir = { type: "number", hidden: true };
    nombrearticulo = { type: "text" };
    nombrebodega = { type: "text" };
    existenciasarticulounidad = { type: "number" };
    existenciasarticuloorigen = { type: "number" };
    precioventa = { type: "number" };
    preciocompraunidad = { type: "number" };
    nombreunidad = { type: "text" };
    idadmimercancias = { type: "number", hidden: true };
    // idcompra = { type: "number", hidden: true };
    // iddetallecompra = { type: "number", hidden: true };
    idbodega = { type: "number", hidden: true };
    idconvertir = { type: "number", hidden: true };
    idtamanoxarticulo = { type: "number", hidden: true };
    idcompra = { type: "number", hidden: true };
    UnidadxOrigen = { type: "number", hidden: true };


}
export { ViewAdminMercancia }

class ViewDevolucionCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombreproveedor = { type: "text" };
    nombreusuario = { type: "text" };
    fechacompra = { type: "date" };
    idcompra = { type: "number" };
    idproveedor = { type: "number" };
    activo = { type: "checkbox" };

}
export { ViewDevolucionCompra }
/////////////////////
class ViewArticulosDanados {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombrearticulo = { type: "text" };
    idtamanoxarticulo = { type: "number", hidden: true };
    idusuario = { type: "number", hidden: true };
    idarticulosdanados = { type: "number", hidden: true };
    //nombreusuario = { type: "text"  };
    existenciasarticulounidad = { type: "number" };
    existenciasarticuloorigen = { type: "number" };
    idadmimercancias = { type: "number" };
    idarticulo = { type: "number", hidden: true };
}
export { ViewArticulosDanados }

class ViewDetalleDevolucion {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idadmimercancias = { type: "number", hidden: true };
    nombrearticulo = { type: "text" };
    preciocompra = { type: "number" };
    cantidadcompra = { type: "number" };
    idcompra = { type: "number", hidden: true };
    iddetallecompra = { type: "number", hidden: true };
    preciocompraunidad = { type: "number", hidden: true };
    existenciasarticuloorigen = { type: "number", hidden: true };
    existenciasarticulounidad = { type: "number" , hidden: true };

}
export { ViewDetalleDevolucion }

class ViewListArticuloVenta {
    constructor(props) {
     for (const prop in props) {
      this[prop] = props[prop];
     }
    }

    idadmimercancias = { type: "number" ,  hidden: true };
    idtamanoxarticulo = { type: "number",  hidden: true  };
    precioventa = { type: "number"  };
    existenciasarticuloorigen = { type: "number"  };
    UnidadxOrigen = { type: "number", hidden: true };
    existenciasarticulounidad = { type: "number"  };
    nombrearticulo = { type: "text"  };
    
   }
   export{ViewListArticuloVenta}
   class viewdevolventa {
    constructor(props) {
     for (const prop in props) {
      this[prop] = props[prop];
     }
    }
    idfactura = { type: "number" , primary: true  };
    fechafactura = { type: "date"  };
    nombrecliente = { type: "text"  };
    idusuario = { type: "number"  };
    nombreusuario = { type: "text"  };
    activo = { type: "checkbox" };

   }
   export{viewdevolventa}
   class viewDetalleDevolucionVenta {
    constructor(props) {
     for (const prop in props) {
      this[prop] = props[prop];
     }
    }
    idadmimercancias = { type: "number" , primary: true  };
    nombrearticulo = { type: "text"  };
    idtamanoxarticulo = { type: "number",hidden:true   };
    idfactura = { type: "number" };
    existenciasarticuloorigen = { type: "number",hidden:true  };
    existenciasarticulounidad = { type: "number",hidden:true  };
    precioventa = { type: "number",hidden:true  };
    iddetallefactura = { type: "number",hidden:true  };
    cantidadventa = { type: "number"  };
    activo = { type: "checkbox",hidden:true };

    
   }
   export{viewDetalleDevolucionVenta}

   class ViewGestionArticulos {
    constructor(props) {
     for (const prop in props) {
      this[prop] = props[prop];
     }
    }
    nombrearticulo = { type: "text" };
    descripcionarticulo = { type: "text"  };
    nombretamano = { type: "text"  };
    idtamano = { type: "number", hidden:true };
    idarticulo = { type: "number", hidden:true };
    idtamanoxarticulo = { type: "number", hidden:true };
    
   }
   export{ViewGestionArticulos}