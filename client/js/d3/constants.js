export const CATEGORIES  = [
    "PLAYER_ID",
    "SEASON_ID",
    "LEAGUE_ID",
    "TEAM_ID",
    "TEAM_ABBREVIATION",
    "PLAYER_AGE",
    "GP",
    "GS",
    "MIN",
    "FGM",
    "FGA",
    "FG_PCT",
    "FG3M",
    "FG3A",
    "FG3_PCT",
    "FTM",
    "FTA",
    "FT_PCT",
    "OREB",
    "DREB",
    "REB",
    "AST",
    "STL",
    "BLK",
    "TOV",
    "PF",
    "PTS"
];

export const INCLUDED_CATEGORIES = [
    "PTS",
    "REB",
    "AST",
    "STL",
    "BLK",
    "TOV",
    "PF",
    "FGM",
    "FGA",
    "FG3M",
    "FG3A",
    "FTM",
    "FTA",
    "GP",
    "GS",
    "MIN",
]

export const CATEGORY_TO_NAME = {
    PTS  : "Points",
    REB  : "Rebounds",
    AST  : "Assists",
    STL  : "Steals",
    BLK  : "Blocks",
    TOV  : "Turnovers",
    PF   : "Personal Fouls",
    FGM  : "Field Goals Made",
    FGA  : "Field Goals Attempted",
    FG3M : "3-Point Field Goals Made",
    FG3A : "3-Point Field Goals Attempted",
    FTM  : "Free Throws Made",
    FTA  : "Free Throws Attempted",
    GP   : "Games Played",
    GS   : "Games Started",
    MIN  : "Minutes Played"
}

export const TEAM_COLORS = {
    ATL: '#E03A3E',
    BKN: '#061922',
    BOS: '#008348',
    CHA: '#008CA8',
    CHI: '#CE1141',
    CLE: '#860038',
    DAL: '#007DC5',
    DEN: '#4D90CD',
    DET: '#006BB6',
    GSW: '#FDB927',
    HOU: '#CE1141',
    IND: '#00285E',
    LAC: '#ED174C',
    LAL: '#FDB927',
    MEM: '#00285E',
    MIA: '#98002E',
    MIL: '#00471B',
    MIN: '#005083',
    NOP: '#002B5C',
    NYK: '#F58426',
    OKC: '#007DC3',
    ORL: '#007DC5',
    PHI: '#006BB6',
    PHX: '#1D1160',
    POR: '#E03A3E',
    SAC: '#724C9F',
    SAS: '#061922',
    TOR: '#CE1141',
    UTA: '#002B5C',
    UTH: '#002B5C',
    WAS: '#E31937',
    NOJ: '#002B5C',
    CHH: '#008CA8',
    NOK: '#008CA8',
    NOH: '#008CA8',
    SEA: '#016332',
    STL: '#E03A3E',
    GOL: '#FDB927',
    PHL: '#006BB6',
    SFW: '#FDB927'

}

const map = new Map();
for (let i = 0; i < CATEGORIES.length; i++) {
    map.set(CATEGORIES[i], i);
};

export const CATEGORY_TO_INDEX = map;


