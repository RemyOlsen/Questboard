import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { fetchQuests } from "../api/quests";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    fetchQuests()
      .then((quests) => console.log("Quests:", quests))
      .catch((error) => console.error("Errow fetching quests", error));
  });

  return (
    <div>
      Hello "/test"! <br /> Check the Browser Console{" "}
    </div>
  );
}
