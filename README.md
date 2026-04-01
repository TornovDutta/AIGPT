# AI GPT  (Full Stack)

## 🚀 Project Overview
A full-stack AI chatbot project with:
- Frontend: React (Create React App) + Tailwind CSS
- Backend: Spring Boot (Java) REST API
- Deployment: Frontend on Vercel, Backend on AWS EC2
- Production URL: https://aigpt-rosy.vercel.app/

This repository contains the frontend client in `src/` and `public/`.
Backend code is assumed in a separate Spring Boot repository or service that serves AI prompt endpoints.

## 🌐 Live Demo
https://aigpt-rosy.vercel.app/

## 🧠 Features
- User chat input + bot response display
- Message history with user/assistant distinction
- REST API integration to Spring Boot backend (question -> answer)
- Modern UI with Tailwind styling

## 🛠️ Local Setup (Frontend)
1. Clone repository

```bash
git clone <your-repo-url>
cd chatgpt-clone
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm start
```

4. Visit

- `http://localhost:3000`

## 🔧 Local Setup (Backend)
Backend is Spring Boot. Common steps:
1. Go to backend project folder
2. Build with Maven/Gradle

```bash
./mvnw clean package
# or
./gradlew clean build
```

3. Run service

```bash
./mvnw spring-boot:run
# or
./gradlew bootRun
```

4. Confirm endpoint is working:

- `http://localhost:8080/api/chat` (example path)

> Update frontend `.env` or config to point to the backend base URL.

## 🧪 Scripts (Frontend)
- `npm start` — dev server
- `npm test` — run tests
- `npm run build` — production build
- `npm run eject` — eject CRA config (irreversible)

## ☁️ Deployment
### Frontend (Vercel)
- Repository connected to Vercel
- `npm run build` output deployed automatically
- Production site: https://aigpt-rosy.vercel.app/

### Backend (AWS EC2)
- Spring Boot app deployed on EC2 instance
- Configure security group (HTTP/HTTPS)
- Keep backend URL in environment variable for frontend usage

## 🔐 Environment Variables
Frontend: `.env` (example)

```env
REACT_APP_API_URL=https://<your-backend-host>/api
```

Backend: `.env` / AWS secrets
- `SPRING_PROFILES_ACTIVE=prod`
- AI model keys (if used)

## 🧹 Notes
- Make sure CORS is enabled in Spring Boot for frontend domain.
- Use HTTPS in production and secrets management.

## 📌 Contribution
1. Fork repo
2. Feature branch
3. PR with summary and tests

## 📝 License
Specify your license (MIT/Apache/etc.) as needed.

