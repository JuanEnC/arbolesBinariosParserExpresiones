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

class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.izq = null;
    this.der = null;
  }
}

//

function stringToNodeArray(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) arr.push(new Nodo(str[i]));
  return arr;
}

function stringToCharArray(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) arr.push(str[i]);
  return arr;
}

function eliminar(array, index) {
  for (let i = index; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  array.pop();
}

function insertar(array, index, valor) {
  array.push(array[array.length - 1]);
  for (let i = array.length - 2; i > index; i--) {
    array[i] = array[i - 1];
  }
  array[index] = valor;
}

//

function crearArbol(expresion) {
  let exp = stringToNodeArray(expresion);

  for (let i = 0; i < exp.length; i++) {
    if (exp[i].valor === "*" || exp[i].valor === "/") {
      let nodo = exp[i];
      nodo.izq = exp[i - 1];
      nodo.der = exp[i + 1];

      eliminar(exp, i - 1);
      eliminar(exp, i - 1);
      eliminar(exp, i - 1);
      insertar(exp, i - 1, nodo);
      i--;
    }
  }

  for (let i = 0; i < exp.length; i++) {
    if (exp[i].valor === "+" || exp[i].valor === "-") {
      let nodo = exp[i];
      nodo.izq = exp[i - 1];
      nodo.der = exp[i + 1];

      eliminar(exp, i - 1);
      eliminar(exp, i - 1);
      eliminar(exp, i - 1);
      insertar(exp, i - 1, nodo);
      i--;
    }
  }

  let arbol = new Arbol();
  arbol.raiz = exp[0];

  return arbol;
}

//

function resolverPreOrder(preOrder) {
  let pre = stringToCharArray(preOrder);
  let pila = [];

  function operar(op) {
    let a = pila.pop();
    let b = pila.pop();
    if (op === "*") pila.push(a * b);
    else if (op === "/") pila.push(a / b);
    else if (op === "+") pila.push(a + b);
    else if (op === "-") pila.push(a - b);
  }

  while (pre.length) {
    let actual = pre.pop();

    if (actual >= "0" && actual <= "9") {
      pila.push(Number(actual));
    } else {
      operar(actual);
    }
  }

  return pila[0];
}

//

function resolverPostOrder(postOrder) {
  let post = stringToCharArray(postOrder);
  let pila = [];

  function operar(op) {
    let b = pila.pop();
    let a = pila.pop();
    if (op === "+") pila.push(a + b);
    else if (op === "-") pila.push(a - b);
    else if (op === "*") pila.push(a * b);
    else if (op === "/") pila.push(a / b);
  }

  for (let i = 0; i < post.length; i++) {
    let simbolo = post[i];
    if (simbolo >= "0" && simbolo <= "9") {
      pila.push(Number(simbolo));
    } else {
      operar(simbolo);
    }
  }

  return pila[0];
}