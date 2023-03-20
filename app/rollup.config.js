import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import strip from '@rollup/plugin-strip';
import copy from 'rollup-plugin-copy'
import {terser} from "rollup-plugin-terser"

export default [
    {
        input: 'js/app.js',
        output: [
            {file: 'dist/js/hic-app.min.js', format: 'umd', name: "hic-app", plugins: [terser()]}
        ],
        plugins: [
            strip({
                debugger: true,
                functions: ['console.log', 'assert.*', 'debug']
            }),
            commonjs(),
            nodeResolve(),
            babel(),
            copy({
                targets:
                    [
                        {src: 'res', dest: 'dist/'},
                        {src: '../component/css/juicebox.css', dest: 'dist/css/'},
                        {src: '../component/css/img', dest: 'dist/css/'},
                        {src: 'scripts/embed.html', dest: 'dist/'},
                        {src: 'css/app.css', dest: 'dist/css/'},
                        {src: 'img', dest: 'dist/'},
                        {src: 'juiceboxConfig.js', dest: 'dist/'},

                    ]
            })
        ]
    },
    {
        input: 'js/embed.js',
        output: [
            {file: 'dist/js/juicebox-embed.min.js', format: 'umd', name: "hic", plugins: [terser()]}
        ],
        plugins: [
            strip({
                debugger: true,
                functions: ['console.log', 'assert.*', 'debug']
            }),
            commonjs(),
            nodeResolve(),
            babel()
        ]
    }
]