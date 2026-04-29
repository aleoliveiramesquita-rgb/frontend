let tarefas = [];
let proximoId = 1;

const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const btnAdicionar = document.getElementById("btn-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");
const notificacao = document.getElementById("notificacao");

function mostrarNotificacao(mensagem, tipo = "sucesso") {
  notificacao.textContent = mensagem;
  notificacao.className = `notificacao ${tipo}`;

  setTimeout(() => {
    notificacao.className = "notificacao";
  }, 3000);
}

function criarComponenteTarefa(tarefa) {
  const li = document.createElement("li");
  li.className = "tarefa";

  if (tarefa.concluida) {
    li.classList.add("concluida");
  }

  const span = document.createElement("span");
  span.className = "tarefa-texto";
  span.textContent = tarefa.texto;

  const acoes = document.createElement("div");
  acoes.className = "tarefa-acoes";

  const btnConcluir = document.createElement("button");
  btnConcluir.className = "btn-concluir";
  btnConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";
  btnConcluir.setAttribute("data-id", tarefa.id);

  const btnRemover = document.createElement("button");
  btnRemover.className = "btn-remover";
  btnRemover.textContent = "Remover";
  btnRemover.setAttribute("data-id", tarefa.id);

  acoes.appendChild(btnConcluir);
  acoes.appendChild(btnRemover);

  li.appendChild(span);
  li.appendChild(acoes);

  return li;
}

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    mensagemVazia.classList.add("visivel");
    return;
  }

  mensagemVazia.classList.remove("visivel");

  tarefas.forEach((tarefa) => {
    const componenteTarefa = criarComponenteTarefa(tarefa);
    listaTarefas.appendChild(componenteTarefa);
  });
}

function adicionarTarefa(texto) {
  const novaTarefa = {
    id: proximoId++,
    texto: texto.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  renderizarTarefas();
  mostrarNotificacao("Tarefa adicionada com sucesso!", "sucesso");
}

function alternarTarefa(id) {
  const tarefa = tarefas.find((t) => t.id === parseInt(id));

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    renderizarTarefas();
    mostrarNotificacao("Tarefa alterada com sucesso!", "sucesso");
  }
}

function removerTarefa(id) {
  tarefas = tarefas.filter((t) => t.id !== parseInt(id));
  renderizarTarefas();
  mostrarNotificacao("Tarefa removida!", "sucesso");
}

formTarefa.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = inputTarefa.value.trim();

  if (texto === "") {
    mostrarNotificacao("Por favor, digite uma tarefa!", "erro");
    return;
  }

  adicionarTarefa(texto);

  inputTarefa.value = "";
  inputTarefa.focus();
});

listaTarefas.addEventListener("click", function (event) {
  const id = event.target.getAttribute("data-id");

  if (!id) {
    return;
  }

  if (event.target.classList.contains("btn-concluir")) {
    alternarTarefa(id);
  }

  if (event.target.classList.contains("btn-remover")) {
    removerTarefa(id);
  }
});

renderizarTarefas();
inputTarefa.focus();