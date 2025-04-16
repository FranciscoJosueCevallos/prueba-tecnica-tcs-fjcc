# Prueba Técnica TCS FJCC

Este proyecto fue desarrollado pensando en la implementación como un microfrontend utilizando `@angular-architects/module-federation`. Todo el desarrollo se realizó siguiendo una arquitectura hexagonal, haciendo uso de inyección de dependencias para garantizar un código modular, escalable y mantenible.

## Descripción del Proyecto

El objetivo principal de este proyecto fue implementar una aplicación siguiendo las mejores prácticas de desarrollo de software, incluyendo:

- **Buenas prácticas de desarrollo**: Se aplicaron principios de Clean Code para garantizar un código legible, entendible y fácil de mantener.
- **Principios SOLID**: Se respetaron los principios SOLID para asegurar un diseño de software robusto y flexible.
- **UI Development (Maquetación)**: La interfaz de usuario fue desarrollada desde cero, sin utilizar frameworks de estilos ni componentes prefabricados, garantizando un diseño personalizado y adaptado a las necesidades del proyecto.
- **Manejo de excepciones**: Se implementó un manejo adecuado de excepciones, mostrando mensajes de error visuales para mejorar la experiencia del usuario.

## Arquitectura Hexagonal

El proyecto sigue una arquitectura hexagonal, también conocida como arquitectura de puertos y adaptadores. Esta arquitectura permite desacoplar el núcleo de la aplicación de las implementaciones externas, facilitando la escalabilidad y el mantenimiento. Los principales componentes de la arquitectura son:

1. **Dominio**: Contiene las reglas de negocio y la lógica principal de la aplicación.
2. **Casos de Uso**: Define los casos de uso y coordina las interacciones entre el dominio y las interfaces externas.
3. **Infraestructura**: Implementa las dependencias externas, como servicios, bases de datos y APIs, mediante Adapters.
4. **Presentación**: Maneja la interacción con el usuario y la visualización de datos.

A continuación, se muestra un diagrama representativo de la arquitectura hexagonal utilizada:

![Arquitectura Hexagonal](https://res.cloudinary.com/practicaldev/image/fetch/s--81bwAlyG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/284s1x8z8lxobmppisva.png)

## Tecnologías Utilizadas

- **Angular**: Framework principal para el desarrollo de la aplicación.
- **@angular-architects/module-federation**: Para la implementación de microfrontends.
- **TypeScript**: Lenguaje principal para el desarrollo del proyecto.
- **Prettier**: Para el formateo del código y mantener un estilo consistente.

## Scripts Disponibles

En el archivo `package.json` se encuentran los siguientes scripts útiles:

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run test`: Ejecuta las pruebas unitarias.
- `npm run format`: Formatea el código utilizando Prettier.
- `npm run run:all`: Inicia el servidor de desarrollo para microfrontends.

## Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd prueba-tecnica-tcs-fjcc
    ```
   2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```