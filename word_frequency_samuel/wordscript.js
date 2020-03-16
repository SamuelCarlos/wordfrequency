function closeAlert(){
    let div = document.getElementById("alert")
    div.style.opacity = "0"
    setTimeout(function(){ 
        div.style.display = "none"; 
    }, 600);
}

function openAlert(){
    const div = document.getElementById("alert")
    div.style.opacity = "1"
    setTimeout(function(){ 
        div.style.display = "block"
    }, 600);
}

function pegaTexto(){
    let texto = document.getElementById("inputtext").value
    let qtdPalavras = [[],[]]

    if(texto.length == 0){
        openAlert()
    } else {
        let palavrasTexto = texto.split(/[., ?!()]/)
        for (let s in palavrasTexto){
            if(qtdPalavras[0].indexOf(palavrasTexto[s]) != -1){
                qtdPalavras[1][qtdPalavras[0].indexOf(palavrasTexto[s])]++

            } else {
                qtdPalavras[0].push(palavrasTexto[s])
                qtdPalavras[1].push(1)
            }
        }

        let posicaovazia = qtdPalavras[0].indexOf('')
        qtdPalavras[0].splice(posicaovazia,1)
        qtdPalavras[1].splice(posicaovazia,1)
        
        for(let i = 0; i < qtdPalavras[0].length; i++){
            for (let j = 0; j < qtdPalavras[0].length; j++){
                if(qtdPalavras[1][j] > qtdPalavras[1][j+1]){

                    let numtemp = Number(qtdPalavras[1][j])
                    qtdPalavras[1][j] = qtdPalavras[1][j+1]
                    qtdPalavras[1][j+1] = numtemp
                    
                    let strtemp = qtdPalavras[0][j]
                    qtdPalavras[0][j] = qtdPalavras[0][j+1]
                    qtdPalavras[0][j+1] = strtemp
                }
            }
        }
        imprimeTabela(qtdPalavras)
    }
}

function imprimeTabela(qtdPalavras){
    let div = document.getElementById('resultado')
    let verificapar = 0
    div.style.display = "block"
    div.innerHTML = `
    <table id="tabelaresultado">
        <tr>
            <th>WORD</th>
            <th>QUANTITY</th>
        </tr>
    </table>
    `
    let table = document.getElementById('tabelaresultado')
    for(let i = qtdPalavras[0].length-1; i >= 0; i--){
        
        if(verificapar == 0){
            table.innerHTML += `
                <tr>
                    <td>${qtdPalavras[0][i]}</td>
                    <td>${qtdPalavras[1][i]}</td>
                </tr>
            `
            verificapar = 1
        } else {
            table.innerHTML += `
                <tr class="par">
                    <td>${qtdPalavras[0][i]}</td>
                    <td>${qtdPalavras[1][i]}</td>
                </tr>
            `
            verificapar = 0
        }
        
    }
    graf()
}

function graf(){
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "MOST USED WORDS IN YOUR TEXT"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: 51.08, label: "Chrome" },
                { y: 27.34, label: "Internet Explorer" },
                { y: 10.62, label: "Firefox" },
                { y: 5.02, label: "Microsoft Edge" },
                { y: 4.07, label: "Safari" },
                { y: 1.22, label: "Opera" },
                { y: 0.44, label: "Others" }
            ]
        }]
    });
    chart.render();

}
