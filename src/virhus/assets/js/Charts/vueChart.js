//Ecg Chart
new Vue({
  el: '#ecg',
  components: {
    apexchart: VueApexCharts,
  },
  data: {

    seriesEcg: [{
      data: dataEcg.slice()
    }],
    chartOptions: {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'numeric',
        range: XAXISRANGE,
        
       /* labels: {
          show: false
        },
        axisBorder: {
          show: false
        }, */
      },
      yaxis: {
        max: 2,
        min: -2,
        show: false,
      },
      grid: {
        show: false
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            strokeDashArray: 10,
            borderColor: "#333",
            fillColor: "#c2c2c2",
            opacity: 0.3,
            offsetX: 0,
            offsetY: 0
          }
        ]
      },
      legend: {
        show: false
      },
    },


  },
  mounted: function () {
    var me = this
    window.setInterval(function () {
      getNewSeries(lastDate, range)

      me.$refs.chartEcg.updateSeries([{
        data: dataEcg
      }])
    }, 1000)


  },
})

//Emgz Chart
new Vue({
  el: '#emgz',
  components: {
    apexchart: VueApexCharts,
  },
  data: {

    seriesEmgz: [{
      data: dataEmgz.slice()
    }],
    chartOptions: {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'numeric',
        range: XAXISRANGE,
       
       /* labels: {
          show: false
        },
        axisBorder: {
          show: false
        }, */
      },
      yaxis: {
        max: 2,
        min: -2,
        show: false,
      },
      grid: {
        show: false
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            strokeDashArray: 10,
            borderColor: "#333",
            fillColor: "#c2c2c2",
            opacity: 0.3,
            offsetX: 0,
            offsetY: 0
          }
        ]
      },
      legend: {
        show: false
      },
    },


  },
  mounted: function () {
    var me = this
    window.setInterval(function () {
      getNewSeries2(lastDate2, range)

      me.$refs.chartEmgz.updateSeries([{
        data: dataEmgz
      }])
    }, 1000)
  },
})

//Emg Chart
new Vue({
  el: '#emg',
  components: {
    apexchart: VueApexCharts,
  },
  data: {

    seriesEmg: [{
      data: dataEmg.slice()
    }],
    chartOptions: {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'numeric',
        range: XAXISRANGE,
       
       /* labels: {
          show: false
        },
        axisBorder: {
          show: false
        }, */
      },
      yaxis: {
        max: 2,
        min: -2,
        show: false,
      },
      grid: {
        show: false
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            strokeDashArray: 10,
            borderColor: "#333",
            fillColor: "#c2c2c2",
            opacity: 0.3,
            offsetX: 0,
            offsetY: 0
          }
        ]
      },
      legend: {
        show: false
      },
    },


  },
  mounted: function () {
    var me = this
    window.setInterval(function () {
      getNewSeries3(lastDate3, range)

      me.$refs.chartEmg.updateSeries([{
        data: dataEmg
      }])
    }, 1000)
  },
})

//Eda Chart
new Vue({
  el: '#eda',
  components: {
    apexchart: VueApexCharts,
  },
  data: {

    seriesEda: [{
      data: dataEda.slice()
    }],
    chartOptions: {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'numeric',
        range: XAXISRANGE,
        
       /* labels: {
          show: false
        },
        axisBorder: {
          show: false
        }, */
      },
      yaxis: {
        max: 2,
        min: -2,
        show: false,
      },
      grid: {
        show: false
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            strokeDashArray: 10,
            borderColor: "#333",
            fillColor: "#c2c2c2",
            opacity: 0.3,
            offsetX: 0,
            offsetY: 0
          }
        ]
      },
      legend: {
        show: false
      },
    },


  },
  mounted: function () {
    var me = this
    window.setInterval(function () {
      getNewSeries4(lastDate4, range)

      me.$refs.chartEda.updateSeries([{
        data: dataEda
      }])
    }, 1000)
  },
})