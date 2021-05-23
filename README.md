# BreakingChars

## Instalación y ejecución del proyecto

```bash
npm install

npm start
```

> Abrir versión de desarrollo en http://localhost:4200

## Descripción

Web que carga un listado de personajes de breaking bad, al hacer click en la imagen de alguno de los personajes, se navegará hacia una página de detalle donde se mostrará toda la información de dicho personaje y una frase célebre ( en caso de que tenga alguna ) al azar cada vez que entremos a la página de detalle de un personaje.

Se puede cambiar el Idioma entre Español e Inglés lo que cambiará los textos propios de la aplicación.


En la aplicación se utilizan las siguientes librerías:

### [Angular Material](https://material.angular.io/guide/getting-started)
Se utiliza varios de sus componentes visuales, como puede ser el selector de idioma, botones, iconos, etc...
Cada uno de los módulos importa únicamente los modulos de material que necesita para pintar su contenido, esto nos permite que cuando hacemos una carga "perezosa" (lazy load), cada uno de los módulos solo contenga lo que necesita y nunca componente de más

### [NgRx](https://ngrx.io/docs)
Se utiliza para manejar el estado de la aplicación, en concreto [NgRx Entity](https://ngrx.io/guide/entity) para manejar la colección de personajes, para un aplicación de este tamaño sería más recomendable utilizar servicios custom con BehaviorSubject manejando el listado de personajes o otras librerías más ligeras como pudiese ser [Akita](https://github.com/datorama/akita) 

### [ngx-translate](https://github.com/ngx-translate/core)
Para la internacionalización se utiliza ngx-translate, puesto que una de sus ventajas es el poder cambiar el idioma en tiempo de ejecución lo que da cierta versatilidad.

### [ngx-toastr](https://github.com/scttcper/ngx-toastr)
Para mostrar los mensajes de error en forma de toast, se utiliza ngrx-toastr ya que tiene una configuración muy sencilla.

### Composición de la aplición
La aplicación se compone por 3 módulos, core, character y character-detail.

1. CoreModule: Es un módulo donde se inicializan todas los módulos de 3ros y se configuran para su uso, este módulo se carga explicitamente y exclusivamente en AppModule.
2. Characters Module: Es un módulo de feature, este es cargado por lazy load al cargar la ruta raíz, este módulo contiene todo lo relacionado con personajes, servicio de acceso a datos (Http), modelos, componentes y su definición de estado para manejar los personajes.
3. Characters-detail: Es un módulo que contiene la vista de detalle de personajes, aquí se podría decidir si esto podría ser simplemente una serie de componentes dentro de Characters o si por el contrario al utilizar una ruta propia separarse como se ha hecho en este proyecto.

### Testing
Se han realizado test unitarios con jasmine junto con [spectator](https://github.com/ngneat/spectator) para hacer uso de la configuración de test sin necesidad de Testbed muy cómodo para hacer testing, de componentes, servicios directivas, etc...
También se ha utilizado jasmine-marbles para testear ciertas funcionalidades como los Effect de NgRx

### CI y CD
Se han configurado Github actions para realizar el CI y CD de todo lo que se suba al repositorio, por un lado cada vez que se crea un pull request a la rama principial (main) se lanza la acción de CI, que hará pasar todos los test de la aplicación y un build de producción, en el caso de que alguna de esas acciones falle no permitirá hacer merge a la rama principal.
Por otro lado cuando se mergea una rama a la principal, se hace un despliegue en la rama gh-pages de la build de producción.
Se puede ver la última versión de la aplicación desplegada en gh-pages https://jalcantara90.github.io/breaking-chars/

### Próximos pasos
Un gran mejora sería añadir capacidades de PWA con un service worker, capaz de cachear tanto las llamadas a la API como las imágenes de forma que la carga sea más rápida, también poder sustituir las imágenes que puedan fallar al descargarse y devolver al cliente una por defecto.

También sería adecuado usar un SVG para el logo principal y no cargarlo mediante un tag img, otra posibilidad sería crearlo directamente con CSS ya que es un logo bastante simple.
