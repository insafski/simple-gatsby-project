import React from "react";
import { ApolloProvider } from "@apollo/client";
import PropTypes from "prop-types";

import client from "./src/configs/client";
import { Layout } from "./src/components/Layout";

function wrapPageElement({ element }) {
    return (
        <ApolloProvider client={client}>
            <Layout>{element}</Layout>
        </ApolloProvider>
    );
}

wrapPageElement.propTypes = {
    element: PropTypes.node,
};

export { wrapPageElement };
