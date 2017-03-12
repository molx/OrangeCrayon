//From level to points

var melee_vocs = {
  "knight" : 1.1,
  "paladin" : 1.2,
  "druid": 1.8,
  "sorcerer" : 2,
  "none" : 2
};

var magic_vocs = {
  "knight" : 3,
  "paladin" : 1.4,
  "druid": 1.1,
  "sorcerer" : 1.1,
  "none": 0
};

var dist_vocs = {
  "knight" : 1.2,
  "paladin" : 1,
  "druid": 1.8,
  "sorcerer" : 1.8,
  "none" : 1.8
};

function level_to_pts(level, voc, type) {
  
  var minlevel = 10;
  var A = 1;
  var y = 1;
  if (type == "magic") {
    A = 1600;
    y = magic_vocs[voc];
    minlevel = 0;
  } else if (type == "axe" || type == "sword" || type == "club" || type == "fist" || type == "shield") {
    A = 50;
    y = melee_vocs[voc];
  } else if (type == "dist") {
    A = 50;
    y = dist_vocs[voc];
  } else if (type == "fish") {
    A = 20;
    y = 1.1;
  }
  
  var points = A*((1 - Math.pow(y, level - minlevel))/(1 - y));
  return Math.round(points);
}

function current_pts(level, voc, pct_left, type) {
  
  var curr_pts = level_to_pts(level, voc, type);
  var next_pts = level_to_pts(level + 1, voc, type);
  
  var dif = next_pts - curr_pts;
  var advanced = ((100-pct_left)/100) * dif;
  
  return Math.round((curr_pts + advanced));
}

function loyalty_bonus(points) {
  var bonus = Math.floor(points/360) * 0.05 + 1;
  if (bonus > 1.5) {
    bonus = 1.5;
  } else if (bonus === 0) {
    bonus = 1;
  }
  return bonus;
}

function skill_wo_loyalty(points, loyalty) {
  var bonus = loyalty_bonus(loyalty) ;
  
  var pts = points / bonus;
  
  return Math.floor(pts);
}

function pts_to_level(pts, voc, type) {
  
  var minlevel = 10;
  var A = 1;
  var y = 1;
  if (type == "magic") {
    A = 1600;
    y = magic_vocs[voc];
    minlevel = 0;
  } else if (type == "axe" || type == "sword" || type == "club" || type == "fist" || type == "shield") {
    A = 50;
    y = melee_vocs[voc];
  } else if (type == "dist") {
    A = 50;
    y = dist_vocs[voc];
  } else if (type == "fish") {
    A = 20;
    y = 1.1;
  }
  
  var skill = Math.round(Math.log(- ( (pts - y*pts - A) / A )) / Math.log(y) + minlevel);
  
  return skill;
}

var types = ["magic", "fist", "club", "sword", "axe", "dist", "shield", "fish"];


function calc_skill(form) {
  
  var voc = document.getElementById("vocation").value;
  var loyalty = parseInt(document.getElementById("loyalty_pts").value);
  var if_bonus = parseInt(document.getElementById("if_bonus").value);
  
  for (let type of types) {
    
    var level = parseInt(document.getElementById(type + "_level").value);
    if (level > 150) level = 150;
    
    var pct_left = parseInt(document.getElementById(type + "_left").value);
    if (pct_left > 100) {
      pct_left = 100;
    } else if (pct_left < 1) {
      pct_left = 1;
    }
    
    var curr_pts = current_pts(level, voc, pct_left, type);
    var real_pts = skill_wo_loyalty(curr_pts, loyalty);
    var real_level = pts_to_level(real_pts, voc, type);
    var real_curr_base = level_to_pts(real_level, voc, type);
    var real_next_total = level_to_pts(real_level + 1, voc, type) - level_to_pts(real_level, voc, type);
    var real_pct = Math.round(100 * (1 - (real_pts - real_curr_base)/real_next_total));
    var bonus = loyalty_bonus(loyalty);
    
    var if_pts = real_pts * (if_bonus/100 + 1);
    var if_level = pts_to_level(if_pts, voc, type);
    
    document.getElementById("loyalty_bonus").innerHTML = "Real skills with Loyalty bonus " + Math.floor(((bonus - 1) * 100)) + "%:";
    
    document.getElementById(type + "_level_real").innerHTML = real_level;
    //document.getElementById("real_skill_pts").innerHTML = real_pts;
    document.getElementById(type + "_left_real").innerHTML = real_pct;
    //document.getElementById("skill_with_bns").innerHTML = curr_pts;
    document.getElementById(type + "_if").innerHTML = if_level;
    
  }
  document.getElementById("h2_if").innerHTML = if_bonus +"% bonus";
  
}