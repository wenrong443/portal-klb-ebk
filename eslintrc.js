module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        "plugin:es-beautifier/standard",
        "plugin:vue/vue3-essential",
        "@vue/prettier",
        'standard'
    ],
    plugins: ["es-beautifier"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "comma-dangle": ["error", "never"],
        "linebreak-style": "off",
    },
    env: {
        browser: true,
        node: true,
        mocha: true
    },
    globals: {
        expect: true
    }
}