document.addEventListener('DOMContentLoaded', () => {

    // Paso 1: Deconstruir el titular en caracteres.
    // El resultado vive en el DOM, con cada letra envuelta en <span class="char">.
    const splitResult = Splitting({ target: '.headline', by: 'chars' });
    const chars = splitResult[0].chars; // Accedemos al array de elementos .char

    // Paso 2: Definir el estado inicial "caótico".
    // Cada fragmento empieza en una posición y rotación 3D aleatoria y lejos de la cámara.
    gsap.set(chars, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        z: () => gsap.utils.random(500, 1000), // Vienen desde la "profundidad"
        rotationX: () => gsap.utils.random(-180, 180),
        rotationY: () => gsap.utils.random(-180, 180),
        opacity: 0
    });
    
    // Paso 3: Orquestar la animación con una Timeline.
    const tl = gsap.timeline({
        onComplete: () => {
            // Podríamos añadir interactividad aquí una vez la animación termine.
            // Por ejemplo, un sutil efecto parallax al mover el mouse.
        }
    });

    // La animación principal de convergencia.
    tl.to(chars, {
        duration: 3, // Duración total de la convergencia
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        ease: "power3.inOut", // La curva de animación que da la sensación de lujo
        stagger: {
            each: 0.08, // Tiempo entre el inicio de la animación de cada fragmento
            from: "random" // El orden de aparición es aleatorio, creando un flujo orgánico
        }
    });

    // El destello final, sincronizado para empezar un poco antes de que el último fragmento llegue.
    tl.to('.headline::after', {
        duration: 1.5,
        scale: 1,
        opacity: 1,
        ease: "power2.out"
    }, "-=1.0"); // El "-=1.0" hace que esta animación comience 1s antes de que la anterior termine.

});