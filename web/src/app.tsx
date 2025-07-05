import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Redirect } from "./pages/Redirect";

export function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/r/:shortenedLink" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
