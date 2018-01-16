$(document).ready(function() {
  function getVal(elementId) {
    return $(elementId).html();
  }

  function changeVal(elementId, value) {
    $(elementId).html(value);
  }

  function secToHours(seconds) {
    var array = [];
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    array = [hours, minutes, seconds];
    return array;
  }

  var workTime = 0;
  var breakTime = 0;
  
  $(".subtract").each(function(index) {
    $(this).on("click", function() {
      var parentId = $(this).parent().attr("id");
      var tensId = "#" + parentId + "Tens";
      
      var unitsId = "#" + parentId + "Unit";
      let tens = getVal(tensId);
      let units = getVal(unitsId);
      
      if (units != 0 ){
        units--;
      }
      
      else {
        if (tens != 0){
          tens--;
          units = 9;
        }
      }
      
      changeVal(tensId, tens);
      changeVal(unitsId, units);
    });
  });
   
  $(".add").each(function(index) {
    $(this).click(function() {
      var parentId = $(this).parent().attr("id");
      var tensId = "#" + parentId + "Tens";
      var unitsId = "#" + parentId + "Unit";
      let tens = getVal(tensId);
      let units = getVal(unitsId);
      if (units == 9) {
        if (tens != 9) {
          tens++;
          units = 0;
        }
      } 
      
      else if (units != 9) {
        units++;
      }
      changeVal(tensId, tens);
      changeVal(unitsId, units);
    });
  });

  function minsToSecs(minutes) {
    minutes = parseInt(minutes);
    let seconds = minutes * 60;
    return seconds;
  }

  function timeDisplay(countTime) {
    var countArray = secToHours(countTime);
    for (let i = 0; i < 3; i++) {
      countArray[i] = countArray[i].toString();
    }
    if (countArray[0] != 0) {
      $("#hours").removeClass("hidden");
      changeVal("#hourUnits", countArray[0]);
    } else {
      $("#hours").addClass("hidden");
    }

    let minTens = countArray[1][0];
    let minUnits = countArray[1][1];
    let secTens = countArray[2][0];
    let secUnits = countArray[2][1];

    if (minUnits != undefined) {
      changeVal("#minTens", minTens);
      changeVal("#minUnits", minUnits);
    } else {
      changeVal("#minTens", 0);
      changeVal("#minUnits", minTens);
    }

    if (secUnits != undefined) {
      changeVal("#secTens", secTens);
      changeVal("#secUnits", secUnits);
    } 
    else {
      changeVal("#secTens", 0);
      changeVal("#secUnits", secTens);
    }
  }
  
  function getTime (session){
    var countTime = getVal("#" + session + "Tens") + getVal("#" + session + "Unit");
    let time = minsToSecs(countTime);
    return time;
  }
  
  var time;
  var worker = getTime("work");
  var breaker = getTime ("break");
  
  $("#start").click(function() {
    time = getTime("work");
    
    $("#start").addClass("hidden");
    $("#pause").removeClass("hidden");
    $("#status").innerHTML = "WORK TIME";
    $("#status").removeClass("hidden");
    var timer = setInterval(function() {
      if (time == 0){
        $("#status").innerHTML = "BREAK TIME";
        if (breaker != 0){
          timeDisplay(breaker);
          breaker--;
        }
      }
      else {
        timeDisplay(time);
        time--;
      }
        
    }, 1000);
    
    let pausedTime = [];
    
    $("#pause").on("click", function() {
      pausedTime.push(time);
      clearInterval(timer);
      $("#start").removeClass("hidden");
      $("#pause").addClass("hidden");
      
      $("#start").on("click", function(){
        time = pausedTime[pausedTime.length -1];
        timer();
        pausedTime.pop();
      })
    });
    
     $("#reset").on("click", function(){
      clearInterval(timer);
      $("#start").removeClass("hidden");
      $("#pause").addClass("hidden");
      timeDisplay("0");
       
       $("#start").on("click", function(){
         pausedTime.pop();
         time = getTime("work");
         timer();
       });
     
    });
  });
  
   
});