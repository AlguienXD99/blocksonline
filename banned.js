// Importa las referencias necesarias de Firebase
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Asegúrate de que Firebase ya esté inicializado en otro archivo antes de usar esto
const auth = getAuth(); // Obtiene la instancia de auth ya inicializada
const db = getDatabase(); // Obtiene la instancia de db ya inicializada

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
