import { CATEGORY_LOOKUP } from './constants'

export function formatStats(player, category) {
    const categoryIndex = CATEGORY_LOOKUP.get(category);
    const data = [];
    const stats = player.stats;

    for (let i = 0; i < stats.length; i++) {
        let stat;
        if (i === 0) {
            stat = stats[i][categoryIndex];
        } else {
            stat = stats[i][categoryIndex] + data[i - 1].stat;
        }
        data.push({
            age: stats[i][CATEGORY_LOOKUP.get("PLAYER_AGE")],
            season: i,
            year: stats[i][CATEGORY_LOOKUP.get("SEASON_ID")],
            team: stats[i][CATEGORY_LOOKUP.get("TEAM_ABBREVIATION")],
            stat
        });
    }

    return {
        name: player.name,
        id: player.id,
        seasons: data,
        category
    };
}

export function formatStatsByAge(player, category) {
    const categoryIndex = CATEGORY_LOOKUP.get(category);
    const data = [];
    const stats = player.stats;

    for (let i = 0; i < stats.length; i++) {
        let stat;
        if (i === 0) {
            stat = stats[i][categoryIndex];
        } else {
            stat = stats[i][categoryIndex] + data[i - 1].stat;
        }
        data.push({
            age: stats[i][CATEGORY_LOOKUP.get("PLAYER_AGE")],
            team: stats[i][CATEGORY_LOOKUP.get("TEAM_ABBREVIATION")],
            stat
        });
    }

    return {
        name: player.name,
        id: player.id,
        seasons: data,
        format: 'age'
    };
}