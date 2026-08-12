
/* NEXUS V9 — correcciones de coherencia visual y funcional */

function routeColorByCategory(category){
  return {incendio:'#ef343b',medico:'#38a8ff',policia:'#b764ff',trafico:'#ff8d2f',falla:'#f1c83f'}[category]||'#39d17e';
}
function incidentSymbol(category){
  return {incendio:'🔥',medico:'✚',policia:'◆',trafico:'⚠',falla:'⚡'}[category]||'◆';
}

makeMarker=function(type,html,label){
  const host=document.createElement('div');
  host.className='nexus-marker-host';
  const inner=document.createElement('button');
  inner.type='button';
  inner.className=`nexus-marker ${type}`;
  inner.innerHTML=`${html}<span class="marker-label">${label}</span>`;
  host.appendChild(inner);
  return host;
};

rebuildStructures=function(){
  incidentQueue=new Cola();
  incidentTree=new ArbolBST();
  data.incidents.forEach(i=>{if(i.estado==='En cola')incidentQueue.encolar(i)});
  const sorted=[...data.incidents].sort((a,b)=>a.codigoNum-b.codigoNum);
  function insertBalanced(start,end){
    if(start>end)return;
    const mid=Math.floor((start+end)/2);
    incidentTree.insertar(sorted[mid]);
    insertBalanced(start,mid-1);
    insertBalanced(mid+1,end);
  }
  insertBalanced(0,sorted.length-1);
};
rebuildStructures();

localRouteEstimate=function(unit,incident){
  const km=Math.max(.3,haversine(unit,incident)*1.28);
  const base=Math.max(2,Math.round(km*2.0));
  const traffic=trafficFactor(incident,unit);
  const corridor=cityGraph.bfs(unit.sector,incident.sector);
  return {distanceKm:km,baseMinutes:base,minutes:Math.round(base*traffic.factor),trafficLevel:traffic.level,trafficFactor:traffic.factor,real:false,corridor};
};

$('#globalSearchForm').onsubmit=e=>{
  e.preventDefault();
  const raw=$('#globalSearch').value.trim();
  if(!raw)return;
  const codeMatch=raw.match(/(?:INC-)?(\d+)/i);
  if(codeMatch){
    const found=incidentTree.buscar(Number(codeMatch[1]));
    if(found){openMapIncident(found.id);toast(`Encontrado con BST: ${found.codigo}`);return;}
  }
  const t=raw.toLowerCase();
  const i=data.incidents.find(x=>`${x.codigo} ${x.tipo} ${x.ubicacion} ${x.sector}`.toLowerCase().includes(t));
  if(i){openMapIncident(i.id);return;}
  const u=unitsArray.recorrer().find(x=>`${x.id} ${x.tipo} ${x.sector}`.toLowerCase().includes(t));
  if(u){
    $$('.nav').find(x=>x.dataset.view==='unidades').click();
    setTimeout(()=>{
      const c=document.querySelector(`[data-unit="${u.id}"]`);
      c?.scrollIntoView({behavior:'smooth',block:'center'});
      c?.classList.add('highlight');
      setTimeout(()=>c?.classList.remove('highlight'),1400);
    },80);
    return;
  }
  toast('No se encontró coincidencia');
};

function removeOperationalLayers(map,prefixes){
  if(!map?.getStyle()?.layers)return;
  const ids=map.getStyle().layers.map(l=>l.id).filter(id=>prefixes.some(p=>id.startsWith(p)));
  ids.reverse().forEach(id=>{
    if(map.getLayer(id))map.removeLayer(id);
    if(map.getSource(id))map.removeSource(id);
  });
}

renderMainMap=async function(){
  if(!mainMap||!mainMap.loaded())return;
  clearMarkers(mainMarkers);
  removeOperationalLayers(mainMap,['op-main-','op-route-','op-glow-']);

  const visibleIncidents=data.incidents
    .filter(i=>i.estado!=='Resuelto')
    .filter(i=>mainFilter==='todos'||mainFilter==='unidades'||i.categoria===mainFilter);

  if(mainFilter!=='unidades'){
    visibleIncidents.forEach(i=>{
      const el=makeMarker(i.categoria,incidentSymbol(i.categoria),i.codigo);
      el.onclick=()=>{
        selectIncident(i.id);
        mainMap.easeTo({center:[i.lng,i.lat],zoom:Math.max(mainMap.getZoom(),14.3),duration:500});
      };
      mainMarkers.push(new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([i.lng,i.lat]).addTo(mainMap));
    });
  }

  let unitsToShow=[];
  if(mainFilter==='todos'||mainFilter==='unidades'){
    unitsToShow=unitsArray.recorrer();
  }else{
    const ids=new Set(visibleIncidents.map(i=>i.unitId).filter(Boolean));
    unitsToShow=unitsArray.recorrer().filter(u=>ids.has(u.id));
  }

  unitsToShow.forEach(u=>{
    const el=makeMarker('unidad',u.icon,u.id);
    el.onclick=()=>new maplibregl.Popup({offset:25})
      .setLngLat([u.lng,u.lat])
      .setHTML(`<b>${u.id}</b><br><span style="font-size:10px;color:#8797a1">${u.tipo} · ${u.estado}</span>`)
      .addTo(mainMap);
    mainMarkers.push(new maplibregl.Marker({element:el,anchor:'center'}).setLngLat([u.lng,u.lat]).addTo(mainMap));
  });

  if(data.settings.showRoutes){
    let n=0;
    for(const incident of visibleIncidents.filter(i=>i.estado==='En atención'&&i.unitId)){
      const unit=findUnit(incident.unitId);
      if(!unit)continue;
      const route=(await osrmRoute(unit,incident,false))[0];
      if(route.geometry){
        addRouteLayer(mainMap,`op-route-${n++}`,route.geometry,routeColorByCategory(incident.categoria),6,.96);
      }
    }
  }
};

drawRouteComparison=async function(unit,incident){
  clearMarkers(routeMarkers);
  removeOperationalLayers(routeMap,['cmp-main','cmp-alt','cmp-route-']);
  if(!unit)return;

  const um=makeMarker('unidad',unit.icon,unit.id);
  const im=makeMarker(incident.categoria,incidentSymbol(incident.categoria),incident.codigo);

  routeMarkers.push(new maplibregl.Marker({element:um,anchor:'center'}).setLngLat([unit.lng,unit.lat]).addTo(routeMap));
  routeMarkers.push(new maplibregl.Marker({element:im,anchor:'center'}).setLngLat([incident.lng,incident.lat]).addTo(routeMap));

  const routes=await osrmRoute(unit,incident,true);
  const primary=routeColorByCategory(incident.categoria);
  const palette=['#39d17e','#38a8ff','#b764ff','#ffffff'].filter(c=>c.toLowerCase()!==primary.toLowerCase());

  routes.slice(0,3).forEach((r,n)=>{
    if(!r.geometry)return;
    addRouteLayer(routeMap,`cmp-route-${n}`,r.geometry,n===0?primary:palette[n-1],n===0?6:4,n===0?.98:.72,n===0?null:[2,2]);
  });

  if(routes[0]?.geometry)fitGeometry(routeMap,routes[0].geometry);

  $('#routeAlternatives').innerHTML=
    `<div class="route-color-legend">
      <span><i style="background:${primary}"></i>Ruta principal</span>
      ${routes.slice(1,3).map((r,n)=>`<span><i style="background:${palette[n]}"></i>Alternativa ${n+2}</span>`).join('')}
    </div>`+
    routes.slice(0,3).map((r,n)=>`
      <div class="route-option ${n===0?'recommended':''}">
        <b>${n===0?'Recomendada':`Alternativa ${n+1}`}</b>
        <strong>${Math.round(r.minutes)} min</strong>
        <span>${r.distanceKm.toFixed(1)} km · ${r.trafficLevel}</span>
      </div>`).join('');
};

renderReports=function(){
  const solved=data.incidents.filter(i=>i.estado==='Resuelto'&&i.responseMinutes);
  const avg=solved.length?Math.round(solved.reduce((s,i)=>s+i.responseMinutes,0)/solved.length):0;

  const sectors={},cats={};
  data.incidents.forEach(i=>{
    sectors[i.sector]=(sectors[i.sector]||0)+1;
    cats[i.categoria]=(cats[i.categoria]||0)+1;
  });

  const names={
    incendio:'Incendios',
    medico:'Emergencias médicas',
    policia:'Seguridad / robos',
    trafico:'Accidentes de tránsito',
    falla:'Fallas eléctricas'
  };

  const topSector=Object.entries(sectors).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—';
  const topEntry=Object.entries(cats).sort((a,b)=>b[1]-a[1])[0];
  const topType=topEntry?names[topEntry[0]]:'—';

  const cards=[
    ['Tiempo medio de respuesta',`${avg} min`,'Desde asignación hasta resolución en casos con dato'],
    ['Sector con más incidentes',topSector,'Conteo por sector'],
    ['Tipo más frecuente',topType,'Agrupado por categoría'],
    ['Incidentes registrados',data.incidents.length,'Total actual']
  ];

  $('#reportCards').innerHTML=cards.map(c=>`
    <div class="report-card"><span>${c[0]}</span><b>${c[1]}</b><small>${c[2]}</small></div>
  `).join('');

  const max=Math.max(...Object.values(cats),1);
  $('#typeBars').innerHTML=Object.entries(cats).map(([cat,count])=>`
    <div class="bar-row">
      <span>${names[cat]}</span>
      <div class="bar"><i style="width:${count/max*100}%"></i></div>
      <b>${count}</b>
    </div>
  `).join('');

  $('#globalHistory').innerHTML=historyList.recorrer().slice().reverse().slice(0,10).map(x=>`
    <div class="event"><time>${x.hora}</time><div><b>${x.texto}</b><span>${data.operator.name}</span></div></div>
  `).join('');
};

const baseRenderStructure=renderStructure;
renderStructure=function(){
  baseRenderStructure();

  const info=document.querySelector('.structure-info');
  if(!info)return;

  const purpose={
    arreglo:'Administra la flota real. Las pantallas de Unidades y despacho leen y modifican este arreglo.',
    lista:'Guarda el historial real. Cada movimiento de un incidente se inserta como un nodo y se conserva en orden.',
    pila:'Hace funcionar Deshacer. La última asignación, edición, resolución o eliminación queda en la cima.',
    cola:'Representa incidentes todavía sin unidad. El frente es el siguiente caso del flujo FIFO académico.',
    arbol:'Funciona como índice de incidentes por código. El buscador global usa el BST cuando escribes INC-204 o 204.',
    grafo:'Sirve como respaldo lógico entre sectores. Si no hay servicio vial, BFS indica el corredor de sectores que conecta la unidad con el incidente.'
  };

  const box=document.createElement('div');
  box.className='structure-purpose';
  box.innerHTML=`<b>FUNCIÓN DENTRO DE NEXUS</b><span>${purpose[selectedStructure]}</span>`;
  info.insertBefore(box,info.firstChild);

  const operationHelp={
    arreglo:{'agregar()':'registra una nueva unidad','buscar()':'encuentra una unidad por código','modificar()':'actualiza sus datos','eliminar()':'retira una unidad','recorrer()':'lee toda la flota'},
    lista:{'insertar()':'agrega un evento al historial','buscar()':'encuentra un movimiento','modificar()':'cambia un nodo','eliminar()':'quita un nodo','recorrer()':'lee la cronología completa'},
    pila:{'apilar()':'guarda una acción','desapilar()':'saca la última para deshacer','cima()':'muestra qué se desharía','estaVacia()':'comprueba si hay acciones'},
    cola:{'encolar()':'pone un incidente al final','desencolar()':'retira el frente','frente()':'muestra el siguiente','estaVacia()':'comprueba si quedan pendientes'}
  }[selectedStructure];

  if(operationHelp){
    document.querySelectorAll('.operation').forEach(el=>{
      const key=el.textContent.trim();
      if(operationHelp[key])el.textContent=`${key} — ${operationHelp[key]}`;
    });
  }

  if(selectedStructure==='grafo'){
    const res=$('#gRes');
    if(res)res.insertAdjacentHTML('afterend',
      '<div class="metric-note">Ejemplo: Jocay → Centro → Tarqui significa que esos sectores forman el corredor lógico de respaldo. Las calles exactas se calculan en el mapa real con OSRM.</div>'
    );
    const btn=$('#gBtn');
    if(btn)btn.textContent='CALCULAR CONEXIÓN ENTRE SECTORES (BFS)';
  }
};

drawTree=function(){
  const svg=$('#treeSvg');
  if(!svg)return;
  svg.innerHTML='';

  function rec(node,x,y,spread){
    if(!node)return;
    const ny=y+92;

    if(node.izquierda){
      drawLine(svg,x,y,x-spread,ny);
      rec(node.izquierda,x-spread,ny,spread*.55);
    }

    if(node.derecha){
      drawLine(svg,x,y,x+spread,ny);
      rec(node.derecha,x+spread,ny,spread*.55);
    }

    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.setAttribute('r',27);
    c.setAttribute('fill','#0b151c');
    c.setAttribute('stroke','#ef343b');
    svg.appendChild(c);

    const t=document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x',x);
    t.setAttribute('y',y+4);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('fill','#eef3f6');
    t.setAttribute('font-size','12');
    t.textContent=node.valor.codigoNum;
    svg.appendChild(t);
  }

  rec(incidentTree.raiz,450,55,185);
};

rebuildStructures();
renderAll(false);
renderReports();
renderStructure();
if(mainMap?.loaded())renderMainMap();
