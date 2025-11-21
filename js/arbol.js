class Arbol {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {
    const nuevo = new Nodo(valor);
    if (!this.raiz) {
      this.raiz = nuevo;
    } else {
      this._insertarNodo(this.raiz, nuevo);
    }
  }

  _insertarNodo(nodo, nuevo) {
    if (nuevo.valor < nodo.valor) {
      if (!nodo.izq) nodo.izq = nuevo;
      else this._insertarNodo(nodo.izq, nuevo);
    } else {
      if (!nodo.der) nodo.der = nuevo;
      else this._insertarNodo(nodo.der, nuevo);
    }
  }

  preOrder(nodo = this.raiz) {
    return nodo
      ? nodo.valor + this.preOrder(nodo.izq) + this.preOrder(nodo.der)
      : "";
  }

  postOrder(nodo = this.raiz) {
    return nodo
      ? this.postOrder(nodo.izq) + this.postOrder(nodo.der) + nodo.valor
      : "";
  }
}