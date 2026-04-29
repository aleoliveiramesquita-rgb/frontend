const formCadastro = document.querySelector("#form-cadastro");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email-cadastro");
const senha = document.querySelector("#senha-cadastro");
const notificacao = document.querySelector("#notificacao");

function mostrarNotificacao(mensagem, tipo = "sucesso") {
  notificacao.textContent = mensagem;
  notificacao.className = `notificacao ${tipo}`;

  setTimeout(() => {
    notificacao.className = "notificacao";
  }, 3000);
}

formCadastro.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeValor = nome.value.trim();
  const emailValor = email.value.trim();
  const senhaValor = senha.value.trim();

  // Nome
  if (nomeValor.length < 5 || !nomeValor.includes(" ")) {
    mostrarNotificacao("Nome deve ter nome e sobrenome.", "erro");
    return;
  }

  // Email
  if (!emailValor.includes("@") || (!emailValor.includes(".com") && !emailValor.includes(".com.br"))) {
    mostrarNotificacao("Email inválido.", "erro");
    return;
  }

  // Senha
  if (senhaValor.length < 8) {
    mostrarNotificacao("Senha deve ter no mínimo 8 caracteres.", "erro");
    return;
  }

  mostrarNotificacao("Cadastro realizado com sucesso!", "sucesso");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});