import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GridHighlightProps {
  children?: React.ReactNode;
  className?: string;
  rows?: number;
  cols?: number;
  gap?: number;
  highlightColor?: string;
  lineColor?: string;
  lineWidth?: number;
  transition?: number;
}


const GridHighlight : React.FC<GridHighlightProps> = ({
  className,
  rows = 5,
  cols = 5,
  highlightColor = "rgba(255, 255, 255, 1)",
  lineColor = "rgba(255, 255, 255, 0.1)",
  lineWidth = 1,
  transition = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedCell, setHighlightedCell] = useState<{ row: number; col: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions when container changes size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const cellWidth = dimensions.width / cols;
  const cellHeight = dimensions.height / rows;

  // Function to get highlight cell style
  const getHighlightStyle = useCallback(() => {
    if (highlightedCell) {
      const { row, col } = highlightedCell;
      return {
        left: col * cellWidth,
        top: row * cellHeight,
        width: cellWidth,
        height: cellHeight,
        backgroundColor: highlightColor,
        transition: `all ${transition}s ease`,
        position: "absolute",
        pointerEvents: "none",
        opacity: 1,
        zIndex: 1,
      };
    }
    return {
      opacity: 0,
      transition: `opacity ${transition}s ease`,
      position: "absolute",
      pointerEvents: "none",
      width: cellWidth,
      height: cellHeight,
      zIndex: 1,
    };
  }, [highlightedCell, cellWidth, cellHeight, highlightColor, transition]);

  // Handle cell hover
  const handleCellHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);

      // Check boundaries
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        setHighlightedCell({ row, col });
      } else {
        setHighlightedCell(null);
      }
    },
    [cellWidth, cellHeight, rows, cols]
  );

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setHighlightedCell(null);
  }, []);

  // Create grid lines
  const gridLines = [];

  // Vertical lines
  for (let i = 0; i <= cols; i++) {
    gridLines.push(
      <div
        key={`v${i}`}
        style={{
          position: "absolute",
          backgroundColor: lineColor,
          left: i * cellWidth - lineWidth / 2,
          top: 0,
          width: `${lineWidth}px`,
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= rows; i++) {
    gridLines.push(
      <div
        key={`h${i}`}
        style={{
          position: "absolute",
          backgroundColor: lineColor,
          left: 0,
          top: i * cellHeight - lineWidth / 2,
          width: "100%",
          height: `${lineWidth}px`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onMouseMove={handleCellHover}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }} />

      {/* No more children within GridHighlight component */}

      {/* Grid lines */}
      {gridLines}

      {/* Highlight cell */}
      <div style={getHighlightStyle() as React.CSSProperties} />
    </div>
  );
};

const InteractiveGrid: React.FC<GridHighlightProps> = (props) => {
  const { className, children, ...gridProps } = props;

  return (
    <div className={cn("relative w-full h-64", className)}>
      {/* Grid always in background with absolute positioning */}
      <GridHighlight {...gridProps} className="absolute inset-0" />
      {/* Children always rendered above the grid with higher z-index */}
      {children && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="pointer-events-none">{children}</div>
        </div>
      )}
    </div>
  );
};
export default InteractiveGrid;
