const path = require('path')

module.exports = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 配置查找文件后缀
    alias: { // 配置别名
        '@': path.resolve(__dirname, 'src')
    },
    devServer: {
        port: 9001, // 修改端口号
        // proxy: {
        //     '/ws': { // 配置代理示范
        //         target: 'https://apis.map.qq.com',
        //         changeOrigin: true
        //     }
        // }
    },
    module: {
        rules: []
    },
    plugins: []
}