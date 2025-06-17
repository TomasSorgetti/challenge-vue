import { ref, onMounted } from "vue";

/**
 * Función para cambiar el theme de la aplicación
 *
 * @returns {Object} isDark, toggleTheme
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
