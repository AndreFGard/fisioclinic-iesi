# ===== Stage 1: Build  react =====
FROM node:20-alpine AS fisioclinic-IESI-builder

WORKDIR /app/fisioclinic-IESI

COPY fisioclinic-IESI/package*.json ./
RUN npm ci

COPY fisioclinic-IESI/ ./
RUN npm run build

# ===== Stage 2: Build backend =====
FROM python:3.13.6-alpine AS backend

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY --from=fisioclinic-IESI-builder /app/fisioclinic-IESI/dist /app/dist
COPY --from=fisioclinic-IESI-builder /app/fisioclinic-IESI/dist /app/backend/dist
EXPOSE 8000
CMD ["uvicorn", "controllers:app", "--host", "0.0.0.0", "--port", "8000"]