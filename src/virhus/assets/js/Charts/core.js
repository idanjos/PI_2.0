
let num = 0;
let graphics = new Map()
let player = new Map()

$(document).ready(function () {
    $(document).on('click', '#create', function () {
        //console.log($("#name").val())
        payload = '{"token":"12345678","User":"root","Msg":"' + $("#name").val() + '"}';
        $.ajax({
            type: "POST",
            url: "/createVH",
            data: payload,
            success: function () {
                console.log("User added")
                $("#exampleSelect").append(`<option>` + $("#name").val() + `</option>`)
                $(".zero").remove();
            }
        })

    })
    $(document).on('click', '#open', function () {
        let id = $("#exampleSelect").val() + num;
        if (id.includes("No available")) {
            return;
        }
        num++;
        $(".app-main__inner").append(getCharts($("#exampleSelect").val(), id))
        graphics.set(id, startCharts(id))
        player.set(id, 0)
        console.log(graphics)
        $(document).on("click", ".close_" + id, function () {
            if (graphics.has(id)) {
                $(".charts_" + id).remove()
                graphics.get(id).get("schedule").stop();

                graphics.delete(id)
                $(document).off("click", ".close_" + id)
                $(document).off("click", ".play_" + id)
                $(document).off("click", ".pause_" + id)
                $(document).off("click", ".stop_" + id)
                $(document).off("click", ".fear_" + id)
                $(document).off("click", ".happy_" + id)
                $(document).off("click", ".neutral_" + id)
            }
            console.log(graphics)

        })
        $(document).on("click", ".play_" + id, function () {
            console.log("Playing")
            player.set(id, 1)
        })
        $(document).on("click", ".stop_" + id, function () {
            player.set(id, 0)
        })
        $(document).on("click", ".pause_" + id, function () {
            player.set(id, 2)
        })
        $(document).on("click", ".neutral_" + id, function () {
            console.log("neutral," + graphics.get(id).get("emotion"))
            graphics.get(id).set("emotion", "neutral")
        })
        $(document).on("click", ".happy_" + id, function () {
            console.log("happy")
            graphics.get(id).set("emotion", "happy")
        })
        $(document).on("click", ".fear_" + id, function () {
            console.log("fear")
            graphics.get(id).set("emotion", "fear")
        })
    })
})

function getCharts(name, id) {
    return `<div class="row charts_` + id + `">
    <div class="col-md-12">
    <h1>Virtual Human: `+ name + `</h1>
    <button class=" mb-3 right btn btn-primary close_`+ id + `"><i class="fas fa-close"></i> Close </button></div>
    
    <div class = "col-sm-6 col-md-3 data"><div class="mb-3 card text-white card-body bg-danger "><h5 class="text-white card-title">ECG Signal</h5><span class="data0_`+id+`"></span> hbps</div></div>
    <div class = "col-sm-6 col-md-3 data"><div class="mb-3  card text-white card-body bg-success"><h5 class="text-white card-title">EMGZ Signal</h5><span class="data1_`+id+`"></span> units</div></div>
    <div class = "col-sm-6 col-md-3 data"><div class="mb-3  card text-white card-body bg-info"><h5 class="text-white card-title">EMG Signal</h5><span class="data2_`+id+`"></span> units</div></div>
    <div class = "col-sm-6 col-md-3 data"><div class="mb-3  card text-white card-body bg-warning"><h5 class="text-white card-title">EDA Signal</h5><span class="data3_`+id+`"></span> units</div></div>
    
    <div class="col-md-12 ">
        <div>
                <canvas  class="chart" id="chart_`+ id + `"</canvas>
        </div>
   
    </div>
    
    
    <div class="col-md-12 ">
        
       
        <div class="mb-3 card row">
        <div class="col-md-12 player">
            <button class="mb-2 mr-2 btn btn-primary play_`+ id + `"><i class="fas fa-play"></i> </button>
            <button class="mb-2 mr-2 btn btn-primary pause_`+ id + `"><i class="fas fa-pause"></i> </button>
            <button class="mb-2 mr-2 btn btn-primary stop_`+ id + `"><i class="fas fa-stop"></i> </button>
            <button class="mb-2 mr-2 btn btn-primary neutral_`+ id + `">Neutral</button>
        <button class="mb-2 mr-2 btn btn-primary happy_`+ id + `">Happy</button>
        <button class="mb-2 mr-2 btn btn-primary fear_`+ id + `">Fear</button><button class="mb-2 mr-2 btn btn-primary neutral_` + id + `">Neutral</button>
    </div>
    
    
       
        <div class="col-md-6 ">
        <label for="exampleSelect" class="">Select</label><select name="select" id="exampleSelect"
        class="form-control">
            <option>No recordings found</option></select>
        
               
        </div>
        <div class="col-md-3 recording">
        <button class="mb-2 mr-2 mt-2 btn btn-primary history_`+ id + `">Download <i class="fas fa-file-download"></i></button>
        </div>
        
       
    </div>
    
    
    
    </div>`
}

function startCharts(id) {
    let channels = 4;   // Number of lines
   
    let scale = 5;      // Milliseconds per pixel
    let toggle = 0;
    let nElements = 10;
    let buffer = []
    let stack = true;   // Stack timeseries on top of each other
    let last = [0,0,0,0]
    // Rainbows!
    let colors = ['#d92550', '#3ac47d', '#16aaff', '#f7b924'];
    // This will hold our time-series objects.
    let series = [];
    let map = new Map()
    // 0 Neutral 1 Happy 2 Fear
    let emotion = "neutral"

    //getDayWiseTimeSeries(0, 10, range, [dataEcg, dataEmgz, dataEmg, dataEda], lasts)

    let chart = new Chart(document.getElementById('chart_' + id), { scale: scale, stack: stack });
    for (i = 0; i < channels; i++) {

        // Cosmetics.
        color = colors[i];

        // Create a new time-series object.
        // See the API documentation for the full list of supported options.
        series.push(new Series({ min: range.min, max: range.max, color: color, thickness: 2 }))

        // Attach the new time-series to the chart.
        // You can attach as many time-series as you want.
        chart.addSeries(series[i]);


    }
    let scheduler = new Scheduler();

    // Attach the chart to the scheduler.
    // You can attach as many charts as you want.
    scheduler.addChart(chart);

    // Start the scheduler.
    // You can stop it with scheduler.stop().

    console.log(scheduler)
    downloadData(buffer,emotion,1024*100,0)
    // Generate random data.
    // In real life, you would probably receive data from a websocket.
    //setInterval(append(series), 1000 / rate);
    let si = window.setInterval(function () {
        if ($("#chart_" + id).length == 0) {
            clearInterval(si)
            return;
        }
        switch (player.get(id)) {
            case 0:
                if (toggle == 1) {
                    scheduler.stop();
                    toggle = 0;
                    zero(series)
                }

                break;
            case 1:
                if (toggle == 0) {
                    scheduler.start();
                    toggle = 1;
                }

                append(series,buffer)
                break;
            case 2:
                //Paused
                if (toggle == 1) {
                    scheduler.stop();
                    toggle = 0;
                    zero(series)
                }
                break;
        }
    }, speed)
    let units = window.setInterval(function () {
        if ($("#chart_" + id).length == 0) {
            clearInterval(units)
            return;
        }
        let arr = []
        for (i = 0; i < channels; i++) {
            if(series[i].data.length == 0)
                continue;
            let x = 0;
            
            let arr = series[i].data.slice(series[i].data.length - nElements, series[i].data.length)
            for (j = 0; j < nElements; j++) {
                x += arr[j][1];
            }
            x = Math.round(x * 100 / nElements) / 100;
            if(x > last[i]){
                $(".data"+i+"_"+id).html(x+' <i class="fas fa-caret-up"></i>');
                
            }else{
                $(".data"+i+"_"+id).html(x+' <i class="fas fa-caret-down"></i>');
            }
            last[i] = x
           
        }

    }, 1000);
    let reqdata = window.setInterval(function(){
        if ($("#chart_" + id).length == 0) {
            clearInterval(reqdata)
            return;
        }
        if( buffer.length < XAXISRANGE){
            downloadData(buffer,emotion,XAXISRANGE,0)
        }
       
    },10000)
    map.set("series", series)
    map.set("emotion", emotion)
    map.set("schedule", scheduler)
    return map
}