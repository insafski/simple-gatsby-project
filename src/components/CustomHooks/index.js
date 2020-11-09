import React, { useState, useEffect } from "react";

export default function useInput(initialState = "") {
    const [value, setValue] = useState(initialState);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const clear = () => {
        setValue(initialState);
    };

    return [
        {
            value,
            onChange: (data) => {
                setValue(data.target.value);
            },
        },
        clear,
    ];
}
