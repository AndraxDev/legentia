module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended'
    ],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: '@mui/material',
                        message: 'Use deep imports like "@mui/material/Button" instead.',
                    },
                    {
                        name: '@mui/icons-material',
                        message: 'Use deep imports like "@mui/icons-material/ArrowBack" instead.',
                    },
                ],
            },
        ],
    },
};