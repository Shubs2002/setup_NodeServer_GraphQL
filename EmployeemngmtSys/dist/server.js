import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './types.js';
import { resolvers } from './resolvers/resolvers.js';
// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;
// const resolvers = {
//   Query: {
//     hello: (): string => 'world',
//   },
// };
async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        // csrfPrevention: true,
        introspection: true, // Add this line
        csrfPrevention: false,
        cache: 'bounded'
    });
    await server.start();
    //   app.use((req, res, next) => {
    //   // console.error(req.headers);
    //   next();
    // });
    // app.use(graphqlUploadExpress());
    app.use(cors());
    app.use(express.json());
    // Set up middlewares in the correct order
    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.authorization }),
    }));
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.error(`🚀 Server ready at http://localhost:4000/graphql`);
}
startApolloServer();
