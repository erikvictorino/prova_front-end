let gastos = [];

function adicionar() {
  const desc = document.getElementById('desc').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);
  const cat = document.getElementById('cat').value;

  if (!desc || isNaN(valor) || valor <= 0 || !cat) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  gastos.push({ id: Date.now(), desc, valor, cat });

  document.getElementById('desc').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('cat').value = '';

  renderizar();
}

function remover(id) {
  gastos = gastos.filter(function(g) { return g.id !== id; });
  renderizar();
}

function renderizar() {
  const lista = document.getElementById('lista');
  const total = gastos.reduce(function(soma, g) { return soma + g.valor; }, 0);

  document.getElementById('total').textContent =
    'R$ ' + total.toFixed(2).replace('.', ',');

  if (gastos.length === 0) {
    lista.innerHTML = '<tr><td colspan="4" class="empty">Nenhum gasto registrado.</td></tr>';
    return;
  }

  lista.innerHTML = gastos.map(function(g) {
    const alto = g.valor > 100;
    return '<tr>' +
      '<td>' + g.desc + '</td>' +
      '<td>' + g.cat + '</td>' +
      '<td class="' + (alto ? 'alto' : '') + '">' + (alto ? '⚠ ' : '') + 'R$ ' + g.valor.toFixed(2).replace('.', ',') + '</td>' +
      '<td><button class="btn-del" onclick="remover(' + g.id + ')">✕</button></td>' +
      '</tr>';
  }).join('');
}