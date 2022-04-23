interface Veiculo {
  nome: string;
  placa: string;
  entrada: Date | string;
}

(function () {
  const $ = (query) => document.querySelector(query);
  function calcTempo(mil: number) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);
    return `${min}m e ${sec}`;
  }
  function patio() {
    function ler() {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    function adicionar(veiculo: Veiculo, salvo: boolean) {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${veiculo.nome}</td>
      <td>${veiculo.placa}</td>
      <td>${veiculo.entrada}</td>
      <td>
        <button class="delete btn btn-danger" data-placa="${veiculo.placa}">X</button>
      </td>`;

      row.querySelector('.delete').addEventListener('click', function () {
        remover(this.dataset.placa);
      });

      $('#patio').appendChild(row);

      if (salvo) salvar([...ler(), veiculo]);
    }
    function remover(placa: string) {
      const { entrada, nome } = ler().find(
        (veiculo) => veiculo.placa === placa
      );
      const tempo = calcTempo(
        new Date().getTime() - new Date(entrada).getTime()
      );
      if (
        !confirm(`O veículo ${nome} permaneceu por ${tempo}, deseja encerar?`)
      )
        return;

      salvar(ler().filter((veiculo) => veiculo.placa !== placa));
      render();
    }

    function salvar(veiculos: Veiculo[]) {
      localStorage.setItem('patio', JSON.stringify(veiculos));
    }
    function render() {
      $('#patio').innerHTML = '';
      const patio = ler();
      if (patio.length) {
        patio.forEach((veiculo) => adicionar(veiculo, false));
      }
    }
    return { ler, adicionar, remover, salvar, render };
  }

  patio().render();

  $('#register')?.addEventListener('click', () => {
    const nome = $('#name')?.value;
    const placa = $('#placa')?.value;
    console.log(`${nome} ${placa}`);
    if (!nome || !placa) {
      alert('Os campos nome e placa são obrigatórios');
      return;
    }
    patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
  });
})();
