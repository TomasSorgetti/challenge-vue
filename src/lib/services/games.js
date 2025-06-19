import { URL_BASE, API_KEY } from "../constants/index";

/**
 * Obtiene una lista paginada de juegos desde la API para mostrar en la app.
 * Permite filtrar por plataforma y ordenar por nombre.
 *
 * @param {number} [page=1] - Página a obtener (empieza en 1).
 * @param {number} [pageSize=21] - Cantidad de juegos por página.
 * @param {string|null} [platform=null] - ID de la plataforma para filtrar (ej: "4" para PC, "187" para PS5).
 * @param {string|null} [ordering=null] - Ordenamiento ("name" para A-Z, "-name" para Z-A).
 * @returns {Promise<Array>} Promesa que devuelve un array de objetos de juegos (con id, nombre, imagen, etc.).
 * @throws {Error} Si falta la clave de API o falla la solicitud (ej: error de red o respuesta inválida).
 */
export const getAllGames = async (
  page = 1,
  page_size = 21,
  platform = null,
  ordering = null
) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");

    const params = new URLSearchParams({
      key: API_KEY,
      page: page.toString(),
      page_size: page_size.toString(),
    });

    if (platform) params.append("platforms", platform);
    if (ordering) params.append("ordering", ordering);

    const response = await fetch(`${URL_BASE}/games?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch games");
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

/**
 * Obtiene los juegos más populares ordenados por rating.
 *
 * @param {number} [size=5] - Cantidad de juegos populares a obtener.
 * @returns {Promise<Object[]>} - Una promesa que resuelve con un array de juegos populares.
 * @throws {Error} - Lanza un error si falla la solicitud o falta la API key.
 */
export const getPopularGames = async (size = 5) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");

    const response = await fetch(
      `${URL_BASE}/games?key=${API_KEY}&ordering=-rating&page_size=${size}`
    );
    if (!response.ok) throw new Error("Failed to fetch popular games");
    const data = await response.json();

    const detailedGames = await Promise.all(
      data.results.map(async (game) => {
        const detailRes = await fetch(
          `${URL_BASE}/games/${game.id}?key=${API_KEY}`
        );
        if (!detailRes.ok)
          throw new Error(`Failed to fetch details for game ${game.id}`);
        const detailData = await detailRes.json();

        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          description_raw: detailData.description_raw,
        };
      })
    );

    return detailedGames;
  } catch (error) {
    console.error("Error fetching games with descriptions:", error);
    throw error;
  }
};

/**
 * Obtiene los detalles de un juego específico por su ID.
 *
 * @param {number|string} id - ID del juego a buscar.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos del juego.
 * @throws {Error} - Lanza un error si falla la solicitud o falta la API key.
 */
export const getGameById = async (id) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");

    const response = await fetch(`${URL_BASE}/games/${id}?key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch game");
    const data = await response.json();

    const screenshotsRes = await fetch(
      `${URL_BASE}/games/${id}/screenshots?key=${API_KEY}`
    );
    if (!screenshotsRes.ok) throw new Error("Failed to fetch screenshots");
    const screenshotsData = await screenshotsRes.json();

    data.screenshots = screenshotsData.results;

    return data;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};

/**
 * Gebera un delay de milisegundos antes de continuar.
 *
 * @param {number} ms - Tiempo en milisegundos a esperar.
 * @returns {Promise<void>} - Promesa que se resuelve después del tiempo indicado.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Busca juegos por nombre utilizando la API.
 *
 * @param {string} query - Término de búsqueda.
 * @param {number} [pageSize=5] - Cantidad de resultados a retornar.
 * @returns {Promise<Object[]>} - Una promesa que resuelve con un array de juegos encontrados.
 * @throws {Error} - Lanza un error si falla la solicitud, la query está vacía o falta la API key.
 */
export const searchGames = async (query, pageSize = 5) => {
  try {
    if (API_KEY.trim() === "") throw new Error("API key is required");
    if (!query) throw new Error("Search query is required");

    await delay(500); // Avoid rate limits
    const response = await fetch(
      `${URL_BASE}/games?key=${API_KEY}&search=${encodeURIComponent(
        query
      )}&page_size=${pageSize}`
    );
    if (!response.ok) throw new Error("Failed to fetch search results");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching games:", error);
    throw error;
  }
};
