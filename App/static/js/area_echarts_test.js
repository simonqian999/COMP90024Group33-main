// # 2022 COMP90024 Group 33 

// # Team members:

// # Ke Yang (Student ID: 1219623) - city: Anhui

// # Yimeng Liu (Student ID: 1074206) - city: Guangdong

// # Jintong Liu (Student ID: 1074498) - city: Hebei

// # Keang Xu (Student ID: 1008807) - city: Hubei

// # Xinwei Qian (Student ID: 1068271) - city: Jiangsu



var colors = [
    ["#1DE9B6", "#EBEBEB", "#9DFBF8", "#FDCA40", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
    ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
    ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
    ['#3772FF','#DF2935','#FDCA40','#E6E8E6','#ADC6FF', '#F4B8BC', '#FEE9AE', '#FFFFFF', '#77EBF8', '#17BEBB', '#D2FDFF', '#ADFBFF','#3ABEFF', '#F4EC90']
];

var colorIndex = 0;


// setTimeout(function(){
$(function () {
    setInterval(map,10000);
    // map();
    function map() {

        var langChart = echarts.init(document.getElementById('echart2')); 
        var setiChart1 = echarts.init(document.getElementById('echart4')); 
        var setiChart2 = echarts.init(document.getElementById('echart7'));
        var incomeChart = echarts.init(document.getElementById('echart6')); 
        var wordCloud = echarts.init(document.getElementById('echart5')); 
        var polaseti = echarts.init(document.getElementById('echart3')); 
        var compseti = echarts.init(document.getElementById('echart1'));
  
        var myChart = echarts.init(document.getElementById('map_1'));

        //--------------------------- Variables Initialisation ---------------------------\\

        const mapData = [];
        var categoryData = [];
        var barData = [];
        var langdis_data = [];
        var wordlocationindex = 0
  
        for (var key in geoCoordMap) {
            mapData.push({
                "name": key,
                "value": city[key],
            });
            //console.log(city[key])
        } 

        for (var i = 0; i < mapData.length; i++) {
            barData.push(mapData[i].value); 
            categoryData.push(mapData[i].name.toUpperCase()); 
        }

        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name.toUpperCase(),
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        
        // var piecolor=['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
        // Language Distribution Pie Chart
        for (var i = 0; i < keys.length; i++) {
            var keyname = keys[i].toUpperCase(); 
            console.log(lang_data[i])
            langdis_data.push({
                name: keyname, //city
                type: 'pie',
                hoverAnimation: 'false',
                radius: ['30%', '52%'],
                center: ['50%', '50%'],
                // color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
                // color: ['#4B0082', '#800080', "8B008B", "#9932CC", "#8A2BE2", "#6A5ACD", "#9370DB", "#7B68EE", "#BA55D3", "#DDA0DD", "#D8BFD8", "#E6E6FA"],
                color: ['#f0ddcc', '#f0c95a', '#f7b07e', '#cd5445', '#ffda8a', '#79b4b7', '#ff8600', '#ffb900','#bb5b14', '#c28c5e'],
                data: lang_data[i], //.sort(function (a, b) { return a.value - b.value; }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label:{
                    color: 'rgba(255, 255, 255, 0.9)',
                    // formatter: "{b}:{c}({d}%)",
                    formatter: "{b}: {d}%",
                    emphasis: {
                    //The label style displayed by the mouse on the ring
                    show: true,
                    textStyle: {
                        // color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
                        fontSize: '13',
                        fontWeight: 'bold'
                        }   
                    }                   
                },

                labelLine: {
                    lineStyle: {
                        // color: 'rgba(255, 255, 255, 0.3)'
                    },
                    show: true,
                    smooth: 0.2,
                    length: 12,
                    length2: 18,
                    minTurnAngle: 0,
                    maxSurfaceAngle: 0
                },
                itemStyle: {
                    // color: '#00abff',
                    // normal: {
                    //     borderWidth: 1,
                    //     borderColor: '#ff9900',
                    // },
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    // label:{  
                    //     show:true,
                    //     position: 'outer',  
                    //     formatter:'{d}%'  
                    // }, 
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            })
        }
        
 
        var lang_option = {
            // backgroundColor: '#2c343c',
            title: {
                zlevel: 2,
                // z:3,
                text: langdis_data[0]['name'],
                top: 'middle',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: '18'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
          
            tooltip: {
                trigger: 'item',

            },

            
            series: [langdis_data[0]],

        };
        
        fre_option = {
            legend: {},
            tooltip: {},
            dataset: {
              source: freq_data
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        };
 
        console.log(hashtags_data['adelaide'])
        var wordCloud_option = {
            title: {
                zlevel: 2,
                // z:3,
                
                text: keys[wordlocationindex].toUpperCase(),
                // top: '2%',
                left: 'center',
                top: '1%',
                textStyle: {
                    color: '#fff',
                    fontSize: '20'
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {
                show: true
            },
            series: {
            type: 'wordCloud',
            sizeRange: [14,30],
            // 12,25
            rotationRange: [-45, 90],
            rotationStep: 45,
            textRotation: [0, 45, 90, -45],
            shape: 'circle',
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '80%',
            layoutAnimation: false,
            textStyle: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function(){
                    var color = ['#3772FF','#DF2935','#FDCA40','#E6E8E6','#ADC6FF', '#F4B8BC', '#FEE9AE', '#FFFFFF', '#77EBF8', '#17BEBB', '#D2FDFF', '#ADFBFF','#3ABEFF', '#F4EC90', '#DBB494']
                    // var color = ['#4B0082', '#800080', "8B008B", "#9932CC", "#8A2BE2", "#6A5ACD", "#9370DB", "#7B68EE", "#BA55D3", "#DDA0DD", "#D8BFD8", "#E6E6FA"]
                    return color[Math.floor(Math.random() * color.length)];
                }
            },
            emphasis: {
                focus: 'self',
    
                textStyle: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: hashtags_data[keys[wordlocationindex]]
            }
        }; 
        
          
          income_option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {
              textStyle:{
                color: '#fff',
            },
              data: ['Income', 'Rent']
            },
            xAxis: [
              {
                type: 'category',
                axisLabel: {
                  show: true,
                  interval: 0,
                  rotate: 20,
                },
                axisLine:{
                  show: true,
                  lineStyle:{
                      color: "#fff"
                  }
                },
                data: ['Melbourne', 'Brunswick', 'Docklands', 'Footscray', 'Surrey Hills (West) - Canterbury', 'Camberwell', 'Dandenong','Mornington'],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLine:{
                  show: true,
                  lineStyle:{
                      color: "#fff"
                  }
                },
                name: 'Income',
                min: 0,
                max: 7000,
                interval: 1000,
                axisLabel: {
                  formatter: '{value} AUD'
                }
              },
              
              {
                type: 'value',
                axisLine:{
                  show: true,
                  lineStyle:{
                      color: "#fff"
                  }
                },
                name: 'Rent',
                min: 0,
                max: 3500,
                interval: 500,
                axisLabel: {
                  formatter: '{value} AUD'
                }
              }
            ],
           
            grid: {

                left: '1%',
                right: '1%',
                bottom: '1%',
                containLabel: true
            },
            
            series: [
              {
                name: 'Income',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' AUD';
                  }
                },
                data: [2339, 4298, 4278.5, 3747.5, 5127.75, 4787.25, 3110.25, 3723.83]
              },
              {
                name: 'Rent',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' AUD';
                  }
                },
                data: [1841.0, 2240.0, 2408.0, 2023.0, 2811.0, 2718.0, 1596.0, 1842.0]
              }
            ]
          };

          seti_option1 = {

            tooltip: {
              trigger: 'axis'
            },
            
            legend: {
                textStyle:{
                    color: '#fff',
                },
                data: ['Score_Neutral', 'Score_Postive', 'Score_Negative']
            },
     
            grid: {
                left: '10%',
                right: '10%',
                bottom: '1%',
                containLabel: true
                },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 28,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Brunswick', 'Docklands', 'Footscray', 'Surrey Hills (West) - Canterbury', 'Camberwell', 'Dandenong','Mornington'],
            },
            yAxis: {
              type: 'value',
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
            },
            series: [
              {
                name: 'Score_Neutral',
                type: 'line',
                data: [0.87538, 0.83292, 0.85083, 0.83912, 0.80778, 0.83902, 0.87642, 0.82610]
              },
              {
                name: 'Score_Postive',
                type: 'line',
                data: [0.09624, 0.12065, 0.11199, 0.11564, 0.13915, 0.1105, 0.08687,0.13938]
              },
              {
                name: 'Score_Negative',
                type: 'line',
                data: [0.02838, 0.04642, 0.03717, 0.04523, 0.05307, 0.05048, 0.03671, 0.03452]
              },
            ]
          };

          seti_option2 = {
            xAxis: {
              type: 'category',
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 28,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Brunswick', 'Docklands', 'Footscray', 'Surrey Hills (West) - Canterbury', 'Camberwell', 'Dandenong','Mornington'],
            },
            yAxis: {
              type: 'value',
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              }
            },
            tooltip:{
                trigger: 'axis',
            },
           
            grid: {
                
                left: '8%',
                right: '8%',
                bottom: '2%',
                containLabel: true
            },
            
            series: [
              {
                data: [0.13525, 0.13594, 0.14355, 0.131, 0.15207, 0.12344, 0.10775, 0.19517],
                type: 'line',
              }
            ]
          };
          
          
          pola_seti_option = {
              
            tooltip: {
              trigger: 'axis'
            },
            
            legend: {
                textStyle:{
                    color: '#fff',
                },
                data: ['Score_Negative', 'Score_Neutral', 'Score_Postive']
            },
     
            grid: {
                left: '10%',
                right: '10%',
                bottom: '2%',
                containLabel: true
                },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 28,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Sydney', 'Brisbane', 'Darwin', 'Adelaide']
            },
            yAxis: {
              type: 'value',
              min: 0,
              max: 1,
              interval: 0.2,
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
            },
            series: [

              {
                name: 'Score_Negative',
                type: 'line',
                data: pola_data[1][0]
              },
              {
                name: 'Score_Neutral',
                type: 'line',
                data: pola_data[1][1]
              },
              {
                name: 'Score_Postive',
                type: 'line',
                data: pola_data[1][2]
              },
              
            ]
            
          };

          
          comp_seti_option = {
              
            tooltip: {
              trigger: 'axis'
            },
            
     
            grid: {
                left: '8%',
                right: '8%',
                bottom: '2%',
                containLabel: true
                },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 28,
              },
              axisLine:{
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
              data: ['Melbourne', 'Sydney', 'Brisbane', 'Darwin', 'Adelaide']
            },
            yAxis: {
              type: 'value',
              axisLine:{
                max: 1,
                min: -1,
                splitNumber:0.2,
                // interval: 0.5,
                show: true,
                lineStyle:{
                    color: "#fff"
                }
              },
            },
            series: [
              {
                data: comp_data[1],
                type: 'line',
              }
            ]
 
          };

          optionXyMap01 = {
            title: {
                text: "Five city live tweets", 
                
                left: "left", 
                textStyle: {
                  
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fff"
                }
            },
           
            tooltip: {
                trigger: 'item',
                formatter: (p) => {
                    let val = p.value[2];
                    if (window.isNaN(val)) {
                        val = 0;
                    }
                    let txtCon =
                        "<div style='text-align:left'>" + p.name + ":<br />Total Tweets：" + val + '</div>';
                    return txtCon;
                }
            },
            
                geo: { 
                    // nameProperty: "STATE_NAME",
                    show: true,
                    map: 'australia',
                    roam: false,
                    zoom: 1,
                    layoutCenter: ['50%', '50%'],
                    zlevel:1,
                    // If width-height ratio is larger than 1, then width is set to be 100.
                    // Otherwise, height is set to be 100.
                    // This makes sure that it will not exceed the area of 100x100
                    layoutSize: 470,
                    // center: [133.7751, -25.2744], 320
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            // areaColor: '#4c60ff',
                            // borderColor: '#002097',
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)'  
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' 
                                }],
                                globalCoord: false 
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
      
                        emphasis: {
                            // areaColor: '#293fff',
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
                
   
                series: [
                              {
                                name: 'Top 5',
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: convertData(
                                  mapData
                                    .sort(function (a, b) {
                                      return b.value - a.value;
                                    })
                                    .slice(0, 6)
                                ),
                                symbolSize: function (val) {
                                  return val[2] / 3000;
                                },   
                                encode: {
                                  value: 2
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                  brushType: 'stroke'
                                },
                               
                                label: {
                                  formatter: '{b}',
                                  position: 'right',
                                  show: true
                                },

                                itemStyle: {
                                    normal:{
                                        color:'#fcda9d',
                                    },
                                    shadowBlur: 10,
                                    shadowColor: '#fcda9d'
                                },
                                
                                emphasis: {
                                  scale: true
                                },
                                zlevel: 2
                              },

                        ]
            }
          
        //--------------------------- Charts Initialisation ---------------------------\\

        console.log(langdis_data[0])
        console.log(freq_data)

        langChart.setOption(lang_option);
        incomeChart.setOption(income_option);
        setiChart1.setOption(seti_option1);
        setiChart2.setOption(seti_option2);
        myChart.setOption(optionXyMap01, true);
        wordCloud.setOption(wordCloud_option);
        
        polaseti.setOption(pola_seti_option);
        compseti.setOption(comp_seti_option);
        
        window.addEventListener("resize",function(){
            langChart.resize();
            incomeChart.resize();
            setiChart1.resize();
            setiChart2.resize();
            myChart.resize();
            wordCloud.resize();
            polaseti.resize();
            compseti.resize()
        });

        myChart.on('click', function (params) {
            var city = params.name;
            // console.log(city)
            var index = keys.findIndex(function(item) {
                // console.log(item)
                return item == city.toLowerCase();
            });

            if (index !== -1){

                wordlocationindex = index
                lang_option['title']['text'] = langdis_data[index].name;
                lang_option['series'] = [langdis_data[index]];
                langChart.setOption(lang_option);

            }

            wordCloud_option['series']['data'] = hashtags_data[keys[wordlocationindex]]
            wordCloud_option['title']['text'] = keys[wordlocationindex].toUpperCase()

            wordCloud.setOption(wordCloud_option);
        });

        window.addEventListener("resize",function(){
            langChart.resize();
        });

    }

})