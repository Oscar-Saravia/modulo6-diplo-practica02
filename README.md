# Modulo VI **- DESARROLLO VUE3**

**DOCENTE**: Ing. Sergio Daza Mendoza

**PARTICIPANTE**: Oscar Ramiro Saravia Veizaga

---

## Propósito:

Crear un sistema para la gestion de clientes de un taller de mecánicos, es decir, un sistema donde un administrador podrá registrar clientes, vehículos de clientes, mecánicos y costos de reparación. Los mecánicos podrán ser asignados a un cliente y su vehículo, registrar fecha de entrega, los problemas del vehículo y el costo de reparación.

## Requerimientos:

- Puede utilizar Vue versión 3
- Como mínimo dos entidades y que tengan relación entre sí. ejemplo: producto categoría.
- Para cada entidad deberá realizarse las siguientes acciones: crear, editar, listar, eliminar. Con sus respectivos formularios y tablas
- Contar con un buscador: ejem. productos por nombre
- Contar con un filtro: ejem. productos con precio mayor a 100
- Para generar su backend se usará server-json.

# practice02-mechanic-workshop

## Levantar el servidor/database: 
```
npx json-server --watch database/data.json --port 4000
```

## Instalar las dependencias:
```
npm install
```

## Levantar el servidor: 
```
npm run serve
```