var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var _a;
    var $ = function (query) { return document.querySelector(query); };
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return "".concat(min, "m e ").concat(sec);
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo, salvo) {
            var row = document.createElement('tr');
            row.innerHTML = "\n      <td>".concat(veiculo.nome, "</td>\n      <td>").concat(veiculo.placa, "</td>\n      <td>").concat(veiculo.entrada, "</td>\n      <td>\n        <button class=\"delete btn btn-danger\" data-placa=\"").concat(veiculo.placa, "\">X</button>\n      </td>");
            row.querySelector('.delete').addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            $('#patio').appendChild(row);
            if (salvo)
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
        }
        function remover(placa) {
            var _a = ler().find(function (veiculo) { return veiculo.placa === placa; }), entrada = _a.entrada, nome = _a.nome;
            var tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm("O ve\u00EDculo ".concat(nome, " permaneceu por ").concat(tempo, ", deseja encerar?")))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function render() {
            $('#patio').innerHTML = '';
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo, false); });
            }
        }
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, render: render };
    }
    patio().render();
    (_a = $('#register')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a, _b;
        var nome = (_a = $('#name')) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        console.log("".concat(nome, " ").concat(placa));
        if (!nome || !placa) {
            alert('Os campos nome e placa são obrigatórios');
            return;
        }
        patio().adicionar({ nome: nome, placa: placa, entrada: new Date().toISOString() }, true);
    });
})();
