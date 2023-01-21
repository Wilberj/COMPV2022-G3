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
    idtamanoxarticulo = { type: "number", hidden: true };
    descripcionarticulo = { type: "text", hidden: true };
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
    precioventatemporal = { hidden: true };
    NuevaMercancia = { hidden: true };
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
    existenciasarticulounidadtempotempo = { type: "number", hidden: true };
    variable = { type: "number", hidden: true };
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
    existenciasarticulounidad = { type: "number", hidden: true };

}
export { ViewDetalleDevolucion }

class ViewListArticuloVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }

    idadmimercancias = { type: "number", hidden: true };
    idtamanoxarticulo = { type: "number", hidden: true };
    precioventa = { type: "number" };
    existenciasarticuloorigen = { type: "number" };
    UnidadxOrigen = { type: "number", hidden: true };
    existenciasarticulounidad = { type: "number" };
    nombrearticulo = { type: "text" };
    nombremarca = { type: "text" };
    preciocompraunidad = { type: "number", hidden: true };
}
export { ViewListArticuloVenta }
class viewdevolventa {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idfactura = { type: "number", primary: true };
    fechafactura = { type: "date" };
    nombrecliente = { type: "text" };
    idusuario = { type: "number" };
    nombreusuario = { type: "text" };
    activo = { type: "checkbox" };

}
export { viewdevolventa }
class viewDetalleDevolucionVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idadmimercancias = { type: "number", primary: true };
    nombrearticulo = { type: "text" };
    idtamanoxarticulo = { type: "number", hidden: true };
    idfactura = { type: "number" };
    existenciasarticuloorigen = { type: "number", hidden: true };
    existenciasarticulounidad = { type: "number", hidden: true };
    precioventa = { type: "number", hidden: true };
    iddetallefactura = { type: "number", hidden: true };
    cantidadventa = { type: "number" };
    activo = { type: "checkbox", hidden: true };


}
export { viewDetalleDevolucionVenta }

class ViewGestionArticulos {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombrearticulo = { type: "text" };
    nombretamano = { type: "text" };
    descripcionarticulo = { type: "text" };
    idtamano = { type: "number", hidden: true };
    idarticulo = { type: "number" };
    idtamanoxarticulo = { type: "number", hidden: true };
    nombremarca = { type: "text" };
    activo = { type: "checkbox" };
    fechadeingreso = { type: "date", hidden: true };
    color = { type: "text" };
    idcategoria = { type: "number", hidden: true };
    idmarca = { type: "number", hidden: true };
    idmaterial = { type: "number", hidden: true };

}
export { ViewGestionArticulos }
class ViewGestionUsuarios {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombreusuario = { type: "text" };
    contrasena = { type: "text" };
    email = { type: "text" };
    descripcion = { type: "text", hidden: true };
    idusuario = { type: "number", hidden: true };
    telefonousuario = { type: "number" };
    cedula = { type: "text", hidden: true };
    apellidousuario = { type: "text" };
    direccionusuario = { type: "text" };
    idroles = { type: "number", hidden: true };
    Roles = { hidden: true };
    activo = { type: "checkbox" };
    nombrecategoria = { type: "text" };
}
export { ViewGestionUsuarios }

class ViewDevolucionesCompras {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    iddevolucioncompra = { type: "number" };
    idproveedor = { type: "number" };
    Fechadevolucioncompra = { type: "text" };
    descripciondevolucion = { type: "text" };
    idcompra = { type: "number" };
    nombreproveedor = { type: "text" };
}
export { ViewDevolucionesCompras }
class Viewdevoldetallecompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    //iddetalledevolucioncompra = { type: "number",};
    iddetallecompra = { type: "number" };
    iddevolucioncompra = { type: "number" };
    idcompra = { type: "number" };
    iddetallecompra = { type: "number", hidden: true };
    preciocompra = { type: "number" };
    nombrearticulo = { type: "text" };
    cantidadcompra = { type: "number" };

}
export { Viewdevoldetallecompra }
class Viewbackcompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    iddetallecompra = { type: "number", hidden: true };
    idcompra = { type: "number", hidden: true };
    idarticulo = { type: "number", hidden: true };
    preciocompra = { type: "number" };
    cantidadcompra = { type: "number" };
    nombrearticulo = { type: "text" };
    idtamanoxarticulo = { type: "number", hidden: true };
    nombretamano = { type: "text" };
    nombremarca = { type: "text" };
    idconvertir = { type: "number", hidden: true };
    nombreunidad = { type: "text" };


}
export { Viewbackcompra }

class ViewDevolDetalleVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombrearticulo = { type: "text" };
    idtamanoxarticulo = { type: "number", hidden: true };
    idadmimercancias = { type: "number", hidden: true };
    cantidad = { type: "number" };
    idfactura = { type: "number" };
    iddetallefactura = { type: "number", hidden: true };
    iddevolucionventa = { type: "number" };

}
export { ViewDevolDetalleVenta }

class ViewDevolucionComprac {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombreproveedor = { type: "text" };
    nombreusuario = { type: "text" };
    fechacompra = { type: "date" };
    idcompra = { type: "number" };
    idproveedor = { type: "number", hidden: true };
    activo = { type: "checkbox" };
    totalcompra = { type: "number" };

}
export { ViewDevolucionComprac }

class VerDetalleCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombrearticulo = { type: "text" };
    Unidades = { type: "text", hidden: true };
    Articulos = { type: "text", hidden: true };
    ConvertMedida = { type: "text", hidden: true };
    Tamanos = { type: "text", hidden: true };
    AdminMercanciaComp = { type: "text", hidden: true };
    activo = { type: "text", hidden: true };
    idarticulo = { type: "number" };
    preciocompra = { type: "number" };
    cantidadcompra = { type: "number" };
    idcompra = { type: "number" };
    iddetallecompra = { type: "number" };
    preciocompraunidad = { type: "number", hidden: true };
    descuentocompra = { type: "number", hidden: true };
    existenciasarticuloorigen = { type: "number", hidden: true };
    existenciasarticulounidad = { type: "number", hidden: true };

}
export { VerDetalleCompra }

class ViewTableDetalleVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    nombrearticulo = { type: "text" };
    idadmimercancias = { type: "text", hidden: true };
    idtamanoxarticulo = { type: "text", hidden: true };
    ConvertMedida = { type: "text", hidden: true };
    activo = { type: "text", hidden: true };
    nombretamano = { type: "text" };
    idarticulo = { type: "number" };
    precioventa = { type: "number" };
    cantidadventa = { type: "number" };
    nombremarca = { type: "text" };
    idfactura = { type: "number", hidden: true };
    iddetallefactura = { type: "number", hidden: true };
    preciocompraunidad = { type: "number", hidden: true };
    existenciasarticuloorigen = { type: "number", hidden: true };
    existenciasarticulounidad = { type: "number", hidden: true };

}
export { ViewTableDetalleVenta }


class ViewListFactura {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idfactura = { type: "number" };
    fechafactura = { type: "date" };
    nombrecliente = { type: "text" };
    idusuario = { type: "number", hidden: true };
    nombreusuario = { type: "text" };
    activo = { type: "checkbox" };
    totalventa = { type: "number" };
}
export { ViewListFactura }
