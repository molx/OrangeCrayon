function toggleFile11() {
  var form = document.getElementById("jsonFile");
  form.fileinput11.disabled = form.useDefaultFile.checked;
  document.getElementById("loaded11").innerHTML = "";
}

function loadFile11() {
  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput11');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0] && !document.getElementById("useDefaultFile").checked) {
    alert("Please select a file before clicking 'Load'");
  } else if (!document.getElementById("useDefaultFile").checked && !input.files[0].name.split('.').pop().match('json')) {
		    alert(input.files[0].name + " is not a valid Tibia 11 json file.");
  } else {
    new Promise(function(resolve, reject) {
      if (document.getElementById("useDefaultFile").checked) {
        var href = window.location.href;
        var path = href.substring(0, href.lastIndexOf("/"));
        var url = path + "/clientoptions_default.json";
        var jsonFile = new XMLHttpRequest();
        jsonFile.open("GET", url, true);
        jsonFile.send();
        jsonFile.onreadystatechange = function() {
          if (jsonFile.readyState == 4 && jsonFile.status == 200) {
            //Checking for status 200 will fail on local because of local file access, but should be used on deploy
            //console.log(jsonFile.status);
            document.getElementById("loaded11").innerHTML = "Loaded!";
            resolve(JSON.parse(jsonFile.responseText));
          } 
        };
      } else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = function receivedText(e) {
          lines = e.target.result;
          var Arr = JSON.parse(lines); 
          resolve(Arr);
        };
        fr.readAsText(file);
        document.getElementById("loaded11").innerHTML = "Loaded!";
      }
    })
    .then(processFileT11)
    .catch(function(err) {
      console.log(err);
    });
  }
  
}

function loadFile10() {
  var input, file, fr;
  
  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput10');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  } else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  } else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  } else if (!input.files[0].name.split(".").pop().match("cfg")) {
		    alert(input.files[0].name + " is not a valid Tibia 10 cfg file.");
  } else {
    new Promise(function(resolve, reject) {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = function receivedText(e) {
        lines = e.target.result;
        arr = lines.match(/^HotkeyPreset.*/mg, ""); //Keep only hotkey lines
        HKsets = [];
        for (var hk in arr) {
          arr[hk] = arr[hk].replace(/HotkeyPreset = \(/g, ""); // Remove the parameter name and opening parenthesis
          arr[hk] = arr[hk].replace(/\)$/g, ""); // Remove closing parenthesis
          arr[hk] = arr[hk].replace(/\\"/g, "'"); //Replace escaped double quotes for single (e.g. used on Exura Sio "Knight")
          arr[hk] = arr[hk].replace(/"/g, ""); //Remove all double quotes used to identify strings on parameter
          arr[hk] = arr[hk].replace(/'/g, "\""); //Turn single quotes back into double
          arr[hk] = arr[hk].split(","); //Split the string to have each value as an array element
          
          HKsets[hk] = arr[hk][0]; //Extract the Hotkeyset for further use
        }
        HKsets = unique(HKsets); //Remove duplicate sets
        document.getElementById("hotkeySets").innerHTML = "";
        for (var hks in HKsets) {
          addHKset(HKsets[hks]);
          //console.log(HKsets[hks]);
        }
        document.getElementById("hotkeySets").appendChild(document.createElement("br"));
        document.getElementById("loaded10").innerHTML = "Loaded!";
        resolve(arr);
      };
      fr.readAsText(file);
    })
    .then(processFileT10)
    .catch(function(err) {
      console.log(err);
    });
  }

  
}

var dataTibia10, dataTibia11, dataTibia11Full;

function processFileT11(data) {
  dataTibia11Full = data;
  dataTibia11 = data.hotkeyOptions.hotkeySets;
}

function processFileT10(data) {
  dataTibia10 = data;
}

var ItemUses = ["Use", "UseOnTarget", "UseOnYourself", "Equip"];
var keyCodes = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
                "Shift+F1", "Shift+F2", "Shift+F3", "Shift+F4", "Shift+F5", "Shift+F6", 
                "Shift+F7", "Shift+F8", "Shift+F9", "Shift+F10", "Shift+F11", "Shift+F12",
                "Ctrl+F1", "Ctrl+F2", "Ctrl+F3", "Ctrl+F4", "Ctrl+F5", "Ctrl+F6", 
                "Ctrl+F7", "Ctrl+F8", "Ctrl+F9", "Ctrl+F10", "Ctrl+F11", "Ctrl+F12"];

function run() {
  
  /*HK parameters on Tibia 10
  HotkeySet , key? , text , itemID , ??? , justuse(0)/target(1)/yourself(2)/equip(3)
  keyCodes: 0-11 = F1 - F12
            12-23 = Shift+F1 - Shift+F12
            24-35 = Ctrl+F1 - Ctrl+F12
  */
  
  /*HK elements on Tibia 11 JSON
  "hotkeySets": {
            "Druid": {
                "chatOn": [
                    {
                        "actionsetting": {
                            "chatText": "adori mas frigo", 
                            "sendAutomatically": true
                        },
                        "keysequence": "Shift+F10"
                    },
                    {
                        "actionsetting": {
                            "useObject": 23373,
                            "useType": "UseOnYourself"
                        },
                        "keysequence": "Num+,"
                    },
                    {
                        "actionsetting": {
                            "useObject": 3161,
                            "useType": "UseOnTarget"
                        },
                        "keysequence": "F7"
                    }
                    {
                        "actionsetting": {
                            "useObject": 9594,
                            "useType": "SelectUseTarget"
                        },
                        "keysequence": "F9"
                    },
                    {
                        "actionsetting": {
                            "useObject": 3031,
                            "useType": "Use"
                        },
                        "keysequence": "Shift+F12"
                    },
                    {
                        "actionsetting": {
                            "useObject": 6529,
                            "useType": "Equip"
                        },
                        "keysequence": "Shift+F1"
                    },
                ]
            }
  }
  
  */
  
  //Must first discover the Hotkeys in use, and their respective IDs
  
  var HKsUsed = [];
  var HKsets = []; 
  var HKsetsParent = document.getElementById("hotkeySets");
  console.log(HKsetsParent.childNodes.length);
  for(i = 0; i < HKsetsParent.childNodes.length; i++) {
      oChild = HKsetsParent.childNodes[i];
      if(oChild.nodeName == "INPUT" && oChild.checked) {
          HKsets[HKsets.length] = oChild.id;
      }
  }
  
  console.log(HKsets);
  //console.log(dataTibia11[keySet].chatOn);
  
  function isFkey(key) {
    //return (key.match(/F\d{1,2}/) !== null) && (key.match(/Alt\+F\d{1,2}/) === null);
    //Filter for keys that are either lineStart + Fkey or Shift/Ctrl + Fkey
    return key.match(/^F\d{1,2}|Ctrl\+F\d{1,2}|Shift\+F\d{1,2}/) !== null;
  }
  
  //var keySet = "Druid";
  
  for (var keySet in HKsets) { //For each keyset selected from Tibia 10
    
    if (typeof dataTibia11[keySet] === "undefined") {
      dataTibia11[keySet] = {};
      dataTibia11[keySet].chatOn = [];
    }
    
    for (var HKUsed in dataTibia11[keySet].chatOn) {
      HKsUsed[HKUsed] = dataTibia11[keySet].chatOn[HKUsed].keysequence;
    }
  
    HKsUsed = HKsUsed.filter(isFkey); //The filtering happens here calling the function above
    
    for (var hk in dataTibia10) { //Will check existent hotkeys on Tibia10 and create them on Tibia11
      var key = dataTibia10[hk][1];
      
      var isUsed = HKsUsed.indexOf(key) !== -1;
      var keyPos;
      if (isUsed) {
        keyPos = HKsUsed.indexOf(key);
      } else { // IF the HK is new
        keyPos = dataTibia11[keySet].chatOn.length; //Get new element position
        dataTibia11[keySet].chatOn[keyPos] = {}; //Add new element to keySet
        dataTibia11[keySet].chatOn[keyPos].keysequence = keyCodes[key]; //Define the keysequence
      }
      
      //Add the actionsetting Object
      dataTibia11[keySet].chatOn[keyPos].actionsetting = {};
      
      //Now start setting the values and properties of each HK
      var isText = dataTibia10[hk][2] !== "";
      if (isText) {
        var sendAuto = dataTibia10[hk][2].match(/\\n$/) !== null;
        if (sendAuto) {
          str = dataTibia10[hk][2];
          dataTibia11[keySet].chatOn[keyPos].actionsetting.chatText = str.substring(0, str.length-2); //Removing the /n that means auto on Tibia10
        } else {
          dataTibia11[keySet].chatOn[keyPos].actionsetting.chatText = dataTibia10[hk][2];
        }
        
        dataTibia11[keySet].chatOn[keyPos].actionsetting.sendAutomatically = sendAuto;
      } else {
        dataTibia11[keySet].chatOn[keyPos].actionsetting.useObject = parseInt(dataTibia10[hk][3], 10);
        dataTibia11[keySet].chatOn[keyPos].actionsetting.useType = ItemUses[dataTibia10[hk][5]];
      }
      
    }
  }
  
  
  
  dataTibia11Full.hotkeyOptions.hotkeySets = dataTibia11;
  download();
  //console.log(dataTibia11.Druid.chatOn[0].actionsetting.chatText);
  //console.log(dataTibia11[keySet].chatOn);
  
  //console.log(dataTibia11);
  //console.log(dataTibia10);
}

function download() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataTibia11Full, null, 4));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "clientoptions.json");
  dlAnchorElem.click();
}

function addHKset(name) {

  var newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.value = name;
  newCheckbox.id = "HKSetCB_"+name;
  newCheckbox.checked = true;
  document.getElementById("hotkeySets").appendChild(newCheckbox);

  var label = document.createElement('label');
  label.htmlFor = name;
  label.appendChild(document.createTextNode(name));
  label.className = "HKSetLabel";

  document.getElementById("hotkeySets").appendChild(label);
  //document.getElementById("hotkeySets").appendChild(document.createElement("br"));
}

function unique(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}

function toggleDisplay(id) {
  var elem = document.getElementById(id);
  elem.style.display = getComputedStyle(elem).display === 'none' ? 'inline' : 'none';
}

