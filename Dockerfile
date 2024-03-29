FROM node:20 as build-stage

WORKDIR /animal-facts-manager

COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:latest

COPY --from=build-stage /animal-facts-manager/dist/animal-facts-manager/browser/ /usr/share/nginx/html

EXPOSE 80
