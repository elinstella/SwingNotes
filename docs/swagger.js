const swaggerJsDoc = {
    openapi: '3.0.0',
    info: {
      title: 'SwingNotes API',
      version: '1.0.0',
      description: 'API för att hantera användare och anteckningar',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      '/api/user/signup': {
        post: {
          tags: ['User'],
          summary: 'Skapa konto',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'password'],
                  properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Användare skapad' },
            400: { description: 'Ogiltig input' },
          },
        },
      },
      '/api/user/login': {
        post: {
          tags: ['User'],
          summary: 'Logga in och få JWT',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['username', 'password'],
                  properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Inloggad' },
            401: { description: 'Felaktiga uppgifter' },
          },
        },
      },
      '/api/notes': {
        get: {
          tags: ['Notes'],
          summary: 'Hämta anteckningar',
          responses: {
            200: { description: 'Lista av anteckningar' },
          },
        },
        post: {
          tags: ['Notes'],
          summary: 'Skapa ny anteckning',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'text'],
                  properties: {
                    title: { type: 'string', maxLength: 50 },
                    text: { type: 'string', maxLength: 300 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Anteckning skapad' },
            400: { description: 'Fel i inmatning' },
          },
        },
        put: {
          tags: ['Notes'],
          summary: 'Uppdatera en anteckning',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id', 'title', 'text'],
                  properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    text: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Anteckning uppdaterad' },
            404: { description: 'Anteckning hittades inte' },
          },
        },
        delete: {
          tags: ['Notes'],
          summary: 'Radera anteckning',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id'],
                  properties: {
                    id: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Anteckning raderad' },
            404: { description: 'Anteckning hittades inte' },
          },
        },
      },
      '/api/notes/search': {
        get: {
          tags: ['Notes'],
          summary: 'Sök anteckningar på titel',
          parameters: [
            {
              name: 'title',
              in: 'query',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: { description: 'Matchande anteckningar' },
            400: { description: 'Sökord saknas' },
          },
        },
      },
    },
  };
  
  module.exports = swaggerJsDoc;
  