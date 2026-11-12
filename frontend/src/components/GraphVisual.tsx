export function GraphVisual() {
  const nodes = [
    [72, 138], [142, 74], [206, 166], [284, 104], [354, 184], [424, 72], [500, 146],
  ]
  const edges = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 5], [4, 5], [4, 6], [5, 6]]

  return (
    <div className="graph-frame" aria-hidden="true">
      <div className="graph-meta"><span>G = (V, E)</span><span>neighborhood / 02</span></div>
      <svg viewBox="0 0 570 250" role="presentation">
        {edges.map(([from, to], index) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from][0]}
            y1={nodes[from][1]}
            x2={nodes[to][0]}
            y2={nodes[to][1]}
            className="graph-edge"
            style={{ animationDelay: `${index * 90}ms` }}
          />
        ))}
        {nodes.map(([x, y], index) => (
          <g key={`${x}-${y}`} className="graph-node" style={{ animationDelay: `${350 + index * 110}ms` }}>
            <circle cx={x} cy={y} r={index === 3 ? 9 : 5} />
            <text x={x + 11} y={y - 10}>v{index + 1}</text>
          </g>
        ))}
      </svg>
      <p>topology → aggregation → representation</p>
    </div>
  )
}
