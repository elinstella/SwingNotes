# 🗒️ SwingNotes API

![Run Backend Tests](https://github.com/elinstella/SwingNotes/actions/workflows/tests.yml/badge.svg?branch=main)

> Ett säkert och fullständigt backend-API för att hantera användare och deras anteckningar.

---

## ⚙️ Installation

1. **Klona projektet**

   ```bash
   git clone https://github.com/<användarnamn>/<repo-namn>.git
   cd <repo-namn>
   ```

2. **Installera beroenden**

   ```bash
   npm install
   ```

3. **Skapa `.env`-fil**  
   Lägg till en `.env`-fil i projektroten med följande variabler:

   ```env
   DB_NAME=swingnotes_db
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   JWT_SECRET=din_hemliga_nyckel
   ```

4. **Starta utvecklingsservern**
   ```bash
   node server.js
   ```

> Servern körs på: `http://localhost:3000`  
> Swagger-dokumentation finns på: `http://localhost:3000/api-docs`

---

## 🚀 Funktioner

- Skapa & logga in användare med JWT-autentisering
- CRUD för anteckningar (skapa, hämta, uppdatera, ta bort)
- Sök anteckningar baserat på titel
- Hashning av lösenord med bcryptjs
- PostgreSQL via Sequelize ORM
- Dokumentation via Swagger UI

---

## 🔧 Teknologier

- Node.js
- Express.js
- PostgreSQL + Sequelize
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Swagger (swagger-ui-express)

---

## 🔑 Autentisering

Alla endpoints (förutom `signup` och `login`) kräver en Bearer Token (JWT) i `Authorization`-headern.

---

## 🛣️ API Endpoints

| Metod  | Endpoint                           | Beskrivning                       |
| ------ | ---------------------------------- | --------------------------------- |
| POST   | `/api/user/signup`                 | Skapa konto                       |
| POST   | `/api/user/login`                  | Logga in och få JWT-token         |
| GET    | `/api/notes`                       | Hämta alla anteckningar (skyddad) |
| POST   | `/api/notes`                       | Skapa anteckning (skyddad)        |
| PUT    | `/api/notes`                       | Uppdatera anteckning (skyddad)    |
| DELETE | `/api/notes`                       | Radera anteckning (skyddad)       |
| GET    | `/api/notes/search?title=<sökord>` | Sök anteckningar (skyddad)        |

---

## 🧪 Testning

Thunder Client eller Postman rekommenderas för att testa API:et.

---

## 📘 Swagger UI

All dokumentation är tillgänglig på:  
👉 `http://localhost:3000/api-docs`

---

## 🗄️ Databasmodell

### Users

| Fält      | Typ             |
| --------- | --------------- |
| id        | integer (PK)    |
| username  | string          |
| password  | string (hashad) |
| createdAt | date            |
| updatedAt | date            |

### Notes

| Fält       | Typ              |
| ---------- | ---------------- |
| id         | integer (PK)     |
| title      | string (max 50)  |
| text       | string (max 300) |
| userId     | FK till Users    |
| createdAt  | date             |
| modifiedAt | date             |
| updatedAt  | date             |

---

## ✅ Enhetstestning (Jest + Supertest)

Applikationen innehåller en testfil som verifierar ett komplett API-flöde:

- Skapa anteckning
- Hämta anteckningar
- Radera anteckning

### 🧪 Köra tester

```bash
npm test
```

> Testfil: `tests/notesFullFlow.test.js`

---

## 🧠 Utvecklat av

Elin Stella Alisdey  
Kurs: Backendutveckling 60 yhp  
Individuell examination – Vecka 23
