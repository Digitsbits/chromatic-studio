import {mkdir,copyFile} from 'node:fs/promises';
const files=['index.html','style.css','app.js','tokens.js'];await mkdir('dist',{recursive:true});for(const file of files)await copyFile(file,`dist/${file}`);console.log(`Built ${files.length} production assets into dist/`);
