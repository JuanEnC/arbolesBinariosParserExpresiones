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
