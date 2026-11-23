"use strict";
const rounds = 600000;
const context = "firefly-work-log/v1:";
const host = document.querySelector("main[data-date]");
const gate = document.getElementById("gate");
const input = document.getElementById("secret");
const button = document.getElementById("open");
const status = document.getElementById("status");
const content = document.getElementById("entry");
const encode = (s) => new TextEncoder().encode(s);
const base64Bytes = (s) => Uint8Array.from(atob(s), (character) => character.charCodeAt(0));

function txt(tag, value) {
  if (typeof value !== "string") throw Error("Unexpected document");
  const node = document.createElement(tag);
  node.textContent = value;
  return node;
}
function render(doc) {
  if (doc.date !== host.dataset.date || !Array.isArray(doc.blocks)) throw Error("Unexpected document");
  const fragment = document.createDocumentFragment();
  const heading = txt("h2", doc.title);
  heading.tabIndex = -1;
  fragment.append(heading);
  for (const [kind, label, value, bytes] of doc.blocks) {
    if (kind === "heading") fragment.append(txt("h3", label));
    else if (kind === "text") fragment.append(txt("p", label));
    else if (kind === "image" && ["image/png", "image/jpeg", "image/webp"].includes(value)) {
      if (typeof bytes !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(bytes)) throw Error("Unexpected image");
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.alt = label;
      image.src = `data:${value};base64,${bytes}`;
      figure.append(image, txt("figcaption", label));
      fragment.append(figure);
    } else if (kind === "link") {
      const url = new URL(value);
      if (url.origin !== "https://github.com" || url.username || url.password) throw Error("Unexpected URL");
      const link = txt("a", label);
      link.href = url.href;
      link.rel = "noreferrer";
      const line = document.createElement("p");
      line.append(link);
      fragment.append(line);
    } else throw Error("Unexpected block");
  }
  content.replaceChildren(fragment);
  content.hidden = false;
  gate.hidden = true;
  heading.focus();
}
async function unlock() {
  if (button.disabled) return;
  if (!globalThis.crypto?.subtle) {
    status.textContent = "请通过 HTTPS 或本机预览打开此页。";
    return;
  }
  if (!/^[0-9]{6}$/.test(input.value)) {
    status.textContent = "请输入六位数字。";
    input.focus();
    return;
  }
  const candidate = encode(input.value);
  input.value = "";
  button.disabled = true;
  input.disabled = true;
  status.textContent = "正在解锁…";
  let bundle;
  try {
    const response = await fetch("./payload.json", { credentials: "omit", redirect: "error" });
    if (!response.ok) throw Error("Document unavailable");
    bundle = await response.json();
    if (bundle.v !== 1) throw Error("Unexpected version");
  } catch {
    status.textContent = "暂时未能加载日志，请刷新后重试。";
  }
  if (bundle?.v === 1) {
    try {
      const material = await crypto.subtle.importKey("raw", candidate, "PBKDF2", false, ["deriveKey"]);
      candidate.fill(0);
      const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: base64Bytes(bundle.salt), iterations: rounds, hash: "SHA-256" },
        material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
      );
      const plain = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: base64Bytes(bundle.iv), additionalData: encode(context + host.dataset.date) },
        key, base64Bytes(bundle.sealed)
      );
      render(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(plain)));
      status.textContent = "";
    } catch {
      status.textContent = "无法解锁。请检查密码后重试。";
    }
  }
  candidate.fill(0);
  input.disabled = false;
  button.disabled = false;
  if (!gate.hidden) input.focus();
}
button.addEventListener("click", unlock);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); unlock(); }
});
