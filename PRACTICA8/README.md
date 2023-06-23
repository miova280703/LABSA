# <center>[SOPES1] PRÁCTICA 1 </center>

#### <center> DATOS DEL ESTUDIANTE </center>
<center> Nombre: Claudia Iovana Miranda Alvare </center>

<center> Carné: 20170037 </center>

---
<br>

## <center> OBJETIVOS DE LA PRÁCTICA 1 </center>

* Comprender cómo funcionan los contenedores.
* Utilizar virtualización por hardware.
* Practicar comandos de Docker.
* Implementar Docker-Compose.
* Generar persistencia de datos mediante Docker Volume.
* Emplear docker hub para descargar y publicar imagenes en Docker Hub.


## <center> DESCRIPCIÓN DE LA PRÁCTICA 1 </center>
En esta practica se solicita implementar una aplicación, la cual contará con un frontend, backend y una base de datos. Esta aplicación será desplegada mediante el uso de contenedores. Además, se solicita utilizar virtualización por hardware por ello el desarrollo de la aplicación deberá hacerse utilizando el hipervisor de tipo 1 KVM.

## <center> REQUERIMIENTOS DEL SISTEMA </center>
#### SISTEMA OPERATIVO COMPATIBLE
### MEMORIA RAM
### LENGUAJES DE PROGRAMACION
### IDE DE PROGRAMACION

## <center> TECNOLOGÍAS UTILIZADAS </center>

|TECNOLOGÍA|DESCRIPCION|IMAGEN|
|----------|-----------|------|
|KVM [Kernel Virtual Machine]| <p style='text-align: justify;'>Es una tecnología de virtualización open source integrada a Linux. Puede convertir a Linux en un hipervisor que permite que una máquina host ejecute varios entornos virtuales aislados llamados máquinas virtuales.</p> |![logo kvm](https://res.cloudinary.com/ingenieria/image/upload/v1661130191/sopes1/practica1/ebqi0WMoIvy4GmvnSmE5iIVkG8tpXqrPQzryGuNfRwVZo6rYpO63CW4CMVVkBq60Ym3sY919Z6jEeu-nGbEP5jmWda8gyU3-vL7zFgHxwwiUwru5f9tf_eEMk9SnIoFmcXcLaaI3_s0_z1symc.png)|
|DOCKER|<p style='text-align: justify;'>Docker es un proyecto de código abierto para automizar la implementacion de aplicaciones como contenedores portátiles y autosuficientes que se pueden ejecutar en la nube o de manera local.</p>|![logo docker](https://res.cloudinary.com/ingenieria/image/upload/v1661130529/sopes1/practica1/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d_tns73c.png)|
|DOCKER-COMPOSE|<p style='text-align: justify;'>Docker Compose es una herramienta dedicada a la orquestación local de dockers, es decir, se utiliza para definir y ejecutar las aplicaciones Docker de varios contenedores.</p>|![logo docker compose](https://res.cloudinary.com/ingenieria/image/upload/v1661130654/sopes1/practica1/docker-compose-logo_mjzegx.png)|
|MONGODB|<p style='text-align: justify;'>MongoDB es una base de datos de documentos que ofrede una gran escalabilidad y flexibilidad. Además de un modelo de consultas e indezación avanzado.</p>|![logo mongodb](https://res.cloudinary.com/ingenieria/image/upload/v1661130779/sopes1/practica1/mongodb_g62bxs.png)|
|REACT|<p style='text-align: justify;'>React es una librería open source de JavaScript para desarrollar interfaces de usuario. Fue lanzanda en 2013 por Facebook.</p>|![logo react](https://res.cloudinary.com/ingenieria/image/upload/v1661131017/sopes1/practica1/1_80dwUDuQ8m6jifVXUA_4JQ_vny9ee.png)|
|GOLANG|<p style='text-align: justify;'>Golang es un lenguaje de programación open source. Go comenzó como un estándar interno de codificación para mejorar las concurrencias de otros lenguajes, reveló un gran potencial para convertirse en uno de los lenguajes de programación favoritos del futuro, debido a que es muy eficient, escalable y productivo.</p>|![logo golang](https://res.cloudinary.com/ingenieria/image/upload/v1661131345/sopes1/practica1/800px-Go_Logo_Blue.svg_z0gfyg.png)|
|FIBER|<p style='text-align: justify;'>Fiber es un framework de Golang, inspirado en Express de Nodejs, uno de los más utilizados para construir API web.</p>|![logo fiber](https://res.cloudinary.com/ingenieria/image/upload/v1661136874/sopes1/practica1/1_vZ-Xj3QZQ_rqOOTnzdPgiQ_tejp6k.png)|


## <center> COMPONENTES DE LA PRÁCTICA </center> 
### **FRONTEND**

Para la visualizacion gráfica se realizó el una carpeta en la raíz de la practica con el nombre de *frontend*, en la cual se encuentra el proyecto de react, los diversos componentes que forman la interfaz de usuario final.
En la carpeta **src** hay dos carpetas importantes que son las siguientes:

* Componentes: Dentro de esta carpeta se puede encontrar la tabla y el menu bar utilizados en la interfaz.
* Utils: dentro de esta carpeta se encuenta un archivo .js en donde se encuentra la variable global que guarda la ip del ubuntu server instalado en kvm para poder consumir los endopoints del backend.

Los método más importantes del frontend son los siguientes:

- FiltrarBusqueda: Con este metodo se consumen los endpoints correspondientes al filtro aplicado. Si se desea buscar por marca el valor de age es 10, si se desea buscar por modelo el valor de age es 20 y si se desea buscar por color el valor de age es 30.

![frontfiltro](https://res.cloudinary.com/ingenieria/image/upload/v1661132174/sopes1/practica1/28da3eed-d9ad-4b94-a9ef-7eecabcc1835_veqz40.jpg)

- RegistrarCarro: En este metodo se envía los valores ingresados por el usuario en formato json al backend para que estos puedan ser almacenados en la base de datos.

![frontregistro](https://res.cloudinary.com/ingenieria/image/upload/v1661132360/sopes1/practica1/25f9846e-24e2-46cd-9f22-c688e991cb60_fjh4sm.jpg)

- LlenarTabla: Con este metodo se obtiene todos los carros ingresados en la colección Car. Al obtener todos los registros, se puede llenar una tabla para que el usuario los pueda visualizar, editar, modificar o filtrar para buscar.

![fronttabla](https://res.cloudinary.com/ingenieria/image/upload/v1661132555/sopes1/practica1/e2973d33-9e7b-4d97-9121-6bf2b47fdc1e_x59q9z.jpg)

- ModificarCarros: Con este metodo se actualiza la infromación almacenada por el usuario. El id del carro a modificar es enviado al backend por medio de la ruta como un parametro de esta, y la información actualizada es enviada en formato json.

![frontmodificar](https://res.cloudinary.com/ingenieria/image/upload/v1661132742/sopes1/practica1/22bce230-641a-4db8-8db4-b5695fde2484_kz0srf.jpg)

- EliminarCarro: Con este metodo se actualiza la infromación almacenada por el usuario. El id del carro a eliminar es enviado al backend por medio de la ruta como un parametro de esta.

![fronteliminar](https://res.cloudinary.com/ingenieria/image/upload/v1661132783/sopes1/practica1/bd9e5d69-b210-4604-8fac-792b60d667ab_y4q0v7.jpg)

La variable **globlals** es utilizada para guardar la ip de nuestra maquina virtualizada en KVM, de esa manera poder acceder a nuestra aplicación virtualizada desde nuestra maquina host y poder consumirla sin ningun problema.

![globals](https://res.cloudinary.com/ingenieria/image/upload/v1661133228/sopes1/practica1/d69b0aa9-265c-4ec8-bef4-81c32d8d0ae9_zt6t7o.jpg
)
### **BACKEND**

Para realizar la conexión y la comunicación de la aplicación con la base de datos se crea en la raiz de la practica una carpeta con el nombre backend. En la cual se encuentra un archivo .go, en donde se encuentra el servidor, las peticiones y conexion a la base de datos. 
Para la creacion del servidor con go, se utilizó la librería fiber.

Con el siguiente metodo se realiza la conexión a la base de datos:

![conexion](https://res.cloudinary.com/ingenieria/image/upload/v1661134581/sopes1/practica1/conexion_zev76g.jpg)

Se utiliza la variable de entorno ***DB_PORT*** para colocar la dirección a la que se debe de conectar el backend con la base de datos.

Los endpoints creados para la practica son los siguientes:

* /obtenerCarros: Con este endpoint se obtienen todos los carros de la coleeción que tiene la base de datos.

![backobtener](https://res.cloudinary.com/ingenieria/image/upload/v1661134641/sopes1/practica1/obtenerCarros_xueju7.jpg)

* /crearCarro: Con este endpoint se inserta un nuevo carro a la base de datos.

![backcrear](https://res.cloudinary.com/ingenieria/image/upload/v1661134591/sopes1/practica1/crearCarro_mqic6k.jpg)

* /edtiarCarro/:id: Con este endopoint se edita el carro cuyo id fue enviado por la url.

![backeditar](https://res.cloudinary.com/ingenieria/image/upload/v1661134601/sopes1/practica1/editar_lqc4ln.jpg)

* /eliminarCarro/:id: Con este endopoint se elimina el carro cuyo id fue enviado por la url.

![backeliminar](https://res.cloudinary.com/ingenieria/image/upload/v1661134611/sopes1/practica1/eliminarCarro_as9ilw.jpg)

* /filtrarCarroMarca/:marca, /filtrarCarroModelo/:modelo, /filtrarCarroColor/:color: Con estos endopoints se realizan los filtros de busqueda para los carros.

![backfiltro](https://res.cloudinary.com/ingenieria/image/upload/v1661134621/sopes1/practica1/filtros_bryj1g.jpg)

* /guardarActividad: Con este endpoint se almacena el registro de activdiades que el usuario realiza en la aplicación.

![backguardar](https://res.cloudinary.com/ingenieria/image/upload/v1661134631/sopes1/practica1/guardaractividad_qi7sik.jpg)

### **BASE DE DATOS**

La base utilizada se corrió desde un contenedor de docker. 
El nombre de la base datos creada para la practica es Carros.

El formato de los archivos json que se envian a la base de datos es el siguiente:

![formato](https://res.cloudinary.com/ingenieria/image/upload/v1661135646/sopes1/practica1/jsons_d3altp.jpg)

### **DOCKER FILE**

Para crear las imagenes tanto del backend como del frontend para poder ejecutar nuestra aplicacion en contenedores, se crean los dockerfiles correspondientes.

**DOCKERFILE BACKEND**

![docker_back](https://res.cloudinary.com/ingenieria/image/upload/v1661136405/sopes1/practica1/dockerback_s3aovc.jpg)

**DOCKERFILE FRONTEND**

![docker_front](https://res.cloudinary.com/ingenieria/image/upload/v1661136425/sopes1/practica1/dockerfront_dgzqnz.jpg)

### **DOCKER-COMPOSE**

Para poder correr nuestra aplicación en nuestra ubuntu server virtualizado, se crear el archivo docker-compose.yml para que este pueda correr todos los contenedores de nuestra aplicacion.

![docker-compose](https://res.cloudinary.com/ingenieria/image/upload/v1661136415/sopes1/practica1/dockercompose_igsmlr.jpg)
