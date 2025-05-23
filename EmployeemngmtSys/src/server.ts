// server.ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/resolvers';
import { MyContext } from './types';

export async function createApolloApp() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    csrfPrevention: false,
    cache: 'bounded',
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { token: req.headers.authorization };
      },
    })
  );

  return { app, httpServer };
}

// ONLY run the server if this file is executed directly
if (require.main === module) {
  (async () => {
    const { httpServer } = await createApolloApp();
    await new Promise<void>((resolve) =>{
      httpServer.listen({ port: 4000 }, resolve)
    }
    );
    console.error(`🚀 Server ready at http://localhost:4000/graphql`);
  })();
}
