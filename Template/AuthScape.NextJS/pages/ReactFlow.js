import React, { useState } from "react";
import ReactFlow from "react-flow-renderer";
import { Card, CardContent, Typography } from "@mui/material";

function App() {
  const [elements, setElements] = useState([
    {
      id: "1",
      type: "input",
      data: { label: "1" },
      position: { x: 100, y: 100 },
    },
    {
      id: "2",
      type: "default",
      data: { label: "2" },
      position: { x: 250, y: 100 },
    },
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ]);

  return (
    <div>
      <h1>React Flow with MUI Cards</h1>
      <div style={{ height: 400 }}>
        <ReactFlow elements={elements} style={{ width: "100%", height: "100%" }} />
        {elements.map((element) => {
          if (element.data && element.data.label) {
            return (
              <Card key={element.id} sx={{ width: 100, height: 100, margin: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CardContent>
                  <Typography variant="h5">{element.data.label}</Typography>
                </CardContent>
              </Card>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
