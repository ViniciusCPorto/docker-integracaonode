#De qual versão eu quero usar o node
FROM node:13.6.0 

#Diretório da maquina que está usando, onde você está trabalhando
WORKDIR /usr/app/

#realiza a copia de todos os arquivos que contém no caso a palavra "package" e termina com "json"
COPY ./integracao.nodejs/mp-ecommerce-nodejs/package*.json /usr/app/

#Rodar o npm install
RUN npm install

#Copiar todo o restante dos arquivos 
COPY . .

#A porta que o servidor esta expondo para acessar
EXPOSE 3000

#Propriedade única por dockrfile, proprieda que indica qual o comando para startar
CMD ["npm", "run", "start.dev"]