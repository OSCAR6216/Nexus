const STORE = "nexus-rescue-grid-v8";
const MANTA = [-80.7089, -0.9538];

const initialData = {
  incidents: [
    {
      id: "i204",
      codigo: "INC-204",
      codigoNum: 204,
      tipo: "Incendio estructural",
      categoria: "incendio",
      ubicacion: "Barrio Jocay",
      sector: "Jocay",
      prioridad: "Crítica",
      estado: "En atención",
      unitId: "BOM-01",
      lng: -80.7168,
      lat: -0.9658,
      personas: 3,
      descripcion:
        "Incendio en vivienda de dos plantas. Se reporta gran presencia de humo.",
      createdAt: "22:47",
      responseMinutes: 9,
    },
    {
      id: "i205",
      codigo: "INC-205",
      codigoNum: 205,
      tipo: "Accidente de tránsito",
      categoria: "trafico",
      ubicacion: "Av. 4 de Noviembre",
      sector: "Tarqui",
      prioridad: "Media",
      estado: "En cola",
      unitId: null,
      lng: -80.7004,
      lat: -0.9565,
      personas: 2,
      descripcion: "Colisión entre dos vehículos.",
      createdAt: "22:44",
      responseMinutes: null,
    },
    {
      id: "i206",
      codigo: "INC-206",
      codigoNum: 206,
      tipo: "Emergencia médica",
      categoria: "medico",
      ubicacion: "Calle 13 y Malecón",
      sector: "Centro",
      prioridad: "Alta",
      estado: "En cola",
      unitId: null,
      lng: -80.719,
      lat: -0.9479,
      personas: 1,
      descripcion: "Paciente con dificultad respiratoria.",
      createdAt: "22:45",
      responseMinutes: null,
    },
    {
      id: "i207",
      codigo: "INC-207",
      codigoNum: 207,
      tipo: "Falla eléctrica",
      categoria: "falla",
      ubicacion: "Urb. La Pradera",
      sector: "La Paz",
      prioridad: "Baja",
      estado: "En cola",
      unitId: null,
      lng: -80.691,
      lat: -0.9695,
      personas: 0,
      descripcion: "Corte de energía en varias viviendas.",
      createdAt: "22:46",
      responseMinutes: null,
    },
    {
      id: "i208",
      codigo: "INC-208",
      codigoNum: 208,
      tipo: "Robo reportado",
      categoria: "policia",
      ubicacion: "Los Esteros",
      sector: "Los Esteros",
      prioridad: "Media",
      estado: "En atención",
      unitId: "POL-02",
      lng: -80.728,
      lat: -0.9554,
      personas: 0,
      descripcion: "Reporte de robo sin personas heridas.",
      createdAt: "22:31",
      responseMinutes: 7,
    },
    {
      id: "i209",
      codigo: "INC-209",
      codigoNum: 209,
      tipo: "Emergencia médica",
      categoria: "medico",
      ubicacion: "Tarqui",
      sector: "Tarqui",
      prioridad: "Crítica",
      estado: "En atención",
      unitId: "AMB-02",
      lng: -80.704,
      lat: -0.9468,
      personas: 1,
      descripcion: "Paciente inconsciente.",
      createdAt: "22:37",
      responseMinutes: 6,
    },
    {
      id: "i210",
      codigo: "INC-210",
      codigoNum: 210,
      tipo: "Incendio menor",
      categoria: "incendio",
      ubicacion: "Zona Industrial",
      sector: "Industrial",
      prioridad: "Alta",
      estado: "Resuelto",
      unitId: "BOM-02",
      lng: -80.682,
      lat: -0.9575,
      personas: 0,
      descripcion: "Incendio controlado en bodega.",
      createdAt: "21:55",
      responseMinutes: 8,
    },
    {
      id: "i211",
      codigo: "INC-211",
      codigoNum: 211,
      tipo: "Accidente de tránsito",
      categoria: "trafico",
      ubicacion: "Vía Circunvalación",
      sector: "La Paz",
      prioridad: "Alta",
      estado: "Resuelto",
      unitId: "AMB-01",
      lng: -80.6925,
      lat: -0.98,
      personas: 2,
      descripcion: "Motociclista atendido.",
      createdAt: "21:42",
      responseMinutes: 10,
    },
  ],
  units: [
    {
      id: "BOM-01",
      tipo: "Bomberos",
      categoria: "incendio",
      estado: "Ocupada",
      sector: "Centro",
      lng: -80.714,
      lat: -0.958,
      personas: 5,
      combustible: 76,
      icon: "🚒",
    },
    {
      id: "BOM-02",
      tipo: "Bomberos",
      categoria: "incendio",
      estado: "Disponible",
      sector: "Industrial",
      lng: -80.6845,
      lat: -0.9595,
      personas: 4,
      combustible: 89,
      icon: "🚒",
    },
    {
      id: "AMB-01",
      tipo: "Ambulancia",
      categoria: "medico",
      estado: "Disponible",
      sector: "Jocay",
      lng: -80.711,
      lat: -0.97,
      personas: 3,
      combustible: 82,
      icon: "🚑",
    },
    {
      id: "AMB-02",
      tipo: "Ambulancia",
      categoria: "medico",
      estado: "Ocupada",
      sector: "Tarqui",
      lng: -80.7058,
      lat: -0.9457,
      personas: 2,
      combustible: 64,
      icon: "🚑",
    },
    {
      id: "AMB-03",
      tipo: "Ambulancia",
      categoria: "medico",
      estado: "Disponible",
      sector: "Centro",
      lng: -80.72,
      lat: -0.952,
      personas: 3,
      combustible: 91,
      icon: "🚑",
    },
    {
      id: "POL-01",
      tipo: "Policía",
      categoria: "policia",
      estado: "Disponible",
      sector: "Tarqui",
      lng: -80.7015,
      lat: -0.9515,
      personas: 2,
      combustible: 70,
      icon: "🚓",
    },
    {
      id: "POL-02",
      tipo: "Policía",
      categoria: "policia",
      estado: "Ocupada",
      sector: "Los Esteros",
      lng: -80.7265,
      lat: -0.9585,
      personas: 2,
      combustible: 66,
      icon: "🚓",
    },
    {
      id: "POL-03",
      tipo: "Policía",
      categoria: "policia",
      estado: "Disponible",
      sector: "La Paz",
      lng: -80.6945,
      lat: -0.971,
      personas: 2,
      combustible: 83,
      icon: "🚓",
    },
    {
      id: "TEC-01",
      tipo: "Soporte eléctrico",
      categoria: "falla",
      estado: "Disponible",
      sector: "Industrial",
      lng: -80.6855,
      lat: -0.97,
      personas: 3,
      combustible: 74,
      icon: "⚡",
    },
  ],
  history: [
    {
      id: "h1",
      incidentId: "i204",
      hora: "22:47",
      texto: "INC-204 registrado",
    },
    { id: "h2", incidentId: "i204", hora: "22:49", texto: "BOM-01 asignada" },
    {
      id: "h3",
      incidentId: "i204",
      hora: "22:50",
      texto: "BOM-01 salió hacia Jocay",
    },
    {
      id: "h4",
      incidentId: "i209",
      hora: "22:37",
      texto: "INC-209 registrado",
    },
    { id: "h5", incidentId: "i209", hora: "22:39", texto: "AMB-02 asignada" },
  ],
  actionStack: [],
  operator: { name: "Operador 01", code: "OP-01" },
  settings: { alerts: true, showRoutes: true },
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const clone = (obj) => JSON.parse(JSON.stringify(obj));
function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORE)) || clone(initialData);
  } catch {
    return clone(initialData);
  }
}
let data = loadData();

const unitsArray = new ArregloUnidades(data.units);
const historyList = new ListaEnlazada();
data.history.forEach((x) => historyList.insertar(x));
const actionStack = new Pila();
data.actionStack.forEach((x) => actionStack.apilar(x));
let incidentQueue = new Cola();
let incidentTree = new ArbolBST();
const cityGraph = new Grafo();
[
  ["Jocay", "Centro"],
  ["Centro", "Tarqui"],
  ["Centro", "Los Esteros"],
  ["Jocay", "La Paz"],
  ["La Paz", "Industrial"],
  ["Tarqui", "Industrial"],
  ["Los Esteros", "Centro"],
].forEach(([a, b]) => cityGraph.agregarArista(a, b));

function rebuildStructures() {
  incidentQueue = new Cola();
  incidentTree = new ArbolBST();
  data.incidents.forEach((i) => {
    incidentTree.insertar(i);
    if (i.estado === "En cola") incidentQueue.encolar(i);
  });
}
function saveData() {
  data.units = unitsArray.recorrer();
  data.history = historyList.recorrer();
  data.actionStack = actionStack.recorrer();
  localStorage.setItem(STORE, JSON.stringify(data));
}
rebuildStructures();

function toast(text) {
  const el = $("#toast");
  el.textContent = text;
  el.classList.remove("hidden");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.add("hidden"), 2200);
}
function now() {
  return new Date().toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function addHistory(incidentId, text) {
  historyList.insertar({
    id: "h" + Date.now(),
    incidentId,
    hora: now(),
    texto: text,
  });
}
function pushAction(a) {
  actionStack.apilar(a);
}
function findIncident(id) {
  return data.incidents.find((x) => x.id === id);
}
function findUnit(id) {
  return unitsArray.buscar(id);
}
function priorityClass(p) {
  return p === "Crítica"
    ? "critical"
    : p === "Alta"
      ? "high"
      : p === "Media"
        ? "medium"
        : "low";
}
function categoryIcon(c) {
  return (
    { incendio: "🔥", medico: "✚", policia: "🚓", trafico: "🚗", falla: "⚡" }[
      c
    ] || "◆"
  );
}
function compatibleCategories(c) {
  return (
    {
      incendio: ["incendio"],
      medico: ["medico"],
      policia: ["policia"],
      trafico: ["medico", "policia"],
      falla: ["falla"],
    }[c] || []
  );
}
function sectorCoords(s) {
  return (
    {
      Jocay: [-80.7168, -0.9658],
      Centro: [-80.719, -0.9479],
      Tarqui: [-80.704, -0.9468],
      "Los Esteros": [-80.728, -0.9554],
      "La Paz": [-80.691, -0.9695],
      Industrial: [-80.682, -0.9575],
    }[s] || MANTA
  );
}
function v5TypeName(c) {
  return (
    {
      incendio: "Incendio reportado",
      medico: "Emergencia médica",
      policia: "Incidente de seguridad",
      trafico: "Accidente de tránsito",
      falla: "Falla eléctrica",
    }[c] || "Incidente"
  );
}
function unitType(c) {
  return (
    {
      medico: "Ambulancia",
      incendio: "Bomberos",
      policia: "Policía",
      falla: "Soporte eléctrico",
    }[c] || "Unidad"
  );
}
function unitIcon(c) {
  return { medico: "🚑", incendio: "🚒", policia: "🚓", falla: "⚡" }[c] || "◆";
}

function haversine(a, b) {
  const R = 6371,
    toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat),
    dLng = toRad(b.lng - a.lng),
    la1 = toRad(a.lat),
    la2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function localRouteEstimate(unit, incident) {
  const km = Math.max(0.3, haversine(unit, incident) * 1.28),
    base = Math.max(2, Math.round(km * 2.0));
  const traffic = trafficFactor(incident, unit);
  return {
    distanceKm: km,
    baseMinutes: base,
    minutes: Math.round(base * traffic.factor),
    trafficLevel: traffic.level,
    trafficFactor: traffic.factor,
    real: false,
  };
}
function trafficFactor(incident, unit) {
  const hour = new Date().getHours();
  let factor = 1;
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) factor += 0.22;
  else if (hour >= 12 && hour <= 14) factor += 0.1;
  factor +=
    {
      Centro: 0.2,
      Tarqui: 0.16,
      Jocay: 0.1,
      "Los Esteros": 0.08,
      "La Paz": 0.05,
      Industrial: 0.04,
    }[incident.sector] || 0;
  const seed = [...`${unit.id}-${incident.codigo}`].reduce(
    (s, c) => s + c.charCodeAt(0),
    0,
  );
  factor += (seed % 7) / 100;
  const level =
    factor >= 1.42
      ? "Severo"
      : factor >= 1.27
        ? "Alto"
        : factor >= 1.12
          ? "Moderado"
          : "Fluido";
  return { factor, level };
}
function trafficColor(level) {
  return (
    {
      Fluido: "#39d17e",
      Moderado: "#e4bd3a",
      Alto: "#ef8b36",
      Severo: "#ef343b",
    }[level] || "#39d17e"
  );
}

function availableUnits(incident) {
  let list = unitsArray.recorrer().filter((u) => u.estado === "Disponible");
  const compatible = list.filter((u) =>
    compatibleCategories(incident.categoria).includes(u.categoria),
  );
  if (compatible.length) list = compatible;
  return list.sort((a, b) => haversine(a, incident) - haversine(b, incident));
}

/* Mapas */
let mainMap = null,
  routeMap = null,
  mainMarkers = [],
  routeMarkers = [],
  mainFilter = "todos",
  routeCache = {},
  activeRouteIncident = null;
const mapStyle = "https://tiles.openfreemap.org/styles/liberty";

function createMap(container, zoom = 13.5) {
  const map = new maplibregl.Map({
    container,
    style: mapStyle,
    center: MANTA,
    zoom,
    minZoom: 10,
    maxZoom: 19,
    dragPan: true,
    scrollZoom: true,
    touchZoomRotate: true,
  });
  map.addControl(
    new maplibregl.NavigationControl({ showCompass: true, showZoom: true }),
    "top-right",
  );
  map.addControl(
    new maplibregl.ScaleControl({ unit: "metric" }),
    "bottom-left",
  );
  return map;
}
function makeMarker(type, html, label) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `nexus-marker ${type}`;
  el.innerHTML = `${html}<span class="marker-label">${label}</span>`;
  return el;
}
function clearMarkers(arr) {
  arr.forEach((m) => m.remove());
  arr.length = 0;
}
function removeLayer(map, id) {
  if (map.getLayer(id)) map.removeLayer(id);
  if (map.getSource(id)) map.removeSource(id);
}
function clearRoutes(map, prefix) {
  ["glow", "main", "alt1", "alt2"].forEach((x) =>
    removeLayer(map, `${prefix}-${x}`),
  );
}
function addRouteLayer(
  map,
  id,
  geometry,
  color,
  width = 5,
  opacity = 0.95,
  dash = null,
) {
  if (map.getSource(id)) removeLayer(map, id);
  map.addSource(id, {
    type: "geojson",
    data: { type: "Feature", properties: {}, geometry },
  });
  const layer = {
    id,
    type: "line",
    source: id,
    layout: { "line-join": "round", "line-cap": "round" },
    paint: {
      "line-color": color,
      "line-width": width,
      "line-opacity": opacity,
    },
  };
  if (dash) layer.paint["line-dasharray"] = dash;
  map.addLayer(layer);
}
function fitGeometry(map, geometry) {
  if (!geometry?.coordinates?.length) return;
  const b = geometry.coordinates.reduce(
    (bounds, c) => bounds.extend(c),
    new maplibregl.LngLatBounds(
      geometry.coordinates[0],
      geometry.coordinates[0],
    ),
  );
  map.fitBounds(b, { padding: 80, maxZoom: 16, duration: 700 });
}

async function osrmRoute(unit, incident, alternatives = false) {
  const key = `${unit.id}:${incident.id}:${alternatives}`;
  if (routeCache[key]) return routeCache[key];
  const url = `https://router.project-osrm.org/route/v1/driving/${unit.lng},${unit.lat};${incident.lng},${incident.lat}?overview=full&geometries=geojson&alternatives=${alternatives ? "true" : "false"}&steps=false`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error("OSRM");
    const j = await r.json();
    if (j.code !== "Ok" || !j.routes?.length) throw new Error("Sin ruta");
    const traffic = trafficFactor(incident, unit);
    const result = j.routes.map((route, index) => ({
      geometry: route.geometry,
      distanceKm: route.distance / 1000,
      baseMinutes: route.duration / 60,
      minutes: (route.duration / 60) * traffic.factor,
      trafficLevel: traffic.level,
      trafficFactor: traffic.factor,
      real: true,
      index,
    }));
    routeCache[key] = result;
    return result;
  } catch {
    const local = localRouteEstimate(unit, incident);
    return [{ ...local, geometry: null, index: 0 }];
  }
}
async function geocode(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", `${query}, Manta, Ecuador`);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ec");
  const r = await fetch(url, { headers: { "Accept-Language": "es" } });
  if (!r.ok) throw new Error("No se pudo buscar la ubicación");
  const j = await r.json();
  if (!j.length) throw new Error("Ubicación no encontrada");
  return {
    lng: Number(j[0].lon),
    lat: Number(j[0].lat),
    label: j[0].display_name,
  };
}

function initMaps() {
  mainMap = createMap("mainMap");
  mainMap.on("load", () => {
    renderMainMap();
    fitOperations();
  });
  mainMap.on("error", (e) => console.warn("Map error", e?.error || e));
}
function ensureRouteMap() {
  if (routeMap) return;
  routeMap = createMap("routeMap", 13.2);
  routeMap.on("load", () => renderRoutePage());
}

async function renderMainMap() {
  if (!mainMap || !mainMap.loaded()) return;
  clearMarkers(mainMarkers);
  clearRoutes(mainMap, "op");

  const showIncidents = mainFilter !== "unidades";
  const showUnits = mainFilter === "todos" || mainFilter === "unidades";

  if (showIncidents) {
    data.incidents
      .filter((i) => i.estado !== "Resuelto")
      .filter((i) => mainFilter === "todos" || i.categoria === mainFilter)
      .forEach((i) => {
        const el = makeMarker(i.categoria, categoryIcon(i.categoria), i.codigo);
        el.onclick = () => {
          selectIncident(i.id);
          mainMap.easeTo({
            center: [i.lng, i.lat],
            zoom: Math.max(mainMap.getZoom(), 14.3),
            duration: 500,
          });
        };
        mainMarkers.push(
          new maplibregl.Marker({ element: el })
            .setLngLat([i.lng, i.lat])
            .addTo(mainMap),
        );
      });
  }
  if (showUnits) {
    unitsArray.recorrer().forEach((u) => {
      const el = makeMarker("unidad", u.icon, u.id);
      el.onclick = () =>
        new maplibregl.Popup({ offset: 25 })
          .setLngLat([u.lng, u.lat])
          .setHTML(
            `<b>${u.id}</b><br><span style="font-size:10px;color:#8797a1">${u.tipo} · ${u.estado}</span>`,
          )
          .addTo(mainMap);
      mainMarkers.push(
        new maplibregl.Marker({ element: el })
          .setLngLat([u.lng, u.lat])
          .addTo(mainMap),
      );
    });
  }

  if (data.settings.showRoutes) {
    const active = data.incidents.filter(
      (i) => i.estado === "En atención" && i.unitId,
    );
    let n = 0;
    for (const i of active) {
      const u = findUnit(i.unitId);
      if (!u) continue;
      const routes = await osrmRoute(u, i, false);
      const r = routes[0];
      if (r.geometry)
        addRouteLayer(
          mainMap,
          `op-main-${n++}`,
          r.geometry,
          trafficColor(r.trafficLevel),
          5,
          0.92,
        );
    }
  }
}
function fitOperations() {
  if (!mainMap) return;
  const points = [
    ...data.incidents
      .filter((i) => i.estado !== "Resuelto")
      .map((i) => [i.lng, i.lat]),
    ...unitsArray.recorrer().map((u) => [u.lng, u.lat]),
  ];
  if (!points.length) return;
  const b = points.reduce(
    (bounds, c) => bounds.extend(c),
    new maplibregl.LngLatBounds(points[0], points[0]),
  );
  mainMap.fitBounds(b, { padding: 70, maxZoom: 14.5, duration: 600 });
}

/* navegación */
$$(".nav").forEach(
  (btn) =>
    (btn.onclick = () => {
      $$(".nav").forEach((x) => x.classList.remove("active"));
      $$(".view").forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      $("#view-" + btn.dataset.view).classList.add("active");
      if (btn.dataset.view === "rutas") {
        ensureRouteMap();
        setTimeout(() => {
          routeMap?.resize();
          renderRoutePage();
        }, 50);
      }
      if (btn.dataset.view === "mapa")
        setTimeout(() => {
          mainMap?.resize();
          renderMainMap();
        }, 50);
      renderAll(false);
    }),
);
$$("[data-map-filter]").forEach(
  (btn) =>
    (btn.onclick = () => {
      $$("[data-map-filter]").forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      mainFilter = btn.dataset.mapFilter;
      renderMainMap();
    }),
);
$("#fitOperationsBtn").onclick = fitOperations;
$("#toggleRoutesBtn").onclick = () => {
  data.settings.showRoutes = !data.settings.showRoutes;
  $("#toggleRoutesBtn").classList.toggle("active", data.settings.showRoutes);
  saveData();
  renderMainMap();
};
$("#drawerToggle").onclick = () => $("#drawer").classList.toggle("closed");
$$(".drawer-tab").forEach(
  (btn) =>
    (btn.onclick = () => {
      $$(".drawer-tab").forEach((x) => x.classList.remove("active"));
      $$(".drawer-pane").forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      $("#drawer-" + btn.dataset.drawer).classList.add("active");
    }),
);

function updateClock() {
  const d = new Date();
  $("#clock").textContent = d.toLocaleTimeString("es-EC", { hour12: false });
  $("#dateText").textContent = d.toLocaleDateString("es-EC", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
updateClock();
setInterval(updateClock, 1000);

/* búsqueda */
$("#globalSearchForm").onsubmit = (e) => {
  e.preventDefault();
  const t = $("#globalSearch").value.trim().toLowerCase();
  if (!t) return;
  const i = data.incidents.find((x) =>
    `${x.codigo} ${x.tipo} ${x.ubicacion} ${x.sector}`
      .toLowerCase()
      .includes(t),
  );
  if (i) {
    openMapIncident(i.id);
    return;
  }
  const u = unitsArray
    .recorrer()
    .find((x) => `${x.id} ${x.tipo} ${x.sector}`.toLowerCase().includes(t));
  if (u) {
    $$(".nav")
      .find((x) => x.dataset.view === "unidades")
      .click();
    setTimeout(() => {
      const c = document.querySelector(`[data-unit="${u.id}"]`);
      c?.scrollIntoView({ behavior: "smooth", block: "center" });
      c?.classList.add("highlight");
      setTimeout(() => c?.classList.remove("highlight"), 1400);
    }, 80);
    return;
  }
  toast("No se encontró coincidencia");
};

/* panel */
function openMapIncident(id) {
  $$(".nav")
    .find((x) => x.dataset.view === "mapa")
    .click();
  selectIncident(id);
}
function selectIncident(id, tab = "resumen") {
  const i = findIncident(id);
  if (i) renderIncidentPanel(i, tab);
}
function renderIncidentPanel(i, tab = "resumen") {
  $("#incidentPanel").innerHTML = `
    <div class="panel-head"><div><small>INCIDENTE</small><h2>${i.codigo}</h2></div><span class="badge ${priorityClass(i.prioridad)}">${i.prioridad.toUpperCase()}</span></div>
    <div class="panel-title"><div class="icon">${categoryIcon(i.categoria)}</div><div><b>${i.tipo}</b><span>${i.ubicacion}</span></div></div>
    <div class="panel-tabs"><button data-pt="resumen">Resumen</button><button data-pt="unidades">Unidades</button><button data-pt="historial">Historial</button><button data-pt="ruta">Ruta</button></div>
    <div id="panelBody" class="panel-body"></div>`;
  $$("[data-pt]").forEach((b) => {
    if (b.dataset.pt === tab) b.classList.add("active");
    b.onclick = () => renderIncidentPanel(i, b.dataset.pt);
  });
  const body = $("#panelBody");

  if (tab === "resumen") {
    body.innerHTML = `
      <p class="label">DESCRIPCIÓN</p><p style="font-size:10px;line-height:1.6;color:#b9c3c9">${i.descripcion}</p>
      <div class="summary-grid"><div><span>Personas</span><b>${i.personas}</b></div><div><span>Estado</span><b>${i.estado}</b></div><div><span>Prioridad</span><b>${i.prioridad}</b></div></div>
      <p class="label">UNIDAD ACTUAL</p>${i.unitId ? unitSummary(findUnit(i.unitId), i) : `<p style="font-size:10px;color:#768690">Sin unidad asignada.</p>`}
      <div class="panel-actions"><button class="primary" id="pUnits">${i.unitId ? "CAMBIAR / VER UNIDADES" : "ASIGNAR UNIDAD"}</button><button class="secondary" id="pRoute">VER RUTA</button><button class="ghost" id="pResolve" ${i.estado === "Resuelto" ? "disabled" : ""}>MARCAR COMO RESUELTO</button></div>
      <div class="panel-crud"><button class="secondary" id="pEdit">EDITAR</button><button class="danger-btn" id="pDelete">ELIMINAR</button></div>`;
    $("#pUnits").onclick = () => renderIncidentPanel(i, "unidades");
    $("#pRoute").onclick = () => renderIncidentPanel(i, "ruta");
    $("#pResolve").onclick = () => resolveIncident(i.id);
    $("#pEdit").onclick = () => editIncident(i.id);
    $("#pDelete").onclick = () => deleteIncident(i.id);
  }
  if (tab === "unidades") renderPanelUnits(i);
  if (tab === "historial") {
    const h = historyList
      .recorrer()
      .filter((x) => x.incidentId === i.id)
      .reverse();
    body.innerHTML = `<p class="label">CRONOLOGÍA</p><div class="timeline">${h.map((x) => `<div class="event"><time>${x.hora}</time><div><b>${x.texto}</b><span>${data.operator.name}</span></div></div>`).join("") || "<p>Sin movimientos.</p>"}</div>`;
  }
  if (tab === "ruta") renderPanelRoute(i);
}
function unitSummary(u, i) {
  if (!u) return "";
  const r = localRouteEstimate(u, i);
  return `<div class="unit-choice selected"><div class="unit-icon">${u.icon}</div><div><b>${u.id}</b><span>${u.tipo}</span></div><div><b>${r.minutes} min</b><span>ETA aprox.</span></div><div><b>${r.distanceKm.toFixed(1)} km</b><span>Distancia</span></div></div>`;
}
async function renderPanelUnits(i) {
  const body = $("#panelBody");
  body.innerHTML = `<p class="label">CALCULANDO UNIDADES...</p>`;
  const units = availableUnits(i),
    rank = [];
  for (const u of units) {
    const routes = await osrmRoute(u, i, false),
      r = routes[0];
    rank.push({ u, r });
  }
  rank.sort((a, b) => a.r.minutes - b.r.minutes);
  body.innerHTML = `<p class="label">UNIDADES DISPONIBLES ORDENADAS POR ETA</p>${rank.map((x, index) => `<div class="route-real-card ${index === 0 ? "recommended" : ""}"><div><b>${index === 0 ? "RECOMENDADA · " : ""}${x.u.icon} ${x.u.id}</b><span>${Math.round(x.r.minutes)} min · ${x.r.distanceKm.toFixed(1)} km · ${x.r.trafficLevel}</span><small>${x.r.real ? "Ruta vial OSRM" : "Estimación local"} · factor tráfico x${x.r.trafficFactor.toFixed(2)}</small></div><button data-assign="${x.u.id}">ASIGNAR</button></div>`).join("") || "<p>No hay unidades disponibles.</p>"}`;
  body
    .querySelectorAll("[data-assign]")
    .forEach((b) => (b.onclick = () => assignUnit(i.id, b.dataset.assign)));
}
async function renderPanelRoute(i) {
  const body = $("#panelBody");
  if (!i.unitId) {
    body.innerHTML = `<p style="font-size:10px;color:#768690">Primero asigna una unidad.</p><button class="primary" id="toUnits">ASIGNAR UNIDAD</button>`;
    $("#toUnits").onclick = () => renderIncidentPanel(i, "unidades");
    return;
  }
  const u = findUnit(i.unitId);
  body.innerHTML = `<p class="label">CALCULANDO RUTA...</p>`;
  const routes = await osrmRoute(u, i, true),
    r = routes[0];
  body.innerHTML = `<div class="route-real-card recommended"><div><b>${u.icon} ${u.id} → ${i.codigo}</b><span>${Math.round(r.minutes)} min · ${r.distanceKm.toFixed(1)} km</span><small>${r.real ? "Ruta vial real OSRM" : "Estimación local"} · tráfico ${r.trafficLevel}</small></div></div><button class="primary" id="openRoutePage" style="width:100%">ABRIR COMPARADOR DE RUTAS</button>`;
  $("#openRoutePage").onclick = () => {
    $$(".nav")
      .find((x) => x.dataset.view === "rutas")
      .click();
    $("#routeIncident").value = i.id;
    renderRoutePage();
  };
}

/* asignar / resolver */
async function assignUnit(incidentId, unitId) {
  const i = findIncident(incidentId),
    u = findUnit(unitId);
  if (!i || !u || u.estado !== "Disponible") return;
  const previous = i.unitId;
  if (previous) {
    const old = findUnit(previous);
    if (old) old.estado = "Disponible";
  }
  pushAction({
    type: "assign",
    incidentId,
    unitId,
    previousUnitId: previous,
    label: `Asignar ${unitId} a ${i.codigo}`,
  });
  i.unitId = unitId;
  i.estado = "En atención";
  u.estado = "Ocupada";
  addHistory(i.id, `${unitId} asignada a ${i.codigo}`);
  rebuildStructures();
  saveData();
  renderAll();
  renderIncidentPanel(i, "ruta");
  renderMainMap();
  toast(`${unitId} asignada`);
}
function resolveIncident(id) {
  const i = findIncident(id);
  if (!i || i.estado === "Resuelto") return;
  pushAction({
    type: "resolve",
    incidentId: id,
    previousState: i.estado,
    unitId: i.unitId,
    label: `Resolver ${i.codigo}`,
  });
  i.estado = "Resuelto";
  if (i.unitId) {
    const u = findUnit(i.unitId);
    if (u) u.estado = "Disponible";
  }
  addHistory(i.id, `${i.codigo} marcado como resuelto`);
  rebuildStructures();
  saveData();
  renderAll();
  renderIncidentPanel(i);
  renderMainMap();
  toast("Incidente resuelto");
}

/* modales */
function openModal(title, html) {
  $("#modalTitle").textContent = title;
  $("#modalBody").innerHTML = html;
  $("#modal").classList.remove("hidden");
}
function closeModal() {
  $("#modal").classList.add("hidden");
}
$("#modalClose").onclick = closeModal;
$("#modal").onclick = (e) => {
  if (e.target.id === "modal") closeModal();
};

$("#newIncidentBtn").onclick = () => incidentForm();
function incidentForm(existing = null) {
  openModal(
    existing ? `Editar ${existing.codigo}` : "Nuevo incidente",
    `
    <form id="incidentForm" class="form">
      <label>Código numérico<input class="form-control" name="codigoNum" type="number" min="1" required value="${existing?.codigoNum || Math.max(...data.incidents.map((x) => x.codigoNum), 0) + 1}"></label>
      <label>Tipo<select class="form-control" name="categoria"><option value="incendio">Incendio</option><option value="medico">Emergencia médica</option><option value="policia">Seguridad / Policía</option><option value="trafico">Accidente de tránsito</option><option value="falla">Falla eléctrica</option></select></label>
      <label class="full">Ubicación real<input class="form-control" name="ubicacion" required placeholder="Ej. Barrio Jocay, Calle J-10" value="${existing?.ubicacion || ""}"></label>
      <label>Sector<select class="form-control" name="sector">${Object.keys(
        cityGraph.adyacencias,
      )
        .map((s) => `<option>${s}</option>`)
        .join("")}</select></label>
      <label>Prioridad<select class="form-control" name="prioridad"><option>Crítica</option><option>Alta</option><option>Media</option><option>Baja</option></select></label>
      <label>Personas afectadas<input class="form-control" name="personas" type="number" min="0" value="${existing?.personas || 0}"></label>
      ${existing ? `<label>Estado<select class="form-control" name="estado"><option>En cola</option><option>En atención</option><option>Resuelto</option></select></label>` : ""}
      <label class="full">Descripción<textarea class="form-control" name="descripcion">${existing?.descripcion || ""}</textarea></label>
      <div id="geoStatus" class="form-note">Al guardar, NEXUS intenta localizar la dirección con Nominatim. Si falla, usa el centro aproximado del sector.</div>
      <button class="primary submit">${existing ? "GUARDAR CAMBIOS" : "REGISTRAR INCIDENTE"}</button>
    </form>`,
  );
  const f = $("#incidentForm");
  if (existing) {
    f.categoria.value = existing.categoria;
    f.sector.value = existing.sector;
    f.prioridad.value = existing.prioridad;
    f.estado.value = existing.estado;
  }
  f.onsubmit = async (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f).entries()),
      code = Number(v.codigoNum);
    if (
      data.incidents.some((x) => x.codigoNum === code && x.id !== existing?.id)
    )
      return toast("Ese código ya existe");
    const btn = f.querySelector(".submit");
    btn.disabled = true;
    btn.textContent = "LOCALIZANDO...";
    let geo = null;
    try {
      geo = await geocode(v.ubicacion);
    } catch {}
    const [flng, flat] = sectorCoords(v.sector);
    if (existing) {
      const previous = clone(existing);
      Object.assign(existing, {
        codigoNum: code,
        codigo: `INC-${code}`,
        categoria: v.categoria,
        tipo: v5TypeName(v.categoria),
        ubicacion: v.ubicacion.trim(),
        sector: v.sector,
        prioridad: v.prioridad,
        personas: Number(v.personas),
        descripcion: v.descripcion.trim() || "Sin descripción adicional.",
        lng: geo?.lng ?? flng,
        lat: geo?.lat ?? flat,
        estado: v.estado,
      });
      if (existing.estado === "En cola" && existing.unitId) {
        const u = findUnit(existing.unitId);
        if (u) u.estado = "Disponible";
        existing.unitId = null;
      }
      if (existing.estado === "Resuelto" && existing.unitId) {
        const u = findUnit(existing.unitId);
        if (u) u.estado = "Disponible";
      }
      pushAction({
        type: "editIncident",
        incidentId: existing.id,
        previous,
        label: `Editar ${previous.codigo}`,
      });
      addHistory(existing.id, `${existing.codigo} modificado`);
    } else {
      const inc = {
        id: "i" + Date.now(),
        codigo: `INC-${code}`,
        codigoNum: code,
        tipo: v5TypeName(v.categoria),
        categoria: v.categoria,
        ubicacion: v.ubicacion.trim(),
        sector: v.sector,
        prioridad: v.prioridad,
        estado: "En cola",
        unitId: null,
        lng: geo?.lng ?? flng,
        lat: geo?.lat ?? flat,
        personas: Number(v.personas),
        descripcion: v.descripcion.trim() || "Sin descripción adicional.",
        createdAt: now(),
        responseMinutes: null,
      };
      data.incidents.push(inc);
      addHistory(inc.id, `${inc.codigo} registrado`);
    }
    routeCache = {};
    rebuildStructures();
    saveData();
    closeModal();
    renderAll();
    renderMainMap();
    const target = existing || data.incidents[data.incidents.length - 1];
    openMapIncident(target.id);
    mainMap?.flyTo({
      center: [target.lng, target.lat],
      zoom: 15,
      duration: 700,
    });
    toast(existing ? "Incidente actualizado" : "Incidente registrado");
  };
}
function editIncident(id) {
  const i = findIncident(id);
  if (i) incidentForm(i);
}
function deleteIncident(id) {
  const i = findIncident(id);
  if (!i || !confirm(`¿Eliminar ${i.codigo}?`)) return;
  const index = data.incidents.findIndex((x) => x.id === id);
  if (i.unitId) {
    const u = findUnit(i.unitId);
    if (u) u.estado = "Disponible";
  }
  data.incidents.splice(index, 1);
  pushAction({
    type: "deleteIncident",
    incident: clone(i),
    index,
    label: `Eliminar ${i.codigo}`,
  });
  historyList.insertar({
    id: "h" + Date.now(),
    incidentId: null,
    hora: now(),
    texto: `${i.codigo} eliminado`,
  });
  rebuildStructures();
  saveData();
  renderAll();
  renderMainMap();
  toast("Incidente eliminado");
}

/* unidades */
$("#newUnitBtn").onclick = () => unitForm();
function unitForm(existing = null) {
  openModal(
    existing ? `Editar ${existing.id}` : "Nueva unidad",
    `
    <form id="unitForm" class="form">
      <label>Código<input class="form-control" name="id" required value="${existing?.id || ""}" ${existing ? "disabled" : ""}></label>
      <label>Tipo<select class="form-control" name="categoria"><option value="medico">Ambulancia</option><option value="incendio">Bomberos</option><option value="policia">Policía</option><option value="falla">Soporte eléctrico</option></select></label>
      <label>Sector<select class="form-control" name="sector">${Object.keys(
        cityGraph.adyacencias,
      )
        .map((s) => `<option>${s}</option>`)
        .join("")}</select></label>
      <label>Personal<input class="form-control" name="personas" type="number" min="1" value="${existing?.personas || 2}"></label>
      <label>Combustible %<input class="form-control" name="combustible" type="number" min="0" max="100" value="${existing?.combustible ?? 100}"></label>
      ${existing ? `<label>Estado<select class="form-control" name="estado"><option>Disponible</option><option>Ocupada</option><option>Mantenimiento</option></select></label>` : ""}
      <button class="primary submit">${existing ? "GUARDAR CAMBIOS" : "GUARDAR UNIDAD"}</button>
    </form>`,
  );
  const f = $("#unitForm");
  if (existing) {
    f.categoria.value = existing.categoria;
    f.sector.value = existing.sector;
    f.estado.value = existing.estado;
  }
  f.onsubmit = (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(f).entries()),
      id = existing?.id || v.id.trim().toUpperCase();
    if (!existing && findUnit(id)) return toast("Ese código ya existe");
    if (
      existing &&
      data.incidents.some((i) => i.unitId === id && i.estado !== "Resuelto") &&
      v.estado !== "Ocupada"
    )
      return toast("Está asignada a un incidente activo");
    const [lng, lat] = sectorCoords(v.sector);
    if (existing)
      Object.assign(existing, {
        categoria: v.categoria,
        tipo: unitType(v.categoria),
        icon: unitIcon(v.categoria),
        sector: v.sector,
        personas: Number(v.personas),
        combustible: Number(v.combustible),
        estado: v.estado,
        lng,
        lat,
      });
    else
      unitsArray.agregar({
        id,
        tipo: unitType(v.categoria),
        categoria: v.categoria,
        estado: "Disponible",
        sector: v.sector,
        lng,
        lat,
        personas: Number(v.personas),
        combustible: Number(v.combustible),
        icon: unitIcon(v.categoria),
      });
    routeCache = {};
    saveData();
    closeModal();
    renderAll();
    renderMainMap();
    toast(existing ? "Unidad actualizada" : "Unidad registrada");
  };
}
function editUnit(id) {
  const u = findUnit(id);
  if (u) unitForm(u);
}
function deleteUnit(id) {
  if (data.incidents.some((i) => i.unitId === id && i.estado !== "Resuelto"))
    return toast("No puedes eliminar una unidad asignada");
  if (confirm(`¿Eliminar ${id}?`)) {
    unitsArray.eliminar(id);
    saveData();
    renderAll();
    renderMainMap();
    toast("Unidad eliminada");
  }
}

/* incidentes lista */
$("#incidentSearch").oninput = renderIncidents;
$("#incidentPriorityFilter").onchange = renderIncidents;
$("#incidentSort").onchange = renderIncidents;
function renderIncidents() {
  let list = $("#incidentSearch").value.trim()
    ? busquedaSecuencial(data.incidents, $("#incidentSearch").value.trim())
    : [...data.incidents];
  const p = $("#incidentPriorityFilter").value;
  if (p !== "todos") list = list.filter((x) => x.prioridad === p);
  list =
    $("#incidentSort").value === "codigo"
      ? ordenBurbujaCodigo(list)
      : ordenSeleccionPrioridad(list);
  $("#incidentTable").innerHTML = list
    .map(
      (i) =>
        `<tr><td>${i.codigo}</td><td>${i.tipo}</td><td>${i.ubicacion}</td><td><span class="badge ${priorityClass(i.prioridad)}">${i.prioridad}</span></td><td>${i.estado}</td><td>${i.unitId || "—"}</td><td><button class="table-action" data-open="${i.id}">ABRIR</button><button class="table-action" data-edit="${i.id}">EDITAR</button><button class="table-action danger-btn" data-del="${i.id}">BORRAR</button></td></tr>`,
    )
    .join("");
  $("#incidentTable")
    .querySelectorAll("[data-open]")
    .forEach((b) => (b.onclick = () => openMapIncident(b.dataset.open)));
  $("#incidentTable")
    .querySelectorAll("[data-edit]")
    .forEach((b) => (b.onclick = () => editIncident(b.dataset.edit)));
  $("#incidentTable")
    .querySelectorAll("[data-del]")
    .forEach((b) => (b.onclick = () => deleteIncident(b.dataset.del)));
  const vals = [
    [
      "Críticos",
      data.incidents.filter(
        (i) => i.prioridad === "Crítica" && i.estado !== "Resuelto",
      ).length,
    ],
    [
      "En atención",
      data.incidents.filter((i) => i.estado === "En atención").length,
    ],
    ["En cola", incidentQueue.recorrer().length],
    ["Resueltos", data.incidents.filter((i) => i.estado === "Resuelto").length],
  ];
  $("#incidentStats").innerHTML = vals
    .map(
      ([a, b]) => `<div class="mini-stat"><span>${a}</span><b>${b}</b></div>`,
    )
    .join("");
}
function renderUnits() {
  $("#unitGrid").innerHTML = unitsArray
    .recorrer()
    .map(
      (u) =>
        `<article class="unit-card" data-unit="${u.id}"><span class="state ${u.estado === "Disponible" ? "available" : u.estado === "Ocupada" ? "busy" : "maintenance"}">${u.estado.toUpperCase()}</span><div class="big">${u.icon}</div><h3>${u.id}</h3><p>${u.tipo} · ${u.sector}</p><div class="unit-data"><span>Personal<b>${u.personas}</b></span><span>Combustible<b>${u.combustible}%</b></span></div><div class="unit-card-actions"><button data-eu="${u.id}">EDITAR</button><button class="danger-btn" data-du="${u.id}">ELIMINAR</button></div></article>`,
    )
    .join("");
  $("#unitGrid")
    .querySelectorAll("[data-eu]")
    .forEach((b) => (b.onclick = () => editUnit(b.dataset.eu)));
  $("#unitGrid")
    .querySelectorAll("[data-du]")
    .forEach((b) => (b.onclick = () => deleteUnit(b.dataset.du)));
}

/* cola */
$("#attendNextBtn").onclick = () => {
  const i = incidentQueue.frente();
  if (!i) return toast("La cola está vacía");
  openMapIncident(i.id);
  renderIncidentPanel(i, "unidades");
};
function renderQueue() {
  const q = incidentQueue.recorrer();
  $("#queueView").innerHTML =
    q
      .map(
        (i, n) =>
          `<div class="queue-card"><strong>${String(n + 1).padStart(2, "0")}</strong><div><b>${i.codigo}</b><span>${i.tipo} · ${i.ubicacion}</span></div><span class="badge ${priorityClass(i.prioridad)}">${i.prioridad}</span><button data-q="${i.id}">ATENDER</button></div>`,
      )
      .join("") || `<div class="card">Cola vacía.</div>`;
  $("#queueView")
    .querySelectorAll("[data-q]")
    .forEach(
      (b) =>
        (b.onclick = () => {
          openMapIncident(b.dataset.q);
          renderIncidentPanel(findIncident(b.dataset.q), "unidades");
        }),
    );
}

/* rutas page */
$("#routeIncident").onchange = renderRoutePage;
function renderRouteSelector() {
  const current = $("#routeIncident").value,
    active = data.incidents.filter((i) => i.estado !== "Resuelto");
  $("#routeIncident").innerHTML = active
    .map(
      (i) =>
        `<option value="${i.id}">${i.codigo} · ${i.tipo} · ${i.ubicacion}</option>`,
    )
    .join("");
  if (active.some((i) => i.id === current)) $("#routeIncident").value = current;
}
async function renderRoutePage() {
  if (!routeMap || !routeMap.loaded()) return;
  renderRouteSelector();
  const i =
    findIncident($("#routeIncident").value) ||
    data.incidents.find((x) => x.estado !== "Resuelto");
  if (!i) return;
  $("#routeIncident").value = i.id;
  $("#routeIncidentInfo").innerHTML =
    `<b>${i.codigo} · ${i.tipo}</b><span>${i.ubicacion} · ${i.prioridad} · ${i.estado}</span>`;
  const list = availableUnits(i);
  if (i.unitId) {
    const a = findUnit(i.unitId);
    if (a && !list.some((x) => x.id === a.id)) list.unshift(a);
  }
  const ranked = [];
  for (const u of list) {
    const routes = await osrmRoute(u, i, false);
    ranked.push({ u, r: routes[0] });
  }
  ranked.sort((a, b) => a.r.minutes - b.r.minutes);
  $("#routeUnitList").innerHTML =
    ranked
      .map(
        (x, n) =>
          `<div class="route-real-card ${n === 0 ? "recommended" : ""}"><div><b>${n === 0 ? "RECOMENDADA · " : ""}${x.u.icon} ${x.u.id}</b><span>${Math.round(x.r.minutes)} min · ${x.r.distanceKm.toFixed(1)} km · ${x.r.trafficLevel}</span><small>${x.r.real ? "Ruta vial OSRM" : "Estimación local"}</small></div><button data-ra="${x.u.id}">${x.u.id === i.unitId ? "ASIGNADA" : "ASIGNAR"}</button></div>`,
      )
      .join("") || "<p>Sin unidades disponibles.</p>";
  $("#routeUnitList")
    .querySelectorAll("[data-ra]")
    .forEach(
      (b) =>
        (b.onclick = () => {
          if (b.textContent !== "ASIGNADA") assignUnit(i.id, b.dataset.ra);
        }),
    );
  const u = i.unitId ? findUnit(i.unitId) : ranked[0]?.u;
  await drawRouteComparison(u, i);
}
async function drawRouteComparison(u, i) {
  clearMarkers(routeMarkers);
  clearRoutes(routeMap, "cmp");
  if (!u) return;
  const um = makeMarker("unidad", u.icon, u.id),
    im = makeMarker(i.categoria, categoryIcon(i.categoria), i.codigo);
  routeMarkers.push(
    new maplibregl.Marker({ element: um })
      .setLngLat([u.lng, u.lat])
      .addTo(routeMap),
  );
  routeMarkers.push(
    new maplibregl.Marker({ element: im })
      .setLngLat([i.lng, i.lat])
      .addTo(routeMap),
  );
  const routes = await osrmRoute(u, i, true);
  routes.slice(0, 3).forEach((r, n) => {
    if (r.geometry)
      addRouteLayer(
        routeMap,
        `cmp-${n === 0 ? "main" : n === 1 ? "alt1" : "alt2"}`,
        r.geometry,
        n === 0
          ? trafficColor(r.trafficLevel)
          : n === 1
            ? "#ffb12d"
            : "#4b9bff",
        n === 0 ? 6 : 4,
        n === 0 ? 0.95 : 0.7,
        n === 0 ? null : [2, 2],
      );
  });
  if (routes[0]?.geometry) fitGeometry(routeMap, routes[0].geometry);
  else {
    const b = new maplibregl.LngLatBounds([u.lng, u.lat], [u.lng, u.lat]);
    b.extend([i.lng, i.lat]);
    routeMap.fitBounds(b, { padding: 80 });
  }
  $("#routeAlternatives").innerHTML = routes
    .slice(0, 3)
    .map(
      (r, n) =>
        `<div class="route-option ${n === 0 ? "recommended" : ""}"><b>${n === 0 ? "Recomendada" : `Alternativa ${n + 1}`}</b><strong>${Math.round(r.minutes)} min</strong><span>${r.distanceKm.toFixed(1)} km · ${r.trafficLevel}</span></div>`,
    )
    .join("");
}

/* reportes */
function renderReports() {
  const solved = data.incidents.filter(
      (i) => i.estado === "Resuelto" && i.responseMinutes,
    ),
    avg = solved.length
      ? Math.round(
          solved.reduce((s, i) => s + i.responseMinutes, 0) / solved.length,
        )
      : 0;
  const sectors = {},
    types = {};
  data.incidents.forEach((i) => {
    sectors[i.sector] = (sectors[i.sector] || 0) + 1;
    types[i.tipo] = (types[i.tipo] || 0) + 1;
  });
  const topSector =
      Object.entries(sectors).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
    topType = Object.entries(types).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  const cards = [
    ["Tiempo medio de respuesta", `${avg} min`, "Promedio de casos resueltos"],
    ["Sector con más incidentes", topSector, "Datos actuales"],
    ["Tipo más frecuente", topType, "Datos actuales"],
    ["Incidentes registrados", data.incidents.length, "Total"],
  ];
  $("#reportCards").innerHTML = cards
    .map(
      (c) =>
        `<div class="report-card"><span>${c[0]}</span><b>${c[1]}</b><small>${c[2]}</small></div>`,
    )
    .join("");
  const max = Math.max(...Object.values(types), 1);
  $("#typeBars").innerHTML = Object.entries(types)
    .map(
      ([t, n]) =>
        `<div class="bar-row"><span>${t}</span><div class="bar"><i style="width:${(n / max) * 100}%"></i></div><b>${n}</b></div>`,
    )
    .join("");
  $("#globalHistory").innerHTML = historyList
    .recorrer()
    .slice()
    .reverse()
    .slice(0, 10)
    .map(
      (x) =>
        `<div class="event"><time>${x.hora}</time><div><b>${x.texto}</b><span>${data.operator.name}</span></div></div>`,
    )
    .join("");
}

/* structures */
let selectedStructure = "arreglo";
$$(".structure-tab").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".structure-tab").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      selectedStructure = b.dataset.structure;
      renderStructure();
    }),
);
function renderStructure() {
  const c = $("#structureContent");
  if (selectedStructure === "arreglo") {
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="array-demo">${unitsArray
      .recorrer()
      .map(
        (u) =>
          `<div class="array-cell" data-ac="${u.id}">${u.id}<br><small>${u.estado}</small></div>`,
      )
      .join(
        "",
      )}</div></div><div class="structure-info"><small>ARREGLO</small><h2>Flota de unidades</h2><p>Las unidades operativas de la aplicación se administran en un arreglo propio.</p><div class="operation-list"><div class="operation">agregar()</div><div class="operation">buscar()</div><div class="operation">modificar()</div><div class="operation">eliminar()</div><div class="operation">recorrer()</div></div><div class="academic-tools"><input id="arrSearch" placeholder="AMB-03"><button id="arrBtn">BUSCAR</button><div id="arrRes" class="academic-result">Escribe un código.</div></div></div></div>`;
    $("#arrBtn").onclick = () => {
      const id = $("#arrSearch").value.trim().toUpperCase(),
        u = unitsArray.buscar(id);
      $$("[data-ac]").forEach((x) => x.classList.remove("highlight-node"));
      if (u)
        document
          .querySelector(`[data-ac="${u.id}"]`)
          ?.classList.add("highlight-node");
      $("#arrRes").textContent = u
        ? `${u.id} · ${u.tipo} · ${u.estado}`
        : "No encontrada";
    };
  }
  if (selectedStructure === "lista") {
    const ev = historyList.recorrer().slice(-6);
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="linked-demo">${ev.map((x) => `<div class="linked-node" data-hn="${x.id}">${x.hora}<br><small>${x.texto}</small></div>`).join("") || "<div class='linked-node'>VACÍA</div>"}</div></div><div class="structure-info"><small>LISTA ENLAZADA</small><h2>Historial</h2><p>Cada evento es un nodo enlazado con el siguiente.</p><div class="operation-list"><div class="operation">insertar()</div><div class="operation">buscar()</div><div class="operation">modificar()</div><div class="operation">eliminar()</div><div class="operation">recorrer()</div></div><div class="academic-tools"><input id="histSearch" placeholder="Texto a buscar"><button id="histBtn">BUSCAR</button><div class="row-tools"><button id="histAdd">INSERTAR DEMO</button><button id="histMod">MODIFICAR ÚLTIMO</button><button id="histDel">ELIMINAR ÚLTIMO</button></div><div id="histRes" class="academic-result">Lista preparada.</div></div></div></div>`;
    $("#histBtn").onclick = () => {
      const t = $("#histSearch").value.toLowerCase(),
        f = historyList.buscar((x) => x.texto.toLowerCase().includes(t));
      $$("[data-hn]").forEach((x) => x.classList.remove("highlight-node"));
      if (f)
        document
          .querySelector(`[data-hn="${f.id}"]`)
          ?.classList.add("highlight-node");
      $("#histRes").textContent = f
        ? `${f.hora} · ${f.texto}`
        : "No encontrado";
    };
    $("#histAdd").onclick = () => {
      historyList.insertar({
        id: "h" + Date.now(),
        incidentId: null,
        hora: now(),
        texto: "Evento de demostración",
      });
      saveData();
      renderReports();
      renderStructure();
    };
    $("#histMod").onclick = () => {
      const a = historyList.recorrer(),
        l = a[a.length - 1];
      if (l)
        historyList.modificar((x) => x.id === l.id, {
          ...l,
          texto: l.texto + " · MODIFICADO",
        });
      saveData();
      renderReports();
      renderStructure();
    };
    $("#histDel").onclick = () => {
      const a = historyList.recorrer(),
        l = a[a.length - 1];
      if (l) historyList.eliminar((x) => x.id === l.id);
      saveData();
      renderReports();
      renderStructure();
    };
  }
  if (selectedStructure === "pila") {
    const a = actionStack.recorrer();
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="stack-demo">${
      a.length
        ? a
            .slice(-7)
            .map(
              (x, n, arr) =>
                `<div class="stack-cell">${n === arr.length - 1 ? "CIMA · " : ""}${x.label}</div>`,
            )
            .join("")
        : "<div class='stack-cell'>PILA VACÍA</div>"
    }</div></div><div class="structure-info"><small>LIFO</small><h2>Pila / Deshacer</h2><p>La última acción es la primera que se revierte.</p><div class="operation-list"><div class="operation">apilar()</div><div class="operation">desapilar()</div><div class="operation">cima()</div><div class="operation">estaVacia()</div></div><div class="academic-tools"><div class="academic-result">${actionStack.cima()?.label || "Pila vacía"}</div><button id="undoBtn">DESHACER ÚLTIMA ACCIÓN</button></div></div></div>`;
    $("#undoBtn").onclick = undoLastAction;
  }
  if (selectedStructure === "cola") {
    const q = incidentQueue.recorrer();
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="queue-demo">${q.length ? q.map((x, n) => `<div class="queue-cell">${n === 0 ? "FRENTE · " : ""}${x.codigo}</div>`).join("") : "<div class='queue-cell'>COLA VACÍA</div>"}</div></div><div class="structure-info"><small>FIFO</small><h2>Cola de incidentes</h2><p>El primero sin atención queda en el frente.</p><div class="operation-list"><div class="operation">encolar()</div><div class="operation">desencolar()</div><div class="operation">frente()</div><div class="operation">estaVacia()</div></div><div class="academic-tools"><div class="academic-result">${incidentQueue.frente() ? `Frente: ${incidentQueue.frente().codigo}` : "Cola vacía"}</div><button id="frontBtn">ATENDER FRENTE</button></div></div></div>`;
    $("#frontBtn").onclick = () => {
      const i = incidentQueue.frente();
      if (i) {
        openMapIncident(i.id);
        renderIncidentPanel(i, "unidades");
      }
    };
  }
  if (selectedStructure === "arbol") {
    c.innerHTML = `<div class="structure-layout"><div class="visual-board tree-demo"><svg id="treeSvg" viewBox="0 0 900 520"></svg></div><div class="structure-info"><small>BST</small><h2>Árbol binario de incidentes</h2><p>Los números corresponden a códigos reales: 204 = INC-204.</p><div class="operation-list"><div class="operation">insertar()</div><div class="operation">buscar()</div><div class="operation" id="treeTrav">Inorden: ${incidentTree
      .inorden()
      .map((x) => x.codigo)
      .join(
        " → ",
      )}</div></div><div class="academic-tools"><input id="treeSearch" type="number" placeholder="204"><button id="treeBtn">BUSCAR</button><div class="row-tools"><button data-tr="inorden">INORDEN</button><button data-tr="preorden">PREORDEN</button><button data-tr="postorden">POSTORDEN</button></div><div id="treeRes" class="academic-result">Busca un código real.</div></div></div></div>`;
    drawTree();
    $("#treeBtn").onclick = () => {
      const f = incidentTree.buscar(Number($("#treeSearch").value));
      $("#treeRes").textContent = f
        ? `${f.codigo} · ${f.tipo} · ${f.ubicacion}`
        : "No encontrado";
    };
    c.querySelectorAll("[data-tr]").forEach(
      (b) =>
        (b.onclick = () =>
          ($("#treeTrav").textContent = `${b.dataset.tr}: ${incidentTree[
            b.dataset.tr
          ]()
            .map((x) => x.codigo)
            .join(" → ")}`)),
    );
  }
  if (selectedStructure === "grafo") {
    const sectors = Object.keys(cityGraph.adyacencias);
    c.innerHTML = `<div class="structure-layout"><div class="visual-board graph-demo"><svg id="graphSvg" viewBox="0 0 900 520"></svg></div><div class="structure-info"><small>GRAFO</small><h2>Conexión lógica entre sectores</h2><p>El grafo académico modela sectores y BFS. El mapa operativo real usa la red vial completa.</p><div class="operation-list"><div class="operation">agregarVertice()</div><div class="operation">agregarArista()</div><div class="operation">bfs()</div></div><div class="academic-tools"><select id="gStart">${sectors.map((s) => `<option>${s}</option>`).join("")}</select><select id="gEnd">${sectors.map((s) => `<option>${s}</option>`).join("")}</select><button id="gBtn">CALCULAR BFS</button><button id="gMapBtn">ABRIR MAPA REAL</button><div id="gRes" class="academic-result">Elige origen y destino.</div></div></div></div>`;
    drawGraph();
    $("#gEnd").selectedIndex = Math.min(4, sectors.length - 1);
    $("#gBtn").onclick = () =>
      ($("#gRes").textContent =
        cityGraph.bfs($("#gStart").value, $("#gEnd").value).join(" → ") ||
        "Sin conexión");
    $("#gMapBtn").onclick = () =>
      $$(".nav")
        .find((x) => x.dataset.view === "mapa")
        .click();
  }
}
function drawLine(svg, x1, y1, x2, y2) {
  const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
  Object.entries({
    x1,
    y1,
    x2,
    y2,
    stroke: "#394c58",
    "stroke-width": "2",
  }).forEach(([k, v]) => l.setAttribute(k, v));
  svg.appendChild(l);
}
function drawTree() {
  const svg = $("#treeSvg");
  if (!svg) return;
  svg.innerHTML = "";
  const rec = (n, x, y, s) => {
    if (!n) return;
    if (n.izquierda) {
      drawLine(svg, x, y, x - s, y + 85);
      rec(n.izquierda, x - s, y + 85, s * 0.56);
    }
    if (n.derecha) {
      drawLine(svg, x, y, x + s, y + 85);
      rec(n.derecha, x + s, y + 85, s * 0.56);
    }
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", 26);
    c.setAttribute("fill", "#0b151c");
    c.setAttribute("stroke", "#ef343b");
    svg.appendChild(c);
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y + 4);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("fill", "#eef3f6");
    t.setAttribute("font-size", "12");
    t.textContent = n.valor.codigoNum;
    svg.appendChild(t);
  };
  rec(incidentTree.raiz, 450, 50, 185);
}
function drawGraph() {
  const svg = $("#graphSvg");
  if (!svg) return;
  svg.innerHTML = "";
  const p = {
    Jocay: [170, 180],
    Centro: [420, 220],
    Tarqui: [680, 130],
    "Los Esteros": [650, 390],
    "La Paz": [270, 390],
    Industrial: [470, 455],
  };
  Object.entries(cityGraph.adyacencias).forEach(([a, ns]) =>
    ns.forEach((b) => {
      if (a < b) drawLine(svg, ...p[a], ...p[b]);
    }),
  );
  Object.entries(p).forEach(([name, [x, y]]) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", 28);
    c.setAttribute("fill", "#0b151c");
    c.setAttribute("stroke", "#4b9bff");
    svg.appendChild(c);
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y + 48);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("fill", "#aebbc3");
    t.setAttribute("font-size", "12");
    t.textContent = name;
    svg.appendChild(t);
  });
}

/* undo */
function undoLastAction() {
  const a = actionStack.desapilar();
  if (!a) return toast("No hay acciones");
  if (a.type === "assign") {
    const i = findIncident(a.incidentId),
      nu = findUnit(a.unitId),
      pu = a.previousUnitId ? findUnit(a.previousUnitId) : null;
    if (nu) nu.estado = "Disponible";
    if (pu) pu.estado = "Ocupada";
    if (i) {
      i.unitId = a.previousUnitId;
      i.estado = a.previousUnitId ? "En atención" : "En cola";
      addHistory(i.id, `Deshacer: ${a.label}`);
    }
  }
  if (a.type === "resolve") {
    const i = findIncident(a.incidentId);
    if (i) {
      i.estado = a.previousState;
      if (a.unitId) {
        const u = findUnit(a.unitId);
        if (u) u.estado = "Ocupada";
      }
      addHistory(i.id, `Deshacer: ${a.label}`);
    }
  }
  if (a.type === "editIncident") {
    const n = data.incidents.findIndex((x) => x.id === a.incidentId);
    if (n >= 0) data.incidents[n] = clone(a.previous);
  }
  if (a.type === "deleteIncident") {
    data.incidents.splice(
      Math.min(a.index, data.incidents.length),
      0,
      clone(a.incident),
    );
    if (a.incident.unitId) {
      const u = findUnit(a.incident.unitId);
      if (u && a.incident.estado !== "Resuelto") u.estado = "Ocupada";
    }
  }
  routeCache = {};
  rebuildStructures();
  saveData();
  renderAll();
  renderMainMap();
  renderStructure();
  toast("Acción deshecha");
}

/* config */
$$(".setting").forEach(
  (b) => (b.onclick = () => openSetting(b.dataset.setting)),
);
function openSetting(type) {
  if (type === "operador") {
    openModal(
      "Cuenta del operador",
      `<form id="opForm" class="form"><label>Nombre<input class="form-control" name="name" value="${data.operator.name}"></label><label>Código<input class="form-control" name="code" value="${data.operator.code}"></label><button class="primary submit">GUARDAR</button></form>`,
    );
    $("#opForm").onsubmit = (e) => {
      e.preventDefault();
      const v = Object.fromEntries(new FormData(e.target).entries());
      data.operator = {
        name: v.name.trim() || "Operador",
        code: v.code.trim() || "OP-01",
      };
      saveData();
      closeModal();
      renderReports();
      toast("Operador actualizado");
    };
  }
  if (type === "alertas") {
    openModal(
      "Notificaciones",
      `<div class="setting-row"><b>Alertas críticas</b><span>${data.settings.alerts ? "Activadas" : "Desactivadas"}</span><button id="toggleAlerts" class="secondary" style="margin-top:8px">${data.settings.alerts ? "DESACTIVAR" : "ACTIVAR"}</button></div>`,
    );
    $("#toggleAlerts").onclick = () => {
      data.settings.alerts = !data.settings.alerts;
      saveData();
      openSetting("alertas");
    };
  }
  if (type === "mapa") {
    openModal(
      "Mapa y rutas",
      `<div class="setting-panel"><div class="setting-row"><b>Rutas operativas</b><span>${data.settings.showRoutes ? "Visibles" : "Ocultas"}</span><button id="cfgRoutes" class="secondary" style="margin-top:8px">CAMBIAR</button></div><div class="setting-row"><b>Mapa</b><span>MapLibre + OpenFreeMap. Arrastre, zoom y brújula activos.</span><button id="cfgFit" class="secondary" style="margin-top:8px">VER TODA LA OPERACIÓN</button></div></div>`,
    );
    $("#cfgRoutes").onclick = () => {
      data.settings.showRoutes = !data.settings.showRoutes;
      saveData();
      renderMainMap();
      openSetting("mapa");
    };
    $("#cfgFit").onclick = () => {
      closeModal();
      $$(".nav")
        .find((x) => x.dataset.view === "mapa")
        .click();
      fitOperations();
    };
  }
  if (type === "flota") {
    const c = {};
    unitsArray.recorrer().forEach((u) => (c[u.tipo] = (c[u.tipo] || 0) + 1));
    openModal(
      "Flota",
      `<div class="setting-panel">${Object.entries(c)
        .map(
          ([t, n]) =>
            `<div class="setting-row"><b>${t}</b><span>${n} unidades registradas</span></div>`,
        )
        .join(
          "",
        )}<div class="setting-row"><button id="goUnits" class="primary">ABRIR GESTIÓN DE UNIDADES</button></div></div>`,
    );
    $("#goUnits").onclick = () => {
      closeModal();
      $$(".nav")
        .find((x) => x.dataset.view === "unidades")
        .click();
    };
  }
  if (type === "servicios") {
    openModal(
      "Servicios geográficos",
      `<div class="setting-panel"><div class="setting-row"><b>Mapa</b><span>OpenFreeMap + MapLibre. Sin clave.</span></div><div class="setting-row"><b>Rutas</b><span>OSRM público. Si no responde, NEXUS usa una estimación local para que el flujo no se rompa.</span></div><div class="setting-row"><b>Ubicaciones</b><span>Nominatim se consulta solo al guardar un incidente. Si falla, usa el sector como respaldo.</span></div><div class="setting-row"><b>Tráfico</b><span>Simulación académica por hora, sector y ruta; no se presenta como tráfico oficial en vivo.</span></div><div class="api-note">La aplicación está diseñada para funcionar sin Mapbox. Más adelante puedes sustituir OSRM/simulación por un proveedor comercial de tráfico sin cambiar el resto del sistema.</div></div>`,
    );
  }
}

/* status + drawer */
function renderStatus() {
  const vals = [
    [
      "INCIDENTES ACTIVOS",
      data.incidents.filter((i) => i.estado !== "Resuelto").length,
    ],
    [
      "UNIDADES DISPONIBLES",
      unitsArray.recorrer().filter((u) => u.estado === "Disponible").length,
    ],
    [
      "UNIDADES EN RUTA",
      data.incidents.filter((i) => i.estado === "En atención" && i.unitId)
        .length,
    ],
    ["EN COLA", incidentQueue.recorrer().length],
    ["RESUELTOS", data.incidents.filter((i) => i.estado === "Resuelto").length],
  ];
  $("#statusStrip").innerHTML = vals
    .map(
      ([a, b]) =>
        `<div class="status"><span>${a}</span><b>${b}</b><em>datos actuales</em></div>`,
    )
    .join("");
}
function renderDrawer() {
  const q = incidentQueue.recorrer();
  $("#drawer-cola").innerHTML =
    q
      .map(
        (i) =>
          `<div class="drawer-row"><b>${i.codigo}</b><span>${i.tipo}</span><span>${i.ubicacion}</span><i class="badge ${priorityClass(i.prioridad)}">${i.prioridad}</i><button data-di="${i.id}">VER</button></div>`,
      )
      .join("") || "<div style='padding:12px;font-size:10px'>Cola vacía.</div>";
  $("#drawer-cola")
    .querySelectorAll("[data-di]")
    .forEach((b) => (b.onclick = () => openMapIncident(b.dataset.di)));
  const r = data.incidents.filter(
    (i) => i.estado === "En atención" && i.unitId,
  );
  $("#drawer-ruta").innerHTML =
    r
      .map((i) => {
        const u = findUnit(i.unitId),
          x = localRouteEstimate(u, i);
        return `<div class="drawer-row"><b>${u.id}</b><span>→ ${i.codigo}</span><span>${i.ubicacion}</span><i>${x.minutes} min</i><button data-dr="${i.id}">VER</button></div>`;
      })
      .join("") ||
    "<div style='padding:12px;font-size:10px'>Sin unidades en ruta.</div>";
  $("#drawer-ruta")
    .querySelectorAll("[data-dr]")
    .forEach(
      (b) =>
        (b.onclick = () => {
          $$(".nav")
            .find((x) => x.dataset.view === "rutas")
            .click();
          $("#routeIncident").value = b.dataset.dr;
          renderRoutePage();
        }),
    );
}

/* all */
function renderAll(includeMaps = true) {
  rebuildStructures();
  renderStatus();
  renderDrawer();
  renderIncidents();
  renderUnits();
  renderQueue();
  renderReports();
  renderStructure();
  renderRouteSelector();
  if (includeMaps) {
    renderMainMap();
    if (routeMap?.loaded()) renderRoutePage();
  }
}
initMaps();
renderAll(false);
const first =
  data.incidents.find((i) => i.estado !== "Resuelto") || data.incidents[0];
if (first) renderIncidentPanel(first);
