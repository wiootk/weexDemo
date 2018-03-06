const pathTo = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const copy = require('copy-webpack-plugin');

const entry = {};
const weexEntry = {};
const vueWebTemp = 'temp';
const hasPluginInstalled = fs.existsSync('./web/plugin.js');
var isWin = /^win/.test(process.platform);


function getEntryFileContent(entryPath, vueFilePath) {
    let relativePath = pathTo.relative(pathTo.join(entryPath, '../'), vueFilePath);
    let contents = '';
    if (hasPluginInstalled) {
        const plugindir = pathTo.resolve('./web/plugin.js');
        contents = 'require(\'' + plugindir + '\') \n';
    }
    if (isWin) {
        relativePath = relativePath.replace(/\\/g, '\\\\');
    }
    contents += 'var App = require(\'' + relativePath + '\')\n';
    contents += 'App.el = \'#root\'\n';
    contents += 'new Vue(App)\n';
    return contents;
}

var fileType = '';

function walk(dir) {
    dir = dir || '.';
    const directory = pathTo.join(__dirname, 'src', dir);
    fs.readdirSync(directory)
        .forEach((file) => {
            const fullpath = pathTo.join(directory, file);
            const stat = fs.statSync(fullpath);
            const extname = pathTo.extname(fullpath);
            const name = pathTo.join(dir, pathTo.basename(file, extname));
            if (directory.indexOf("\\image") > 0) {
                return;
            }
            if (stat.isFile() && extname !== '.vue' && extname !== '.we') {
                entry[name] = fullpath + '?entry=true';
                weexEntry[name] = fullpath + '?entry=true';
                return;
            }
            if (directory.indexOf("\\src\\") > 0) {
                return;
            }
            if (stat.isFile() && extname === '.vue' || extname === '.we') {
                if (!fileType) {
                    fileType = extname;
                }
                if (fileType && extname !== fileType) {
                    console.log('Error: This is not a good practice when you use ".we" and ".vue" togither!');
                }
                if (extname === '.vue') {
                    let entryFile = pathTo.join(vueWebTemp, dir, pathTo.basename(file, extname) + '.js');
                    fs.exists(pathTo.join(__dirname, 'src', dir, name + '.js'), function(exists) { //异步
                        if (!exists) {
                            fs.outputFileSync(pathTo.join(entryFile), getEntryFileContent(entryFile, fullpath));
                        } else {
                            fs.copy(pathTo.join(__dirname, 'src', dir, name + '.js'), pathTo.join(entryFile), function(err) {
                                if (err) return console.error(err)
                            });
                        }

                    })
                    if (!entry[name]) {
                        entry[name] = pathTo.join(__dirname, entryFile) + '?entry=true';
                        weexEntry[name] = fullpath + '?entry=true';
                    }
                }

            } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
                const subdir = pathTo.join(dir, file);
                walk(subdir);
            }
        });
}

walk();

// web need vue-loader
const plugins = [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.BannerPlugin({
        banner: '// { "framework": ' + (fileType === '.vue' ? '"Vue"' : '"Weex"') + '} \n',
        raw: true,
        exclude: 'Vue'
    }),
    new copy([
        {from: './src/image', to: "./image"},
        {from: './node_modules/bui-weex/src/font', to: "./font"}
    ])

];
const resolve = {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        '@': pathTo.resolve(__dirname, './src')
    },
    modules: [
        pathTo.join(__dirname, './node_modules')
    ]
}
const webConfig = {
    context: pathTo.join(__dirname, ''),
    entry: entry,
    output: {
        path: pathTo.join(__dirname, 'dist'),
        filename: '[name].web.js',
    },
    module: {
        // webpack 2.0 
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [{
                    loader: 'vue-loader'
                }]
            },
            {
                test: /\.(scss|sass)$/,
                // include: helpers.root('src', 'app'),
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    resolve: resolve,
    plugins: plugins
};
const weexConfig = {
    entry: weexEntry,
    output: {
        path: pathTo.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }],
                exclude: /node_modules/
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [{
                    loader: 'weex-loader'
                }]
            },
            {
                test: /\.we(\?[^?]+)?$/,
                use: [{
                    loader: 'weex-loader'
                }]
            },

            {
                test: /\.(scss|sass)$/,
                // include: helpers.root('src', 'app'),
                loader: 'style-loader!css-loader!sass-loader'
            }




        ]
    },
    resolve: resolve,
    plugins: plugins,
};

var exports = [webConfig, weexConfig];

if (fileType === '.we') {
    exports = weexConfig;
}
module.exports = exports;