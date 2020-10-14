const express = require('express');
// require cors here if needed
// need postsRouter
const server = express();
server.use(express.json());
// this is where you put server.use(cors());

// server.use(...postsRouter)

const port = 5000;

server.get('/', (req, res) => {
    res.send('Welcome to the API')
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


