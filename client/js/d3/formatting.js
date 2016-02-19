import { CATEGORY_LOOKUP } from './constants'

export function formatStatsSeasonNumber(name, stats, category) {
    const categoryIndex = CATEGORY_LOOKUP.get(category);
    let data = [];

    for (let i = 0; i < stats.length; i++) {
        let stat;
        if (i === 0) {
            stat = stats[i][categoryIndex];
        } else {
            stat = stats[i][categoryIndex] + data[i - 1].stat;
        }
        data.push({
            season: i,
            stat
        });
    }

    return { name, seasons: data };
};