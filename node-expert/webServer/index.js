const http = require('http');

async function esperar5Segundos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Passaram 5 segundos!");
        }, 5000);
    });
}


const routes = {
    "GET": {
        "/test": async (req, res) => {
            console.log("request chegou no controller")
            await esperar5Segundos()
            console.log("promisse resolveu")
            res.statusCode = 200;
            res.setHeader('Content-Type',"application/json");
            res.end(JSON.stringify({message: "rota de teste"}));
            console.log("request acabou")
        },
        "/test2": (req, res) => {
            console.log("request chegou no controller")
            res.statusCode = 200;
            res.setHeader('Content-Type',"application/json");
            res.end(JSON.stringify({message: "rota de teste"}));
            console.log("request acabou")
        }
    },
    "POST": {
        "/user": async (req, res) => {
            req.on('data', (data) => {
                console.log("data chegou")
                const user = JSON.parse(data);
                users.push(user);
                setTimeout(() => {
                    console.log("request acabou")
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: "user created", users: users }));
                }, 10000)
            })
        }
    }
}

const users = []

const notFoundEndpoint = (req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type',"application/json");
    res.end(JSON.stringify({message: "Not Found"}));
}

const server = http.createServer();

let id = 0;

server.on('request',
    (req, res) => {
        const methodRoutes = routes[req.method];
        console.log("request chegou")
        if(!methodRoutes){
            notFoundEndpoint(req, res);
            return;
        }
        const route = methodRoutes[req.url];
        if(!route){
            notFoundEndpoint(req, res);
            return;
        }
        route(req, res);
    }
);

server.listen(3000);