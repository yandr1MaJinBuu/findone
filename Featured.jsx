import 'antd/dist/antd.css';
import "./featured.scss";
import { Divider } from 'antd';


import axios from "axios";
import React, { useState, useEffect } from "react";

const Featured = () => {
  const [playerName, setPlayerName] = useState([]);
  const [playerRank, setPlayerRank] = useState([]);
  const [player, setPlayer] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [players, setPlayers] = useState();

  const fetchData = () => {
    const playerAPI = 'http://localhost:3001/api/highscores';

    const getINFOPlayer = axios.get(playerAPI)
    axios.all([getINFOPlayer]).then(
      axios.spread((...allData) => {
        const allDataPlayer = allData[0].data
        const newPlayer = allDataPlayer?.map(players => {
          const pr = allDataPlayer.find(rank => players.id === rank.id)


          return {
            name: players.name,
            position: pr?.position,
            score: pr?.score,
            difference: pr?.difference,
          }
        })

        setPlayer(newPlayer)
        setPlayerName(allDataPlayer)
        console.log(newPlayer)
      })
    )
  }
  useEffect(() => {
    fetchData()
  }, [])


  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return player?.slice((current - 1) * pageSize, current * pageSize);
  };

  const sortData = fetchData && player.sort(function(a, b) {
    return a.difference - b.difference;
  });

  return (
    <div className="featured">
      <div className="site-card-wrapper">
        <span className="title">Top/Flop Of The Day</span>
        <Divider orientation="left"></Divider>
        {getData(current, size)
          .map((player) => {
            return (
              <tbody>
                <tr key={player.max}>
                  <td>{player.position}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                  <td>{player.difference}</td>
                </tr>
              </tbody>
            );
          })}
      </div>
    </div>
  );
}
export default Featured;

