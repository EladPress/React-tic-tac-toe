const config = {
    branches: ['semver', 'main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/npm', {
            "npmPublish": false,
        }],
        // ['@semantic-release/git', {
        //     'assets': 
        // }]
    ]
};

module.exports = config;