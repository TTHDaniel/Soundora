const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");


//json data beolvasasa WOW! micsoda megoldas!
var albumsjson = require('../data/albums.json');
const { json } = require("node:stream/consumers");

const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (request.method === "OPTIONS") {
        response.writeHead(204);
        response.end();
        return;
    }

    const url = new URL(request.url, "http://localhost:3000");
    const rootDir = path.join(__dirname, "..");

    const staticFiles = {
        "/style.css": { file: "style.css", contentType: "text/css; charset=utf-8" },
        "/Javascript/script.js": { file: "Javascript/script.js", contentType: "text/javascript; charset=utf-8" },
        "/Data/albums.json": { file: "Data/albums.json", contentType: "application/json; charset=utf-8" }
    };

    const staticFile = staticFiles[url.pathname];

    console.log(`${request.method} ${url.pathname}`);

    if (request.method === "GET" && staticFile) {
        fs.readFile(path.join(rootDir, staticFile.file), (error, content) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                response.end("The server files are unreachable!");
                return;
            }
            response.writeHead(200, { "Content-Type": staticFile.contentType });
            response.end(content);
        });
        return;
    }

    if (request.method === "GET" && url.pathname === "/") {
        fs.readFile(path.join(rootDir, "index.html"), (error, content) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                response.end("Cannot find the index.html file.");
                return;
            }
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(content);
        });
        return;
    }

    if (request.method === "GET" && url.pathname === "/albumsraw") {

        response.writeHead(200, { "Content-Type": "applications/json; charset=utf-8" });

        console.log(albumsjson)
        response.end(JSON.stringify(albumsjson));
        return;

    }






    //404as hiba
    fs.readFile(path.join(rootDir, "404.html"), (error, content) => {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            response.end("Cannot find the index.html file.");
            return;
        }
        response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        response.end(content);
    });
    // response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    // response.end(JSON.stringify({ error: "This site does not exist!" }));
});

server.listen(3000, "127.0.0.1", () => {
    console.log("A szerver fut: http://127.0.0.1:3000");
});