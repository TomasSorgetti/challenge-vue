# <img src="https://raw.githubusercontent.com/ChugunovRoman/figma-linux/master/resources/icons/128x128.png" width="32"> Proyecto de Figma

Podes visitar el diseño de Figma en el siguiente enlace - [Videogames](https://www.figma.com/design/7QJVqcZpLucteRJfatMt4J/videogames?node-id=0-1&m=dev&t=2hkRnLSXSfOzoyJC-1)

![image](https://github.com/user-attachments/assets/60af0c80-ebe0-4f0e-b062-5cd40a828b55)

## Proyecto live

Podes visitar el deploy del proyecto en el siguiente enlace - [Videogames](https://taxes-challenge.tomassorgetti.com.ar/)

## Instalación

Asegurate de tener instalado node y npm, si no lo tenés, instalalo primero.

```bash
node -v
npm -v
```

Cloná el repositorio, instalá las dependencias.

```bash
git clone https://github.com/TomasSorgetti/challenge-vue.git
```

```bash
cd challenge-vue
```

```bash
npm install
```

Creá un archivo .env con las siguientes variables de entorno y reemplazá tu api key (tenés un ejemplo llamado .env.example, podés copiarlo o cambiarle el nombre)

```bash
VITE_URL_BASE=https://api.rawg.io/api
VITE_API_KEY=
```

Una ves creadas las variables de entorno iniciá el proyecto

```bash
npm run dev
```

## TODO

- añadir las plataformas a las cards
- manejar los errores de top 5 games, en especial cuando ya existen 5 top games
- detail
- mejor manejo de errores
- documentación
- mejorar el boton de toggle theme
- el main button cuando esta blockeado no deberia poder clickearse
- filtrado
- a veces se buguea el scroll infinito. ver
