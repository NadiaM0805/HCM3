export async function highlight(el: HTMLElement, duration = 800) {
  el.classList.add("agentic-highlight");
  await new Promise((res) => setTimeout(res, duration));
  el.classList.remove("agentic-highlight");
}

