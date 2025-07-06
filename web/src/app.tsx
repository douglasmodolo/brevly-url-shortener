import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Redirect } from "./pages/Redirect";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/r/:shortenedLink" element={<Redirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
