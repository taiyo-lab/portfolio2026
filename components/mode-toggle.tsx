"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full self-center"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem] align-middle transition-all" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] align-middle transition-all" />
      )}
    </Button>
  );
}
