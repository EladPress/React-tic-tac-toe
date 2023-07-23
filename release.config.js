const config = {
    branches: ['semver', 'main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        // ['@semantic-release/git', {
        //     'assets': 
        // }]
    ]
};

module.exports = config;