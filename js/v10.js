data.settings.hiddenRoutes = data.settings.hiddenRoutes || {};
saveData();
let routeEndpointMarkers = [],
  routeComparisonEndpointMarkers = [];

function isRouteVisible(id) {
  return !data.settings.hiddenRoutes[id];
}
function setRouteVisible(id, visible) {
  if (visible) delete data.settings.hiddenRoutes[id];
  else data.settings.hiddenRoutes[id] = true;
  saveData();
  renderMainMap();
  renderDrawer();
  const i = findIncident(id);
  if (i && $("#incidentPanel")?.textContent.includes(i.codigo))
    renderIncidentPanel(i, "ruta");
}
function clearEndpointMarkers(list) {
  list.forEach((m) => m.remove());
  list.length = 0;
}
function endpointEl(color, icon, label) {
  const el = document.createElement("div");
  el.className = "route-endpoint-marker";
  el.style.color = color;
  el.innerHTML = `${icon}<span class="route-endpoint-label">${label}</span>`;
  return el;
}
function routeColorByIncident(i) {
  return (
    {
      incendio: "#ff3b43",
      medico: "#28a5ff",
      policia: "#b365ff",
      trafico: "#ff8a2c",
      falla: "#f4d13c",
    }[i.categoria] || "#39d17e"
  );
}

osrmRoute = async function (unit, incident, alternatives = false) {
  const key = `v10:${unit.id}:${incident.id}:${alternatives}`;
  if (routeCache[key]) return routeCache[key];
  const url = `https://router.project-osrm.org/route/v1/driving/${unit.lng},${unit.lat};${incident.lng},${incident.lat}?overview=full&geometries=geojson&alternatives=${alternatives ? "true" : "false"}&steps=false`;
  try {
    const r = await fetch(url),
      j = await r.json();
    if (!r.ok || j.code !== "Ok" || !j.routes?.length) throw 0;
    const t = trafficFactor(incident, unit),
      s = j.waypoints?.[0]?.location || [unit.lng, unit.lat],
      e = j.waypoints?.[1]?.location || [incident.lng, incident.lat];
    return (routeCache[key] = j.routes.map((x, index) => ({
      geometry: x.geometry,
      distanceKm: x.distance / 1000,
      baseMinutes: x.duration / 60,
      minutes: (x.duration / 60) * t.factor,
      trafficLevel: t.level,
      trafficFactor: t.factor,
      real: true,
      index,
      snappedStart: s,
      snappedEnd: e,
    })));
  } catch {
    const x = localRouteEstimate(unit, incident);
    return [
      {
        ...x,
        geometry: null,
        index: 0,
        snappedStart: [unit.lng, unit.lat],
        snappedEnd: [incident.lng, incident.lat],
      },
    ];
  }
};

renderMainMap = async function () {
  if (!mainMap || !mainMap.loaded()) return;
  clearMarkers(mainMarkers);
  clearEndpointMarkers(routeEndpointMarkers);
  (mainMap.getStyle()?.layers || [])
    .map((l) => l.id)
    .filter((id) => id.startsWith("op-route-v10-"))
    .forEach((id) => removeLayer(mainMap, id));

  if (mainFilter !== "unidades") {
    data.incidents
      .filter((i) => i.estado !== "Resuelto")
      .filter((i) => mainFilter === "todos" || i.categoria === mainFilter)
      .forEach((i) => {
        const el = makeMarker(
          i.categoria,
          incidentSymbol(i.categoria),
          i.codigo,
        );
        el.onclick = () => {
          selectIncident(i.id);
          mainMap.easeTo({
            center: [i.lng, i.lat],
            zoom: Math.max(mainMap.getZoom(), 14.3),
            duration: 450,
          });
        };
        mainMarkers.push(
          new maplibregl.Marker({ element: el, anchor: "center" })
            .setLngLat([i.lng, i.lat])
            .addTo(mainMap),
        );
      });
  }
  if (mainFilter === "todos" || mainFilter === "unidades") {
    unitsArray.recorrer().forEach((u) => {
      const el = makeMarker("unidad", u.icon, u.id);
      mainMarkers.push(
        new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat([u.lng, u.lat])
          .addTo(mainMap),
      );
    });
  }
  if (data.settings.showRoutes) {
    let n = 0;
    for (const i of data.incidents.filter(
      (i) => i.estado === "En atención" && i.unitId,
    )) {
      if (!isRouteVisible(i.id)) continue;
      const u = findUnit(i.unitId);
      if (!u) continue;
      const r = (await osrmRoute(u, i, false))[0],
        color = routeColorByIncident(i);
      if (r.geometry)
        addRouteLayer(
          mainMap,
          `op-route-v10-${n++}`,
          r.geometry,
          color,
          5,
          0.96,
        );
      routeEndpointMarkers.push(
        new maplibregl.Marker({
          element: endpointEl(color, u.icon, u.id),
          anchor: "center",
        })
          .setLngLat(r.snappedStart)
          .addTo(mainMap),
      );
      routeEndpointMarkers.push(
        new maplibregl.Marker({
          element: endpointEl(color, incidentSymbol(i.categoria), i.codigo),
          anchor: "center",
        })
          .setLngLat(r.snappedEnd)
          .addTo(mainMap),
      );
    }
  }
};

renderDrawer = function () {
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
  const routes = data.incidents.filter(
    (i) => i.estado === "En atención" && i.unitId,
  );
  $("#drawer-ruta").innerHTML = `<div class="route-controls-list">${
    routes
      .map((i) => {
        const u = findUnit(i.unitId),
          v = isRouteVisible(i.id);
        return `<div class="route-control-row"><div><b style="color:${routeColorByIncident(i)}">${u?.icon || "◆"} ${u?.id || "—"} → ${i.codigo}</b><span>${i.tipo} · ${i.ubicacion}</span></div><button class="route-eye ${v ? "" : "off"}" data-one="${i.id}">${v ? "👁" : "⊘"}</button></div>`;
      })
      .join("") ||
    "<div style='padding:8px;font-size:10px'>Sin unidades en ruta.</div>"
  }</div>`;
  $("#drawer-ruta")
    .querySelectorAll("[data-one]")
    .forEach(
      (b) =>
        (b.onclick = () =>
          setRouteVisible(b.dataset.one, !isRouteVisible(b.dataset.one))),
    );
};

renderPanelRoute = async function (i) {
  const body = $("#panelBody");
  if (!i.unitId) {
    body.innerHTML = `<p style="font-size:10px;color:#768690">Primero asigna una unidad.</p><button class="primary" id="toUnits">ASIGNAR UNIDAD</button>`;
    $("#toUnits").onclick = () => renderIncidentPanel(i, "unidades");
    return;
  }
  const u = findUnit(i.unitId),
    r = (await osrmRoute(u, i, true))[0],
    v = isRouteVisible(i.id);
  body.innerHTML = `<div class="route-real-card recommended"><div><b style="color:${routeColorByIncident(i)}">${u.icon} ${u.id} → ${i.codigo}</b><span>${Math.round(r.minutes)} min · ${r.distanceKm.toFixed(1)} km</span><small>${r.real ? "Ruta vial real OSRM" : "Estimación local"} · tráfico ${r.trafficLevel}</small></div></div><div class="route-inline-actions"><button class="secondary" id="toggleThis">${v ? "OCULTAR ESTA RUTA" : "MOSTRAR ESTA RUTA"}</button><button class="primary" id="openCompare">COMPARAR RUTAS</button></div>`;
  $("#toggleThis").onclick = () => setRouteVisible(i.id, !isRouteVisible(i.id));
  $("#openCompare").onclick = () => {
    $$(".nav")
      .find((x) => x.dataset.view === "rutas")
      .click();
    $("#routeIncident").value = i.id;
    renderRoutePage();
  };
};

drawRouteComparison = async function (u, i) {
  clearMarkers(routeMarkers);
  clearEndpointMarkers(routeComparisonEndpointMarkers);
  (routeMap.getStyle()?.layers || [])
    .map((l) => l.id)
    .filter((id) => id.startsWith("cmp-v10-"))
    .forEach((id) => removeLayer(routeMap, id));
  if (!u) return;
  const routes = await osrmRoute(u, i, true),
    primary = routeColorByIncident(i),
    alts = ["#35d27e", "#28a5ff", "#b764ff"];
  routes.slice(0, 3).forEach((r, n) => {
    if (r.geometry)
      addRouteLayer(
        routeMap,
        `cmp-v10-${n}`,
        r.geometry,
        n === 0 ? primary : alts[n],
        n === 0 ? 6 : 4,
        n === 0 ? 0.98 : 0.72,
        n === 0 ? null : [2, 2],
      );
  });
  if (routes[0]) {
    routeComparisonEndpointMarkers.push(
      new maplibregl.Marker({
        element: endpointEl(primary, u.icon, u.id),
        anchor: "center",
      })
        .setLngLat(routes[0].snappedStart)
        .addTo(routeMap),
    );
    routeComparisonEndpointMarkers.push(
      new maplibregl.Marker({
        element: endpointEl(primary, incidentSymbol(i.categoria), i.codigo),
        anchor: "center",
      })
        .setLngLat(routes[0].snappedEnd)
        .addTo(routeMap),
    );
    if (routes[0].geometry) fitGeometry(routeMap, routes[0].geometry);
  }
  $("#routeAlternatives").innerHTML = routes
    .slice(0, 3)
    .map(
      (r, n) =>
        `<div class="route-option ${n === 0 ? "recommended" : ""}"><b>${n === 0 ? "Recomendada" : `Alternativa ${n + 1}`}</b><strong>${Math.round(r.minutes)} min</strong><span>${r.distanceKm.toFixed(1)} km · ${r.trafficLevel}</span></div>`,
    )
    .join("");
};

renderStructure = function () {
  const c = $("#structureContent");
  const purpose = (title, text) =>
    `<div class="structure-purpose-card"><h3>${title}</h3><p>${text}</p></div>`;

  if (selectedStructure === "arreglo") {
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="array-demo">${unitsArray
      .recorrer()
      .map(
        (u) =>
          `<div class="array-cell" data-ac="${u.id}">${u.icon} ${u.id}<br><small>${u.estado}</small></div>`,
      )
      .join(
        "",
      )}</div></div><div class="structure-info">${purpose("Flota operativa", "El arreglo guarda las unidades reales del sistema. Se usa para localizar y administrar ambulancias, patrullas, bomberos y soporte.")}<div class="academic-tools"><input id="arrSearch" placeholder="Ej. AMB-03"><button id="arrBtn">BUSCAR UNIDAD</button><div id="arrRes" class="academic-result">Escribe un código.</div></div></div></div>`;
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
        : "Unidad no encontrada";
    };
  }

  if (selectedStructure === "lista") {
    const ev = historyList.recorrer().slice(-7);
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="linked-demo">${ev.map((x) => `<div class="linked-node" data-hn="${x.id}">${x.hora}<br><small>${x.texto}</small></div>`).join("") || "<div class='linked-node'>SIN EVENTOS</div>"}</div></div><div class="structure-info">${purpose("Cronología enlazada", "Cada nodo representa un movimiento ocurrido en NEXUS. Sirve para reconstruir en orden qué pasó durante una atención.")}<div class="academic-tools"><input id="histSearch" placeholder="Ej. BOM-01 asignada"><button id="histBtn">BUSCAR EN HISTORIAL</button><div id="histRes" class="academic-result">Escribe parte del evento.</div></div></div></div>`;
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
        : "Evento no encontrado";
    };
  }

  if (selectedStructure === "pila") {
    const a = actionStack.recorrer().slice(-7);
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="stack-demo">${a.length ? a.map((x, n) => `<div class="stack-action ${n === a.length - 1 ? "top" : ""}"><b>${n === a.length - 1 ? "SIGUIENTE EN DESHACER · " : ""}${x.label}</b><span>${n === a.length - 1 ? "Está en la cima" : "Acción anterior"}</span></div>`).join("") : `<div class="stack-action"><b>Sin acciones reversibles</b><span>Asigna, edita o resuelve un incidente.</span></div>`}</div></div><div class="structure-info">${purpose("Deshacer acciones", "La pila guarda acciones reversibles. La última realizada queda arriba y es la primera que puede deshacerse.")}<div class="academic-result">${actionStack.cima() ? `Siguiente: ${actionStack.cima().label}` : "No hay acciones para deshacer."}</div><button class="primary" id="undoBtn" style="width:100%;margin-top:10px">DESHACER ÚLTIMA ACCIÓN</button></div></div>`;
    $("#undoBtn").onclick = undoLastAction;
  }

  if (selectedStructure === "cola") {
    const q = incidentQueue.recorrer();
    c.innerHTML = `<div class="structure-layout"><div class="visual-board"><div class="queue-demo">${q.length ? q.map((x, n) => `<div class="queue-cell">${n === 0 ? "SIGUIENTE · " : ""}${x.codigo}</div>`).join("") : "<div class='queue-cell'>SIN PENDIENTES</div>"}</div></div><div class="structure-info">${purpose("Incidentes pendientes", "La cola organiza incidentes que todavía no tienen unidad. El del frente es el siguiente del flujo FIFO académico.")}<div class="academic-result">${incidentQueue.frente() ? `Siguiente: ${incidentQueue.frente().codigo}` : "Cola vacía."}</div><button class="primary" id="frontBtn" style="width:100%;margin-top:10px">ABRIR SIGUIENTE INCIDENTE</button></div></div>`;
    $("#frontBtn").onclick = () => {
      const i = incidentQueue.frente();
      if (i) {
        openMapIncident(i.id);
        renderIncidentPanel(i, "unidades");
      }
    };
  }

  if (selectedStructure === "arbol") {
    c.innerHTML = `<div class="structure-layout"><div class="visual-board tree-demo"><svg id="treeSvg" viewBox="0 0 900 540"></svg></div><div class="structure-info">${purpose("Índice de incidentes", "El árbol organiza los incidentes por código. Permite localizar un caso y demostrar recorridos usando datos reales del sistema.")}<div class="academic-tools"><input id="treeSearch" type="number" placeholder="Ej. 204"><button id="treeBtn">BUSCAR INCIDENTE</button><div id="treeRes" class="academic-result">Escribe un código.</div><div class="row-tools"><button data-tr="inorden">INORDEN</button><button data-tr="preorden">PREORDEN</button><button data-tr="postorden">POSTORDEN</button></div><div id="treeTrav" class="academic-result">Selecciona un recorrido.</div></div></div></div>`;
    drawTree();
    $("#treeBtn").onclick = () => {
      const f = incidentTree.buscar(Number($("#treeSearch").value));
      $("#treeRes").textContent = f
        ? `${f.codigo} · ${f.tipo} · ${f.ubicacion}`
        : "Incidente no encontrado";
    };
    c.querySelectorAll("[data-tr]").forEach(
      (b) =>
        (b.onclick = () =>
          ($("#treeTrav").textContent = `${b.textContent}: ${incidentTree[
            b.dataset.tr
          ]()
            .map((x) => x.codigo)
            .join(" → ")}`)),
    );
  }

  if (selectedStructure === "grafo") {
    const sectors = Object.keys(cityGraph.adyacencias);
    c.innerHTML = `<div class="structure-layout"><div class="visual-board graph-demo"><svg id="graphSvg" viewBox="0 0 900 520"></svg></div><div class="structure-info">${purpose("Conectividad de sectores", "El grafo modela cómo se conectan lógicamente sectores de Manta. Sirve como modelo académico de respaldo para obtener una secuencia de sectores entre origen y destino.")}<div class="academic-tools"><select id="gStart">${sectors.map((s) => `<option>${s}</option>`).join("")}</select><select id="gEnd">${sectors.map((s) => `<option>${s}</option>`).join("")}</select><button id="gBtn">CALCULAR CONEXIÓN</button><div id="gRes" class="academic-result">Elige origen y destino.</div><button id="gMapBtn">ABRIR MAPA OPERATIVO</button></div></div></div>`;
    drawGraph();
    $("#gEnd").selectedIndex = Math.min(4, sectors.length - 1);
    $("#gBtn").onclick = () => {
      const path = cityGraph.bfs($("#gStart").value, $("#gEnd").value);
      $("#gRes").textContent = path.length ? path.join(" → ") : "Sin conexión";
      drawGraphPath(path);
    };
    $("#gMapBtn").onclick = () =>
      $$(".nav")
        .find((x) => x.dataset.view === "mapa")
        .click();
  }
};

drawTree = function () {
  const svg = $("#treeSvg");
  if (!svg) return;
  svg.innerHTML = "";
  const sorted = [...data.incidents].sort((a, b) => a.codigoNum - b.codigoNum);
  const build = (a, b) => {
    if (a > b) return null;
    const m = Math.floor((a + b) / 2);
    return {
      valor: sorted[m],
      izquierda: build(a, m - 1),
      derecha: build(m + 1, b),
    };
  };
  const rec = (n, x, y, s) => {
    if (!n) return;
    const ny = y + 95;
    if (n.izquierda) {
      drawLine(svg, x, y, x - s, ny);
      rec(n.izquierda, x - s, ny, s * 0.55);
    }
    if (n.derecha) {
      drawLine(svg, x, y, x + s, ny);
      rec(n.derecha, x + s, ny, s * 0.55);
    }
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", 27);
    c.setAttribute("fill", "#0b151c");
    c.setAttribute("stroke", "#ef343b");
    svg.appendChild(c);
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", x);
    t.setAttribute("y", y + 4);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("fill", "#eef3f6");
    t.textContent = n.valor.codigoNum;
    svg.appendChild(t);
  };
  rec(build(0, sorted.length - 1), 450, 55, 190);
};

function drawGraphPath(path) {
  drawGraph();
  if (!path?.length) return;
  const svg = $("#graphSvg"),
    p = {
      Jocay: [170, 180],
      Centro: [420, 220],
      Tarqui: [680, 130],
      "Los Esteros": [650, 390],
      "La Paz": [270, 390],
      Industrial: [470, 455],
    };
  for (let i = 0; i < path.length - 1; i++) {
    const [x1, y1] = p[path[i]],
      [x2, y2] = p[path[i + 1]],
      l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("x1", x1);
    l.setAttribute("y1", y1);
    l.setAttribute("x2", x2);
    l.setAttribute("y2", y2);
    l.setAttribute("class", "graph-path-edge");
    svg.appendChild(l);
  }
}

renderDrawer();
renderStructure();
if (mainMap?.loaded()) renderMainMap();
