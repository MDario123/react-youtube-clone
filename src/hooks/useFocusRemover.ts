import { useEffect } from "react";

// Remove focus on Escape key down
export function useFocusRemover() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement | null;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
