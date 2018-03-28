FROM node:latest
 
COPY ./package.json /
#COPY broadcast.js /root
#COPY mouse.html /root
 
RUN npm config set proxy http://172.16.1.4:81/
RUN npm config set https-proxy http://172.16.1.4:81/
 
RUN npm install express             
RUN npm install ws             
 
EXPOSE 8080
EXPOSE 80

# needs this to find the nodejs exec
ENTRYPOINT ["/usr/local/bin/nodejs", "/root/broadcast.js"]


