/** 
 * @type {import('@types/eslint').Linter.Config}
*/

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    "airbnb-base",
    'airbnb-typescript/base',
    "eslint:recommended",
    "plugin:promise/recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 'prettier', 
    'plugin:sonarjs/recommended'
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'node_modules',
    'dist',
    'build',
    'coverage',
    'src/**/*.spec.*',
    'src/**/*.d.ts',
    'src/**/*.stories.*',
    'jest.config.js',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    "promise",
    "@typescript-eslint"
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    },
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],

  },
  rules: {
    'no-param-reassign': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
    "@typescript-eslint/no-misused-promises": "warn",
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
      jsx: 'never',
      tsx: 'never',
      json: 'never',
    }],
    "padding-line-between-statements": [
      2,
      {
        blankLine: "always",
        prev: "*",
        next: [
          "if",
          "class",
          "for",
          "do",
          "while",
          "switch",
          "try"
        ]
      },
      {
        blankLine: "always",
        prev: [
          "if",
          "class",
          "for",
          "do",
          "while",
          "switch",
          "try"
        ],
        "next": "*"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "return"
      }
    ],
    "no-script-url": "off",
    "no-template-curly-in-string": "off",
    "linebreak-style": 0,
    "prefer-template": "error",
    indent: ["warn", 2],
    "no-console": "warn",
    "import/prefer-default-export": "off",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "newline-per-chained-call": [
      "error",
      {
        "ignoreChainWithDepth": 1
      }
    ],
    "no-underscore-dangle": 0,
    "class-methods-use-this": 0,
    "max-classes-per-file": "warn",
    "max-len": [
      "warn", {
        "code": 120
      }
    ],
  },
  overrides: [
    {
      files: ['*.model.ts'],
      rules: {
        'no-param-reassign': "off",
      }
    },
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': "off",
        '@typescript-eslint/no-unsafe-return': "off",
        '@typescript-eslint/unbound-method': "off",
      }
    }
  ],
}