import { CATEGORY_TO_INDEX, CATEGORY_TO_NAME } from './constants'

export function formatStats(player, category) {
    const categoryIndex = CATEGORY_TO_INDEX.get(category);
    const data = [];
    const stats = player.stats;
    console.log(stats);

    let prevSeason;
    let season = 1;
    let offset = 0;
    for (let i = 0; i < stats.length; i++) {
        let stat;

        if (stats[i][CATEGORY_TO_INDEX.get("TEAM_ABBREVIATION")] == "TOT") {
            offset++;
            continue;
        }

        if (i === 0) {
            stat = stats[i][categoryIndex];
        } else {
            console.log(data, i, season, stats[i][CATEGORY_TO_INDEX.get("TEAM_ABBREVIATION")]);
            stat = stats[i][categoryIndex] + data[i - 1 - offset].stat;
        }

        if (stats[i][CATEGORY_TO_INDEX.get("SEASON_ID")] === prevSeason) {
            season--;
        }

        data.push({
            id: player.id,
            name: player.name,
            age: stats[i][CATEGORY_TO_INDEX.get("PLAYER_AGE")],
            season,
            year: stats[i][CATEGORY_TO_INDEX.get("SEASON_ID")],
            team: stats[i][CATEGORY_TO_INDEX.get("TEAM_ABBREVIATION")],
            stat,
            statValue: stats[i][categoryIndex],
            category: CATEGORY_TO_NAME[category]
        });

        prevSeason = stats[i][CATEGORY_TO_INDEX.get("SEASON_ID")];
        season++;
    }

    return {
        name: player.name,
        id: player.id,
        category,
        seasons: data
    };
}
