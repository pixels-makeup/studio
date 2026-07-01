import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("addSlot").onclick = async () => {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const note = document.getElementById("note").value;

  if (!date || !time) {
    alert("Please enter date and time.");
    return;
  }

  await addDoc(collection(db, "availableSlots"), {
    date,
    time,
    note,
    available: true
  });

  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  document.getElementById("note").value = "";
};

onSnapshot(collection(db, "availableSlots"), snapshot => {
  const container = document.getElementById("adminSlots");
  container.innerHTML = "";

  snapshot.forEach(item => {
    const slot = item.data();

    const div = document.createElement("div");
    div.className = "slot-card";
    div.innerHTML = `
      <div>
        <strong>${slot.date}</strong>
        <p>${slot.time}</p>
        <p>${slot.note || ""}</p>
        <p>Status: ${slot.available ? "Available" : "Booked/Hidden"}</p>
      </div>
      <div>
        <button class="toggle">Toggle</button>
        <button class="delete">Delete</button>
      </div>
    `;

    div.querySelector(".toggle").onclick = async () => {
      await updateDoc(doc(db, "availableSlots", item.id), {
        available: !slot.available
      });
    };

    div.querySelector(".delete").onclick = async () => {
      await deleteDoc(doc(db, "availableSlots", item.id));
    };

    container.appendChild(div);
  });
});