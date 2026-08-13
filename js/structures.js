class ArregloUnidades {
  constructor(datos = []) {
    this.datos = [...datos];
  }
  agregar(unidad) {
    this.datos[this.datos.length] = unidad;
  }
  buscar(id) {
    for (let i = 0; i < this.datos.length; i++)
      if (this.datos[i].id === id) return this.datos[i];
    return null;
  }
  modificar(id, nuevosDatos) {
    const unidad = this.buscar(id);
    if (!unidad) return false;
    Object.assign(unidad, nuevosDatos);
    return true;
  }
  eliminar(id) {
    for (let i = 0; i < this.datos.length; i++) {
      if (this.datos[i].id === id) {
        for (let j = i; j < this.datos.length - 1; j++)
          this.datos[j] = this.datos[j + 1];
        this.datos.length--;
        return true;
      }
    }
    return false;
  }
  recorrer() {
    return [...this.datos];
  }
}

class NodoLista {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.longitud = 0;
  }
  insertar(valor) {
    const nuevo = new NodoLista(valor);
    if (!this.cabeza) this.cabeza = nuevo;
    else {
      let actual = this.cabeza;
      while (actual.siguiente) actual = actual.siguiente;
      actual.siguiente = nuevo;
    }
    this.longitud++;
  }
  buscar(condicion) {
    let actual = this.cabeza;
    while (actual) {
      if (condicion(actual.valor)) return actual.valor;
      actual = actual.siguiente;
    }
    return null;
  }
  modificar(condicion, nuevoValor) {
    let actual = this.cabeza;
    while (actual) {
      if (condicion(actual.valor)) {
        actual.valor = nuevoValor;
        return true;
      }
      actual = actual.siguiente;
    }
    return false;
  }
  eliminar(condicion) {
    if (!this.cabeza) return null;
    if (condicion(this.cabeza.valor)) {
      const eliminado = this.cabeza.valor;
      this.cabeza = this.cabeza.siguiente;
      this.longitud--;
      return eliminado;
    }
    let actual = this.cabeza;
    while (actual.siguiente) {
      if (condicion(actual.siguiente.valor)) {
        const eliminado = actual.siguiente.valor;
        actual.siguiente = actual.siguiente.siguiente;
        this.longitud--;
        return eliminado;
      }
      actual = actual.siguiente;
    }
    return null;
  }
  recorrer() {
    const salida = [];
    let actual = this.cabeza;
    while (actual) {
      salida[salida.length] = actual.valor;
      actual = actual.siguiente;
    }
    return salida;
  }
}

class Pila {
  constructor() {
    this.elementos = [];
  }
  apilar(valor) {
    this.elementos[this.elementos.length] = valor;
  }
  desapilar() {
    if (this.estaVacia()) return null;
    const ultimo = this.elementos[this.elementos.length - 1];
    this.elementos.length--;
    return ultimo;
  }
  cima() {
    return this.estaVacia() ? null : this.elementos[this.elementos.length - 1];
  }
  estaVacia() {
    return this.elementos.length === 0;
  }
  recorrer() {
    return [...this.elementos];
  }
}

class Cola {
  constructor() {
    this.elementos = [];
  }
  encolar(valor) {
    this.elementos[this.elementos.length] = valor;
  }
  desencolar() {
    if (this.estaVacia()) return null;
    const primero = this.elementos[0];
    for (let i = 0; i < this.elementos.length - 1; i++)
      this.elementos[i] = this.elementos[i + 1];
    this.elementos.length--;
    return primero;
  }
  frente() {
    return this.estaVacia() ? null : this.elementos[0];
  }
  estaVacia() {
    return this.elementos.length === 0;
  }
  recorrer() {
    return [...this.elementos];
  }
}

class NodoArbol {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

class ArbolBST {
  constructor() {
    this.raiz = null;
  }
  insertar(valor) {
    const nuevo = new NodoArbol(valor);
    if (!this.raiz) {
      this.raiz = nuevo;
      return;
    }
    let actual = this.raiz;
    while (true) {
      if (valor.codigoNum < actual.valor.codigoNum) {
        if (!actual.izquierda) {
          actual.izquierda = nuevo;
          return;
        }
        actual = actual.izquierda;
      } else {
        if (!actual.derecha) {
          actual.derecha = nuevo;
          return;
        }
        actual = actual.derecha;
      }
    }
  }
  buscar(codigoNum) {
    let actual = this.raiz;
    while (actual) {
      if (codigoNum === actual.valor.codigoNum) return actual.valor;
      actual =
        codigoNum < actual.valor.codigoNum ? actual.izquierda : actual.derecha;
    }
    return null;
  }
  inorden() {
    const salida = [];
    const recorrer = (nodo) => {
      if (!nodo) return;
      recorrer(nodo.izquierda);
      salida.push(nodo.valor);
      recorrer(nodo.derecha);
    };
    recorrer(this.raiz);
    return salida;
  }
  preorden() {
    const salida = [];
    const recorrer = (nodo) => {
      if (!nodo) return;
      salida.push(nodo.valor);
      recorrer(nodo.izquierda);
      recorrer(nodo.derecha);
    };
    recorrer(this.raiz);
    return salida;
  }
  postorden() {
    const salida = [];
    const recorrer = (nodo) => {
      if (!nodo) return;
      recorrer(nodo.izquierda);
      recorrer(nodo.derecha);
      salida.push(nodo.valor);
    };
    recorrer(this.raiz);
    return salida;
  }
}

class Grafo {
  constructor() {
    this.adyacencias = {};
  }
  agregarVertice(v) {
    if (!this.adyacencias[v]) this.adyacencias[v] = [];
  }
  agregarArista(a, b) {
    this.agregarVertice(a);
    this.agregarVertice(b);
    if (!this.adyacencias[a].includes(b)) this.adyacencias[a].push(b);
    if (!this.adyacencias[b].includes(a)) this.adyacencias[b].push(a);
  }
  bfs(inicio, destino) {
    if (!this.adyacencias[inicio] || !this.adyacencias[destino]) return [];
    const cola = [inicio],
      visitados = { [inicio]: true },
      anterior = {};
    while (cola.length) {
      const actual = cola.shift();
      if (actual === destino) break;
      for (const vecino of this.adyacencias[actual]) {
        if (!visitados[vecino]) {
          visitados[vecino] = true;
          anterior[vecino] = actual;
          cola.push(vecino);
        }
      }
    }
    if (!visitados[destino]) return [];
    const ruta = [];
    let actual = destino;
    while (actual !== undefined) {
      ruta.unshift(actual);
      actual = anterior[actual];
    }
    return ruta;
  }
}

function busquedaSecuencial(lista, texto) {
  const t = texto.toLowerCase(),
    salida = [];
  for (const item of lista) {
    const contenido =
      `${item.codigo || ""} ${item.tipo || ""} ${item.ubicacion || ""} ${item.sector || ""} ${item.id || ""}`.toLowerCase();
    if (contenido.includes(t)) salida.push(item);
  }
  return salida;
}

function ordenSeleccionPrioridad(lista) {
  const nivel = { Crítica: 1, Alta: 2, Media: 3, Baja: 4 },
    salida = [...lista];
  for (let i = 0; i < salida.length - 1; i++) {
    let mejor = i;
    for (let j = i + 1; j < salida.length; j++)
      if (nivel[salida[j].prioridad] < nivel[salida[mejor].prioridad])
        mejor = j;
    [salida[i], salida[mejor]] = [salida[mejor], salida[i]];
  }
  return salida;
}

function ordenBurbujaCodigo(lista) {
  const salida = [...lista];
  for (let i = 0; i < salida.length - 1; i++)
    for (let j = 0; j < salida.length - 1 - i; j++) {
      if (salida[j].codigoNum > salida[j + 1].codigoNum)
        [salida[j], salida[j + 1]] = [salida[j + 1], salida[j]];
    }
  return salida;
}
