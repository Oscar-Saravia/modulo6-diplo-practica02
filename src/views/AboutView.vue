<template>
  <div class="about">
    <h1>About This Project</h1>
    
    <section>
      <h2>Módulo VI - Desarrollo Vue 3</h2>
      <p><strong>Docente:</strong> Ing. Sergio Daza Mendoza</p>
      <p><strong>Participante:</strong> Oscar Ramiro Saravia Veizaga</p>
    </section>

    <section>
      <h2>Propósito</h2>
      <p>
        Crear un sistema para la gestión de clientes de un taller de mecánicos, es decir, un sistema donde un administrador podrá registrar clientes, vehículos de clientes, mecánicos y costos de reparación. Los mecánicos podrán ser asignados a un cliente y su vehículo, registrar fecha de entrega, los problemas del vehículo y el costo de reparación.
      </p>
    </section>

    <section>
      <h2>Requerimientos</h2>
      <ul>
        <li>Puedes utilizar Vue versión 3</li>
        <li>Como mínimo, dos entidades que tengan relación entre sí. Ejemplo: producto y categoría.</li>
        <li>
          Para cada entidad, deberá realizarse las siguientes acciones:
          <ul>
            <li>Crear</li>
            <li>Editar</li>
            <li>Listar</li>
            <li>Eliminar</li>
          </ul>
          Con sus respectivos formularios y tablas.
        </li>
        <li>Contar con un buscador: Ejemplo, productos por nombre.</li>
        <li>Contar con un filtro: Ejemplo, productos con precio mayor a 100.</li>
        <li>Para generar su backend se usará `json-server`.</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

h1, h2 {
  color: #333;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
  line-height: 1.6;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  margin-bottom: 5px;
}

section {
  margin-bottom: 20px;
}
</style>
