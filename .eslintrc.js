module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        // Boas praticas -> Podem ou nao serem corrigidas ao salvar
        "no-var": "error",
        "no-unused-vars": "off",
        "prefer-const": "error",
        "eqeqeq": ["error", "smart"],
        "no-template-curly-in-string": "error",
        "no-duplicate-imports": "error",
        "default-param-last": ["error"],
        // Layout/Formataçao -> Sao corrigidas ao salvar
        "array-element-newline": ["error", "consistent"],
        "arrow-spacing": ["error"],
        "block-spacing": ["error"],
        "brace-style": ["error"],
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "never",
        }],
        "comma-spacing": ["error"],
        "function-call-argument-newline": ["error", "consistent"],
        "jsx-quotes": ["error", "prefer-double"],
        "key-spacing": ["error", { "mode": "strict" }],
        "keyword-spacing": ["error"],
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "no-tabs": ["error"],
        "no-trailing-spaces": ["error", { "ignoreComments": true }],
        "no-whitespace-before-property": ["error"],
        "object-curly-newline": ["error", { "consistent": true }],
        "object-curly-spacing": ["error", "always"],
        "operator-linebreak": ["error", "after"],
        "rest-spread-spacing": ["error"],
        "space-before-blocks": ["error"],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always",
        }],
        "space-in-parens": ["error", "never"],
        "space-infix-ops": ["error"],
        "template-curly-spacing": ["error", "never"],
        // Vue
        "vue/multi-word-component-names": "off",
        "vue/no-v-model-argument": "off",
        "vue/prop-name-casing": [0],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": [],
        }],
        "vue/script-indent": ["error", 4],
        // Logs
        'no-console': ["warn", { allow: ["error"] }],
        'no-debugger': "error",
    },
};
