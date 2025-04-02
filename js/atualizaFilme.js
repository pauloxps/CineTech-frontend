const API_URL = "http://localhost:8000/api/filmes.php";

async function listarFilmes() {
  try {
    const resposta = await fetch(API_URL);
    const filmes = await resposta.json();
    const lista = document.getElementById("listaFilmes");
    lista.innerHTML = "";

    filmes.forEach((filme) => {
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${filme.titulo}</td>
        <td>${filme.genero}</td>
        <td>${filme.duracao} min</td>
        <td>
          <a href="admin/editarFilme.html?id=${filme.id}" class="btn btn-warning btn-sm">Editar</a>
        </td>
      `;

      lista.appendChild(linha);
    });
  } catch (erro) {
    console.error("Erro ao listar filmes:", erro);
  }
}

// Chama ao carregar a página
listarFilmes();