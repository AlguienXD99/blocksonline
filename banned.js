// Importa Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBuWcUaYo9eah5mehCQ0h8bBnkE_251NKY",
  authDomain: "virtualblocks-b7a52.firebaseapp.com",
  databaseURL: "https://virtualblocks-b7a52-default-rtdb.firebaseio.com",
  projectId: "virtualblocks-b7a52",
  storageBucket: "virtualblocks-b7a52.firebasestorage.app",
  messagingSenderId: "490618182453",
  appId: "1:490618182453:web:93385819c7ff08537d8a7c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Verifica el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = ref(db, `users/${user.uid}`);

        get(userRef).then((snapshot) => {
            if (snapshot.exists() && snapshot.val().banned === true) {
                // 🚨 Bloquear la página si está baneado
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = "0";
                overlay.style.left = "0";
                overlay.style.width = "100vw";
                overlay.style.height = "100vh";
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
                overlay.style.color = "white";
                overlay.style.display = "flex";
                overlay.style.justifyContent = "center";
                overlay.style.alignItems = "center";
                overlay.style.fontSize = "24px";
                overlay.style.zIndex = "9999";
                overlay.innerText = "You have been banned. Contact support for more information.";
                
                document.body.appendChild(overlay);
            }
        });
    }
});
