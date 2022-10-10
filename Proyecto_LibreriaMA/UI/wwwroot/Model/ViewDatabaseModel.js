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
    descripcionarticulo = { type: "text" };
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
    existenciasarticulounidad = { type: "number" };
    existenciasarticuloorigen = { type: "number" };
    precioventa = { type: "number" };
    preciocompraunidad = { type: "number" };
    nombrearticulo = { type: "text" };
    nombreunidad = { type: "text" };
    idadmimercancias = { type: "number", hidden: true };
    idcompra = { type: "number" };
    iddetallecompra = { type: "number", hidden: true };
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
    nombrearticulo = { type: "text"  };
    preciocompra = { type: "number" };  
    cantidadcompra = { type: "number"  };
    idcompra = { type: "number"  };
    preciocompraunidad = { type: "number", hidden: true   };
    existenciasarticuloorigen = { type: "number"  };
    existenciasarticulounidad = { type: "number"  };
    
   }
   export { ViewDetalleDevolucion }
