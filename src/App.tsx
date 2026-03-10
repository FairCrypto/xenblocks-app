import { Routes, Route } from "react-router";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import Home from "@/routes/Home";
import Leaderboard from "@/routes/Leaderboard";
import LeaderboardSlug from "@/routes/LeaderboardSlug";

export default function App() {
  return (
    <ThemeProvider>
      <ClientThemeWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/leaderboard/:slug" element={<LeaderboardSlug />} />
        </Routes>
      </ClientThemeWrapper>
    </ThemeProvider>
  );
}
