const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const User = require('../models/User');
const Note = require('../models/Note');

let token = '';
let createdNoteId = '';

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app)
    .post('/api/user/signup')
    .send({ username: 'testuser', password: 'testpass' });

  const res = await request(app)
    .post('/api/user/login')
    .send({ username: 'testuser', password: 'testpass' });

  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('🧪 Fullständigt API-flöde', () => {
  it('❌ Skapa anteckning utan token → 401', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Saknar token', text: 'Ej godkänd' });

    expect(res.statusCode).toBe(401);
  });

  it('❌ Skapa anteckning utan titel → 400', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Endast text' });

    expect(res.statusCode).toBe(400);
  });

  it('✅ Skapa anteckning', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Testtitel', text: 'Detta är testinnehåll' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Testtitel');
    createdNoteId = res.body.id;
  });

  it('✅ Hämta anteckningar', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('✅ Sök anteckning med "Testtitel"', async () => {
    const res = await request(app)
      .get('/api/notes/search?title=Testtitel')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].title).toContain('Testtitel');
  });

  it('✅ Uppdatera anteckning', async () => {
    const res = await request(app)
      .put('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: createdNoteId, title: 'Uppdaterad titel', text: 'Nytt innehåll' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Uppdaterad titel');
  });

  it('✅ Ta bort anteckningen', async () => {
    const res = await request(app)
      .delete('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: createdNoteId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Anteckning raderad');
  });

  it('❌ Ta bort redan borttagen anteckning → 404', async () => {
    const res = await request(app)
      .delete('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: createdNoteId });

    expect(res.statusCode).toBe(404);
  });
});
