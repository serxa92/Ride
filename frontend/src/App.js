import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            color: "#f5f5f5",
            border: "1px solid #1f1f1f",
            borderRadius: 0,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
        }}
      />
    </div>
  );
}

export default App;
