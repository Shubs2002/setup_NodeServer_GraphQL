import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import { buildSchema } from 'graphql';
import schema from './schema.js';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://shubhamnakashe:YaeA4QPPAEeoasZd@test-db-for-graphql-int.kwmsbse.mongodb.net/?retryWrites=true&w=majority&appName=test-db-for-graphql-integration";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// Define your resolvers
const app = express();


// Create an instance of ApolloServer
const server = new ApolloServer({ schema });


// Apply Apollo middleware to the Express app
await server.start();
server.applyMiddleware({ app });

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
  console.log(`GraphQL Playground available at http://localhost:5000${server.graphqlPath}`);
});

