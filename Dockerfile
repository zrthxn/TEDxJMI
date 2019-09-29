FROM node AS installer

# ----- Installing stage -----
WORKDIR /backend

COPY backend/* ./
RUN npm install

# -----  Building stage -----
## Environment variables
ENV NODE_ENV=production

RUN npm run build

# ----- Run -----
CMD [ "node", "build/Server.js" ]
EXPOSE 3600