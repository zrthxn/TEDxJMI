FROM node AS installer

# --- CONTAINER ENVIRONMENT --- #
WORKDIR /backend
ENV NODE_ENV=production

# --- INSTALL --- #
COPY ./backend/package.json /backend/
RUN npm install

# --- BUILD --- #
FROM installer AS builder

WORKDIR /backend
COPY ./backend /backend
COPY ./backend/.env /backend
RUN npm run build

# --- RUN --- #
EXPOSE 3600
CMD [ "node", "build/Server.js" ]