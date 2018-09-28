const path = require('path');
const webpack=require('webpack');
const uglify = require('uglifyjs-webpack-plugin');//webpack集成uglifyjs
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    mode:'development',
    entry:{
        index : './src/js/index.js',
        second: './src/js/second.js'

    },
    output: {
        filename: 'js/[name].js',
        path : path.resolve(__dirname,'../dist'),
        publicPath: "./" //这是html中引入的路径
    },

    //loader
    module:{
        rules:[
            //css loader
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath:'../'
                }),
                // use:[
                //
                //
                //     {
                //         loader: "style-loader",
                //         options: {
                //             //插入属性
                //             attrs: {
                //                 first: 1
                //             },
                //             // insertAt:'top',//top，在head的靠上的位置 ，默认是在head的靠下的位置
                //             singleton: true
                //         }
                //     },
                //     {
                //         loader: "css-loader"
                //     }
                // ]
            },

            //图片问题
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'img/[name].[ext]'//'img/[name].[hash:5].[ext]'
                        }

                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),//热加载
        new extractTextPlugin('css/[name].css'),//('css/[name].[hash:5].css'),
        // new uglify(),//压缩js
        new htmlPlugin({
            title:'test',
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是去掉属性的双引号。这有什么用吗……
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: path.resolve(__dirname,'../src/index.html') ,//是要打包的html模版路径和文件名称。
            chunks: ['index']

        }),
        new htmlPlugin({
            title:'second',
            filename:'second.html',
            template:path.resolve(__dirname,'../src/second.html'),
            chunks:['second']
        }),
        // new htmlPlugin({
        //     title: 'Custom template',
        //     // Load a custom template (lodash by default see the FAQ for details)
        //     template: 'index.ejs' //模板文件，需要先安装ejs的loader
        // })


    ],

    devServer: {
        //这里应该弄一个dev文件夹
        contentBase:path.resolve(__dirname,'../dist'),
        //host
        host:'localhost',
        compress:true,
        port:8085,
        hot:true,
        // open:true
    }
};