import fs from "fs";
import os from "os";
import path from "path";

import express from "express";
import historyApiFallback from 'express-history-api-fallback'

import findAvailablePort from "./findAvailablePort.js";
import cliBoard from "./cliBoard.js";

const PATH_DOCS = path.resolve(__dirname, "../docs");

const app = express();

app.use(express.static(PATH_DOCS));

// Auto reload

var autoReloadRes;
app.get("/auto-reload", (req, res) => {
    autoReloadRes = res;
});

fs.watch(PATH_DOCS, {
    recursive: true
}, (evt, filename) => {
    if (autoReloadRes) {
        console.log("reload");
        autoReloadRes.send(true);
        autoReloadRes = undefined;
    }
})

// History Api Fallback

app.use("/", (req, res, next) => {
    let c1 = fs.existsSync(path.resolve(PATH_DOCS, req.path));
    let c2 = fs.existsSync(path.resolve(PATH_DOCS, req.path, "index.html"));
    if (!c1 && !c2) {
        res.redirect(`/#${req.path}`);
    }
    next();
})

function getNetworkAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const item of interfaces[name]) {
            const {
                address,
                family,
                internal
            } = item;
            if (family === 'IPv4' && !internal) {
                return address;
            }
        }
    }
};

(async () => {
    let port = await findAvailablePort(7777);
    app.listen(port, () => {
        cliBoard(`Server is running on:\n\n> http://${getNetworkAddress()}:${port}/\n> http://127.0.0.1:${port}/`, 3);
    });
})();