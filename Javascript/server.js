const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { error } = require("node:console");
const { url } = require("node:inspector");
const { json } = require("node:stream/consumers");

const server = http.createServer((request, response) => {
    // Egyszerű CORS-beállítás: a böngésző engedélyezi a szerver válaszait.
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    if (request.method === "OPTIONS") {
        response.writeHead(204);
        response.end();
        return;
    }

    const staticFiles = {
        "/style.css": { file: "style.css", contentType: "text/css; charset=utf-8" },
        "Javascript/script.js": { file: "javascript/script.js", contentType: "text/javascript; charset=utf-8" }
    }
    const staticFile = staticFiles[request.url]

    console.log(`${request.method} ${request.url}`)
    if (request.method === "GET" && staticFile) {
        fs.readFile(path.join(__dirname, staticFile.file), (error, content) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
                response.end("A felület fájljai most nem érhetők el.")
                return;
            }
            response.writeHead(200, { "Content-Type": staticFile.contentType })
            response.end(content)

        })

    }

    const url = new URL(request.url, "http://localhost:3000");

    if (request.method === "GET" && url.pathname === "/") {
        fs.readFile(path.join(__dirname, "index.html"), (error, content) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
                response.end(error)
                return;
            }
            response.writeHead(200, { "Content-Type": "text/html" })
            response.end(content)


        })
        return;
    }


    response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });

    response.end(JSON.stringify({ error: "Nincs ilyen útvonal." }));





});

server.listen(3000, "127.0.0.1", () => {
    console.log("A szerver fut: http://127.0.0.1:3000");
});



