async function listarFilmes() {
    try {
        const resposta = await fetch("http://localhost:8000/api/filmes.php");
        const filmes = await resposta.json();
        const lista = document.getElementById("listaFilmes");
        lista.innerHTML = ""; // Limpa a lista antes de preencher

        filmes.forEach(filme => {
            const card = document.createElement("div");
            card.classList.add("col-md-3", "mb-4"); // Usa Bootstrap para espaçamento e grid

            // Usa a imagem fixa "admin/img/a.avif"
            card.innerHTML = `
                <div class="card shadow-sm">
                    <img src="/cine-filmes/admin/img/a.avif" class="card-img-top" alt="${filme.titulo}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <p class="text-muted">${filme.genero} | ${filme.duracao} min</p>
                        <a href="#" class="btn btn-primary">Ver detalhes</a>
                    </div>
                </div>
            `;

            lista.appendChild(card);
        });
    } catch (erro) {
        console.error("Erro ao listar filmes:", erro);
    }
}
