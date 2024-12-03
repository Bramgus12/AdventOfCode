module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier",
    ],
    plugins: ["prettier", "@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    root: true,
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        project: "./tsconfig.json",
    },
    rules: {
        // prettier
        "prettier/prettier": "error",

        // eslint
        "func-names": "off",
        "no-process-exit": "off",
        "object-shorthand": "off",
        "class-methods-use-this": "off",
        "no-shadow": ["error"],

        // @typescript
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/semi": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/strict-boolean-expressions": "error",
        "@typescript-eslint/no-misused-promises": [
            "error",
            { "checksVoidReturn": false }
        ],
        "@typescript-eslint/no-unbound-method": "off",

        // plugin:import/recommended
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": 0,
        "no-restricted-exports": 0,
        "no-param-reassign": [
            "error",
            {
                "props": true,
                "ignorePropertyModificationsForRegex": ["^immer"]
            }
        ]
    },
    ignorePatterns: [".eslintrc.cjs", "**.config.ts", "**.config.mjs", "dist/*"],
    settings: {
        jsdoc: {
            mode: "typescript"
        },
    }
}
