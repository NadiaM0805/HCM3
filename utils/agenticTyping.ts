export async function typeIntoElement(
  el: HTMLInputElement | HTMLTextAreaElement,
  text: string,
  delay = 50
) {
  el.focus();
  el.value = "";

  for (let i = 0; i < text.length; i++) {
    el.value = text.slice(0, i + 1);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    await new Promise((res) => setTimeout(res, delay));
  }
}

