import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.css']
})
export class MultiLineChartComponent implements OnInit {
  private data;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private xAxis;
  private yAxis;
  private line;
  private color;
  private svg;
  private varNames;
  private labelVar;
  private seriesData;
  constructor() { }

  ngOnInit() {
    this.data = 
      [
        {
          "quarter": "Q1-08",
          "ANGEL": 339,
          "SERIES-A": 345,
          "SERIES-B": 186,
          "SERIES-C+": 130,
          "VENTURE": 233
        },
        {
          "quarter": "Q2-08",
          "ANGEL": 197,
          "SERIES-A": 272,
          "SERIES-B": 169,
          "SERIES-C+": 145,
          "VENTURE": 197
        },
        {
          "quarter": "Q3-08",
          "ANGEL": 163,
          "SERIES-A": 207,
          "SERIES-B": 140,
          "SERIES-C+": 108,
          "VENTURE": 151
        },
        {
          "quarter": "Q4-08",
          "ANGEL": 120,
          "SERIES-A": 166,
          "SERIES-B": 128,
          "SERIES-C+": 86,
          "VENTURE": 188
        },
        {
          "quarter": "Q1-09",
          "ANGEL": 320,
          "SERIES-A": 203,
          "SERIES-B": 123,
          "SERIES-C+": 121,
          "VENTURE": 245
        },
        {
          "quarter": "Q2-09",
          "ANGEL": 225,
          "SERIES-A": 145,
          "SERIES-B": 105,
          "SERIES-C+": 123,
          "VENTURE": 208
        },
        {
          "quarter": "Q3-09",
          "ANGEL": 237,
          "SERIES-A": 157,
          "SERIES-B": 112,
          "SERIES-C+": 98,
          "VENTURE": 278
        },
        {
          "quarter": "Q4-09",
          "ANGEL": 190,
          "SERIES-A": 231,
          "SERIES-B": 146,
          "SERIES-C+": 109,
          "VENTURE": 569
        },
        {
          "quarter": "Q1-10",
          "ANGEL": 447,
          "SERIES-A": 288,
          "SERIES-B": 164,
          "SERIES-C+": 116,
          "VENTURE": 981
        },
        {
          "quarter": "Q2-10",
          "ANGEL": 309,
          "SERIES-A": 230,
          "SERIES-B": 135,
          "SERIES-C+": 159,
          "VENTURE": 893
        },
        {
          "quarter": "Q3-10",
          "ANGEL": 339,
          "SERIES-A": 262,
          "SERIES-B": 144,
          "SERIES-C+": 131,
          "VENTURE": 891
        },
        {
          "quarter": "Q4-10",
          "ANGEL": 322,
          "SERIES-A": 283,
          "SERIES-B": 118,
          "SERIES-C+": 148,
          "VENTURE": 835
        },
        {
          "quarter": "Q1-11",
          "ANGEL": 622,
          "SERIES-A": 321,
          "SERIES-B": 165,
          "SERIES-C+": 150,
          "VENTURE": 937
        },
        {
          "quarter": "Q2-11",
          "ANGEL": 497,
          "SERIES-A": 326,
          "SERIES-B": 146,
          "SERIES-C+": 147,
          "VENTURE": 887
        },
        {
          "quarter": "Q3-11",
          "ANGEL": 642,
          "SERIES-A": 372,
          "SERIES-B": 165,
          "SERIES-C+": 136,
          "VENTURE": 752
        },
        {
          "quarter": "Q4-11",
          "ANGEL": 602,
          "SERIES-A": 354,
          "SERIES-B": 152,
          "SERIES-C+": 109,
          "VENTURE": 721
        },
        {
          "quarter": "Q1-12",
          "ANGEL": 892,
          "SERIES-A": 375,
          "SERIES-B": 135,
          "SERIES-C+": 146,
          "VENTURE": 808
        },
        {
          "quarter": "Q2-12",
          "ANGEL": 728,
          "SERIES-A": 376,
          "SERIES-B": 152,
          "SERIES-C+": 151,
          "VENTURE": 819
        },
        {
          "quarter": "Q3-12",
          "ANGEL": 794,
          "SERIES-A": 354,
          "SERIES-B": 118,
          "SERIES-C+": 143,
          "VENTURE": 771
        },
        {
          "quarter": "Q4-12",
          "ANGEL": 730,
          "SERIES-A": 320,
          "SERIES-B": 123,
          "SERIES-C+": 125,
          "VENTURE": 715
        },
        {
          "quarter": "Q1-13",
          "ANGEL": 1053,
          "SERIES-A": 404,
          "SERIES-B": 147,
          "SERIES-C+": 144,
          "VENTURE": 608
        },
        {
          "quarter": "Q2-13",
          "ANGEL": 925,
          "SERIES-A": 502,
          "SERIES-B": 166,
          "SERIES-C+": 140,
          "VENTURE": 733
        },
        {
          "quarter": "Q3-13",
          "ANGEL": 986,
          "SERIES-A": 576,
          "SERIES-B": 202,
          "SERIES-C+": 175,
          "VENTURE": 596
        },
        {
          "quarter": "Q4-13",
          "ANGEL": 693,
          "SERIES-A": 506,
          "SERIES-B": 198,
          "SERIES-C+": 161,
          "VENTURE": 1015
        }
      ];
    this.init();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
    this.drawLegend();
  }

  init() {
    this.margin = {top: 20, right: 55, bottom: 30, left: 40},
    this.width  = 1000 - this.margin.left - this.margin.right,
    this.height = 500  - this.margin.top  - this.margin.bottom;

    this.xScale = d3.scaleBand()
        .rangeRound([0, this.width])
        .padding(0.1);

    this.yScale = d3.scaleLinear()
        .rangeRound([this.height, 0]);

    this.xAxis = d3.axisBottom(this.xScale);

    this.yAxis = d3.axisLeft(this.yScale);

    this.line = d3.line()
        .curve(d3.curveCardinal)
        .x((d:any) =>  this.xScale(d.label) + this.xScale.bandwidth() / 2 )
        .y((d:any) =>  this.yScale(d.value) );

    // this.color = d3.scaleOrdinal()
    //     .range(["#001c9c","#101b4d","#475003","#9c8305","#d3c47c"]);
    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    this.svg = d3.select("body").append("svg")
        .attr("width",  this.width  + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top  + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.labelVar = 'quarter';
    this.varNames = d3.keys(this.data[0]).filter((key) => key !== this.labelVar);
    this.color.domain(this.varNames);

    this.seriesData = this.varNames.map((name) => {
      return {
        name: name,
        values: this.data.map((d) => {
          return {name: name, label: d[this.labelVar], value: +d[name]};
        })
      };
    });

    this.xScale.domain(this.data.map((d) => d.quarter));
    this.yScale.domain([
      d3.min(this.seriesData, (c:any) => { 
        return d3.min(c.values, (d:any) => d.value);
      }),
      d3.max(this.seriesData, (c:any) => { 
        return d3.max(c.values, (d:any) => d.value);
      })
    ]);
        
  }

  drawXAxis(){
    this.xAxis = this.svg.append('g')
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.xAxis);
  }

  drawYAxis(){
    this.yAxis = this.svg.append('g')
      .attr("class", "y axis")
        .call(this.yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "black")
        .text("Number of Rounds");
  }

  populate(){
    
    let series = this.svg.selectAll(".series")
        .data(this.seriesData)
      .enter().append("g")
        .attr("class", "series");

    series.append("path")
      .attr("class", "line")
      .attr("d", (d) => this.line(d.values))
      .style("stroke", (d) => this.color(d.name))
      .style("stroke-width", "4px")
      .style("fill", "none");

    series.selectAll(".point")
      .data((d) => d.values)
      .enter().append("circle")
        .attr("class", "point")
        .attr("cx", (d) => this.xScale(d.label) + this.xScale.bandwidth()/2)
        .attr("cy", (d) => this.yScale(d.value))
        .attr("r", "3px")
        .style("fill", (d) => this.color(d.name))
        .style("stroke", "grey")
        .style("stroke-width", "2px");
  }

  drawLegend(){
    let legend = this.svg.selectAll(".legend")
            .data(this.varNames.slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => "translate(55," + i * 20 + ")" );

        legend.append("rect")
            .attr("x", this.width - 10)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", this.color)
            .style("stroke", "grey");

        legend.append("text")
            .attr("x", this.width - 12)
            .attr("y", 6)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text((d) => d);
  }

}
