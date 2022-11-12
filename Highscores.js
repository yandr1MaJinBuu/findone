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
