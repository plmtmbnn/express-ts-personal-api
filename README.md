# Express TypeScript REST API

A simple RESTful API built with Express.js, TypeScript, and pnpm.

## 🚀 Features

- Express.js + TypeScript
- Organized route/controller structure
- CORS enabled
- Ready for pnpm
- API endpoints:
  - `GET /api/hello` → returns JSON greeting
  - `POST /api/hello/echo` → echoes JSON body

---

## ⚡ Setup

### 1️⃣ Clone the repo

```bash
git clone <your-repo-url>
cd express-ts-api
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Run in development

```bash
pnpm dev
```
App will run at `http://localhost:3000`

---

## 🔨 Build & Run production

```bash
pnpm build
pnpm start
```

---

## 🌐 Example requests

### GET /api/hello

```bash
curl http://localhost:3000/api/hello
```

### POST /api/hello/echo

```bash
curl -X POST http://localhost:3000/api/hello/echo \
-H "Content-Type: application/json" \
-d '{"name": "Polma"}'
```

---

## 📝 Project structure

```
src/
├── controllers/
│   └── hello.controller.ts
├── routes/
│   ├── index.ts
│   └── hello.routes.ts
├── app.ts
└── index.ts
```

---

## 📄 License

MIT