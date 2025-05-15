import { ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from "uuid";

// Tipagem do usuário
interface User {
  id: string;
  name: string;
  phone?: string;
  age: number;
  city: string;
}

// Array simulando um banco de dados em memória
const users: User[] = [
  {
    id: "8a169ade-2d06-4508-b5ba-57e730bef4af",
    name: "John",
    age: 20,
    phone: "123-456-7890",
    city: "Miami",
  },
  {
    id: "ef3347db-d6f3-46ac-84aa-36f4c6076cc3",
    name: "Jane",
    age: 22,
    phone: "334-159-2123",
    city: "New York",
  },
];

// Schema GraphQL
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    phone: String
    age: Int!
    city: String!
  }

  type Query {
    usersCount: Int
    getAllUsers: [User]!
    getUserById(id: String!): User
  }

  type Mutation {
    createUser(name: String!, phone: String, age: Int!, city: String!): User
    updateUser(id: String, name: String, phone: String, age: Int, city: String): User
    deleteUser(id: String): User
  }
`;

// Tipagem dos argumentos para mutation e query
interface CreateUserArgs {
  name: string;
  phone?: string;
  age: number;
  city: string;
}

interface UpdateUserArgs {
  id: string;
  name?: string;
  phone?: string;
  age?: number;
  city?: string;
}

interface DeleteUserArgs {
  id: string;
}

interface GetUserByIdArgs {
  id: string;
}

// Resolvers com tipagem
const resolvers = {
  Query: {
    usersCount: (): number => users.length,
    getAllUsers: (): User[] => users,
    getUserById: (_: unknown, args: GetUserByIdArgs, context: any): User | undefined => {
      console.log(context)
      return users.find((user) => user.id === args.id);
    },
  },
  Mutation: {
    createUser: (_: unknown, args: CreateUserArgs): User => {
      const user: User = { ...args, id: uuidv4() };
      users.push(user);
      return user;
    },
    updateUser: (_: unknown, args: UpdateUserArgs): User | null => {
      const user = users.find((u) => u.id === args.id);
      if (user) {
        Object.assign(user, args);
        return user;
      }
      return null;
    },
    deleteUser: (_: unknown, args: DeleteUserArgs): User | null => {
      const index = users.findIndex((u) => u.id === args.id);
      if (index !== -1) {
        const [deleted] = users.splice(index, 1);
        return deleted;
      }
      return null;
    },
  },
};

interface MyContext {
  authScope?: String;

}

// Inicializa o servidor Apollo com o schema e resolvers
const server = new ApolloServer({ typeDefs, resolvers, context: async (expressContext) => {
  return {
    name: expressContext.req.get('ClientName')
  }
} });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
