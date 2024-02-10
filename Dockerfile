FROM node:20 as build-stage

WORKDIR /animal-facts-manager

COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /animal-facts-manager/dist/animal-facts-manager/ /usr/share/nginx/html

EXPOSE 80
