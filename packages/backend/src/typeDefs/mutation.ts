import gql from 'graphql-tag'

export default gql`
  type Mutation {
    mutationTest(test: String): MutationTestOutput
    login(email: String!, password: String!): User
  }
`
