import gql from 'graphql-tag'

export default gql`
  type MutationTestOutput {
    test: String
    count: Int
  }
` 