import strip from '@rollup/plugin-strip';
import copy from 'rollup-plugin-copy'
import terser from "@rollup/plugin-terser"
import replace from '@rollup/plugin-replace';

export default [
    {
        input: 'js/app/app.js',
        output: [
            {file: 'dist/shoebox.esm.js', format: 'es'},
            {file: 'dist/shoebox.esm.min.js', format: 'es', sourcemap: true, plugins: [terser()]}
        ],
        plugins: [
            strip({
                debugger: true,
                functions: ['console.log', 'assert.*', 'debug']
            }),
            copy({
                targets:
                    [
                        {src: 'res', dest: 'dist/'},
                        {src: './css/juicebox.css', dest: 'dist/css/'},
                        {src: './css/shoebox.css', dest: 'dist/css/'},
                        {src: './css/img', dest: 'dist/css/'},
                        {src: './css/app.css', dest: 'dist/css/'},
                        {src: 'img', dest: 'dist/'},
                        {src: 'juiceboxConfig.js', dest: 'dist/'},

                    ]
            })
        ]
    }
]
