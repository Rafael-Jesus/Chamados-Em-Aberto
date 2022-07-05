import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import _ from "lodash";
import axios from "axios";
import "./App.css";

export const data = [
  [
    "Element",
    "Density",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["Copper", 8.94, "#b87333", null],
  ["Silver", 10.49, "silver", null],
  ["Gold", 19.3, "gold", null],
  ["Platinum", 21.45, "color: #e5e4e2", null],
];

export const options = {

  // width: "100vw",
  // height: "100vh",
  // bar: { groupWidth: "95%" },
  // legend: { position: "none" },
  // is3D: true,


  backgroundColor: 'transparent',
  title: "CHAMADOS EM ABERTO",
  titleTextStyle: {color: "#f26533"},
  color: "white",
  legendTextStyle:{color: "#f26533"}, 
  dataTextStyle:{color: "white"},
  crosshair: { trigger: "both", orientation: "both" },
  trendlines: {
    0: {
      type: "polynomial",
      degree: 3,
      visibleInLegend: true,
      labelInLegend: "Trend",
    },
  },
  is3D: true,
};

const App = () => {
  const [dados, setDados] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setInterval(() => {
        const fetchData = async () => {
          try {
            const data = await axios(
              "https://apichamados.globallive.com.br/chamados"
            );

            const values = _.groupBy(data.data.registros, (value) => {
              return value.data_abertura.substring(0, 10);
            });

            function generateColor() {
              const letters = "0123456789ABCDEF";
              let color = "#";

              for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
              }

              return color;
            }

            const valuesV = Object.entries(values);
            valuesV.unshift([
              "Element",
              "Chamados",
              { role: "style" },
              {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
              },
            ]);
            const dataChamados = valuesV.map((v, k) =>
              k != 0
                ? [v[0], v[1].length, generateColor(), v[1].length]
                : [
                    "Datas de Abertura dos Chamados",
                    "Chamados",
                    { role: "style" },
                    {
                      sourceColumn: 0,
                      role: "annotation",
                      type: "string",
                      calc: "stringify",
                    },
                  ]
            );
            console.log(dataChamados);
            setDados(dataChamados);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, 5000);
    }, 500);
  }, []);

  return (

  <body>
        {/* <div class="sign">
    <span class="fast-flicker">C</span>HA<span class="flicker">MA</span>
  </div> */}
    <div className="App">
      {/* <h1 style={{'margin-top': 0}}>CHAMADOS EM ABERTO POR DIA</h1> */}
     <Chart
        chartType="ScatterChart"
        width="100%"
        height="100%"
        data={dados}
        options={options}
      />
   </div>

</body>
  );
};

export default App;
