export function myAlert(message: string) {
  const div = document.createElement("div");
  div.classList.add("alert");
  div.textContent = message;
  document.querySelector<HTMLDivElement>("#messages")?.appendChild(div);
  setTimeout(() => {
    div.classList.add("hide");
    setTimeout(() => {
      div.remove();
    }, 300);
  }, 2000);
}
