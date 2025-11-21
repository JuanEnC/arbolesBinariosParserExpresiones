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