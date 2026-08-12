# NEXUS // RESCUE GRID — V8 FINAL

Esta versión concentra todo el flujo en un solo proyecto limpio, sin capas antiguas de V4/V5/V6/V7.

## Flujo completo

1. Crear incidente.
2. NEXUS intenta geocodificar la dirección con Nominatim.
3. Si no puede, usa una coordenada aproximada del sector para no romper el flujo.
4. El incidente aparece anclado al mapa real.
5. La cola FIFO lo registra si no tiene unidad.
6. En el panel del incidente aparecen solo unidades disponibles compatibles.
7. NEXUS consulta rutas OSRM y las ordena por ETA ajustado.
8. Se asigna una unidad.
9. La unidad cambia a Ocupada.
10. El incidente pasa a En atención.
11. La ruta vial aparece en el mapa principal.
12. En Rutas se comparan ruta recomendada y alternativas.
13. El historial registra los movimientos.
14. Se puede resolver el incidente y liberar la unidad.
15. La pila permite deshacer acciones principales.

## Mapa

- MapLibre GL JS.
- OpenFreeMap como mapa base vectorial.
- Arrastre libre con mouse/trackpad.
- Zoom.
- Brújula.
- Escala.
- Marcadores anclados por longitud/latitud.
- Botón para encuadrar toda la operación.
- Botón para mostrar/ocultar rutas.

## Rutas

Se usa el servidor público de demostración de OSRM.
Si OSRM no responde, la aplicación mantiene el flujo con una estimación local para que el sistema siga funcionando.

## Tráfico

No se afirma que sea tráfico oficial en vivo.

NEXUS aplica un modelo académico que modifica el ETA según:
- hora del día;
- sector;
- ruta/unidad.

Niveles:
- Fluido
- Moderado
- Alto
- Severo

## Estructuras

- Arreglo: unidades.
- Lista enlazada: historial.
- Pila: deshacer.
- Cola: incidentes pendientes.
- Árbol BST: incidentes por código.
- Grafo: sectores + BFS.

Todas tienen una demostración interactiva en la sección Estructuras.

## Ejecutar

Recomendado:
1. Abrir la carpeta en VS Code.
2. Usar Live Server.
3. Abrir `index.html`.

También puede publicarse en GitHub Pages.

## Nota

OpenFreeMap, OSRM y Nominatim son servicios externos. Para una entrega universitaria funcionan como solución sin costo, pero una aplicación de producción debería usar infraestructura propia o servicios con SLA.

## Ajustes V9

- Marcadores encapsulados para que MapLibre controle su posición correctamente.
- Rutas del mapa principal con color según tipo de incidente.
- Las unidades asignadas se muestran también al filtrar por un tipo concreto.
- Incidente de seguridad usa un símbolo distinto de la patrulla policial.
- Reportes corregidos agrupando por categoría.
- BST reconstruido balanceado y utilizado por el buscador exacto de códigos.
- Grafo usado como corredor lógico de respaldo entre sectores.
- Cada estructura explica su utilidad real dentro del sistema.


## Corrección V11

Se corrigió el anclaje de los iconos del mapa principal. La versión anterior
sobrescribía la propiedad `transform` que MapLibre utiliza internamente para
colocar cada marcador en su longitud/latitud. Ahora MapLibre conserva el
control completo del posicionamiento, por lo que incidentes y unidades se
mueven correctamente con el mapa y el zoom.


## V12 — corrección definitiva de marcadores

El problema no era la coordenada. El mismo elemento que MapLibre intentaba mover
también tenía estilos de diseño como `position: relative` y `transform` propios.

V12 separa ambas responsabilidades:

- `nexus-marker-host`: lo posiciona MapLibre usando longitud/latitud.
- `.nexus-marker`: solo dibuja el icono.
- `route-marker-host`: lo posiciona MapLibre para origen/destino de ruta.
- `.route-endpoint-marker`: solo dibuja el icono de la ruta.

De esta forma zoom, arrastre y paneo ya no pueden ser anulados por el CSS visual.


## V13 — iconos corregidos

Se corrigió un error de JavaScript en V10: el mapa intentaba llamar
`incidentMarkerSymbol()`, pero la función existente se llama `incidentSymbol()`.

Ese error detenía `renderMainMap()` antes de crear los marcadores, por eso el mapa
aparecía sin iconos aunque las coordenadas y el CSS estuvieran correctos.

V13 usa la función correcta y mantiene la arquitectura de host de V12 para que
los marcadores permanezcan anclados a longitud/latitud al mover o hacer zoom.
