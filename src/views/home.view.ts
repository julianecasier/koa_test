interface Route {
  path: string;
  methods: string[];
}

interface HomePageData {
  port: string;
  systemRoutes: {
    path: string | RegExp;
    methods: string[];
  }[];

}

export const renderHomePage = (data: HomePageData): string => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API - Routes disponibles</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 2rem;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }
        .header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .header p {
          opacity: 0.9;
          font-size: 1.1rem;
        }
        .section {
          padding: 2rem;
        }
        .section h2 {
          color: #333;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          border-bottom: 2px solid #667eea;
          padding-bottom: 0.5rem;
        }
        .route-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .route-item {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 1rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .route-item:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }
        .route-path {
          font-family: 'Courier New', monospace;
          font-size: 1.1rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .route-methods {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .method-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .method-get { background: #28a745; color: white; }
        .method-post { background: #007bff; color: white; }
        .method-put { background: #ffc107; color: #333; }
        .method-delete { background: #dc3545; color: white; }
        .method-patch { background: #17a2b8; color: white; }
        .footer {
          padding: 1.5rem 2rem;
          background: #f8f9fa;
          text-align: center;
          color: #6c757d;
          border-top: 1px solid #dee2e6;
        }
        .server-info {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #6c757d;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>API Server</h1>
          <p>Bienvenue sur l'API de test Koa</p>
          <div class="server-info">Port: ${data.port}</div>
        </div>
        
        <div class="section">
          <h2>Routes Système</h2>
          ${
            data.systemRoutes.length > 0
              ? `
            <div class="route-list">
              ${data.systemRoutes
                .map(
                  (route) => `
                <div class="route-item">
                  <div class="route-path">${route.path}</div>
                  <div class="route-methods">
                    ${route.methods
                      .map(
                        (method) =>
                          `<span class="method-badge method-${method.toLowerCase()}">${method}</span>`
                      )
                      .join('')}
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          `
              : `
            <div class="empty-state">Aucune route système</div>
          `
          }
        </div>

     

        <div class="footer">
          <p>Serveur démarré le ${new Date().toLocaleString('fr-FR')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
