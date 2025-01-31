async function fetchUsuarios() {
    try {
        const response = await fetch("http://localhost:3000/registro");
        const data = await response.json();
        renderUsuarios(data);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}

function renderUsuarios(usuarios) {
    const container = document.getElementById("userContainer");
    container.innerHTML = "";
    usuarios.forEach((user) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${user.nome} ${user.sobrenome}</h3>
            <p>RG: ${user.rg}</p>
            <p>Email: ${user.email}</p>
            <p>Usuário: ${user.usuario}</p>
            <button onclick="editarUsuario('${user.id}')">Editar</button>
            <button onclick="deletarUsuario('${user.id}')">Deletar</button>
        `;
        container.appendChild(card);
    });
}

async function editarUsuario(id) {
    const nome = prompt("Novo nome:");
    const sobrenome = prompt("Novo sobrenome:");
    const rg = prompt("Novo RG:");
    const email = prompt("Novo email:");
    const usuario = prompt("Novo usuário:");
    
    if (nome && sobrenome && rg && email && usuario) {
        try {
            await fetch(`http://localhost:3000/registro/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, sobrenome, rg, email, usuario })
            });
            fetchUsuarios();
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }
    }
}

async function deletarUsuario(id) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        try {
            await fetch(`http://localhost:3000/registro/${id}`, {
                method: "DELETE"
            });
            fetchUsuarios();
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
    }
}
fetchUsuarios();


//Função de buscar os cadastrados pelo RG
// Função para buscar usuários por RG
async function botaoRg() {
    const buscaRg = document.getElementById("buscaRg").value.trim();
    
    if (buscaRg) {
        try {
            const response = await fetch("http://localhost:3000/registro");
            const data = await response.json();
            
            // Filtra os usuários pelo RG
            const filteredUsers = data.filter(user => user.rg.includes(buscaRg));
            
            // Renderiza os resultados filtrados
            renderUsuarios(filteredUsers);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    } else {
        // Se o campo estiver vazio, carrega todos os usuários
        fetchUsuarios();
    }
}