const form = document.querySelector("#stock-form");
const availableInput = document.querySelector("#available");
const desiredInput = document.querySelector("#desired");
const result = document.querySelector("#result");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");

function mostrarResultado(tipo, titulo, mensagem) {
  result.className = tipo;
  resultTitle.textContent = titulo;
  resultMessage.textContent = mensagem;
  result.hidden = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const estoque = Number(availableInput.value);
  const quantidadeDesejada = Number(desiredInput.value);

  if (availableInput.value === "" || desiredInput.value === "") {
    mostrarResultado(
      "error",
      "Preencha os dois campos",
      "Informe o estoque disponível e a quantidade desejada."
    );
    return;
  }

  if (
    !Number.isInteger(estoque) ||
    !Number.isInteger(quantidadeDesejada) ||
    estoque < 0 ||
    quantidadeDesejada < 1
  ) {
    mostrarResultado(
      "error",
      "Quantidades inválidas",
      "Use números inteiros. O estoque deve ser zero ou maior, e a quantidade desejada deve ser pelo menos 1."
    );
    return;
  }

  if (quantidadeDesejada <= estoque) {
    const restante = estoque - quantidadeDesejada;

    mostrarResultado(
      "success",
      "Compra pode ser realizada",
      `Após a compra, restarão ${restante} unidade(s) em estoque.`
    );
  } else {
    const faltam = quantidadeDesejada - estoque;

    mostrarResultado(
      "warning",
      "Estoque insuficiente",
      `Faltam ${faltam} unidade(s) para atender à quantidade desejada.`
    );
  }
});