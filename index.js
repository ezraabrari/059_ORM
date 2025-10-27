const express = require('express')
const app = express();
const PORT = 3000;
const db = require("./models");
const res = require('express/lib/response');
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

app.listen(PORT, () => {
    console.log('server started on port 3000');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log('server started');
        })
    })
    .catch((err) => {
        console.log(err);
    })

app.post("/komik", async (req, res) =>{
    const data = req.body;
    try {
        const komik = await db.komik.create(data);
        res.send(komik);
    }catch (err) {
        res.send(err);
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.komik.findALL();
        res.send(komik);
    } catch(err) {
        res.send(err);
    }
});
