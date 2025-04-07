// Importa Firebase SDK
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Aquí no necesitamos la configuración ni la inicialización de Firebase, ya que se asume que Firebase ya fue inicializado en otro archivo

// Obtén la instancia de Firebase (asegurándonos de que está disponible globalmente)
const db = getDatabase();  // Usa la base de datos globalmente disponible
const auth = getAuth();    // Usa la autenticación globalmente disponible

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
