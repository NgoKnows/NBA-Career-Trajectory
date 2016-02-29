import { formatStats } from './formatting'
import { TEAM_COLORS } from './constants'
import _ from 'lodash'
import moment from 'moment'

let reduxActions;
const WIDTH = 800;
const HEIGHT = 500;
const MARGINS = {
    top: 20,
    right: 30,
    bottom: 20,
    left: 50
};

export function init(actions) {
    const viz = d3.select('#viz');
    reduxActions = actions;

    // Beginning Scaling
    // --------------------------------------------------
    const xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, 10]);
    const yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 10000]);

   // Draw Axis
   // --------------------------------------------------
    const xAxis = d3.svg.axis()
        .scale(xScale)

    const yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

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
    const data = playerStats.map((player) => formatStats(player, category));

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
        let year = minFormat;
        domain = [minFormat];

        while (year !== maxFormat) {
            const nextYear = moment([year.substring(0, 4)]).add(1, 'year');
            const nextNextYear = moment([year.substring(0, 4)]).add(2, 'year');
            const newYear = nextYear.format('YYYY') + '-' + nextNextYear.format('YY');
            year = newYear;
            domain.push(newYear);
        }
    } else {
        domain = _.range(minFormat, maxFormat + 1);
    }

    // Scaling
    // ----------------------------------------------
    const xScale = d3.scale.ordinal().rangePoints([MARGINS.left, WIDTH - MARGINS.right]).domain(domain);
    const yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, maxStat]);

    let lineGen = d3.svg.line()
        .x((d) => xScale(d[format]))
        .y((d) => yScale(d.stat))

    // Draw Axis
    // ----------------------------------------------
    if (data.length) {
        const xAxis = d3.svg.axis()
            .scale(xScale)

        const yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        viz.selectAll("g.x.axis")
            .transition().delay(100).duration(1000)
            .call(xAxis)
            .selectAll("text")
            .attr("dy", ".35em")
            .attr("transform", (d) => {
                if (format === 'year' && domain.length > 12) {
                    return "rotate(50)" + " translate(30," + 0 + ")";
                } else {
                    return "rotate(0)" + " translate(0," + 10 + ")";
                }
            });

        viz.selectAll("g.y.axis")
            .transition().delay(100).duration(1000)
            .call(yAxis);
    }

    // Draw Paths
    // ----------------------------------------------
    const players = viz.selectAll(".player path")
        .data(data, (d) => d.id);

    players.exit().transition().duration(1000).style("opacity", 0).remove();

    players
        .transition().duration(1000)
        .attr('d', (d) => {
            return lineGen(d.seasons)
        })
        .attr("stroke-dasharray", () => {
        });

    const playersEnter = players.enter()
        .append("g")
        .attr("class", "player");

    const path = playersEnter.append("path")
        .attr('d', (d) => lineGen(d.seasons))
        .attr("class", "line")
        .style("stroke", (d) => {
            let counts = (_.countBy(d.seasons, (season) => season.team));
            return TEAM_COLORS[Object.keys(counts).reduce((a, b) =>counts[a] > counts[b] ? a : b)];
        })
        .attr('stroke-width', 6.5)
        .attr('fill', 'none')
        .on("mouseover", (player) => {
            const { id, name } = player;

            reduxActions.setHoveringPlayer({id, name});

            d3.selectAll('.player')
                .classed('notSelected', (p) =>  p.name !== name )
            d3.selectAll('g.dot')
                .classed('notSelected', (p) =>  p.name !== name )
        })
        .on("mouseout", (player) => {
            reduxActions.setHoveringPlayer({});

            d3.selectAll('.player')
                .classed('notSelected', (b) => false )
            d3.selectAll('g.dot')
                .classed('notSelected', (player) =>  false )
        })


    //animate line drawing
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
        .data(data, (d) => d.id);

    const dotsEnter = dots.enter()
        .append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data((d) => d.seasons, (d, i) => d.id + ' ' + i)

    dots.exit().remove();

    dotsEnter
        .enter().append("circle")
        .attr("r", 7)
        .attr("fill", (d) => TEAM_COLORS[d.team])
        .style("stroke", (d) => TEAM_COLORS[d.team])
        .attr("cx", (d, i) => xScale(d[format]))
        .attr("cy", (d, i) => yScale(d.stat))
        .on("mouseover", (player) => {
            const { id, name } = player;

            reduxActions.setHoveringPlayer({id, name, stats: player});

            d3.selectAll('.player')
                .classed('notSelected', (p) =>  p.name !== name )
            d3.selectAll('g.dot')
                .classed('notSelected', (p) =>  p.name !== name )
        })
        .on("mouseout", (player) => {
            reduxActions.setHoveringPlayer({});

            d3.selectAll('.player')
                .classed('notSelected', (b) => false )
            d3.selectAll('g.dot')
                .classed('notSelected', (player) =>  false )
        })


    viz.selectAll("g.dot").selectAll("circle").data((d) => {
        return d.seasons;
    });

    viz.selectAll("g.dot circle")
        .transition().duration(1000)
        .attr("cx", (d, i) => xScale(d[format]))
        .attr("cy", (d, i) => yScale(d.stat));
}


