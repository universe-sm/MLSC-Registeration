
const fields = document.querySelectorAll("input, textarea");
const fakeCaret = document.createElement("div");
fakeCaret.classList.add("fake-caret");
document.body.appendChild(fakeCaret);

fields.forEach(field => {
  field.addEventListener("focus", () => {
    fakeCaret.style.display = "block";
    updateCaret(field);
  });

  field.addEventListener("blur", () => {
    fakeCaret.style.display = "none";
  });

  ["input", "click", "keyup"].forEach(evt => {
    field.addEventListener(evt, () => updateCaret(field));
  });
});

function updateCaret(field) {
  const { selectionStart } = field;
  const style = getComputedStyle(field);

  // Build mirror span
  const mirror = document.createElement("span");
  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.whiteSpace = "pre";
  mirror.style.font = style.font;
  mirror.style.fontSize = style.fontSize;
  mirror.style.fontFamily = style.fontFamily;
  mirror.style.letterSpacing = style.letterSpacing;

  // Fake container for alignment
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.visibility = "hidden";
  container.style.whiteSpace = "pre";
  container.style.font = style.font;
  container.style.width = style.width;
  container.style.padding = style.padding;
  container.style.border = style.border;

  // Text up to caret
  mirror.textContent = field.value.substring(0, selectionStart) || ".";
  container.appendChild(mirror);
  document.body.appendChild(container);

  const mirrorRect = mirror.getBoundingClientRect();
  const fieldRect = field.getBoundingClientRect();

  // Place Mario correctly
  fakeCaret.style.left = `${fieldRect.left + mirrorRect.width-3}px`;
  fakeCaret.style.top = `${fieldRect.top + (fieldRect.height - 20) / 2}px`;

  container.remove();
}

