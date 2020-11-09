import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { get } from "lodash";

import { SignIn } from "../../../widgets";

const MY_CARS = gql`
    query MyCars {
        cars {
            id
            mark
            model
        }
    }
`;

export const Header = ({ siteTitle }) => {
    const [cars, setCars] = useState([]);
    const { loading, error, data } = useQuery(MY_CARS);

    useEffect(() => {
        if (!loading && !error) {
            !!data && setCars(get(data, "cars", []));
        }
    }, [loading]);

    return (
        <header
            style={{
                background: `rebeccapurple`,
                marginBottom: `1.45rem`,
            }}
        >
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                }}
            >
                <h1 style={{ margin: 0 }}>
                    <Link
                        to="/"
                        style={{
                            color: `white`,
                            textDecoration: `none`,
                        }}
                    >
                        {siteTitle}
                    </Link>
                </h1>

                <SignIn />

                <>
                    {!!cars.length &&
                        cars.map((car, idx) => (
                            <div key={idx}>
                                <span>{`${car.mark}  ${car.model}`}</span>
                            </div>
                        ))}
                </>
            </div>
        </header>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: ``,
};
