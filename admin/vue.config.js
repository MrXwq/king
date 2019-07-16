module.exports = {
    // 输出的文件夹，当前文件夹退到serve
    outputDir: __dirname + '/../server/admin',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}