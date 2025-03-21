## Descripción General

Crear un formulario que agregue registros a una tabla/cuadrícula, todo en la misma pantalla.

## Requisitos del Formulario

### Campos

- **Nombre** → input (obligatorio) [x]
- **Apellidos** → input (obligatorio) [x]
- **Teléfono** → input (opcional) [x]
- **Email** → input (obligatorio, requiere validación de formato de email) [x]
- **País** → lista desplegable
  - Cargar datos mediante petición GET a: `https://countriesnow.space/api/v0.1/countries/flag/unicode` [x]
  - Solo cargar nombres de países, descartar otros datos [x]
- **Provincia** → lista desplegable
  - Cargar datos mediante petición POST a: `https://countriesnow.space/api/v0.1/countries/states` [x]
  - Formato del cuerpo de la petición: `{ "country": "Spain" }` [x]
  - Solo cargar nombres de estados/provincias, descartar otros datos [x]
  - Cargar solo después de la selección del país [x]
  - Realizar nueva llamada a la API cada vez que cambie el país [x]
- **Botón Agregar** → agrega el registro a la tabla cuando se hace clic[x]

## Opcionales / Añadidos

- Responsabilidad única en varios componentes [x]
- Uso de local Storage para almacenar datos de la tabla [x]
- Testing a diferentes components [x]
- Uso de Assets [x]
- Diseño de css [x]
- Validadores opcionales y errores [x]
- Eliminar datos de la tabla [x]
- Proyecto

## Documentación de la API

Documentación completa de la API disponible en: https://documenter.getpostman.com/view/1134062/T1LJjU52

## Requisitos de la Tabla/Cuadrícula

- Mostrar los mismos campos que el formulario en formato tabular [x]
- El enfoque de implementación es flexible:
  - Desplazamiento horizontal [x]
  - Mostrar solo columnas de nombre y apellido [x]
  - Transformar a vista de lista de tarjetas
  - Otras soluciones creativas son bienvenidas

## Requisitos de Diseño Responsivo [x]

### Vista de Escritorio

- 3 controles por fila [x]

### Vista de Tablet

- 3 controles por fila [x]

### Vista Móvil

- 1 control por fila [x]

## Notas Técnicas

- La elección del framework/bibliotecas es flexible
- Puede implementarse con HTML, CSS y JavaScript plano

### Documentación de AngularJS

- Validadores https://angular.dev/api/forms/Validators

### Comandos del Proyecto

- Instalar paquetes: npm install
- Lanzar proyecto: ng serve
- Build proyecto: ng build
- Crear componente: ng g c components
