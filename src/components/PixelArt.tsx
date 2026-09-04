const PALETTE: Record<string, string> = {
  '.': 'transparent',
  b: '#1a1a2e',
  d: '#24243e',
  m: '#4a4a6a',
  h: '#7b68c4',
  l: '#e0e0f0',
  a: '#ff6b6b',
  w: '#ffffff',
}

export function PixelArt({
  rows,
  palette = PALETTE,
  className,
  label,
}: {
  rows: string[]
  palette?: Record<string, string>
  className?: string
  label?: string
}) {
  const w = Math.max(...rows.map((r) => r.length))
  const h = rows.length
  const cells: { x: number; y: number; c: string }[] = []
  rows.forEach((row, y) => {
    ;[...row].forEach((ch, x) => {
      const c = palette[ch]
      if (c && c !== 'transparent') cells.push({ x, y, c })
    })
  })
  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      preserveAspectRatio="xMidYMax slice"
      role={label ? 'img' : 'presentation'}
      aria-label={label}
    >
      {cells.map((cell, i) => (
        <rect key={i} x={cell.x} y={cell.y} width={1.02} height={1.02} fill={cell.c} />
      ))}
    </svg>
  )
}
