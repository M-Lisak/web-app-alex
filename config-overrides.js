const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "querystring": require.resolve("querystring-es3"),
        "zlib": require.resolve("browserify-zlib"),
        "path": require.resolve("path-browserify"),
        "tls": require.resolve("tls"),
        "net": require.resolve("net"),
        "fs": false,
        "process/browser": require.resolve("process/browser")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    config.resolve.plugins = config.resolve.plugins.filter(({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin');
    return config;
}