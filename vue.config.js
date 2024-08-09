const { defineConfig } = require("@vue/cli-service");
const Components = require("unplugin-vue-components/webpack");
const path = require("path");

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        mode: "development",
        resolve: {
            symlinks: false,
            fallback: {
                fs: false,
                path: false
            },
            alias: {
                "vue": path.resolve(`./node_modules/vue`),
                "@assets": path.resolve(__dirname, "public/assets"),
                "@styles": path.resolve(__dirname, "public/assets/styles"),
                "@engine": path.resolve(__dirname, "src/engine"),
                "@core": path.resolve(__dirname, "src/engine/core"),
                "@utils": path.resolve(__dirname, "src/engine/utils"),
                "@type": path.resolve(__dirname, "src/@types"),
                "@actors": path.resolve(__dirname, "src/game/actors"),
                "@store": path.resolve(__dirname, "src/engine/storage/stores"),
                "@": path.resolve(__dirname, "src"),
                "@ui": path.resolve(__dirname, "src/ui"),
                "@config": path.resolve(__dirname, "src/config"),
            },
            extensions: [".js", ".vue"],
        },
        module: {
            rules: [
                // {
                //     test: /\.css$/i,
                //     use: [
                //         "css-loader",
                //         // "style-loader",
                //         // "vue-style-loader",
                //     ],
                // },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "sass-loader",
                    ],
                },
            ],
        },
        plugins: [
            Components({
                dirs: [
                    "src/ui"
                ]
            })
        ]
    }
});
