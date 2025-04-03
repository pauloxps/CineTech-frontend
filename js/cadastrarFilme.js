document.getElementById("formFilme").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target); // Inclui o arquivo no envio

  const resposta = await fetch("http://localhost:8000/api/filmes.php", {
      method: "POST",
      body: formData // Envia o formulário como multipart/form-data
  });

  const resultado = await resposta.json();
  alert(resultado.mensagem || resultado.erro || "Erro desconhecido");
  e.target.reset();
});
