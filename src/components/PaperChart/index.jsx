import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import Modal from "../../components/shared/Modal";
import PaperNodeCard from "../PaperNodeCard";
import LoadingCircle from "../shared/LoadingCircle";

import { PALETTE, STATUS } from "../../utils/constants";

function PaperChart({ data }) {
  const chartRef = useRef(null);
  const nodeRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function doubleClick(ev, d) {
    nodeRef.current = d.data;

    if (nodeRef.current.doi === "none") {
      return;
    }

    setIsModalOpen(true);
  }

  useEffect(() => {
    const width = "1000";
    const height = "600";
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
          .distance(0.7)
          .strength(1.5)
      )
      .force("charge", d3.forceManyBody().strength(-700))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const link = svg
      .append("g")
      .attr("stroke", PALETTE.GRAY)
      .attr("stroke-opacity", 0.8)
      .attr("stroke-width", 1.8)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", (d) => d.data.status)
      .attr("stroke", (d) => getStrokeColor(d.data.status))
      .attr("stroke-width", 1.2)
      .attr("r", (d) => getNodeRadius(d.data.citations))
      .call(drag(simulation))
      .on("dblclick", doubleClick);

    const text = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => getTitleText(d.data.title))
      .attr("x", (d) => d.x + 10)
      .attr("y", (d) => d.y - 10)
      .attr("fill", (d) => getTextColor(d.data.status))
      .attr("font-weight", (d) => (d.children ? "bold" : "regular"))
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
    <>
      <div className="p-20 m-12 bg-white rounded-md">
        {isModalOpen && (
          <Modal>
            <PaperNodeCard
              nodeData={nodeRef.current}
              setModalOpen={setIsModalOpen}
              setIsLoadingChild={setIsLoading}
            />
          </Modal>
        )}
        {isLoading && (
          <Modal>
            <LoadingCircle />
          </Modal>
        )}
        <svg ref={chartRef}></svg>
      </div>
    </>
  );
}

function drag(simulation) {
  function dragstarted(ev, d) {
    if (!ev.active) {
      simulation.alphaTarget(0.3).restart();
    }

    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(ev, d) {
    d.fx = ev.x;
    d.fy = ev.y;
  }

  function dragended(ev, d) {
    if (!ev.active) {
      simulation.alphaTarget(0);
    }

    d.fx = null;
    d.fy = null;
  }

  return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
}

function getNodeRadius(citations) {
  const radiusLimit = [
    [1, 5],
    [10, 8],
    [50, 12],
    [100, 18],
    [200, 24],
    [Infinity, 28]
  ];

  for (const [limit, radius] of radiusLimit) {
    if (!citations) {
      return 5;
    }

    if (citations <= limit) {
      return radius;
    }
  }
}

function getTextColor(status) {
  switch (status) {
    case STATUS.DEFAULT:
      return PALETTE.BLACK;

    case STATUS.STAR:
      return PALETTE.BLUE;

    case STATUS.READ:
      return PALETTE.GRAY;
  }
}

function getStrokeColor(status) {
  return (status === STATUS.DEFAULT) ? PALETTE.GRAY : status;
}

function getTitleText(text) {
  const MAX_LENGTH = 30;

  return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;
}

export default PaperChart;
