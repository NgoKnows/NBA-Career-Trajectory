import { formatStats } from './formatting'
import { TEAM_COLORS } from './constants'
import _ from 'lodash'
import moment from 'moment'

console.log(TEAM_COLORS)

//const formatting = {
//    season : formatStatsBySeason,
//    age : formatStatsByAge
//}
const WIDTH = 1000;
const HEIGHT = 500;
const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};

// Beginning Scaling
// --------------------------------------------------
let xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 10]);
let yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 10000]);

// Draw Axis
// --------------------------------------------------
let xAxis = d3.svg.axis()
    .scale(xScale)

let yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

export function init() {
    const viz = d3.select('#viz');

    viz.append("svg:g")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .attr("class", "x axis")
        .call(xAxis);

    viz.append("svg:g")
        .attr("transform", "translate(" + MARGINS.left + ",0)")
        .attr("class", "y axis")
        .call(yAxis);
}

// Update Data
// --------------------------------------------------
export function update(playerStats, format, category) {
    const viz = d3.select('#viz');

    // Get data formatted
    // ----------------------------------------------
    const data = playerStats.map((player) => {
        return formatStats(player, category);
    })

    // Get domain
    // ----------------------------------------------
    const maxStat = d3.max(data, (player) => {
        return d3.max(player.seasons, (season) => season.stat)
    })

    const maxFormat = d3.max(data, (player) => {
        return d3.max(player.seasons, (season) => season[format]);
    });
    const minFormat = d3.min(data, (player) => {
        return d3.min(player.seasons, (season) => season[format]);
    });


    let domain;
    if (format === 'year') {
        //1990-91
        //2005-2006
        let year = minFormat;
        domain = [minFormat];
        console.log(minFormat, maxFormat)
        while (year !== maxFormat) {
            const nextYear = moment([year.substring(0, 4)]).add(1, 'year');
            const nextNextYear = moment([year.substring(0, 4)]).add(2, 'year');
            const newYear = nextYear.format('YYYY')+ '-' + nextNextYear.format('YY');
            year = newYear;
            domain.push(newYear);
        }
        //console.log(domain)
    } else {
        domain = _.range(minFormat, maxFormat + 1);

    }

    // Scaling
    // ----------------------------------------------
    xScale = d3.scale.ordinal().rangePoints([MARGINS.left, WIDTH - MARGINS.right]).domain(domain);
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, maxStat]);

    let lineGen = d3.svg.line()
        .x((d) => xScale(d[format]))
        .y((d) => yScale(d.stat))

    // Draw Axis
    // ----------------------------------------------
    if (data.length) {
        xAxis = d3.svg.axis()
            .scale(xScale)

        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        viz.selectAll("g.x.axis")
            .transition().delay(100).duration(1000)
            .call(xAxis)
            .selectAll("text")
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")

        viz.selectAll("g.y.axis")
            .transition().delay(100).duration(1000)
            .call(yAxis);

    }

    // Draw Paths
    // ----------------------------------------------
    const players = viz.selectAll(".player path")
        .data(data, (d) => d.id + d.category);

    players.exit().transition().duration(1000).style("opacity", 0).remove();

    players
        .transition().duration(1000)
        .attr('d', (d) => {
            return lineGen(d.seasons)
        })
        .attr("stroke-dasharray", () => console.log());

    const playersEnter = players.enter()
        .append("g")
        .attr("class", "player");

    const path = playersEnter.append("path")
        .attr('d', (d) => {
            return lineGen(d.seasons)
        })
        .attr("class", "line")
        .style("stroke", (d) => {
            let counts = (_.countBy(d.seasons, (season) => season.team));
            return TEAM_COLORS[Object.keys(counts).reduce(function(a, b){ return counts[a] > counts[b] ? a : b })];
        })
        .attr('stroke-width', 3)
        .attr('fill', 'none');

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
    // ----------------------------------------------
    const dots = viz.selectAll("g.dot")
        .data(data, (d) => d.id + d.category);

    dots.exit().remove();

    const dotsEnter = dots.enter()
        .append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data((d) => d.seasons)

    console.log(viz.selectAll("g.dot circle"));
    viz.selectAll("g.dot circle")
        .transition().duration(1000)
        .attr("cx", (d, i) => {
            return xScale(d[format])
        })
        .attr("cy", (d, i) => yScale(d.stat));

    dotsEnter
        .enter().append("circle")
        .attr("r", 4)
        .attr("fill", (d) => TEAM_COLORS[d.team])
        .style("stroke", (d) => TEAM_COLORS[d.team])
        .transition().duration(10000)
        .attr("cx", (d, i) => xScale(d[format]))
        .attr("cy", (d, i) => yScale(d.stat));
}


