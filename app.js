const path = require('path');
const http = require('http');
const IPFS = require('ipfs-http-client');
const ipfs = IPFS.create();
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const cors = require('cors');
var app = express();
app.use(cors());
app.options('*', cors());


app.post('http://127.0.0.1:3000/test', function(req, res) {
    const BufferList = require('bl/BufferList');
    const cid = 'QmX6cWfkrJzAW9tmDgKfMxSpCe1uaNQvAyKvq1dbF1FRej';
    var dict = {};

    console.log('abc');

    (async() => {
        try {
            for await (const file of ipfs.get(cid)) {
                console.log(file.path);
                if (path.parse(file.path) == '.json') {
                    const content = new BufferList();
                    for await (const chunk of file.content) {
                        content.append(chunk);
                    }
                    console.log(content.toString())
                    var json = JSON.parse(content.toString());
                    dict[json['tokenId']] = json['image']
                }
            }
        } catch(e) {
            console.log(e.stack);
        }
    })();
    // for await (const file of ipfs.get(cid)) {
    //     console.log(file.path);
    //     if (path.parse(file.path) == '.json') {
    //         const content = new BufferList();
    //         for await (const chunk of file.content) {
    //             content.append(chunk);
    //         }
    //         console.log(content.toString())
    //         var json = JSON.parse(content.toString());
    //         dict[json['tokenId']] = json['image']
    //     }
    // }
    calling.aFunction();
    // return a response
    res.send(dict);
});
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

