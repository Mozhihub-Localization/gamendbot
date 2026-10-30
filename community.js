
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase, ref, push, set, update, remove, get,
  onValue, onChildAdded, query, limitToLast,
  serverTimestamp, onDisconnect
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

/* Replace with your existing Firebase configuration. */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const $ = id => document.getElementById(id);

const guestPanel = $("guestPanel");
const chatPanel = $("chatPanel");
const messagesEl = $("messages");
const messageInput = $("messageInput");
const messageForm = $("messageForm");
const replyPreview = $("replyPreview");
const contextMenu = $("contextMenu");

let currentUser = null;
let profile = null;
let replyTo = null;
let selectedMessage = null;
let messagesUnsubscribe = null;
let presenceUnsubscribe = null;
let toastTimer = null;
let renderedIds = new Set();

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;",
  '"': "&quot;", "'": "&#39;"
})[char]);

function toast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2600);
}

function loadProfile() {
  try {
    const value = JSON.parse(localStorage.getItem("gx_community_profile"));
    if (value && typeof value.name === "string" &&
        typeof value.username === "string") return value;
  } catch {}
  return null;
}

function showGuest() {
  guestPanel.classList.remove("hidden");
  chatPanel.classList.add("hidden");
}

function showChat() {
  guestPanel.classList.add("hidden");
  chatPanel.classList.remove("hidden");
}

async function joinCommunity(event) {
  event.preventDefault();

  const name = $("displayName").value.trim();
  const username = $("username").value.trim().toLowerCase();

  if (name.length < 2 || name.length > 30) {
    return toast("Name must contain 2–30 characters.");
  }

  if (!/^[a-z0-9_]{3,20}$/.test(username)) {
    return toast("Username must be 3–20 letters, numbers or underscores.");
  }

  profile = { name, username };
  localStorage.setItem("gx_community_profile", JSON.stringify(profile));

  if (!currentUser) return toast("Connecting to Firebase. Try again.");

  try {
    await set(ref(db, `community/profiles/${currentUser.uid}`), {
      name, username, updatedAt: serverTimestamp()
    });
    await startCommunity();
  } catch (error) {
    console.error(error);
    toast("Could not join. Check Firebase permissions.");
  }
}

async function setupPresence() {
  if (!currentUser || !profile) return;

  const connectionRef = push(
    ref(db, `community/presence/${currentUser.uid}/connections`)
  );

  const connectedRef = ref(db, ".info/connected");

  if (presenceUnsubscribe) presenceUnsubscribe();

  presenceUnsubscribe = onValue(connectedRef, async snapshot => {
    if (snapshot.val() !== true) return;

    try {
      const disconnectRef = onDisconnect(connectionRef);

      await disconnectRef.set({
        online: false,
        lastSeen: serverTimestamp()
      });

      await set(connectionRef, {
        online: true,
        name: profile.name,
        username: profile.username,
        lastSeen: serverTimestamp()
      });
    } catch (error) {
      console.error("Presence error:", error);
    }
  });
}

function listenOnlineCount() {
  const presenceRef = ref(db, "community/presence");

  onValue(presenceRef, snapshot => {
    let count = 0;

    snapshot.forEach(userSnapshot => {
      userSnapshot.child("connections").forEach(connection => {
        if (connection.child("online").val() === true) count++;
      });
    });

    $("onlineCount").textContent = `${count} Online`;
  });
}

function formatTime(timestamp) {
  if (!timestamp) return "Just now";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit", minute: "2-digit"
  });
}

function createMessageElement(id, message) {
  const own = message.uid === currentUser?.uid;
  const article = document.createElement("article");

  article.className = `message${own ? " mine" : ""}`;
  article.dataset.id = id;

  const reply = message.replyTo
    ? `<div class="reply-quote"><strong>${escapeHTML(message.replyTo.name)}</strong><br>${escapeHTML(message.replyTo.text)}</div>`
    : "";

  article.innerHTML = `
    <div class="message-meta">
      <strong>${escapeHTML(message.name || "Player")}</strong>
      <span>${escapeHTML(formatTime(message.createdAt))}</span>
    </div>
    ${reply}
    <div class="message-body">${escapeHTML(message.text)}</div>
    <div class="message-actions">
      <button type="button" data-action="reply">Reply</button>
      ${own ? '<button type="button" data-action="edit">Edit</button><button type="button" data-action="delete">Delete</button>' : ""}
      <button type="button" data-action="copy">Copy</button>
    </div>
  `;

  article.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
      handleAction(button.dataset.action, id, message);
    });
  });

  article.addEventListener("contextmenu", event => {
    event.preventDefault();
    selectedMessage = { id, message };
    showContextMenu(event.clientX, event.clientY, own);
  });

  return article;
}

function listenMessages() {
  if (messagesUnsubscribe) messagesUnsubscribe();

  renderedIds.clear();
  messagesEl.replaceChildren();

  const messagesQuery = query(
    ref(db, "community/messages"),
    limitToLast(50)
  );

  messagesUnsubscribe = onChildAdded(messagesQuery, snapshot => {
    if (renderedIds.has(snapshot.key)) return;
    renderedIds.add(snapshot.key);

    const message = snapshot.val();
    if (!message || typeof message.text !== "string") return;

    const empty = messagesEl.querySelector(".empty-state");
    if (empty) empty.remove();

    const element = createMessageElement(snapshot.key, message);
    messagesEl.appendChild(element);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }, error => {
    console.error(error);
    toast("Unable to load messages.");
  });

  get(messagesQuery).then(snapshot => {
    if (snapshot.exists()) return;
    if (!messagesEl.children.length) {
      messagesEl.innerHTML = '<div class="empty-state">No messages yet. Start the conversation!</div>';
    }
  }).catch(console.error);
}

async function sendMessage(event) {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text || !currentUser || !profile) return;
  if (text.length > 1500) return toast("Message is too long.");

  const button = $("sendBtn");
  button.disabled = true;

  try {
    const messageRef = push(ref(db, "community/messages"));

    await set(messageRef, {
      uid: currentUser.uid,
      name: profile.name,
      username: profile.username,
      text,
      createdAt: serverTimestamp(),
      replyTo: replyTo ? {
        id: replyTo.id,
        name: replyTo.message.name || "Player",
        text: String(replyTo.message.text || "").slice(0, 200)
      } : null
    });

    messageInput.value = "";
    resizeTextarea();
    clearReply();
  } catch (error) {
    console.error(error);
    toast("Message could not be sent.");
  } finally {
    button.disabled = false;
    messageInput.focus();
  }
}

function setReply(id, message) {
  replyTo = { id, message };
  $("replyName").textContent = message.name || "Player";
  $("replyText").textContent = String(message.text || "").slice(0, 160);
  replyPreview.classList.remove("hidden");
  messageInput.focus();
}

function clearReply() {
  replyTo = null;
  replyPreview.classList.add("hidden");
}

async function handleAction(action, id, message) {
  const own = message.uid === currentUser?.uid;

  if (action === "reply") {
    setReply(id, message);
  } else if (action === "copy") {
    try {
      await navigator.clipboard.writeText(message.text || "");
      toast("Message copied.");
    } catch {
      toast("Clipboard access unavailable.");
    }
  } else if (action === "edit" && own) {
    const updated = prompt("Edit your message:", message.text || "");
    if (updated === null) return;

    const text = updated.trim();
    if (!text || text.length > 1500) return toast("Invalid message.");

    try {
      await update(ref(db, `community/messages/${id}`), {
        text,
        editedAt: serverTimestamp()
      });
      toast("Message updated.");
    } catch (error) {
      console.error(error);
      toast("Edit failed.");
    }
  } else if (action === "delete" && own) {
    if (!confirm("Delete this message?")) return;

    try {
      await remove(ref(db, `community/messages/${id}`));
      toast("Message deleted.");
    } catch (error) {
      console.error(error);
      toast("Delete failed.");
    }
  }
}

function showContextMenu(x, y, own) {
  contextMenu.classList.remove("hidden");
  contextMenu.querySelector('[data-action="edit"]').classList.toggle("hidden", !own);
  contextMenu.querySelector('[data-action="delete"]').classList.toggle("hidden", !own);

  const width = contextMenu.offsetWidth;
  const height = contextMenu.offsetHeight;

  contextMenu.style.left = `${Math.max(8, Math.min(x, innerWidth - width - 8))}px`;
  contextMenu.style.top = `${Math.max(8, Math.min(y, innerHeight - height - 8))}px`;
}

contextMenu.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button || !selectedMessage) return;

  handleAction(button.dataset.action,
    selectedMessage.id, selectedMessage.message);

  contextMenu.classList.add("hidden");
});

document.addEventListener("click", event => {
  if (!contextMenu.contains(event.target)) {
    contextMenu.classList.add("hidden");
  }
});

function resizeTextarea() {
  messageInput.style.height = "auto";
  messageInput.style.height =
    `${Math.min(messageInput.scrollHeight, 130)}px`;
}

async function startCommunity() {
  showChat();
  await setupPresence();
  listenMessages();
}

$("joinForm").addEventListener("submit", joinCommunity);
messageForm.addEventListener("submit", sendMessage);
$("cancelReply").addEventListener("click", clearReply);
messageInput.addEventListener("input", resizeTextarea);

$("leaveBtn").addEventListener("click", () => {
  if (!confirm("Leave the community on this device?")) return;

  if (messagesUnsubscribe) messagesUnsubscribe();
  localStorage.removeItem("gx_community_profile");
  profile = null;
  showGuest();
});

$("settingsBtn").addEventListener("click", () => {
  const choice = prompt("Choose theme: dark or light", "dark");
  if (!choice) return;

  if (choice.toLowerCase() === "light") {
    document.documentElement.dataset.mode = "light";
  } else if (choice.toLowerCase() === "dark") {
    document.documentElement.dataset.mode = "dark";
  }
});

document.documentElement.dataset.mode = "dark";

const savedProfile = loadProfile();

onAuthStateChanged(auth, async user => {
  currentUser = user;

  if (!user) {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error(error);
      toast("Firebase authentication failed.");
    }
    return;
  }

  profile = loadProfile();

  listenOnlineCount();

  if (profile) {
    try {
      await startCommunity();
    } catch (error) {
      console.error(error);
      toast("Could not connect to community.");
      showGuest();
    }
  } else {
    showGuest();
  }
});
