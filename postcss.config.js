module.exports = {
    plugins: {
        "postcss-pxtorem": {
            rootValue: 16,
            propList: ["*"],
            selectorBlackList: [],
            replace: true,
            mediaQuery: true,
            minPixelValue: 0,
        },
    },
};