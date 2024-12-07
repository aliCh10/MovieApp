const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); 
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8100', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type'], 
};

app.use(cors(corsOptions)); 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});


const upload = multer({ storage: storage });


const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

app.post('/upload', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: 'Aucun fichier téléchargé' });
      }
      // Retourner une réponse JSON avec le nom du fichier
      res.status(200).json({ file: req.file.filename });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  });
  

  // Serve image with the URL /uploads/:filename
app.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
  
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: 'Image non trouvée' });
      }
      // Send the file as the response
      res.sendFile(filePath);
    });
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
