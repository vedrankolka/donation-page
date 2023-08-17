# Build stage for compiling the Frontend app
FROM node:16.6.1-alpine3.14 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci && npm install react-scripts@4.0.3 -g
COPY . ./
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.24.0-alpine3.17-slim  as final
USER nginx
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
#RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
#COPY ./nginx.conf /etc/nginx/conf.d
# --------- /only for those using react router ----------
# COPY /licenses /app/licenses
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]