document.querySelector("form").addEventListener("submit", (e) => {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Capturar os valores dos campos
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Consultar o JSON Server para verificar os dados
  fetch("http://localhost:3000/registro")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao buscar os usuários.");
      }
    })
    .then((usuarios) => {
      // Verificar se o e-mail e a senha correspondem a algum usuário
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.email === email && usuario.senha === senha
      );

      if (usuarioEncontrado) {
        if (usuarioEncontrado.email === "carlinhosadm@gmail.com") {
          //Conta para administradores (terá um acesso diferente para ADM)
          alert(`Bem-vindo ${usuarioEncontrado.nome}!`);
          window.location.href = "adm.html";
        } else {
          alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);
          // Opcional: Redirecionar para uma página de dashboard
          window.location.href = "inicio.html";
        }
      } else {
        alert("E-mail ou senha incorretos.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao tentar fazer login.");
    });
});
