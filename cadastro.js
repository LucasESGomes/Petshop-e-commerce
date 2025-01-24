function registro() {
  // Prevenir o envio padrão do formulário
  event.preventDefault();

  // Capturar os valores dos inputs
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const rg = document.getElementById("rg").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Montar o objeto que será enviado
  const dados = {
      nome: nome,
      sobrenome: sobrenome,
      rg: rg,
      email: email,
      senha: senha
  };

  // Fazer o POST para o JSON Server
  fetch("http://localhost:3000/registro", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error("Erro ao salvar os dados.");
      }
  })
  .then(data => {
      console.log("Dados salvos com sucesso:", data);
      alert("Cadastro realizado com sucesso!");
      // Opcional: Redirecionar o usuário ou limpar o formulário
      document.querySelector("form").reset();
  })
  .catch(error => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao realizar o cadastro.");
  });
}
