#!/usr/bin/env node
import fs from 'fs-extra'

const templatePath = 'index.html'
const pj = 'package.json'
const jsonText = fs.readFileSync(pj, 'utf-8')
const version = JSON.parse(jsonText).version

const lines = fs.readFileSync(templatePath, 'utf-8').split(/\r?\n/)

const outputFileName = process.argv.length > 3 ? process.argv[3] : 'index.html'
const out = 'dist/' + outputFileName
const fd = fs.openSync(out, 'w')
for (let line of lines) {

    if (line.includes("<script") && line.includes("module") && line.includes("app.js")) {
        fs.writeSync(fd, '<script type="module" src="shoebox.esm.min.js"></script>\n', null, 'utf-8')
    } else if (line.includes("@VERSION")) {
        line = line.replace("@VERSION", version)
        fs.writeSync(fd, line + '\n', null, 'utf-8')
    } else {
        fs.writeSync(fd, line + '\n', null, 'utf-8')
    }
}
fs.close(fd)
