const express = require('express');
const mysql = require('mysql2')
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const { queryObjects } = require('v8');
const fs = require('fs');
const { error } = require('console');

// database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'techfest2026'
});
// database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database!');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const registrationFormsDir = path.join(uploadsDir, 'registration-forms');
const mlFormsDir = path.join(registrationFormsDir, 'ml-forms');
const valoFormsDir = path.join(registrationFormsDir, 'valo-forms');
const cosplayMusicDir = path.join(uploadsDir, 'music');
// upload directory for comleague stations
const station1Dir = path.join(registrationFormsDir, 'station1-forms');
const station2Dir = path.join(registrationFormsDir, 'station2-forms');
const station4Dir = path.join(registrationFormsDir, 'station4-forms');
const station5Dir = path.join(registrationFormsDir, 'station5-forms');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(registrationFormsDir)) {
    fs.mkdirSync(registrationFormsDir, { recursive: true });
}

if (!fs.existsSync(mlFormsDir)) {
    fs.mkdirSync(mlFormsDir, { recursive: true });
}

if (!fs.existsSync(valoFormsDir)) {
    fs.mkdirSync(valoFormsDir, {recursive: true});
}

if (!fs.existsSync(cosplayMusicDir)) {
    fs.mkdirSync(cosplayMusicDir, {recursive: true});
}

if (!fs.existsSync(station1Dir)) {
    fs.mkdirSync(station1Dir, {recursive: true});
}

if (!fs.existsSync(station2Dir)) {
    fs.mkdirSync(station2Dir, {recursive: true});
}

if (!fs.existsSync(station4Dir)) {
    fs.mkdirSync(station4Dir, {recursive: true});
}

if (!fs.existsSync(station5Dir)) {
    fs.mkdirSync(station5Dir, {recursive: true});
}

// multer for station 1 registration form
const uploadStation1 = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, station1Dir);
        },
        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const uniqueName = `${req.body.schoolID}-${timestamp}-${file.originalname}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, JPG, and PNG files are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

const uploadStation2 = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, station2Dir);
        },
        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const uniqueName = `${req.body.schoolID}-${timestamp}-${file.originalname}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, JPG, and PNG files are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

const uploadStation4 = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, station4Dir);
        },
        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const uniqueName = `${req.body.schoolID}-${timestamp}-${file.originalname}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, JPG, and PNG files are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

const uploadStation5 = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, station5Dir);
        },
        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const uniqueName = `${req.body.schoolID}-${timestamp}-${file.originalname}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, JPG, and PNG files are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

// Configure multer for cosplay music uploads
const uploadMusic = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, cosplayMusicDir);
        },
        filename: (req, file, cb) => {
            const timestamp = Date.now();
            const uniqueName = `${req.body.schoolID}-${timestamp}-${file.originalname}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        // Allow any audio file (mp3, wav, etc.)
        if (file.mimetype && file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Only audio files are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// Configure multer specifically for MLBB team registrations (6 player documents)
const uploadMLBB = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, mlFormsDir);
        },
        filename: (req, file, cb) => {
            const match = file.fieldname.match(/^doc_(\d)$/);
            let studentNumber = 'unknown';

            if (match) {
                const index = match[1];
                const key = `schoolID_${index}`;
                if (req.body && req.body[key]) {
                    studentNumber = req.body[key];
                }
            }

            const timestamp = Date.now();
            const safeOriginal = file.originalname.replace(/\s+/g, '_');
            const uniqueName = `${studentNumber}-${timestamp}-${safeOriginal}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, JPG, and PNG files are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

const uploadValo = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, valoFormsDir);
        },
        filename: (req, file, cb) => {
            const match = file.fieldname.match(/^doc_(\d)$/);
            let studentNumber = 'unknown';

            if (match) {
                const index = match[1];
                const key = `schoolID_${index}`;
                if (req.body && req.body[key]) {
                    studentNumber = req.body[key];
                }
            }

            const timestamp = Date.now();
            const safeOriginal = file.originalname.replace(/\s+/g, '_');
            const uniqueName = `${studentNumber}-${timestamp}-${safeOriginal}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, JPG, and PNG files are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const pages = '../frontEnd/pages/'
const register_pages = `${pages}register/`
const comleague_pages = `${register_pages}comleague/`
const api_register = '/register/'
const api_comleague = `${api_register}comleague/`

app.use(express.json());
app.use('/styles', express.static(path.join(__dirname, '../frontEnd/styles')))
app.use('/js', express.static(path.join(__dirname, '../frontEnd/js')))
app.use('/icons', express.static(path.join(__dirname, 'icons')));
app.use('/bg', express.static(path.join(__dirname, 'background')))

// Landing page routes
app.get('/', (req, res) => {
    res.redirect('/TechFest')
});

app.get('/register', (req, res) => {
    res.redirect('/TechFest')
})

app.get('/TechFest', (req, res) => {
    res.sendFile(path.join(__dirname, `${pages}index.html`))
});

// end


// registration routes
app.get(`${api_register}valorant`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}valorant.html`))
})

app.get(`${api_register}mlbb`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}mlbb.html`))
})

app.get(`${api_register}comleague`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}comLeague.html`))
})

app.get(`${api_register}techTalks`, (req, res) => {
    res.sendFile(path.join(__dirname,`${register_pages}techtalks.html`))
})

app.get(`${api_register}cosplay`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}cosplay.html`))
})

app.get(`${api_register}collide`, (req, res) => {
    res.sendFile(path.join(__dirname, `${register_pages}collide.html`))
})
// end

// comleague registration routes
app.get(`${api_comleague}station-1`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_1.html`))
})
app.get(`${api_comleague}station-2`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_2.html`))
})
app.get(`${api_comleague}station-3`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_3.html`))
})
app.get(`${api_comleague}station-4`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_4.html`))
})
app.get(`${api_comleague}station-5`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_5.html`))
})
app.get(`${api_comleague}station-6`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_6.html`))
})
app.get(`${api_comleague}station-7`, (req, res) => {
    res.sendFile(path.join(__dirname, `${comleague_pages}station_7.html`))
})
// end


//                          API Endpoints

// Helper to clean up uploaded MLBB files on error
const cleanupMlbbFiles = (files) => {
    if (!files) return;

    Object.values(files).forEach((fileArray) => {
        fileArray.forEach((file) => {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        });
    });
};

// Helper to clean up uploaded Valorant files on error
const cleanupValoFiles = (files) => {
    if (!files) return;

    Object.values(files).forEach((fileArray) => {
        fileArray.forEach((file) => {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        });
    });
};

// Helper to clean up a single uploaded file (e.g., Station 1, Cosplay)
const cleanupSingleFile = (file) => {
    if (!file) return;

    fs.unlink(file.path, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        }
    });
};

// Techtalks Registration API
app.post('/register/techtalks', (req, res) => {
    const {username, schoolID} = req.body;

    const checkQuery = 'SELECT student_number FROM techtalks_registrations WHERE student_number = ?';

    if (!username || !schoolID) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.query(checkQuery, [schoolID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Student already reserved' });
        }

        const insertQuery = 'INSERT INTO techtalks_registrations (full_name, student_number) VALUES (?, ?)';
        db.query(insertQuery, [username, schoolID], (insertErr) => {
            if (insertErr) {
                console.error('Insert Error: ', insertErr);
                return res.status(500).json({ error: 'Failed to reserve user' });
            }

            return res.status(201).json({
                success: true,
                message: 'Reservation successful'
            });
        });
    });
});
// end

// mlbb registration API (team with up to 6 players)
app.post(
    '/register/mlbb',
    uploadMLBB.fields([
        { name: 'doc_1', maxCount: 1 },
        { name: 'doc_2', maxCount: 1 },
        { name: 'doc_3', maxCount: 1 },
        { name: 'doc_4', maxCount: 1 },
        { name: 'doc_5', maxCount: 1 },
        { name: 'doc_6', maxCount: 1 }
    ]),
    (req, res) => {
        const { teamname, captain } = req.body;

        if (!teamname || !captain) {
            cleanupMlbbFiles(req.files);
            return res.status(400).json({ error: 'Team name and captain are required' });
        }

        const players = [];

        for (let i = 1; i <= 6; i++) {
            const fullName = req.body[`name_${i}`];
            const studentNumber = req.body[`schoolID_${i}`];
            const ign = req.body[`ign_${i}`];
            const fileArray = req.files ? req.files[`doc_${i}`] : null;
            const fileObj = fileArray && fileArray[0];

            const isOptional = i === 6;
            const hasAnyData = fullName || studentNumber || ign || fileObj;

            if (!isOptional || hasAnyData) {
                if (!fullName || !studentNumber || !ign || !fileObj) {
                    cleanupMlbbFiles(req.files);
                    return res.status(400).json({ error: `Missing required fields for player ${i}` });
                }

                players.push({
                    fullName,
                    studentNumber,
                    ign,
                    fileName: fileObj.filename
                });
            }
        }

        if (players.length < 5) {
            cleanupMlbbFiles(req.files);
            return res.status(400).json({ error: 'At least 5 players are required' });
        }

        const teamMetaQuery = 'SELECT IFNULL(MAX(team_id), 0) + 1 AS nextTeamId, IFNULL(MAX(id), 0) AS maxId FROM mlbb_registrations';

        db.query(teamMetaQuery, (err, results) => {
            if (err) {
                console.error('Database error (MLBB team metadata):', err);
                cleanupMlbbFiles(req.files);
                return res.status(500).json({ error: 'Database error' });
            }

            const row = results[0] || {};
            const teamId = row.nextTeamId || 1;
            let nextId = row.maxId || 0;
            const insertQuery = `
                INSERT INTO mlbb_registrations
                (id, team_id, team_name, captain, full_name, student_number, ign, registration_form)
                VALUES ?
            `;

            const values = players.map((p) => {
                nextId += 1;
                return [
                    nextId,
                    teamId,
                    teamname,
                    captain,
                    p.fullName,
                    p.studentNumber,
                    p.ign,
                    p.fileName
                ];
            });

            db.query(insertQuery, [values], (insertErr) => {
                if (insertErr) {
                    console.error('Insert Error (MLBB):', insertErr);
                    cleanupMlbbFiles(req.files);

                    if (insertErr.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({
                            error: 'One or more players are already registered or duplicated'
                        });
                    }

                    return res.status(500).json({ error: 'Failed to register team' });
                }

                return res.status(201).json({
                    success: true,
                    message: 'MLBB team registered successfully',
                    team_id: teamId
                });
            });
        });
    }
);
// end



// Valorant registration API (team with up to 6 players)
app.post(
    '/register/valorant',
    uploadValo.fields([
        { name: 'doc_1', maxCount: 1 },
        { name: 'doc_2', maxCount: 1 },
        { name: 'doc_3', maxCount: 1 },
        { name: 'doc_4', maxCount: 1 },
        { name: 'doc_5', maxCount: 1 },
        { name: 'doc_6', maxCount: 1 }
    ]),
    (req, res) => {
        const { teamname, captain } = req.body;

        if (!teamname || !captain) {
            cleanupValoFiles(req.files);
            return res.status(400).json({ error: 'Team name and captain are required' });
        }

        const players = [];

        for (let i = 1; i <= 6; i++) {
            const fullName = req.body[`name_${i}`];
            const studentNumber = req.body[`schoolID_${i}`];
            const ign = req.body[`ign_${i}`];
            const fileArray = req.files ? req.files[`doc_${i}`] : null;
            const fileObj = fileArray && fileArray[0];

            const isOptional = i === 6;
            const hasAnyData = fullName || studentNumber || ign || fileObj;

            if (!isOptional || hasAnyData) {
                if (!fullName || !studentNumber || !ign || !fileObj) {
                    cleanupValoFiles(req.files);
                    return res.status(400).json({ error: `Missing required fields for player ${i}` });
                }

                players.push({
                    fullName,
                    studentNumber,
                    ign,
                    fileName: fileObj.filename
                });
            }
        }

        if (players.length < 5) {
            cleanupValoFiles(req.files);
            return res.status(400).json({ error: 'At least 5 players are required' });
        }

        const teamMetaQuery = 'SELECT IFNULL(MAX(team_id), 0) + 1 AS nextTeamId, IFNULL(MAX(id), 0) AS maxId FROM valorant_registrations';

        db.query(teamMetaQuery, (err, results) => {
            if (err) {
                console.error('Database error (Valorant team metadata):', err);
                cleanupValoFiles(req.files);
                return res.status(500).json({ error: 'Database error' });
            }

            const row = results[0] || {};
            const teamId = row.nextTeamId || 1;
            let nextId = row.maxId || 0;
            const insertQuery = `
                INSERT INTO valorant_registrations
                (id, team_id, team_name, captain, full_name, student_number, ign, registration_form)
                VALUES ?
            `;

            const values = players.map((p) => {
                nextId += 1;
                return [
                    nextId,
                    teamId,
                    teamname,
                    captain,
                    p.fullName,
                    p.studentNumber,
                    p.ign,
                    p.fileName
                ];
            });

            db.query(insertQuery, [values], (insertErr) => {
                if (insertErr) {
                    console.error('Insert Error (Valorant):', insertErr);
                    cleanupValoFiles(req.files);

                    if (insertErr.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({
                            error: 'One or more players are already registered or duplicated'
                        });
                    }

                    return res.status(500).json({ error: 'Failed to register team' });
                }

                return res.status(201).json({
                    success: true,
                    message: 'Valorant team registered successfully',
                    team_id: teamId
                });
            });
        });
    }
);
// end


// cosplay registration API
app.post('/register/cosplay', uploadMusic.single('bgMusic'), (req, res) => {
    const { username, schoolID, chosenChar } = req.body;

    // Basic validation: required text fields
    if (!username || !schoolID || !chosenChar) {
        cleanupSingleFile(req.file);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Background music is optional; no need to error if missing
    // check if student is already registered
    const checkQuery = 'SELECT student_number FROM cosplay_registrations WHERE student_number = ?';
    db.query(checkQuery, [schoolID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            cleanupSingleFile(req.file);
            return res.status(500).json({ error: 'Database error' });
        }

        // delete file if already registered
        if (results.length > 0) {
            cleanupSingleFile(req.file);
            return res.status(400).json({ error: 'Student already registered' });
        }

        const checkChar = 'SELECT chosen_character FROM cosplay_registrations WHERE chosen_character = ?';
        db.query(checkChar, [chosenChar], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                cleanupSingleFile(req.file);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length > 0) {
                cleanupSingleFile(req.file);
                return res.status(400).json({ error: 'Character already taken' });
            }

            const insertQuery = `
                INSERT INTO cosplay_registrations 
                (full_name, student_number, chosen_character, music_file) 
                VALUES (?, ?, ?, ?)
            `;

            const musicFile = req.file ? req.file.filename : null;

            db.query(insertQuery, [username, schoolID, chosenChar, musicFile], (insertErr) => {
                if (insertErr) {
                    console.error('Insert Error (Cosplay):', insertErr);
                    cleanupSingleFile(req.file);
                    return res.status(500).json({ error: 'Failed to register' });
                }

                return res.status(201).json({ success: true, message: 'Registration successful!' });
            });
        });
    });
});
// end

// collide registration API
app.post('/register/collide', (req, res) => {
    const {username, studentID, faculty} = req.body;

    const checkQuery = 'SELECT student_number FROM collide_registrations WHERE student_number = ?';

    if (!username || !studentID || !faculty) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.query(checkQuery, [studentID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error'});
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Student already reserved' });
        }

        const insertQuery = 'INSERT INTO collide_registrations (full_name, student_number, faculty_name) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, studentID, faculty], (inserErr) => {
            if (inserErr) {
                console.error('Insert error:', insertErr);
                return res.status(500).json({ error: 'Failed to reserve user' });
            }

            return res.status(201).json({
                success: true,
                message: 'Reservation successful'
            });
        });
    });
});

// Station 1 Registration API (with file upload)
app.post('/register/comleague/station-1', uploadStation1.single('regForm'), (req, res) => {
    const { username, schoolID } = req.body;

    if (!username || !schoolID) {
        // Uploaded file (if any) should not be kept on validation failure
        cleanupSingleFile(req.file);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Registration form file is required' });
    }

    const checkQuery = 'SELECT student_number FROM station1_registrations WHERE student_number = ?';

    db.query(checkQuery, [schoolID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            // Clean up uploaded file on any database error
            cleanupSingleFile(req.file);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            // Clean up uploaded file if duplicate
            cleanupSingleFile(req.file);
            return res.status(400).json({ error: 'Student already registered' });
        }

        const insertQuery = 'INSERT INTO station1_registrations (full_name, student_number, registration_form) VALUES (?, ?, ?)';
        const filePath = req.file.filename; // Store just filename, not full path

        db.query(insertQuery, [username, schoolID, filePath], (insertErr) => {
            if (insertErr) {
                console.error('Insert Error:', insertErr);
                // Clean up file on insertion error
                cleanupSingleFile(req.file);
                return res.status(500).json({ error: 'Failed to register' });
            }

            return res.status(201).json({
                success: true,
                message: 'Registration successful'
            });
        });
    });
});
// end

// station 2 registration API (with file upload)
app.post('/register/comleague/station-2', uploadStation2.single('regForm'), (req, res) => {
    const {username, schoolID} = req.body;

    if (!username || !schoolID) {
        // Uploaded file (if any) should not be kept on validation failure
        cleanupSingleFile(req.file);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Registration form file is required' });
    }

    const checkQuery = 'SELECT student_number FROM station2_registrations WHERE student_number = ?';

    db.query(checkQuery, [schoolID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            // Clean up uploaded file on any database error
            cleanupSingleFile(req.file);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            // Clean up uploaded file if duplicate
            cleanupSingleFile(req.file);
            return res.status(400).json({ error: 'Student already registered' });
        }

        const insertQuery = 'INSERT INTO station2_registrations (full_name, student_number, registration_form) VALUES (?, ?, ?)';
        const filePath = req.file.filename; // Store just filename, not full path

        db.query(insertQuery, [username, schoolID, filePath], (insertErr) => {
            if (insertErr) {
                console.error('Insert Error:', insertErr);
                // Clean up file on insertion error
                cleanupSingleFile(req.file);
                return res.status(500).json({ error: 'Failed to register' });
            }

            return res.status(201).json({
                success: true,
                message: 'Registration successful'
            });
        });
    });
});
// end

// station 4 registration API (with file upload)
app.post('/register/comleague/station-4', uploadStation4.single('regForm'), (req, res) => {
    const {username, schoolID} = req.body;

    if (!username || !schoolID) {
        // Uploaded file (if any) should not be kept on validation failure
        cleanupSingleFile(req.file);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Registration form file is required' });
    }

    const checkQuery = 'SELECT student_number FROM station4_registrations WHERE student_number = ?';

    db.query(checkQuery, [schoolID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            // Clean up uploaded file on any database error
            cleanupSingleFile(req.file);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            // Clean up uploaded file if duplicate
            cleanupSingleFile(req.file);
            return res.status(400).json({ error: 'Student already registered' });
        }

        const insertQuery = 'INSERT INTO station4_registrations (full_name, student_number, registration_form) VALUES (?, ?, ?)';
        const filePath = req.file.filename; // Store just filename, not full path

        db.query(insertQuery, [username, schoolID, filePath], (insertErr) => {
            if (insertErr) {
                console.error('Insert Error:', insertErr);
                // Clean up file on insertion error
                cleanupSingleFile(req.file);
                return res.status(500).json({ error: 'Failed to register' });
            }

            return res.status(201).json({
                success: true,
                message: 'Registration successful'
            });
        });
    });
});
// end

// station 5 registration API (with file upload)
app.post('/register/comleague/station-5', uploadStation5.single('regForm'), (req, res) => {
    const {username, schoolID} = req.body;

    if (!username || !schoolID) {
        // Uploaded file (if any) should not be kept on validation failure
        cleanupSingleFile(req.file);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Registration form file is required' });
    }

    const checkQuery = 'SELECT student_number FROM station5_registrations WHERE student_number = ?';

    db.query(checkQuery, [schoolID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            // Clean up uploaded file on any database error
            cleanupSingleFile(req.file);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            // Clean up uploaded file if duplicate
            cleanupSingleFile(req.file);
            return res.status(400).json({ error: 'Student already registered' });
        }

        const insertQuery = 'INSERT INTO station5_registrations (full_name, student_number, registration_form) VALUES (?, ?, ?)';
        const filePath = req.file.filename; // Store just filename, not full path

        db.query(insertQuery, [username, schoolID, filePath], (insertErr) => {
            if (insertErr) {
                console.error('Insert Error:', insertErr);
                // Clean up file on insertion error
                cleanupSingleFile(req.file);
                return res.status(500).json({ error: 'Failed to register' });
            }

            return res.status(201).json({
                success: true,
                message: 'Registration successful'
            });
        });
    });
})
// 