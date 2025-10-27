const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Koneksi ke database dan jalankan server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server berjalan di http://localhost:${PORT}`);
    });
}).catch(err => console.log("❌ Gagal konek DB:", err));

// ✅ CREATE (POST)
app.post('/komik', async (req, res) => {
    try {
        const komik = await db.komik.create(req.body);
        res.status(201).send(komik);
    } catch (err) {
        res.status(500).send({ message: "Gagal menambahkan data", error: err });
    }
});

// ✅ READ ALL (GET)
app.get('/komik', async (req, res) => {
    try {
        const komik = await db.komik.findAll();
        res.send(komik);
    } catch (err) {
        res.status(500).send({ message: "Gagal mengambil data", error: err });
    }
});

// ✅ READ BY ID (GET)
app.get('/komik/:id', async (req, res) => {
    try {
        const komik = await db.komik.findByPk(req.params.id);
        if (!komik) return res.status(404).send({ message: "Komik tidak ditemukan" });
        res.send(komik);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ✅ UPDATE (PUT)
app.put('/komik/:id', async (req, res) => {
    try {
        const komik = await db.komik.findByPk(req.params.id);
        if (!komik) return res.status(404).send({ message: "Komik tidak ditemukan" });

        await komik.update(req.body);
        res.send({ message: "Komik berhasil diupdate" });
    } catch (err) {
        res.status(500).send({ message: "Gagal update", error: err });
    }
});

// ✅ DELETE
app.delete('/komik/:id', async (req, res) => {
    try {
        const komik = await db.komik.findByPk(req.params.id);
        if (!komik) return res.status(404).send({ message: "Komik tidak ditemukan" });

        await komik.destroy();
        res.send({ message: "Komik berhasil dihapus" });
    } catch (err) {
        res.status(500).send({ message: "Gagal menghapus", error: err });
    }
});
