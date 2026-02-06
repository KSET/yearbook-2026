const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

//Mapiranje
app.use('/static/photos', express.static(path.join(__dirname, 'static', 'images')));
app.use('/static', express.static(path.join(__dirname, 'static')));


app.get('/api/years', (req, res) => {
    const imagesPath = path.join(__dirname, 'static', 'images');
    
    fs.readdir(imagesPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Greška pri čitanju direktorija:', err);
            return res.status(500).json({ message: "Greška pri čitanju godina" });
        }
        
        const years = files
            .filter(file => file.isDirectory())
            .map(file => file.name)
            .sort();
        
        res.json(years);
    });
});

app.get('/api/yearbook/:year/sections', (req, res) => {
    const { year } = req.params;
    const yearPath = path.join(__dirname, 'static', 'images', year);
    
    fs.readdir(yearPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Greška pri čitanju direktorija za godinu ${year}:`, err);
            return res.status(500).json({ message: "Greška pri čitanju sekcija" });
        }
        
        const sections = files
            .filter(file => file.isDirectory())
            .map(file => file.name)
            .sort();
        
        res.json(sections);
    });
});

app.get('/api/yearbook/:year/:section', (req, res) => {
    const { year, section } = req.params;
    const jsonPath = path.join(__dirname, 'static', 'json', year, `${section}.json`);

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Greška pri čitanju: ${jsonPath}`, err);
            return res.status(404).json({ message: "Sekcija ili godina nije pronađena" });
        }
        
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            res.status(500).json({ message: "Greška u formatu JSON datoteke" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Backend na http://localhost:${PORT}`);
});