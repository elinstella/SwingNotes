# 🗒️ SwingNotes API

Ett säkert och fullständigt backend-API för att hantera användare och deras anteckningar.

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

Alla endpoints (förutom `signup` och `login`) kräver en Bearer Token (JWT) i `Authorization`-headern:

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

Kör följande kommando i terminalen:

```bash
npm test
```

Testfil:  
`tests/notesFlow.test.js`

Alla tester använder `Supertest` för att simulera HTTP-förfrågningar mot appen, och körs mot en temporär testdatabas. Detta säkerställer att:

- API:et fungerar enligt specifikation
- Felhantering fungerar korrekt
- Databasen interagerar som förväntat

### 💡 Exempelutgång

```bash
PASS  tests/notesFlow.test.js
  Fullt API-flöde
    ✓ Skapar en anteckning
    ✓ Hämtar anteckningar
    ✓ Tar bort anteckningen
```

> Dessa tester är en viktig del för att säkerställa kvalitet och stabilitet i backendlösningen.

---

## 🧠 Utvecklat av

Elin Stella Alisdey  
Kurs: Backendutveckling 60 yhp  
Individuell examination – Vecka 23
