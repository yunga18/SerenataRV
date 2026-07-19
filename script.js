document.addEventListener("DOMContentLoaded", () => {

    const scene = document.querySelector("#scene");
    const model = document.querySelector("#modelo");
    const audio = document.querySelector("#music");
    const loading = document.querySelector("#loading");
    const target = document.querySelector("[mindar-image-target]");

    // Cuando la escena esté lista
    scene.addEventListener("loaded", () => {
        console.log("Escena cargada");
    });

    // Cuando MindAR esté listo
    scene.addEventListener("arReady", () => {
        console.log("AR listo");
        loading.style.display = "none";
    });

    // Si ocurre un error
    scene.addEventListener("arError", (e) => {
        console.error("Error de AR:", e);
        alert("No se pudo iniciar la cámara.");
    });

    // Cuando reconoce la fotografía
    target.addEventListener("targetFound", () => {

        console.log("Imagen detectada");

        model.setAttribute("visible", true);

        // Reinicia la canción
        audio.pause();
        audio.currentTime = 0;

        // Reproducir audio
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.warn("El navegador bloqueó el audio:", error);
            });
        }

    });

    // Cuando deja de ver la fotografía
    target.addEventListener("targetLost", () => {

        console.log("Imagen perdida");

        model.setAttribute("visible", false);

        audio.pause();

    });

});