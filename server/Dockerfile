# Stage 1 - the build process
FROM node:16-alpine as build-deps

WORKDIR /app
COPY . .

ENV PORT=5000
ENV NODE_ENV=development
ENV MONGO_URI=mongodb+srv://Ruslan_Horyn:IQrZrmScCrdfb7Mn@projectit.jfzmp.mongodb.net/ProjectIT?retryWrites=true&w=majority
ENV JWT_SECRET=IQrZrmScCrdfb7Mn

RUN npm install -g npm@8.15.0
RUN npm ci

EXPOSE 5000

CMD ["npm", "start"] 