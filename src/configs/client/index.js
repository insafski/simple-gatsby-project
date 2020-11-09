import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export default new ApolloClient({
    link: new HttpLink({
        uri: "https://oy-chet-db.hasura.app/v1/graphql",
        // headers: {
        //     Authorization: `Bearer ${authToken}`,
        // },
    }),
    cache: new InMemoryCache(),
});
