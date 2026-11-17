
import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.url === "/health") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            status: "online",
            service: "Scramjet Wisp Backend"
        }));

        return;
    }

    res.writeHead(404);
    res.end("Not Found");
});

server.on("upgrade", (req, socket, head) => {
    const pathname = new URL(
        req.url ?? "/",
        "http://localhost"
    ).pathname;

    if (pathname === "/wisp/") {
        req.url = pathname;
        wisp.routeRequest(req, socket, head);
        return;
    }

    socket.destroy();
});

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Scramjet backend listening on ${PORT}`);
});
