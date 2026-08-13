/* ===== V12 robust marker fix ===== */

/* El elemento que MapLibre posiciona es un host sin estilos visuales conflictivos.
   El círculo/icono está dentro y puede tener cualquier CSS sin afectar lng/lat. */
makeMarker = function (type, html, label) {
  const host = document.createElement("div");
  host.className = "nexus-marker-host";

  const visual = document.createElement("div");
  visual.className = `nexus-marker ${type}`;
  visual.innerHTML = `${html}<span class="marker-label">${label}</span>`;

  host.appendChild(visual);
  return host;
};

endpointEl = function (color, icon, label) {
  const host = document.createElement("div");
  host.className = "route-marker-host";

  const visual = document.createElement("div");
  visual.className = "route-endpoint-marker";
  visual.style.color = color;
  visual.innerHTML = `${icon}<span class="route-endpoint-label">${label}</span>`;

  host.appendChild(visual);
  return host;
};

/* Re-render completo para recrear todos los markers con la nueva arquitectura. */
if (mainMap) {
  if (mainMap.loaded()) {
    renderMainMap();
  } else {
    mainMap.once("load", () => renderMainMap());
  }
}

if (routeMap) {
  if (routeMap.loaded()) {
    renderRoutePage();
  } else {
    routeMap.once("load", () => renderRoutePage());
  }
}
