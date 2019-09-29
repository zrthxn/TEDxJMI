FROM node AS installer

# ----- Installing stage -----
WORKDIR /backend

COPY backend/package*.json ./
RUN npm install

# -----  Building stage -----
FROM installer AS builder

## Environment variables
ENV NODE_ENV=production

COPY backend ./
RUN npm run build

# ----- Run -----
## Running code under slim image
# FROM node:12.0-slim

## Clean new directory
# WORKDIR /server

# COPY --from=builder /backend/build build
CMD [ "node", "build/Server.js" ]

EXPOSE 3600