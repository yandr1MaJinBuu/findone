const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cron = require('node-cron');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));


app.use(express.json());
app.use(cors());

//MONGODB CONNECTION//

mongoose.connect('mongodb://127.0.0.1:27017/OGStats', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);

// Store value in a variable for later use //



//MODELS//

const Player = require('./models/NewPlayers');

app.get('/api/NewPlayers', async (req, res) => {
    const NewPlayers = await Player.find({}).sort({ _id: -1 }).limit(3)
    res.json(NewPlayers);
})

const Highscores = require('./models/Highscores');

app.get('/api/Highscores', async (req, res) => {
    const highscores = await Highscores.find()
    res.json(highscores);
})

const Topflop = require('./models/topflop');

app.get('/api/topflop', async (req, res) => {
    const topflop = await Topflop.find()
    res.json(topflop);
})

const TopNames = require('./models/TopNames');

app.get('/api/topnames', async (req, res) => {
    const topnames = await TopNames.find()
    res.json(topnames);
})

const TopScores = require('./models/TopScores');

app.get('/api/topscores', async (req, res) => {
    const topscores = await TopScores.find()
    res.json(topscores);
})

// Inserts difference score to the database //
/*cron.schedule('* * * * * *', async () => {

    const postSchema = new mongoose.Schema({
        position: {
            type: Number,
            required: false,
        },
        id: {
            type: Number,
            required: true,
        },
        score: {
            type: Number,
            required: false,
        },
        difference: {
            type: Number,
            required: true,
        },
    });

    const Post = mongoose.model('testscores', postSchema);

    async function updateData() {

        // 1. Get the player highscores.
        const getHighscore = await fetch("http://localhost:3008/api/highscore/players");
        const response = await getHighscore.json();

        // 2. Loop the highscores and save them to the database.
        for (let i = 0; i < response.players.length; i++) {

           // 3. Collect the current player.
           const current = await Post.findOne({ id: response.players[i]['id'] });
           console.log("PlayerID", current)
           // If a user exists, let's update the data instead.
           if (current) {

            // 4. Calculate the difference between the current score and the previous score.
            const difference = current.score - response.players[i]['score'];
            // 3. Collect the current player.
            try {
                const update = await Post.updateOne({ id: response.players[i]['id'] },
                    {

                        $set: {
                            score: response.players[i]['score'],
                            difference: difference,
                        },
                    }, {
                    upsert: true
                });
                console.log('Document updated', update);
            } catch (err) {
                console.error(err);
                throw err;
            }
              // Else, we shall create a new record.
            } else {

                // 4. Create a new record.
                const newRecord = new Post({
                    id: response.players[i]['id'],
                    position: response.players[i]['position'],
                    score: response.players[i]['score'],
                    difference: 0,
                });
                console.log("New Record", newRecord)
                // 5. Save the record.
                await newRecord.save();
            }
        }
    }
    console.log("Table submitted successfully")
    await updateData();

});*/


//POST DAILY TOPFLOP DATA PLAYERS//

cron.schedule('58 23 * * *', async () => {

    const postSchema = new mongoose.Schema({

        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: false
        },

    });

    const Post = mongoose.model('topnames', postSchema);

    async function getPosts() {
        const getPlayers = await fetch("http://localhost:3008/api/players");
        const response = await getPlayers.json();
        for (let i = 0; i < response.players.length; i++) {

            const post = new Post({
                id: response.players[i]['id'],
                name: response.players[i]['name'],
                status: response.players[i]['status'],
            });
            post.save();


        }

    }
    console.log("Table submitted successfully")

    await getPosts();

});

// POST DAILY TOP/FLOP DATA SCORE //

cron.schedule('57 23 * * *', async () => {

    const postSchema = new mongoose.Schema({

        position: {
            type: Number,
            required: false
        },
        id: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: false
        },

    });

    const Post = mongoose.model('topscores', postSchema);

    async function getPosts() {
        const getHighscore = await fetch("http://localhost:3008/api/highscore/players");
        const response = await getHighscore.json();
        for (let i = 0; i < response.players.length; i++) {

            const post = new Post({
                position: response.players[i]['position'],
                id: response.players[i]['id'],
                score: response.players[i]['score'],
            });
            post.save();


        }

    }
    console.log("Table submitted successfully")

    await getPosts();

});

//POST DAILY PLAYERS DATA//

cron.schedule('56 23 * * *', async () => {

    const postSchema = new mongoose.Schema({

        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: false
        },

    });

    const Post = mongoose.model('players', postSchema);

    async function getPosts() {
        const getPlayers = await fetch("http://localhost:3008/api/players");
        const response = await getPlayers.json();
        for (let i = 0; i < response.players.length; i++) {

            const post = new Post({
                id: response.players[i]['id'],
                name: response.players[i]['name'],
                status: response.players[i]['status'],
            });
            post.save();


        }

    }
    console.log("Table submitted successfully")

    await getPosts();

});


//POST DAILY HIGHSCORE DATA//

cron.schedule('54 23 * * *', async () => {

    const postSchema = new mongoose.Schema({

        position: {
            type: Number,
            required: false,
        },
        id: {
            type: Number,
            required: true,
        },
        score: {
            type: Number,
            required: false,
        },
        difference: {
            type: Number,
            required: true,
        },
    });

    const Post = mongoose.model('highscores', postSchema);

    async function getPosts() {
        const getHighscore = await fetch("http://localhost:3008/api/highscore/players");
        const response = await getHighscore.json();
        for (let i = 0; i < response.players.length; i++) {

           // 3. Collect the current player.
           const current = await Post.findOne({ id: response.players[i]['id'] });
           console.log("PlayerID", current)
           // If a user exists, let's update the data instead.
           if (current) {

            // 4. Calculate the difference between the current score and the previous score.
            const difference = current.score - response.players[i]['score'];
            // 3. Collect the current player.
            try {
                const update = await Post.updateOne({ id: response.players[i]['id'] },
                    {

                        $set: {
                            score: response.players[i]['score'],
                            difference: difference,
                        },
                    }, {
                    upsert: true
                });
                console.log('Document updated', update);
            } catch (err) {
                console.error(err);
                throw err;
            }
              // Else, we shall create a new record.
            } else {

                // 4. Create a new record.
                const newRecord = new Post({
                    id: response.players[i]['id'],
                    position: response.players[i]['position'],
                    score: response.players[i]['score'],
                    difference: 0,
                });
                console.log("New Record", newRecord)
                // 5. Save the record.
                await newRecord.save();
            }
        }
    }
    console.log("Table submitted successfully")

    await getPosts();

});



//DELETE HIGHSCORE DATA

const dbConnection = require('./config/mongoodb')

cron.schedule('54 23 * * *', async () => {
    const deleteData = async () => {
        let data = await dbConnection();
        let result = await data.deleteMany();
        console.log(result)
    }

    await deleteData();

});

//DELETE PLAYER DATA

const dbConnectto = require('./config/mongodb')

cron.schedule('53 23 * * *', async () => {
    const deleteData = async () => {
        let data = await dbConnectto();
        let result = await data.deleteMany();
        console.log(result)
    }

    await deleteData();

});

//DELETE TOPNAMES DATA

const dbConnectat = require('./config/topnamesdb')

cron.schedule('52 23 * * *', async () => {
    const deleteData = async () => {
        let data = await dbConnectat();
        let result = await data.deleteMany();
        console.log(result)
    }

    await deleteData();

});

//DELETE TOP SCORE DATA

const dbConnecton = require('./config/topscoresdb')

cron.schedule('52 23 * * *', async () => {
    const deleteData = async () => {
        let data = await dbConnecton();
        let result = await data.deleteMany();
        console.log(result)
    }

    await deleteData();

});



//BACKUP

const { spawn } = require('child_process');
const path = require('path');


const DB_NAME = 'OGStats';
const ARCHIVE_PATH = path.join(__dirname, '/', `${DB_NAME}.gzip`);


cron.schedule('50 23 * * *', () => backupMongoDB());

function backupMongoDB() {
    const child = spawn('mongodump', [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        '--gzip',
    ]);

    child.stdout.on('data', (data) => {
        console.log('stdout:\n', data);
    });
    child.stderr.on('data', (data) => {
        console.log('stderr:\n', Buffer.from(data).toString());
    });
    child.on('error', (error) => {
        console.log('error:\n', error);
    });
    child.on('exit', (code, signal) => {
        if (code) console.log('Process exit with code:', code);
        else if (signal) console.log('Process killed with signal:', signal);
        else console.log('Backup is successfull ✅');
    });
}

app.listen(3001, () => console.log("Server started on port 3001"));

