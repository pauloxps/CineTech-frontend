document.getElementById("formFilme").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const dados = Object.fromEntries(new FormData(e.target).entries());
  
    const resposta = await fetch("http://localhost:8000/api/filmes.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
  
    const resultado = await resposta.json();
    alert(resultado.mensagem || resultado.erro || "Erro desconhecido");
    e.target.reset();
  });
  