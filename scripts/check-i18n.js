import path from "path";

import { sync as glob } from "glob";

const PATH_DOCS = path.resolve(__dirname, "..", "docs");

let languages = glob("*/", {
    cwd: PATH_DOCS
}).map(lang => lang.replace("/", ""));

var result = {
    languages
};

languages.forEach(lang => {

    let files = glob("**/*", {
        cwd: path.resolve(PATH_DOCS, lang)
    });

    files.forEach(filepath => {
        if (!result[filepath]) {
            result[filepath] = [lang];
        } else {
            result[filepath].push(lang);
        }
    });
});

console.log(result);