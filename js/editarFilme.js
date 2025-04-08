const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function carregarFilme() {
  const resposta = await fetch(`http://localhost:8000/api/filmes.php?id=${id}`);
  const dados = await resposta.json();
  const filme = Array.isArray(dados) ? dados[0] : dados;


  document.querySelector("[name=titulo]").value = filme.titulo;
  document.querySelector("[name=genero]").value = filme.genero;
  // preenche os outros 
  
  document.querySelector("[name=sinopse]").value = filme.sinopse;
  document.querySelector("[name=capa]").value = filme.capa;
  document.querySelector("[name=trailer]").value = filme.trailer;
  const campoData = document.querySelector("[name=data_lancamento]");
    if (filme.data_lancamento && campoData) {
    campoData.value = filme.data_lancamento.slice(0, 10);
    } else {
    campoData.value = ''; // limpa o campo se não houver valor válido
}

    console.log('filme',filme);


  document.querySelector("[name=duracao]").value = filme.duracao;




}

carregarFilme();

document.getElementById("formEditarFilme").addEventListener("submit", async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(e.target).entries());

  const resposta = await fetch(`http://localhost:8000/api/filmes.php?id=${id}`, {
      method: "PUT", // ou POST com modo: editar
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
  });

  const resultado = await resposta.json();
  alert(resultado.mensagem || resultado.erro);

  // Redireciona para a tela inicial após salvar
  if (!resultado.erro) {
      window.location.href = "index.html";
  }

  document.getElementById("btnExcluir").addEventListener("click", async () => {
    const confirmar = confirm("Tem certeza que deseja excluir este filme?");
    if (!confirmar) return;
  
    const id = document.getElementById("filmeId").value;
  
    try {
      const resposta = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      });
  
      const resultado = await resposta.json();
      alert(resultado.mensagem || resultado.erro);
  
      if (!resultado.erro) {
        window.location.href = "../index.html";
      }
    } catch (erro) {
      console.error("Erro ao excluir filme:", erro);
      alert("Erro ao excluir o filme.");
    }
  });
  
});
