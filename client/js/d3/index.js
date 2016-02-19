import { formatStatsSeasonNumber } from './formatting'

let viz;

let data = [
    {
        name: "Steph Curry",
        seasons: [{"season":0,"stat":1399},{"season":1,"stat":2772},{"season":2,"stat":3155},{"season":3,"stat":4941},{"season":4,"stat":6814},{"season":5,"stat":8714},{"season":6,"stat":10203}]
    },
    {
        name: "Blake Griffin",
        seasons: [{"season": 0, "stat": 1845},{"season": 1, "stat": 3213}, {"season": 2, "stat": 4653}, {"season": 3, "stat": 6583}, {"season": 4, "stat": 8052}, {"season": 5, "stat": 8749}]
    }
];

const WIDTH = 1000;
const HEIGHT = 500;
const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};

const yMax = d3.max(data, (player) => {
    return d3.max(player.seasons, (season) => season.stat)
})

const yMin = 0;

// Scaling
// --------------------------------------------------
const xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 8]);
const yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([yMin, yMax]);

// Draw Axis
// --------------------------------------------------
const xAxis = d3.svg.axis()
    .scale(xScale)

const yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

export function start() {
    viz = d3.select('#viz');

    viz.append("svg:g")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .attr("class", "axis")
        .call(xAxis);

    viz.append("svg:g")
        .attr("transform", "translate(" + MARGINS.left + ",0)")
        .attr("class", "axis")
        .call(yAxis);
}

// Draw Lines
// --------------------------------------------------
const lineGen = d3.svg.line()
    .x((d) => xScale(d.season))
    .y((d) => yScale(d.stat))


export function test(players) {
    const data = [];
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        data.push(formatStatsSeasonNumber(player.name, player.stats, 'PTS'))
    }

    const playerss = viz.selectAll(".player")
        .data(data);

    const playersEnter = playerss.enter()
        .append("g")
        .attr("class", "player");

    const path = playersEnter.append("path")
        .attr('d', (d) => lineGen(d.seasons))
        .attr("class", "line")
        .style("stroke", 'red')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    playerss.exit().remove();

    if (path.node()) {
        const totalLength = path.node().getTotalLength();

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1500)
            .ease("linear")
            .attr("stroke-dashoffset", 0);
    }

// Draw Points
// --------------------------------------------------
    const dots = viz.selectAll("g.dot")
        .data(data)

    const a = dots.enter()
        .append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data((d) => d.seasons)

    const b = a
        .enter().append("circle")
        .attr("r", 4)
        .attr("cx", (d, i) => xScale(d.season))
        .attr("cy", (d, i) => yScale(d.stat))
        .attr("fill", 'white')
        .style("stroke", 'red');

    dots.exit().remove();

}


