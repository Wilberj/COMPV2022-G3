class AdministracionMercancias {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idadmimercancias = { type: "number", primary: true };
    idtamanoxarticulo = { type: "number", hidden: true };
    idconvertir = { type: "number", hidden: true };
    preciocompraunidad = { type: "number", hidden: true };
    precioventa = { type: "number" };
    existenciasarticuloorigen = { type: "number", hidden: true };
    existenciasarticulounidad = { type: "number", hidden: true };
    idbodega = { type: "number", hidden: true };

}
export { AdministracionMercancias }
class Articulos {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idarticulo = { type: "number", primary: true };
    nombrearticulo = { type: "text" };
    descripcionarticulo = { type: "text" };
    activo = { type: "checkbox" };
    fechadeingreso = { type: "date" };
    color = { type: "text" };
    idcategoria = { type: "number" };
    idmarca = { type: "number" };
    idmaterial = { type: "number" };
}
export { Articulos }
class ArticulosDanados {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idarticulosdanados = { type: "number", primary: true};
    idtamanoxarticulo = { type: "number", hidden: true  };
    idusuario = { type: "number", hidden: true }; 
    idadmimercancias= { type: "number", hidden: true };
    cantidaddanadaorigen = { type: "number" };
    cantidaddanadaunidad = { type: "number" };
    idbodega = { type: "number" };
    descripcionarticulodanado = { type: "text" };

}
export { ArticulosDanados }
class Bodega {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idbodega = { type: "number", primary: true };
    nombrebodega = { type: "text" };
    Descripcion = { type: "text" };
    activo = { type: "checkbox" };

}
export { Bodega }

//class BodegaxArticulo {
//    constructor(props) {
//        for (const prop in props) {
//            this[prop] = props[prop];
//        }
//    }
//    idbodegaxarticulo = { type: "number", primary: true };
//    idtamanoxarticulo = { type: "number", hidden: true };
//    idbodega = { type: "number", hidden: true };
//    idadmimercancias = { type: "number", hidden: true };
//    existenciasarticuloorigen= { type: "number", hidden: true };
//    existenciasarticulounidad= { type: "number", hidden: true };
//    //Loquemuestralatabla
//    Cantidadorigen = { type: "number" };
//    Cantidadunidad = { type: "number"};
//    //
//    GuardarUnidadOrigen =  { hidden: true  };
//    GuardarUnidad =  { hidden: true  };
//}
//export { BodegaxArticulo }
// class BodegaxArticulo {
//     constructor(props) {
//         for (const prop in props) {
//             this[prop] = props[prop];
//         }
//     }
//     idbodegaxarticulo = { type: "number", primary: true };
//     idarticulo = { type: "number" };
//     idbodega = { type: "number" };
// }
// export { BodegaxArticulo }
class Categoria {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idcategoria = { type: "number", primary: true };
    nombrecategoria = { type: "text" };
    descripcioncategoria = { type: "text" };
    activo = { type: "checkbox" };
}
export { Categoria }
class CompraProductos {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idcompra = { type: "number", primary: true };
    fechacompra = { type: "date" };
    idusuario = { type: "number"};
    idproveedor = { type: "number",  };
    idestado = { type: "number", };
    subtotalcompra = { type: "number" };
    iva = { type: "number" };
    descuentocompra = { type: "number" };
    totalcompra = { type: "number" };
    activo = { type: "checkbox" };


}
export { CompraProductos }
//class Configuracion {
//    constructor(props) {
//        for (const prop in props) {
//            this[prop] = props[prop];
//        }
//    }
//    idconfiguracion = { type: "number", primary: true };
//    nombre = { type: "text" };
//    direccion = { type: "text" };
//    telefono = { type: "number" };
//}
//export { Configuracion }
class ConvertirMedida {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idconvertir = { type: "number", primary: true };
    idunidadmedida = { type: "number" };
    idarticulo = { type: "number" };
    cantidad = { type: "number",hidden: true };
}
export { ConvertirMedida }
class DatosUsuarios {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idusuario = { type: "number", primary: true };
    contrasena = { type: "text" };
    cedula = { type: "text" };
    nombreusuario = { type: "text" };
    apellidousuario = { type: "text" };
    direccionusuario = { type: "text" };
    telefonousuario = { type: "number" };
    email = { type: "text" };
    activo = { type: "checkbox" };
}
export { DatosUsuarios }
class DetalleCompraProductos {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    iddetallecompra = { type: "number", primary: true };
    idcompra = { type: "number", hidden: true  };
    idarticulo = { type: "number", hidden: true  };
    idunidadmedida = { type: "number", hidden: true  };
    idtamano = { type: "number", hidden: true  };
    preciocompra = { type: "number" };
    cantidadcompra = { type: "number" };
    descuentocompra = { type: "number" };
    
}
export { DetalleCompraProductos }
class DetalleFactura {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    cantidaddanadaunidad  = {hidden: true}
    Temporal = {hidden: true}
    iddetallefactura = { type: "number", primary: true };
    idfactura = { type: "number", hidden: true };
    idtamanoxarticulo = { type: "number", hidden: true };
    precioventa = { type: "number" };
    cantidadventa = { type: "number" };
    descuentoventa = { type: "number" };
    Unidad= { hidden: true  };
    UnidadOrigen= {  hidden: true };
}
export { DetalleFactura }
class DetalleDevolucionCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    iddetalledevolucioncompra = { type: "number", primary: true };
    iddevolucioncompra = { type: "number", hidden: true };
    idadmimercancias = { type: "number", hidden: true };
    cantidad = { type: "number" };
    cantidadunidad = { type: "number" };
    descripciondevolucion = { type: "text" };
}
export { DetalleDevolucionCompra }
class DetalleDevolucionVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    iddetalledevolucion = { type: "number", primary: true };
    iddevolucion = { type: "number" };
    idadmimercancias = { type: "number" };
    cantidad = { type: "number" };
    descripciondevolucion = { type: "text" };
}
export { DetalleDevolucionVenta }
class DevolucionCompra {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    iddevolucioncompra = { type: "number", primary: true };
    idproveedor = { type: "number" };
    idcompra = { type: "number" };
    Fechadevolucioncompra = { type: "date" };
}
export { DevolucionCompra }
class DevolucionVenta {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    iddevolucion = { type: "number", primary: true };
    idfactura = { type: "number" };
    Fechadevolucionventa = { type: "date" };
}
export { DevolucionVenta }
class Estado {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idestado = { type: "number", primary: true };
    nombreestado = { type: "text" };
    activo = { type: "checkbox" };
}
export { Estado }
class Factura {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idfactura = { type: "number", primary: true };
    fechafactura = { type: "date" };
    nombrecliente = { type: "text" };
    totalventa = { type: "number" };
    subtotalventa = { type: "number" };
    iva = { type: "number" };
    idusuario = { type: "number" };
    idestado = { type: "number" };
    descuentofactura = { type: "number" };
}
export { Factura }
class Marca {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idmarca = { type: "number", primary: true };
    nombremarca = { type: "text" };
    activo = { type: "checkbox" };
}
export { Marca }
class Proveedor {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idproveedor = { type: "number", primary: true };
    nombreproveedor = { type: "text" };
    telefonoproveedor = { type: "number" };
    descripcionproveedor = { type: "text" };
    activo = { type: "checkbox" };
}
export { Proveedor }
class Tamano {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idtamano = { type: "number", primary: true };
    nombretamano = { type: "text" };
    activo = { type: "checkbox" };
}
export { Tamano }
class TamanoxArticulo {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idtamanoxarticulo = { type: "number", primary: true };
    idtamano = { type: "number" };
    idarticulo = { type: "number" };
}
export { TamanoxArticulo }
class TipoMaterial {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idmaterial = { type: "number", primary: true };
    nombrematerial = { type: "text" };
    activo = { type: "checkbox" };
}
export { TipoMaterial }
class Unidades {
    constructor(props) {
        for (const prop in props) {
            this[prop] = props[prop];
        }
    }
    idunidadmedida = { type: "number", primary: true };
    nombreunidad = { type: "text" };
    descripcionunidad = { type: "text" };
    activo = { type: "checkbox" };
}
export { Unidades }