const defaultSym = {
    type: "simple-marker",
    color : {
        r: 255,
        g: 255,
        b: 255,
        a: 0.7
    }
};

export const Deaths = {
    type: "simple",
    symbol: defaultSym,
    visualVariables: [
        {
            type: "size",
            field: "Deaths",
            stops: [
                {
                    value: 0,
                    size: 4,
                },
                {
                    value: 1000,
                    size: 10,
                },
                {
                    value: 5000,
                    size: 12,
                },
                {
                    value: 10000,
                    size: 15,
                },
                {
                    value: 30000,
                    size: 16,
                },
                {
                    value: 50000,
                    size: 17,
                },
                {
                    value: 60000,
                    size: 18,
                },
                {
                    value: 80000,
                    size: 20,
                },
                {
                    value: 100000,
                    size: 30,
                },
                {
                    value: 200000,
                    size: 40,
                },
            ]
        }
    ]
};
