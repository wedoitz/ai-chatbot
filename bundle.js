'use strict';

const scriptTag = document.currentScript;
let ICON_COLOR = "white";
let BOT_IMAGE = null;
const chatButton = document.createElement("div");
chatButton.setAttribute("id", "ai-chatbot"),
  (chatButton.style.position = "fixed"),
  (chatButton.style.bottom = "20px"),
  (chatButton.style.right = "20px"),
  (chatButton.style.width = "50px"),
  (chatButton.style.height = "50px"),
  (chatButton.style.borderColor = "#000"),
  (chatButton.style.borderRadius = "25px"),
  (chatButton.style.backgroundColor = "black"),
  (chatButton.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)"),
  (chatButton.style.cursor = "pointer"),
  (chatButton.style.zIndex = 999999999),
  (chatButton.style.transition = "all .2s ease-in-out"),
  chatButton.addEventListener("mouseenter", (t) => {
    chatButton.style.transform = "scale(1.05)";
  }),
  chatButton.addEventListener("mouseleave", (t) => {
    chatButton.style.transform = "scale(1)";
  });
const chatButtonIcon = document.createElement("div");
(chatButtonIcon.style.display = "flex"),
  (chatButtonIcon.style.alignItems = "center"),
  (chatButtonIcon.style.justifyContent = "center"),
  (chatButtonIcon.style.width = "100%"),
  (chatButtonIcon.style.height = "100%"),
  (chatButtonIcon.style.zIndex = 999999999),
  chatButton.appendChild(chatButtonIcon),
  chatButton.addEventListener("click", () => {
    "none" === chat.style.display
      ? ((chat.style.display = "flex"),
        (chatButtonIcon.innerHTML = getChatButtonCloseIcon()))
      : ((chat.style.display = "none"),
        (chatButtonIcon.innerHTML = getChatButtonIcon()));
  });
const chat = document.createElement("div");
chat.setAttribute("id", "ai-chatbot-screen"),
  (chat.style.position = "fixed"),
  (chat.style.flexDirection = "column"),
  (chat.style.justifyContent = "space-between"),
  (chat.style.bottom = "80px"),
  (chat.style.right = "20px"),
  (chat.style.width = "85vw"),
  (chat.style.height = "70vh"),
  (chat.style.borderRadius = "15px"),
  (chat.style.boxShadow =
    "rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px"),
  (chat.style.display = "none"),
  (chat.style.zIndex = 999999999),
  (chat.style.overflow = "hidden"),
  document?.body?.appendChild(chat),
  (chat.innerHTML = `<iframe\nsrc="http://localhost:3000/chat/${scriptTag.id}"\nwidth="100%"\nheight="100%"\nframeborder="0"\n></iframe>`);
const mediaQuery = window.matchMedia("(min-width: 550px)");

function handleChatWindowSizeChange(t) {
  t.matches && ((chat.style.height = "600px"), (chat.style.width = "400px"));
}
mediaQuery.addEventListener("change", handleChatWindowSizeChange),
  handleChatWindowSizeChange(mediaQuery);
const getChatButtonColor = async () => {
  e = { color: "#14b8a6" };
  const t = await fetch(
    `https://barely-diverse-sparrow.ngrok-free.app/v1/project/get-brand-info`,
    {
      method: "POST",
      body: JSON.stringify({ id: scriptTag.id }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const { data } = await t.json();
  BOT_IMAGE = data?.bot_image;
  chatButton.style.backgroundColor = data.base_color || "black";
  document.body.appendChild(chatButton);
  const n = getContrastingTextColor(e.color || "black");
  (ICON_COLOR = n), (chatButtonIcon.innerHTML = getChatButtonIcon());
};

function getChatButtonIcon() {
  if (BOT_IMAGE) {
    return `<img src="${BOT_IMAGE}" style='width: 50px; height: 50px; border-radius: 25px;'/>`;
  } else {
    return `\n <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" height="38px" width="38px" stroke="${ICON_COLOR}">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>`;
  }
}

function getChatButtonCloseIcon() {
  return `\n <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" height="30px" width="30px" stroke="${ICON_COLOR}" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>`;
}

function getContrastingTextColor(t) {
  "#" === t.charAt(0) && (t = t.substr(1));
  return (0.299 * parseInt(t.substr(0, 2), 16) +
    0.587 * parseInt(t.substr(2, 2), 16) +
    0.114 * parseInt(t.substr(4, 2), 16)) /
    255 >
    0.5
    ? "white"
    : "white";
}
getChatButtonColor();
