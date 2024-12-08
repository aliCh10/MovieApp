const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

// Configuration de CORS
const corsOptions = {
  origin: 'http://localhost:8100',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Configuration pour servir les fichiers statiques
app.use('/uploads/movies', express.static(path.join(__dirname, 'uploads', 'movies')));
app.use('/uploads/users', express.static(path.join(__dirname, 'uploads', 'users')));

// Configuration de stockage avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType = req.query.type; // Type de fichier: 'movies' ou 'users'
    console.log(`Type fourni: ${uploadType}`); // Log du type reçu

    let folder;

    if (uploadType === 'movies') {
      folder = './uploads/movies'; // Dossier pour les films
    } else if (uploadType === 'users') { // Corrigé ici
      folder = './uploads/users'; // Dossier pour les utilisateurs
    } else {
      console.error('Type de fichier invalide:', uploadType);
      return cb(new Error('Type de fichier invalide'), false); // Rejeter les fichiers invalides
    }

    fs.mkdirSync(folder, { recursive: true });
    console.log(`Dossier sélectionné: ${folder}`);
    cb(null, folder); // Passer le chemin du dossier à multer
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    console.log(`Nom du fichier généré: ${uniqueName}`);
    cb(null, uniqueName);
  },
});


const upload = multer({ storage: storage });

// Route pour télécharger une image
app.post('/upload', (req, res) => {
  const uploadType = req.query.type; // Vérifier le type de fichier dans la requête

  if (!uploadType) {
    console.error('Type non spécifié');
    return res.status(400).json({ error: 'Le type de fichier est requis' });
  }

  const uploadHandler = upload.single('image'); // Attendre un fichier avec le champ 'image'

  uploadHandler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Erreur Multer:', err); // Log des erreurs spécifiques à Multer
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.error('Erreur générale:', err); // Log des autres erreurs
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (!req.file) {
      console.error('Aucun fichier téléchargé');
      return res.status(400).json({ error: 'Aucun fichier téléchargé' });
    }

    console.log('Fichier téléchargé:', req.file.filename); // Log du fichier téléchargé
    res.status(200).json({ filePath: `/uploads/${uploadType}/${req.file.filename}` });
  });
});

// Route pour servir les images
app.get('/uploads/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  const validTypes = ['movies', 'users']; // Types de fichiers valides

  if (!validTypes.includes(type)) {
    console.error('Type de fichier invalide:', type);
    return res.status(400).json({ error: 'Type de fichier invalide' });
  }

  const filePath = path.join(__dirname, 'uploads', type, filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('Fichier non trouvé:', filePath); // Log si le fichier n'est pas trouvé
      return res.status(404).json({ message: 'Image non trouvée' });
    }
    res.sendFile(filePath);
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
