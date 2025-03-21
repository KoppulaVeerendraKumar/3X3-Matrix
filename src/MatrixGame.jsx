import { useState } from "react";

export default function MatrixGame() {
  
  const [matrix, setMatrix] = useState(
    Array(3).fill(null).map(() => Array(3).fill("white"))
  );

  const [clickSequence, setClickSequence] = useState([]); 

  const handleClick = (row, col) => {
    if (matrix[row][col] !== "white") return; 

    
    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? "green" : c))
    );

    const newSequence = [...clickSequence, { row, col }];

    setMatrix(newMatrix);
    setClickSequence(newSequence);

   
    if (newSequence.length === 9) {
      setTimeout(() => applyOrangeEffect(newSequence), 500);
    }
  };

  const applyOrangeEffect = (sequence) => {
    sequence.forEach(({ row, col }, index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) =>
          prevMatrix.map((r, i) =>
            r.map((c, j) => (i === row && j === col ? "orange" : c))
          )
        );
      }, index * 500); 
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)", // Adjusted box size
          gap: "12px",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {matrix.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: "80px",
                height: "80px",
                border: "2px solid black",
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
