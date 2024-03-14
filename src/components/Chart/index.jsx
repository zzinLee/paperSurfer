import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Chart ({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const width = 840;
    const height = 600;
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 3, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const link = svg
      .append("g")
      .attr("stroke", "#bab9bb")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 2.0)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .attr("fill", "#ffcf21")
      .attr("stroke", "#bab9bb")
      .attr("stroke-width", 1.2)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", (d) => (d.children ? null : "#ebecea"))
      .attr("stroke", (d) => (d.children ? null : "#ffcf21"))
      .attr("r", 5)
      .call(drag(simulation));

    const text = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.data.title)
      .attr("x", (d) => d.x + 10)
      .attr("y", (d) => d.y - 10)
      .attr("fill", "black")
      .attr("font-size", 10);

    node.append("title").text((d) => d.data.title);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      text.attr("x", (d) => d.x + 10).attr("y", (d) => d.y - 10);
    });

    return () => {
      svg.selectAll("*").remove();
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="p-20 m-12 bg-white rounded-md">
      <svg ref={chartRef}></svg>
    </div>
  );
}

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) {
      simulation.alphaTarget(0.3).restart();
    }

    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) {
      simulation.alphaTarget(0);
    }

    d.fx = null;
    d.fy = null;
  }

  return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
}

export default Chart;
