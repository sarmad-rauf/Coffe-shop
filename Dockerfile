FROM node:7             

RUN mkdir -p /app
WORKDIR /app            
COPY package.json /app   
RUN  npm install --save bcrypt-nodejs && npm uninstall --save bcrypt          
COPY . /app       
EXPOSE 4200
CMD ["npm", "run", "start"]
