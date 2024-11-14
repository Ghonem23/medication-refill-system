FROM node:14


WORKDIR /app

COPY medication-refill-frontend/package.json medication-refill-frontend/package-lock.json /app/

RUN npm install

COPY medication-refill-frontend /app

EXPOSE 3000
CMD ["npm", "start"]