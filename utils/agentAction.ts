import { highlight } from "./highlightElement";
import { typeIntoElement } from "./agenticTyping";

export async function agentAction(
  el: HTMLElement,
  action: () => Promise<void>
) {
  await highlight(el);
  await action();
}

