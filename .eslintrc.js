module.exports = {
    "extends": "airbnb",
    env: {
        browser: true,
        jest: true,
        node: true,
    },
    rules: {
        "react/jsx-filename-extension": 0,
        "react/prop-types": 0,
        "no-underscore-dangle": ["error", { "allow" : ["__id"]}],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
          }],
          "eslint.packageManager": "yarn",
    },
};