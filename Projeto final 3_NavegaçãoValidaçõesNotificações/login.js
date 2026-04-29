const formLogin = document.querySelector("#form-login");
const emailLogin = document.querySelector("#email-login");
const senhaLogin = document.querySelector("#senha-login");
const notificacao = document.querySelector("#notificacao");

function mostrarNotificacao(mensagem, tipo = "sucesso") {
  notificacao.textContent = mensagem;
  notificacao.className = `notificacao ${tipo}`;

  setTimeout(() => {
    notificacao.className = "notificacao";
  }, 3000);
}

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailLogin.value.trim();
  const senha = senhaLogin.value.trim();

  if (email === "") {
    mostrarNotificacao("O campo Email não pode ser vazio.", "erro");
    return;
  }

  if (senha === "") {
    mostrarNotificacao("O campo Senha não pode ser vazio.", "erro");
    return;
  }

  mostrarNotificacao("Login realizado com sucesso!", "sucesso");

  setTimeout(() => {
    window.location.href = "tarefas.html";
  }, 1000);
});