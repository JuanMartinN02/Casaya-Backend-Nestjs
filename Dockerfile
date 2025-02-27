# Usa una imagen optimizada de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias necesarias, incluidas las dependencias de desarrollo
RUN npm install 

# Instala @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del código
COPY . .

# Construye la aplicación y elimina dependencias innecesarias
RUN npm run build && npm prune --omit=dev

# Expone el puerto (Railway asigna un puerto dinámico)
EXPOSE 3000

# Comando para iniciar la API en modo producción
CMD ["npm", "run", "start:prod"]
