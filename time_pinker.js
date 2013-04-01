function Time_pinker(id){
  this.container = document.getElementById(id);
  this.TP_container = null;
  this.TP_left_container = null;
  this.TP_right_container = null;
  this.TP_hours = null;
  this.TP_minutes = null;
  this.TP_seconds = null;  
  this.TP_hours_pinker = null;
  this.TP_minutes_pinker = null;
  this.TP_seconds_pinker = null;
  this.TP_add = null;
  this.TP_sub = null;
  this.TP_time = null;
  this.now = new Date();
}
Time_pinker.prototype = {
  create_TP_container:function(){
    this.TP_container = document.createElement("div");
    this.TP_container.className = "TP_container";
     this.TP_left_container = document.createElement("div");
    this.TP_right_container = document.createElement("div");
    this.TP_left_container.className = "TP_left_container";
    this.TP_right_container.className = "TP_right_container";
    this.TP_container.appendChild(this.TP_left_container);
    this.TP_container.appendChild(this.TP_right_container);
    
    for(var i = 0;i < 5;i++){
      var input = document.createElement("input");
      input.type = "text";
      if(i%2){
        input.className = "TP_colon" + " " + "TP_normal";
        input.value = ":";
      }else{
        input.className = "TP_value" + " " + "TP_normal";
        switch(i){
          case 0: this.TP_hours = input;input.index = "1";break;
          case 2: this.TP_minutes = input;input.index = "2";break;
          case 4: this.TP_seconds = input;input.index = "3";break;
        }
      }        
      this.TP_left_container.appendChild(input);
    }
    for(var i = 0;i < 2; i++){
      var div = document.createElement("div");
      if(i === 0){
        div.className = "TP_add"; 
		this.TP_add = div;
	  }else{
        div.className = "TP_sub";
		this.TP_sub = div;
	  }
      this.TP_right_container.appendChild(div);
    }
    this.container.appendChild(this.TP_container);
  },
  createTimePinker:function(className,row,column){
    var container = document.createElement("div");
    switch(className){
      case "TP_hours_pinker" : this.TP_hours_pinker = container; break;
      case "TP_minutes_pinker" : this.TP_minutes_pinker = container; break;
      case "TP_seconds_pinker" : this.TP_seconds_pinker = container; break;
    }
    container.className = className + " " + "TP_pinker";
    var table = document.createElement("table");
    var tBody = document.createElement("tbody");
    table.appendChild(tBody);
    var k = 0;
    for(var i = 0;i < row;i++){
      tBody.insertRow(i);
      for(var j = 0;j < column;j++){
        tBody.rows[i].insertCell(j);
        tBody.rows[i].cells[j].source = k;
        tBody.rows[i].cells[j].onmouseover = function(){
          this.style.background = "#BDEBEE";        
        };
        tBody.rows[i].cells[j].onmouseout = function(){
          this.style.background = "#fff";
        };
        if(className == "TP_minutes_pinker" || className == "TP_seconds_pinker"){
		  tBody.rows[i].cells[j].appendChild(document.createTextNode(k + ""));
		  k += 5;
		}else{
		  tBody.rows[i].cells[j].appendChild(document.createTextNode(k++ + ""));
        }
      }
    }
    container.appendChild(table);
    this.TP_container.appendChild(container);
  },
  tranfer_double:function(n){
    return (n < 10 ? "0" + n : n);
  },
  showCurrentTime:function(){
    if(this.TP_time){
	  var hours = Math.floor(this.TP_time / 3600);
	  var minutes = Math.floor((this.TP_time % 3600)/60);
	  var seconds = this.TP_time % 60;
	  this.TP_hours.value = this.tranfer_double(hours);
      this.TP_minutes.value = this.tranfer_double(minutes);
      this.TP_seconds.value = this.tranfer_double(seconds);
	}else{
	  var now = new Date();
      this.TP_hours.value = this.tranfer_double(now.getHours());
      this.TP_minutes.value = this.tranfer_double(now.getMinutes());
      this.TP_seconds.value = this.tranfer_double(now.getSeconds());    
	}
  },
  getEvent:function(ev){
    return ev || window.event;
  },
  getTarget:function(ev){
    return ev.target || ev.srcElement;
  },
  stopPropagation:function (event){
    if(event.stopPropagation){
      event.stopPropagation();
    }else{
      event.cancelBubble=true;
    }
  },
  pinkerDisplay:function(nodeA,nodeB,nodeC){
    var _this = this;
	nodeA.style.display = "block";
    nodeB.style.display = "none";
    nodeC.style.display = "none";
  },
  add:function(w_time_add,num){
    var value = w_time_add.value;
    if(value < num ){
      value++;
    }else if(value == num){
	  value = 0;
	}
    
    w_time_add.value = this.tranfer_double(value);
  },
  sub:function(w_time_sub,num){
    var value = w_time_sub.value;
    if(value > 0 ){
      value--;
    }else if(value == 0){
	  value = num;
	}
    w_time_sub.value = this.tranfer_double(value);  
  },
  showTimePicker:function(){
    var _this = this;
    var table = _this.TP_left_container;
    var hours = _this.TP_hours_pinker;
    var minutes = _this.TP_minutes_pinker;
    var seconds = _this.TP_seconds_pinker;    
    table.onclick = function(event){
    
      var e = _this.getEvent(event);
      var target = _this.getTarget(e); 
      _this.stopPropagation(e);
	  switch(target.index){
        case "1" : _this.pinkerDisplay(hours,minutes,seconds);
                   _this.TP_add.onclick =function(){_this.add(_this.TP_hours,23)};
                   _this.TP_sub.onclick =function(){_this.sub(_this.TP_hours,23)}; 
                   break;
        case "2" : _this.pinkerDisplay(minutes,hours,seconds);
                  _this.TP_add.onclick =function(){_this.add(_this.TP_minutes,59)};
                  _this.TP_sub.onclick =function(){_this.sub(_this.TP_minutes,59)};  
                  break;
        case "3" : _this.pinkerDisplay(seconds,hours,minutes);
                   _this.TP_add.onclick =function(){_this.add(_this.TP_seconds,59)}; 
                   _this.TP_sub.onclick =function(){_this.sub(_this.TP_seconds,59)};
                   break;
      } 
    }; 
	document.onclick = function(){
	  _this.TP_hours_pinker.style.display = 'none';
	  _this.TP_minutes_pinker.style.display = 'none';
	  _this.TP_seconds_pinker.style.display = 'none';
	};
  },
  chooseTimeValue:function(hours_pinker,w_hours){
    var _this = this;
    hours_pinker.onclick = function(event){
      var e = _this.getEvent(event);
      var target = _this.getTarget(e);
      w_hours.value = _this.tranfer_double(target.source);   
      this.style.display = "none";
    };
  },
  decideTimeValue:function(){
    this.chooseTimeValue(this.TP_hours_pinker,this.TP_hours);
    this.chooseTimeValue(this.TP_minutes_pinker,this.TP_minutes);
    this.chooseTimeValue(this.TP_seconds_pinker,this.TP_seconds);
  },
  load:function(){
    this.create_TP_container();
    this.createTimePinker("TP_hours_pinker",4,6);
    this.createTimePinker("TP_minutes_pinker",2,6);
    this.createTimePinker("TP_seconds_pinker",2,6);
    this.showCurrentTime();
    this.showTimePicker();
    this.decideTimeValue();    
  }
};

window.onload = function(){
  var demo = new Time_pinker("demo");
  demo.load();
};
