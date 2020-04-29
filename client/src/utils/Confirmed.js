const defaultSym = {
    type: "simple-marker",
    color : {
        r: 170,
        g: 16,
        b: 15,
        a: 0.7
    }
};

export const Confirmed = {
    type: "simple",
    symbol: defaultSym,
    visualVariables: [
        {
            type: "size",
            field: "Confirmed",
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
