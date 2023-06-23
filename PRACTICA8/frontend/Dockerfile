#Se obtiene la imagen de node que se necesita
FROM node:14.20

#Se crea espacio de trabajo
WORKDIR /fapp

#Se copia las dependencias
COPY package.json ./
COPY package-lock.json ./

#Se instala las dependencias
RUN npm install

#Se declaran las variables de entorno
ENV BACK_PORT localhost

#Se copia todo el codigo del front
COPY . .

#Colocar puerto de trabajo
#EXPOSE 3000

#Se ejecuta el frontend
CMD [ "npm", "start" ]