import {buildSchema} from 'graphql'

export default buildSchema(
    `
    type User {
        name: String!
        email: String!
        age: Int!
    }
    
    type TestType {
        count: Int!
        users: [User!]!
    }
    
    type Todo {
        id: ID!
        title: String!
        completed: Boolean!
    }
    
    type Query {
        test: TestType!
        random(min: Int!, max: Int!, count: Int!): [Float!]!
        getTodos: [Todo!]!
    }
    
    input UserInput {
        name: String!
        email: String!
    }
    
    input TodoInput {
        title: String!
        completed: Boolean!
    }
    
    type Mutation {
        addTestUser(user: UserInput!): User!
        createTodo(todo: TodoInput!): Todo!
    }
    `
)