export async function highlight(el: HTMLElement, duration = 800) {
  if (typeof window === "undefined" || !el) return;
  
  el.classList.add("agentic-highlight");
  await new Promise((res) => setTimeout(res, duration));
  el.classList.remove("agentic-highlight");
}

