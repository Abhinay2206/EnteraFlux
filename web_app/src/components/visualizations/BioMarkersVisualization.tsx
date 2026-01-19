import { useEffect, useState } from 'react';

export default function BioMarkersVisualization() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            setTime((prev) => prev + 0.005);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Fixed set of nodes
    const nodes = [
        { id: 1, x: 100, y: 100, r: 6, color: 'text-primary-500' },
        { id: 2, x: 250, y: 80, r: 8, color: 'text-secondary-500' },
        { id: 3, x: 180, y: 200, r: 5, color: 'text-success-500' },
        { id: 4, x: 350, y: 180, r: 7, color: 'text-warning-500' },
        { id: 5, x: 450, y: 100, r: 6, color: 'text-primary-400' },
        { id: 6, x: 300, y: 250, r: 5, color: 'text-secondary-400' },
        { id: 7, x: 120, y: 250, r: 7, color: 'text-success-400' },
    ];

    // Calculate dynamic position based on time
    const getPos = (node: any) => {
        const dx = Math.sin(time + node.id) * 20;
        const dy = Math.cos(time * 0.5 + node.id) * 20;
        return { x: node.x + dx, y: node.y + dy };
    };

    const currentNodes = nodes.map(n => ({ ...n, ...getPos(n) }));

    const connections = [
        [0, 1], [0, 2], [1, 2], [1, 3], [1, 5], [2, 6], [3, 4], [3, 5], [4, 5], [5, 6]
    ];

    return (
        <div className="w-full h-full min-h-[300px] bg-neutral-900 rounded-2xl border border-neutral-700 overflow-hidden relative shadow-2xl">
            {/* Radial Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),rgba(0,0,0,0))]" />

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 350">
                {/* Connections */}
                {connections.map(([i, j], idx) => {
                    const p1 = currentNodes[i];
                    const p2 = currentNodes[j];
                    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    const opacity = Math.max(0, 1 - dist / 250); // Fade out if too far

                    return (
                        <line
                            key={idx}
                            x1={p1.x}
                            y1={p1.y}
                            x2={p2.x}
                            y2={p2.y}
                            className="stroke-neutral-600"
                            strokeWidth="1"
                            strokeOpacity={opacity * 0.5}
                        />
                    );
                })}

                {/* Nodes */}
                {currentNodes.map((node, i) => (
                    <g key={i} transform={`translate(${node.x}, ${node.y})`}>
                        <circle r={node.r + 4} className="fill-white/5 animate-pulse" />
                        <circle r={node.r} className={`${node.color} fill-current`} />
                    </g>
                ))}
            </svg>

            <div className="absolute top-4 right-4 text-right">
                <div className="text-xs font-mono text-primary-400 mb-1">BIOMARKER ANALYSIS</div>
                <div className="text-[10px] text-neutral-500 font-mono">SEQ: {Math.floor(time * 100)}</div>
            </div>
        </div>
    );
}
