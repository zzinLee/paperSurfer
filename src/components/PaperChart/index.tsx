import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import Modal from "../shared/Modal";
import PaperNodeCard from "../PaperNodeCard";
import LoadingCircle from "../shared/LoadingCircle";

import { PALETTE, STATUS, NONE } from "../../utils/constants";
import { decodedString } from "../../utils/utils";

import type { RootConfig } from "../../types/interface";

const getStrokeColor = (status: string) => {
  return status === STATUS.DEFAULT ? PALETTE.GRAY : status;
};

const getTitleText = (text: string) => {
  const MAX_LENGTH = 20;

  return text.length > MAX_LENGTH ? decodedString(`${text.slice(0, MAX_LENGTH)}...`) : decodedString(text);
};

const getNodeRadius = (citations: number) => {
  const radiusLimit = [
    [1, 4],
    [10, 10],
    [50, 12],
    [100, 14],
    [200, 16],
    [400, 20],
    [800, 24],
    [Infinity, 18]
  ];

  let rad = 0;

  for (const [limit, radius] of radiusLimit) {
    if (!citations) {
      rad = 5;

      break;
    }

    if (citations <= limit) {
      rad = radius;
    }
  }

  return rad;
};

const getTextColor = (status: string) => {
  switch (status) {
    case STATUS.DEFAULT:
      return PALETTE.DARKER;

    case STATUS.STAR:
      return PALETTE.TEXT_POINT_PURPLE;

    case STATUS.READ:
      return PALETTE.TEXT_PURPLE;

    case STATUS.COLLECTION:
      return PALETTE.POINT_PURPLE;
  }
};

interface NodeData extends d3.HierarchyNode<RootConfig> {
  data: RootConfig;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

const drag = (simulation: d3.Simulation<NodeData, undefined>) => {
  const dragstarted = (ev: d3.D3DragEvent<SVGCircleElement, NodeData, NodeData>, d: NodeData): void => {
    if (!ev.active) {
      simulation.alphaTarget(0.3).restart();
    }

    d.fx = d.x;
    d.fy = d.y;
  };

  const dragged = (ev: d3.D3DragEvent<SVGCircleElement, NodeData, NodeData>, d: NodeData): void => {
    d.fx = ev.x;
    d.fy = ev.y;
  };

  const dragended = (ev: d3.D3DragEvent<SVGCircleElement, NodeData, NodeData>, d: NodeData): void => {
    if (!ev.active) {
      simulation.alphaTarget(0);
    }

    d.fx = null;
    d.fy = null;
  };

  return d3
    .drag<SVGCircleElement, NodeData>()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

interface PaperChartProps {
  data: RootConfig;
}

function PaperChart({ data }: PaperChartProps) {
  const chartRef = useRef(null);
  const nodeRef = useRef<null | RootConfig>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doubleClick = (ev: MouseEvent, d: d3.HierarchyNode<RootConfig>): void => {
    nodeRef.current = d.data;

    if (nodeRef.current && nodeRef.current.doi === NONE) {
      return;
    }

    setIsModalOpen(true);
  };

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;

    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
        .forceLink(links)
        .distance(1)
        .strength(0.7)
      )
      .force("charge", d3.forceManyBody().strength(-700))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(chartRef.current)
      .attr("width", width - 222)
      .attr("height", height)
      .attr("viewBox", [-width/2, -height/2, width, height])
      .attr("style", "max-width: 100%; max-height: 100%");

    const link = svg
      .append("g")
      .attr("stroke", PALETTE.GRAY)
      .attr("stroke-opacity", 0.8)
      .attr("stroke-width", 2.5)
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
      .attr("stroke-width", 1)
      .attr("r", (d) => getNodeRadius(d.data.citations))
      .on("dblclick", (ev, d) => doubleClick(ev, d))
      .call(drag(simulation) as any);

    const text = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => getTitleText(d.data.title))
      .attr("x", (d) => d.x as number+ 10)
      .attr("y", (d) => d.y as number - 10)
      .attr("fill", (d) => getTextColor(d.data.status) as string)
      .attr("font-weight", (d) => (d.children ? "bold" : "regular"))
      .attr("font-size", 10);

    node.append("title").text((d) => getTitleText(d.data.title)) ;

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x as number)
        .attr("y1", (d) => d.source.y as number)
        .attr("x2", (d) => d.target.x as number)
        .attr("y2", (d) => d.target.y as number);

      node.attr("cx", (d) => d.x as number).attr("cy", (d) => d.y as number);
      text.attr("x", (d) => d.x as number + 10).attr("y", (d) => d.y as number - 10);
    });

    return () => {
      svg.selectAll("*").remove();
      simulation.stop();
    };
  }, [data]);

  return (
    <>
      <div className="w-full h-full p-20 m-12 rounded-md">
        {isModalOpen && (
          <Modal setModal={setIsModalOpen}>
            {nodeRef.current &&
              <PaperNodeCard
                nodeData={nodeRef.current}
                setModalOpen={setIsModalOpen}
                setIsLoadingChild={setIsLoading}
              />
            }
          </Modal>
        )}
        {isLoading && (<Modal><LoadingCircle /></Modal>)}
        <svg ref={chartRef}></svg>
      </div>
    </>
  );
}

export default PaperChart;
