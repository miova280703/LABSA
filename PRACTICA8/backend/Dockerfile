#Se obtiene la imagen que necesitamos para le back
FROM golang

#Asignar espacio de trabajo
WORKDIR /bapp

#COPIAR TODOS LOS ARCHIVOS AL WORKDIR
COPY . .

#Instalar modulos de go
RUN go mod download

#Se declaran las variables de entorno
ENV DB_PORT localhost

#Colocar puerto de trabajo
EXPOSE 5000

#Ejecutar servidor en golang
CMD [ "go", "run", "main.go" ]