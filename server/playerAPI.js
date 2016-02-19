import Trie from 'triejs'
import request from 'superagent-bluebird-promise'
import playerJSON from '../data/player.json'

const PlayerTrie = new Trie({
    sort: function() {
        this.sort((a, b) => {
            if (a.active && !b.active) {
                return -1;
            } else if (b.active && !a.active) {
                return 1;
            } else {
                return 0;
            }
        })
    }
});

for (let playerName in playerJSON) {
    PlayerTrie.add(playerName,
        {
            name: playerName,
            id: playerJSON[playerName].id,
            active: playerJSON[playerName].active
        }
    );
}

export function *getPlayers() {
    this.status = 200;
    let players = PlayerTrie.find(this.params.searchTerm) || [];

    if (players.length > 8) {
        players = players.slice(0, 6);
    }

    this.body = players;
}

export function *getPlayer() {
    const stats = yield request
        .get(`http://stats.nba.com/stats/playerprofilev2?PerMode=Totals&PlayerID=${this.params.id}`)
        .then((res) => res.body.resultSets[0].rowSet);

    this.status = 200;
    this.body = stats;
}



