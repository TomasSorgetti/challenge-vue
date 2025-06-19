import { ref, onMounted } from "vue";

/**
 * Composable para manejar el tema oscuro o claro de la aplicación.
 *
 * Este hook reactivo gestiona el modo oscuro/claro del sitio utilizando la clase `dark`
 * en el elemento `<html>`, y guarda la preferencia del usuario en `localStorage`.
 * También respeta la preferencia del sistema operativo si no hay un valor guardado.
 *
 * @returns {Object} Un objeto con:
 *   - `isDark` {Ref<boolean>}: Referencia reactiva que indica si el tema actual es oscuro.
 *   - `toggleTheme` {Function}: Función que alterna entre modo claro y oscuro.
 */
export function useTheme() {
  const isDark = ref(false);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      isDark.value = true;
    }
    updateTheme();
  });

  return { isDark, toggleTheme };
}
