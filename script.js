let gastos = [];
let editandoId = null;

function adicionar() {
  const desc = document.getElementById('desc').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);
  const cat = document.getElementById('cat').value;

  if (!desc || isNaN(valor) || valor <= 0 || !cat) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  if (editandoId) {
    // EDITAR
    gastos = gastos.map(g => {
      if (g.id === editandoId) {
        return { ...g, desc, valor, cat };
      }
      return g;
    });
    editandoId = null;
  } else {
    // ADICIONAR
    gastos.push({ id: Date.now(), desc, valor, cat });
  }

  limparCampos();
  renderizar();
}

function editar(id) {
  const gasto = gastos.find(g => g.id === id);

  document.getElementById('desc').value = gasto.desc;
  document.getElementById('valor').value = gasto.valor;
  document.getElementById('cat').value = gasto.cat;

  editandoId = id;
}

function remover(id) {
  gastos = gastos.filter(g => g.id !== id);
  renderizar();
}

function limparCampos() {
  document.getElementById('desc').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('cat').value = '';
}

function renderizar() {
  const lista = document.getElementById('lista');
  const total = gastos.reduce((soma, g) => soma + g.valor, 0);

  document.getElementById('total').textContent =
    'R$ ' + total.toFixed(2).replace('.', ',');

  if (gastos.length === 0) {
    lista.innerHTML = '<tr><td colspan="4" class="empty">Nenhum gasto registrado.</td></tr>';
    return;
  }

  lista.innerHTML = gastos.map(g => {
    const alto = g.valor > 100;

    return `
      <tr>
        <td>${g.desc}</td>
        <td>${g.cat}</td>
        <td class="${alto ? 'alto' : ''}">
          ${alto ? '⚠ ' : ''}R$ ${g.valor.toFixed(2).replace('.', ',')}
        </td>
        <td>
          <button onclick="editar(${g.id})">✏️</button>
          <button class="btn-del" onclick="remover(${g.id})">✕</button>
        </td>
      </tr>
    `;
  }).join('');
}