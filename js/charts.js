function pieLevelChart(idtag, title, allData, genderData) {
  //inisiasi charts
  var name = idtag
  var mainData = []
  var drillData = []
  var dataColor = Highcharts.getOptions().colors
  var i = 0
  _.forEach(allData, function(v, k) {
    //mainData
    mainData.push({
      name: k,
      y: v,
      color: dataColor[i]
    })
    //drillDown
    _.forEach(genderData, function(val, key) {
      var label = (key == 0) ? "Pria" : "Wanita"
      var value = (typeof val[k] != "undefined") ? val[k] : 0
      var details = {
        name: label,
        y: value,
        color: Highcharts.Color(dataColor[i]).brighten(0.2).get()
      }
      drillData.push(details)
    })
    i++
  })
  //create charts
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: idtag
    },
    title: {
      text: title
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}'
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{point.key}</span><br>',
      pointFormat: '<span style="font-size:11px">{point.y}</span><br>',
    },
    series: [{
      name: idtag,
      data: mainData,
      size: '60%',
      dataLabels: {
        formatter: function() {
          return this.y > 5 ? this.point.name : null;
        },
        color: 'white',
        distance: -30
      }
    }, {
      name: 'Gender',
      data: drillData,
      size: '80%',
      innerSize: '60%',
      dataLabels: {
        formatter: function() {
          // display only if larger than 1
          return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
        }
      }
    }]
  });
  //return val
  return {
    draw: function() {
      chart
    }
  }
}

function pieDrillChart(idtag, title, allData, genderData) {
  //inisiasi charts
  var name = idtag
  var mainData = []
  var drillData = []
  _.forEach(allData, function(v, k) {
    //mainData
    mainData.push({
      name: k,
      y: v,
      drilldown: name + "_" + k
    })
    //drillDown
    var detailsData = _.map(genderData, function(val, key) {
      var label = (key == 0) ? "Pria" : "Wanita"
      var value = (typeof val[k] != "undefined") ? val[k] : 0
      return [label, value]
    })
    var details = {
      name: name + "_" + k,
      id: name + "_" + k,
      data: detailsData
    }
    drillData.push(details)
  })
  //create charts
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: idtag
    },
    title: {
      text: title
    },
    subtitle: {
      text: 'Klik bagian, untuk informasi rinci'
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}'
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>'
    },
    series: [{
      name: name,
      colorByPoint: true,
      data: mainData
    }],
    drilldown: {
      series: drillData
    }
  });
  //return val
  return {
    draw: function() {
      chart
    }
  }
}

function bubbleChart(idtag, title, allData) {
  //create charts
  var chart = new Highcharts.Chart({
    chart: {
      type: 'bubble',
      zoomType: 'xy',
      renderTo: idtag
    },
    title: {
      text: title
    },
    xAxis: {
      type: 'linear'
    },
    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 1
      }
    },
    series: allData
  });
  //return val
  return {
    draw: function() {
      chart
    }
  }
}

function pieChart(idtag, title, allData) {
  //create charts
  $(idtag).highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: title
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f} %/b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Presentase',
      colorByPoint: true,
      data: allData
    }]
  });
  console.log("hooray");
}


function pieChartWithDrill(idtag,title,series,drilldown){
  $(function () {
      // Create the chart
      $(idtag).highcharts({
        chart: {
          type: 'pie'
        },
        title: {
          text: title
        },
        subtitle: {
          text: 'Klik diagram untuk melihat distribusi pengguna (visualisasi interaktif).'
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y:.1f} %'
            }
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} orang</b> of total<br/>'
        },
        series: series,
        drilldown: {
          series: drilldown
        }
      });
});
}