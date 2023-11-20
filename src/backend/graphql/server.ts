import { createHandler } from 'graphql-http/lib/use/fetch'; // bun install graphql-http
import { schema } from './schema';

export const startGraphqlServer = () => {
  // Create the GraphQL over HTTP native fetch handler
  const handler = createHandler({ schema });

  // Start serving on `/graphql` using the handler
  const server = Bun.serve({
    port: 4000, // Listening to port 4000
    fetch(req) {
      const [path, _search] = req.url.split('?');
      if (path.endsWith('/graphql')) {
        return handler(req);
      } else {
        return new Response(null, { status: 404 });
      }
    },
  });

  console.log(`Listening on http://localhost:${server.port} ...`);
}

