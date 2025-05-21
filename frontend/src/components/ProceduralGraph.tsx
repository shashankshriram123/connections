'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { GraphData, LinkObject, NodeObject } from 'react-force-graph-2d';
import * as d3 from 'd3-force';

// only load in browser
const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d').then((m) => m.default),
  { ssr: false }
);

export default function ProceduralGraph() {
  const fgRef = useRef<any>(null);
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const [dims, setDims] = useState({ width: 0, height: 0 });

  // 1) Track viewport size
  useEffect(() => {
    const onResize = () =>
      setDims({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const halfW = dims.width / 2;

  // 2) Seed 5 fully-connected nodes on the right half
  useEffect(() => {
    if (!halfW || !dims.height) return;
    const seeds: NodeObject[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: halfW * (0.6 + Math.random() * 0.4),
      y: dims.height * Math.random(),
    }));
    const links: LinkObject[] = [];
    for (let i = 0; i < seeds.length; i++) {
      for (let j = i + 1; j < seeds.length; j++) {
        links.push({ source: seeds[i].id, target: seeds[j].id });
      }
    }
    setData({ nodes: seeds, links });
  }, [halfW, dims.height]);

  // 3) Configure forces once for a gentle layout
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !halfW || !dims.height) return;

    fg.d3Force('center', null);
    fg.d3Force('charge', d3.forceManyBody().strength(-5).theta(0.9).distanceMax(300));
    fg.d3Force('link', d3.forceLink().distance(120).strength(0.2));
    fg.d3Force('collide', d3.forceCollide(20).strength(0.5));
    fg.d3Force('x', d3.forceX(halfW * 0.8).strength(0.005));
    fg.d3Force('y', d3.forceY(dims.height * 0.5).strength(0.005));

    if (typeof fg.d3AlphaDecay === 'function') fg.d3AlphaDecay(0.005);
    if (typeof fg.d3VelocityDecay === 'function') fg.d3VelocityDecay(0.5);
  }, [halfW, dims.height]);

  // 4) Grow procedurally, max 4 outgoing, random delay
  useEffect(() => {
    if (!halfW || !dims.height) return;
    let canceled = false;

    function spawn() {
      const delay = 1000 + Math.random() * 3000; // 1–4s
      setTimeout(() => {
        if (canceled) return;

        // must bail if graph gone
        const fg = fgRef.current;
        if (!fg) return;

        // spawn new node + links
        setData((prev) => {
          const nextId = prev.nodes.length;
          const parent = prev.nodes[Math.floor(Math.random() * prev.nodes.length)];
          const newNode: NodeObject = { id: nextId, x: parent.x, y: parent.y };

          const maxTargets = Math.min(prev.nodes.length, 4);
          const count = 1 + Math.floor(Math.random() * maxTargets);
          const targets = new Set<number>();
          while (targets.size < count) {
            const rnd = prev.nodes[Math.floor(Math.random() * prev.nodes.length)].id as number;
            if (rnd !== nextId) targets.add(rnd);
          }
          const newLinks: LinkObject[] = Array.from(targets).map((t) => ({
            source: nextId,
            target: t,
          }));

          return {
            nodes: [...prev.nodes, newNode],
            links: [...prev.links, ...newLinks],
          };
        });

        // gently re-heat for smooth expansion
        if (typeof fg.d3ReheatSimulation === 'function') {
          fg.d3ReheatSimulation();
        }

        spawn();
      }, delay);
    }

    spawn();
    return () => {
      canceled = true;
    };
  }, [halfW, dims.height]);

  if (!halfW || !dims.height) return null;

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      width={halfW}
      height={dims.height}
      nodeAutoColorBy="id"
      nodeLabel="id"
      linkColor={() => 'rgba(255,255,255,0.2)'}
      linkWidth={1}
      linkDirectionalArrowLength={0}
      linkDirectionalParticles={0}
      enablePanInteraction={false}
      enableZoomInteraction={false}
    />
  );
}
