
// 使用相对路径
fis.hook("relative");
fis.match("**", {
    relative: true
});

// fis3 release 默认发布到test目录
fis.media("dev").match("**", {
    deploy: fis.plugin("local-deliver", {
        to: "../test"
    })
});

// autoprefixer处理
fis.match("*.{less,sass,scss}", {
    preprocessor : fis.plugin("autoprefixer",{
        "browsers": ["last 2 versions", "> 1%"]
    }),
    rExt: ".css"
});

// output: test
// 输出到test目录
fis.media("test").match("**", {
    deploy: fis.plugin("local-deliver", {
        to: "../test"
    })
});
// less和sass编译，输出sourcemap
fis.media("test").match("*.less", {
    parser: fis.plugin("less-2.x", {
        "sourceMap": {
            "sourceMapFileInline": true
        }
    })    
});
fis.media("test").match("*.{sass,scss}", {
    parser: fis.plugin("node-sass", {
        "sourceMap": true
    })
});

// output: build
// 压缩js
fis.media("build").match("*.js", {
    optimizer: fis.plugin("uglify-js"),
    useHash: false
});
// 压缩img
fis.media("build").match("*.{png,jpg}", {
    // optimizer: fis.plugin("imagemin")
    optimizer: fis.plugin("img-compressor")  
});
// less和sass编译，不输出sourcemap
fis.media("build").match("*.less", {
    parser: fis.plugin("less-2.x")
});
fis.media("build").match("*.{sass,scss}", {
    parser: fis.plugin("node-sass")
});
// 压缩css
fis.media("build").match("*.{less,sass,scss,css}", {
    optimizer: fis.plugin("clean-css"),
    useHash: false
});

///////////////
// 忽略的文件类型
fis.match("{_*.*, readme.md, package.json, *.map, *.bak, *.bak.*}", {
    release: false
});
// 文件名中有nocompress的，不压缩
fis.match("*.nocompress.*", {
    optimizer: false
});
// global/lib目录下，不压缩，不编译
fis.match("global/lib/**", {
    parser: false,
    preprocessor: false,
    optimizer: false,
    useHash: false
});