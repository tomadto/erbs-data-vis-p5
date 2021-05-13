//p5.experience,
//let chrStats;
//let chrStatsDuos;
//let chrStatsSquads;

//let wepStats;
//let wepStatsDuos;
//let wepStatsSquads;


//apparently the above is not necessary
let oneHit = false;
let scaling = new SoftNum(2000);
let spacingX = new SoftNum(200);
let spacingY = new SoftNum(400);
let adjScreenWidth =  new SoftNum(spacingX.get()*5, 0.2, 1);
let fade = new SoftNum(100);
let hoverID = -1;
let wepHoverID = -1;
let scene = -1;
let wepCount = 0;
const wepX = 500;
const wepY = 100;
let test ="okok";
let scrollOffset = 0;
let scrollOffsetC = 0;
let scrollOffsetX = 0;
let mins = []; //[pickrate, winrate]
let maxs = []; //[pickrate, winrate]
let minsC = []; //[pickrate, winrate]
let maxsC = []; //[pickrate, winrate]
let mode = 0;
let currentMode;
let charactersToCompare = [];
let compSpacing = 150;
let useArc = false; //good thing i'm not using react :D

//thumbnails
let thumbJackie;
let thumbAya;
let thumbFiora;
let thumbMagnus;
let thumbZahir;
let thumbNadine;
let thumbHyunwoo;
let thumbHart;
let thumbIsol;
let thumbLiDailin;
let thumbYuki;
let thumbHyejin;
let thumbXiukai;
let thumbChiara;
let thumbSissela;
let thumbSilvia;
let thumbAdriana;
let thumbShoichi;
let thumbEmma;
let thumbLenox;
let thumbRozzi;
let thumbLuke;
let thumbCathy;
let thumbAdela;
let thumbBernice;
let thumbBarbara;
let thumbAlex;
let thumbSua;
let chrStatsSort = [];
let modeSel;
let dateSel;
let labelToggle;
let apr19Chr = [];
let apr19Wep = [];

function preload() {
  apr19Chr[0] = loadJSON('assets/charactersApr26.json');
  apr19Chr[1] = loadJSON('assets/charactersApr26duos.json');
  apr19Chr[2] = loadJSON('assets/charactersApr26sqd.json');
  apr19Wep[0] = loadJSON('assets/wepApr26.json');
  apr19Wep[1] = loadJSON('assets/wepApr26duos.json');
  apr19Wep[2] = loadJSON('assets/wepApr26squads.json');
  //chrStatsSort = loadJSON('assets/charactersApr26.json');


  //load thumbs
  thumbJackie = loadImage('assets/thumbs/001.png');
  thumbAya = loadImage('assets/thumbs/002.png');
  thumbFiora = loadImage('assets/thumbs/003.png');
  thumbMagnus = loadImage('assets/thumbs/004.png');
  thumbZahir = loadImage('assets/thumbs/005.png');
  thumbNadine = loadImage('assets/thumbs/006.png');
  thumbHyunwoo = loadImage('assets/thumbs/007.png');
  thumbHart = loadImage('assets/thumbs/008.png');
  thumbIsol = loadImage('assets/thumbs/009.png');
  thumbLiDailin = loadImage('assets/thumbs/010.png');
  thumbYuki = loadImage('assets/thumbs/011.png');
  thumbHyejin = loadImage('assets/thumbs/012.png');
  thumbXiukai = loadImage('assets/thumbs/013.png');
  thumbChiara = loadImage('assets/thumbs/014.png');
  thumbSissela = loadImage('assets/thumbs/015.png');
  thumbSilvia = loadImage('assets/thumbs/016.png');
  thumbAdriana = loadImage('assets/thumbs/017.png');
  thumbShoichi = loadImage('assets/thumbs/018.png');
  thumbEmma = loadImage('assets/thumbs/019.png');
  thumbLenox = loadImage('assets/thumbs/020.png');
  thumbRozzi = loadImage('assets/thumbs/021.png');
  thumbLuke = loadImage('assets/thumbs/022.png');
  thumbCathy = loadImage('assets/thumbs/023.png');
  thumbAdela = loadImage('assets/thumbs/024.png');
  thumbBernice = loadImage('assets/thumbs/025.png');
  thumbBarbara = loadImage('assets/thumbs/026.png');
  thumbAlex = loadImage('assets/thumbs/027.png');
  thumbSua = loadImage('assets/thumbs/028.png');
}

let maxXPicker;
let expButText = "<< Collapse";

let lightYellow;
let orange;
let darkGray;

let bgColor;
let primaryText;
let secondaryText;
let highlight;

let showLabels = true;
let showLegends = true;
let showLegendsText = "Show Options";

function setup() {
  //frameRate(5);
  //apr19Chr = [chrStats, chrStatsDuos, chrStatsSquads];
  //apr19Wep = [wepStats, chrStatsDuos, chrStatsSquads];
  modeSel=createSelect();
  modeSel.position(100, 100);
  modeSel.option('Solos');
  modeSel.option('Duos');
  modeSel.option('Squads');
  modeSel.changed(modeChangeHandler);
  
  labelToggle = createCheckbox('',true);
  labelToggle.changed(labelToggleHandler);
  
  arcToggle = createCheckbox('',false);
  arcToggle.changed(arcHandler);
  //dateSel = createSelect();
  //dateSel.option('Apr 19');
  //modeSel.changed(dateChangeHandler);
  //chrStatsSort=Object.values(chrStats);
  //chrStats=Object.values(chrStats);
  for (let i = 0; i<apr19Chr.length; i++) {
    let inp = [Object.values(apr19Chr[i]), Object.values(apr19Wep[i])];
    let out = setupChrWepStats(inp[0], inp[1]);
    apr19Chr[i] = out[0];
    apr19Wep[i] = out[1];
  }
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  cnv.mouseWheel(scrollHandler);
  angleMode(DEGREES);
  lightYellow = color("rgb(247,212,147)");
  orange = color("rgb(233,156,52)");
  darkGray = color(25);
  bgColor = 245;//darkGrey
  primaryText = 0;
  secondaryText = 10;
  highlight = 2;
  //button = createButton('click me');
  //button.position(100, 100);
}





function draw() {
  if (mode !== currentMode) {
    [mins, maxs] = findExtremesChr(apr19Chr[mode], false);
    currentMode = mode;
    //charactersToCompare = [];
  }
  background(bgColor);
  scaling.update();
  spacingX.update();
  spacingY.update();
  updateChrStatsLoc();

  adjScreenWidth.update();
  oneHit = false;
  switch(scene) {
  default:
    fill(0);
    noStroke();
    textSize(15);
    stroke(0);
    strokeWeight(1);
    noFill();
    apr19Chr[mode].map((chr, i) => {
      noFill();
      rectMode(CENTER);
      stroke(0);
      fill(0);
      noStroke();
      push();
      if (chr.img) {
        image(chr.img, chr.x-80/2, chr.y-80/2+scrollOffset);
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(chr.x, chr.y+scrollOffset, 81, 81);
      } else if (chr.Character === "Averages") {
        rect(chr.x, chr.y+scrollOffset, 80, 80);
      }

      pop();
      rectMode(CORNER);
      push();
      fill(0);
      textSize(14);
      textAlign(LEFT, TOP);
      text(chr.Character, chr.x+52, chr.y+scrollOffset-40);

      textSize(12);
      text(chr.Weapon === "Two-Handed Sword"?"2H Sword":chr.Weapon, chr.x+51, chr.y+scrollOffset-23);
      pop();
      //
      push();
      rectMode(CORNER);
      fill(bgColor);
      stroke(0);
      createDial(chr.x+70, chr.y+scrollOffset+10, apr19Chr[mode][mins[0]]["Pick Rate"], apr19Chr[mode][maxs[0]]["Pick Rate"], chr["Pick Rate"], 40, "P"); //pick
      createDial(chr.x+112, chr.y+scrollOffset+10, apr19Chr[mode][mins[1]]["Win Rate"], apr19Chr[mode][maxs[1]]["Win Rate"], chr["Win Rate"], 40, "W"); //win
      pop();
      apr19Chr[mode][chr._ind].hit = collidePointRect(mouseX, mouseY, apr19Chr[mode][i].x-80/2, apr19Chr[mode][i].y-80/2+scrollOffset, 80, 80);
      if (apr19Chr[mode][chr._ind].hit) {
        hoverID = chr._ind;
        oneHit = true;
      }
    }

    );
    let compDet = [];
    for (const e of charactersToCompare) {
      compDet.push(apr19Chr[mode][e]);
    }
    [minsC, maxsC] = findExtremesChr(compDet, true);
    push();
    fill(bgColor);
    rect(adjScreenWidth.value+50, 200-50+scrollOffsetC, width, height);

    pop();
    if (charactersToCompare.length === 0) {
      push();
      fill(0);
      noStroke();
      textSize(24);
      textAlign(CENTER, CENTER);
      text("Add characters to the comparison area by clicking on their picture!", adjScreenWidth.value+150, 300-50+scrollOffsetC, 500, windowHeight-400);
      pop();
      scrollOffsetC = 0;
    }
    charactersToCompare.map((id, i) => {
      push();
      fill(0);
      noStroke();
      let loc = [adjScreenWidth.value+100, 200-40+scrollOffsetC];
      //image(chrStats[id].img, loc[0]+compSpacing*i, loc[1]-scrollOffsetC);
      textAlign(LEFT, TOP);
      textSize(18);
      text(apr19Chr[mode][id].Character, loc[0]+compSpacing*i, loc[1]+90);
      textSize(12);
      text(apr19Chr[mode][id].Weapon === "Two-Handed Sword"?"2H Sword":apr19Chr[mode][id].Weapon, loc[0]+compSpacing*i, loc[1]+110);

      pop();
      noFill();
      stroke(0);
      strokeWeight(2);
      let reference = createBarColumn(loc[0]+compSpacing*i+32, loc[1]+205, 0, apr19Chr[mode][maxsC[0]]["Pick Rate"], apr19Chr[mode][id]["Pick Rate"], 600, 16, false);
      createDial(loc[0]+compSpacing*i+20, loc[1]+150, apr19Chr[mode][mins[0]]["Pick Rate"], apr19Chr[mode][maxs[0]]["Pick Rate"], apr19Chr[mode][id]["Pick Rate"], 40, "P"); //pick
      createDial(loc[0]+compSpacing*i+61, loc[1]+150, apr19Chr[mode][mins[1]]["Win Rate"], apr19Chr[mode][maxs[1]]["Win Rate"], apr19Chr[mode][id]["Win Rate"], 40, "W"); //win
      fill(0);
      noStroke();
      let referenceWR = createBarColumn(loc[0]+compSpacing*i+32, loc[1]+205, 0, apr19Chr[mode][id]["Pick Rate"], apr19Chr[mode][id]["Win Rate"]*apr19Chr[mode][id]["Pick Rate"], reference[3], 16, false);
      push();
      stroke(0);
      strokeWeight(2);
      noFill();
      reference = createBarColumn(loc[0]+compSpacing*i+32, loc[1]+205, 0, apr19Chr[mode][maxsC[0]]["Pick Rate"], apr19Chr[mode][id]["Pick Rate"], 600, 16, false);
      pop();
      if (showLabels) {
        push();
        noFill();
        stroke(0);
        strokeWeight(2);
        line(loc[0]+compSpacing*i + 20, loc[1]+205, loc[0]+compSpacing*i + 28, loc[1]+205);
        line(loc[0]+compSpacing*i + 20+32, loc[1]+205+referenceWR[3], 32+loc[0]+compSpacing*i + 28, loc[1]+205+referenceWR[3]);
        line(loc[0]+compSpacing*i + 20+32, loc[1]+205+reference[3], 32+loc[0]+compSpacing*i + 28, loc[1]+205+reference[3]);
        pop();
        push();
        fill(0);
        noStroke();
        textSize(12);
        text("0", loc[0]+compSpacing*i, loc[1]+205);
        text(round(referenceWR[4]*10000)/10, loc[0]+compSpacing*i+66, loc[1]+205+referenceWR[3]);
        text(round(reference[4]*10000)/10, loc[0]+compSpacing*i+66, loc[1]+205+reference[3]);
        pop();
      }
      let listingCt = 0;
      let weaponsToCompare = [];
      let wepCompDet = [];
      let minsCW, maxsCW;
      apr19Wep[mode].map((wep, j) => {
        if (wep.Character === apr19Chr[mode][id].Character && (wep["Weapon Type"] === apr19Chr[mode][id].Weapon || apr19Chr[mode][id].Character === "Alex")) {
          weaponsToCompare.push(wep._ind);
        }
      }
      );

      for (const e of weaponsToCompare) {
        wepCompDet.push(apr19Wep[mode][e]);
      }
      //print(weaponsToCompare);
      [minsCW, maxsCW] = findExtremesChr(wepCompDet, true);
      wepLoc = [loc[0]+compSpacing*i, loc[1]+815];
      push();
      stroke(0);
      noFill();
      line(wepLoc[0], wepLoc[1]-15, wepLoc[0]+80, wepLoc[1]-15);
      pop();
      
      text("Weapon Stats for ", wepLoc[0], wepLoc[1]);
      
      text((apr19Chr[mode][id].Weapon === "Two-Handed Sword"?"2H Sword":apr19Chr[mode][id].Weapon), wepLoc[0], wepLoc[1]+15); 
      let sortedWTC = weaponsToCompare;
      sortedWTC.sort((first, second)=> {
        if (apr19Wep[mode][first]["Pick Rate"]>apr19Wep[mode][second]["Pick Rate"]) {
          return -1;
        } else {
          return 1;
        }
      }
      );
      //console.log(apr19Wep[mode]);
      sortedWTC.map((wID, k)=> {
        push();
        noFill();
        stroke(0);
        strokeWeight(2);
        let referenceW = createBarColumn(wepLoc[0], wepLoc[1]+30*k+50, 0, apr19Wep[mode][maxsCW[0]]["Pick Rate"], apr19Wep[mode][wID]["Pick Rate"], 150, 8, true);
        pop();
        push();
        fill(0);
        noStroke();
        rectMode(CORNER);
        createBarColumn(wepLoc[0], wepLoc[1]+30*k+50, 0, apr19Wep[mode][wID]["Pick Rate"], apr19Wep[mode][wID]["Win Rate"]*apr19Wep[mode][wID]["Pick Rate"], referenceW[3], 8, true);
        pop();

        text((apr19Wep[mode][wID].Weapon.length>19)?apr19Wep[mode][wID].Weapon.slice(0, 17)+"...":apr19Wep[mode][wID].Weapon, wepLoc[0], wepLoc[1]+30*k+40);
      }
      );
      image(apr19Chr[mode][id].img, loc[0]+compSpacing*i, loc[1]-scrollOffsetC);
      stroke(0);
      strokeWeight(2);
      noFill();
      rect(loc[0]+compSpacing*i, loc[1]-scrollOffsetC, 81, 81);
    }
    );
  }
  //text(chrStats[1].Character, 100,100);
  //console.log();



  //header
  stroke(0);
  strokeWeight(1);
  noFill();

  //rect(100,50, 50, 50);
  noStroke();
  rectMode(CORNER);
  fill(bgColor);
  rect(0, 0, windowWidth, 159.5);
  fill(0);
  rectMode(CENTER);
  //rect(100,100, 25, 25);
  //text("Pick Rate", 130, 100);
  //text("No. Wins out of Picks", 130, 50);
  textSize(30);
  text("Eternal Return: Black Survival Character Performance stats", 50, 35);
  fill(50);
  textSize(15);
  text("Click on the character faces to add to the comparison. Match stats from the week of Apr 19.", 50, 70);
  text("ER:BS is a free-to-play hybrid MOBA, Battle Royale, and Survival game.", 50, 90);
  text("18 players compete to be the last survivor standing during a mysterious experiment on Lumia Island!", 50, 110);

  push();
  textSize(12);
  rectMode(CORNER);
  fill(bgColor);
  stroke(0);
  if (showLegends) {
    modeSel.style('display', 'none');
    labelToggle.style('display', 'none');
    arcToggle.style('display', 'none');
    //createBarColumn(chr.x, chr.y, 0, 100, 50, 100, 16, true);
    let exampleP = createDial(140+800, 50, apr19Chr[mode][mins[0]]["Pick Rate"], apr19Chr[mode][maxs[0]]["Pick Rate"], apr19Chr[mode][0]["Pick Rate"], 80, "Pick%"); //pick
    let exampleW = createDial(292+800, 50, apr19Chr[mode][mins[1]]["Win Rate"], apr19Chr[mode][maxs[1]]["Win Rate"], apr19Chr[mode][0]["Win Rate"], 80, "Win%"); //win
    strokeWeight(2);
    let barL = createBarColumn(400+800, 50, 0, 100, 100, 200, 16, true);
    fill(50);
    noStroke();
    let barLW = createBarColumn(400+800, 50, 0, 100, 20, 200, 16, true);
    text("Picks that won per 1000 total picks", 400+800+barLW[3]-80, 26);
    text("No. of character or weapon picks per 1000 total picks", 400+800+barL[3]+8, 26, 100);
    push();
    stroke(0);
    line(400+800+barL[3], 34, 400+800+barL[3], 48);
    triangle(400+800+barL[3]-3, 44, 400+800+barL[3]+3, 44, 400+800+barL[3], 50);
    line(400+800+barLW[3], 34, 400+800+barLW[3], 48);
    triangle(400+800+barLW[3]-3, 44, 400+800+barLW[3]+3, 44, 400+800+barLW[3], 50);
    pop();
    textAlign(CENTER, CENTER);
    fill(50);
    text("this line shows    the min. value in set", exampleP[0]-52, exampleP[1], 50);
    text("this line shows    the max. value in set", exampleW[2]+6, exampleW[3], 50);
    text("the arrow shows the relative position of the current value", 800+216-28, exampleW[5], 58);
  } else {
    push();
    textAlign(LEFT, TOP);
    fill(0);
    noStroke();
    textSize(18);
    text("Game Mode: ", 70+800, 30);
    text("Show Labels: ", 70+800, 60);
    text("Arcs instead of Arrows: ", 70+800, 90);
    modeSel.style('display', 'initial');
    modeSel.position(270+800, 30);
    labelToggle.style('display', 'initial');
    labelToggle.position(270+800, 60);
    arcToggle.style('display', 'initial');
    arcToggle.position(270+800, 90);
    pop();
  };
  pop();
  textAlign(CENTER, CENTER);
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(adjScreenWidth.value+300, 140, 120, 20);
  push();
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text(showLegendsText, adjScreenWidth.value+300, 140);
  pop();
  let legendHit = collidePointRect(mouseX, mouseY, adjScreenWidth.value+300-120/2, 140-20/2, 120, 20);
  if (legendHit) {
    hoverID = 10003;
    oneHit = true;
  }
  rect(maxXPicker, 140, 120, 20);
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text(expButText, maxXPicker-40, 140);
  //button.position(maxXPicker, 140);
  let sideBarHit = collidePointRect(mouseX, mouseY, maxXPicker-120/2, 140-20/2, 120, 20);
  if (sideBarHit) {
    hoverID = 10001;
    oneHit = true;
  }

  noFill();
  stroke(0);
  rect(adjScreenWidth.value+100, 140, 120, 20);
  fill(0);
  noStroke();
  textSize(14);
  push();
  textAlign(CENTER, CENTER);
  text("Reset", adjScreenWidth.value+100, 140);
  pop();
  let resetHit = collidePointRect(mouseX, mouseY, adjScreenWidth.value+100-120/2, 140-20/2, 120, 20);
  if (resetHit) {
    hoverID = 10002;
    oneHit = true;
  }

  
  //end header
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (oneHit) {
    if (hoverID===10001) {
      if (adjScreenWidth.value === spacingX.value*5) {
        adjScreenWidth.setTarget(spacingX.value*1);
        expButText = "Expand >>";
        scrollOffset = 0;
      } else {
        adjScreenWidth.setTarget(spacingX.value*5);
        expButText = "<< Collapse";
        scrollOffset = 0;
      }
      updateChrStatsLoc();
    } else if (hoverID===0) {
    } else if (hoverID===10002) {
      charactersToCompare=[];
      scrollOffsetC = 0;
    } else if (hoverID===10003) {
      showLegends = !showLegends;
        showLegendsText = (showLegends?"Show Options":"Show Legends");
    } else if (!charactersToCompare.find(e => e === hoverID)) {
      charactersToCompare.push(hoverID);
    }
  } else {
    hoverID = -1;
  }
  //print(charactersToCompare);
  //console.log(oneHit);
  //if (scene !== -1){
  //  scene = -1;
  //} else {
  //  oneHit ? (scene = 1) : (hoverID = -1);
  //}
}

function scrollHandler(event) {
  if (mouseX<adjScreenWidth.value) {
    if (event.deltaY < 0) {
      scrollOffset = scrollOffset + 30;
    } else {
      scrollOffset = scrollOffset - 30;
    }
    if (scrollOffset > 0) {
      scrollOffset = 0;
    }
  } else if (charactersToCompare.length !== 0) {
    if (event.deltaY < 0) {
      scrollOffsetC = scrollOffsetC + 30;
    } else {
      scrollOffsetC = scrollOffsetC - 30;
    }
    if (scrollOffsetC > 0) {
      scrollOffsetC = 0;
    }
  }
}

const updateChrStatsLoc = ()=> {
  apr19Chr[mode].map((chr, i) => {
    apr19Chr[mode][i]._ind = i;
    apr19Chr[mode][i].x = 100+floor((i*spacingX.value+8)%adjScreenWidth.value/200)*200;
    apr19Chr[mode][i].y = 200+100*floor((i*spacingY.value+16)/adjScreenWidth.value/2);
    apr19Chr[mode][i].wPick = 10*sqrt(chr["Pick Rate"]*scaling.value);
    apr19Chr[mode][i].hPick = 10*sqrt(chr["Pick Rate"]*scaling.value);
    maxXPicker = 100+(adjScreenWidth.value-spacingX.value);
  }
  );
  apr19Wep[mode].map((wep, i) => {
    apr19Wep[mode][i]._ind = i;
    apr19Wep[mode][i].wPick = 5*sqrt(wep["Pick Rate"]*scaling.value);
    apr19Wep[mode][i].hPick = 5*sqrt(wep["Pick Rate"]*scaling.value);
  }
  );
}

const setupChrWepStats = (chrS, wepS) => {
  let inputC = chrS;
  inputC.map((chr, i) => {
    inputC[i]._ind = i;
    inputC[i].x = 100+(i*spacingX.value)%adjScreenWidth.value;
    inputC[i].y = 200+100*floor((i*spacingY.value)/adjScreenWidth.value/2);
    inputC[i].wPick = 10*sqrt(chr["Pick Rate"]*scaling.value);
    inputC[i].hPick = 10*sqrt(chr["Pick Rate"]*scaling.value);
    inputC[i].hit = collidePointRect(mouseX, mouseY, inputC[i].x, inputC[i].y, inputC[i].wPick, inputC[i].hPick);
    try {
      inputC[i].img = eval("thumb"+chr.Character.replace(/\s+/g, ''));
    }
    catch {
      console.log("no image for " + chr.Character.replace(/\s+/g, ''));
    }
    maxXPicker = 100+(adjScreenWidth.value)-spacingX.value;
  }
  );
  let inputW = wepS;
  inputW.map((wep, i) => {
    inputW[i]._ind = i;
    inputW[i].wPick = 5*sqrt(wep["Pick Rate"]*scaling.value);
    inputW[i].hPick = 5*sqrt(wep["Pick Rate"]*scaling.value);
    inputW[i].hit = null;
  }
  );
  return [inputC, inputW];
};

const findExtremesChr = (arr, pTimesW) => {
  let currExt = [1, 0, 1, 0]; // pick min, max, win min, max
  let minsF = [];
  let maxsF = [];
  if (Array.isArray(arr)) {
    Object.values(arr).map((chr, i) => {
      if (chr["Pick Rate"] < currExt[0]) {
        currExt[0]=chr["Pick Rate"];
        minsF[0] = chr._ind;
      }
      if (chr["Pick Rate"] > currExt[1]) {
        currExt[1]=chr["Pick Rate"];
        maxsF[0] = chr._ind;
      }
      if (!pTimesW) {
        if (chr["Win Rate"] < currExt[2]) {
          currExt[2]=chr["Win Rate"];
          minsF[1] = chr._ind;
        }
        if (chr["Win Rate"] > currExt[3]) {
          currExt[3]=chr["Win Rate"];
          maxsF[1] = chr._ind;
        }
      } else {
        if (chr["Win Rate"]*chr["Pick Rate"] < currExt[2]) {
          currExt[2]=chr["Win Rate"]*chr["Pick Rate"];
          minsF[1] = chr._ind;
        }
        if (chr["Win Rate"]*chr["Pick Rate"] > currExt[3]) {
          currExt[3]=chr["Win Rate"]*chr["Pick Rate"];
          maxsF[1] = chr._ind;
        }
      }
    }
    );
  } else {
    arr.map((chr, i) => {
      if (chr["Pick Rate"] < currExt[0]) {
        currExt[0]=chr["Pick Rate"];
        minsF[0] = chr._ind;
      }
      if (chr["Pick Rate"] > currExt[1]) {
        currExt[1]=chr["Pick Rate"];
        maxsF[0] = chr._ind;
      }
      if (!pTimesW) {
        if (chr["Win Rate"] < currExt[2]) {
          currExt[2]=chr["Win Rate"];
          minsF[1] = chr._ind;
        }
        if (chr["Win Rate"] > currExt[3]) {
          currExt[3]=chr["Win Rate"];
          maxsF[1] = chr._ind;
        }
      } else {
        if (chr["Win Rate"]*chr["Pick Rate"] < currExt[2]) {
          currExt[2]=chr["Win Rate"]*chr["Pick Rate"];
          minsF[1] = chr._ind;
        }
        if (chr["Win Rate"]*chr["Pick Rate"] > currExt[3]) {
          currExt[3]=chr["Win Rate"]*chr["Pick Rate"];
          maxsF[1] = chr._ind;
        }
      }
    }
    );
  }
  return [minsF, maxsF];
};

const modeChangeHandler = () => {
  let newMode = modeSel.value();
  if (newMode === "Solos") {
    mode = 0;
  } else if (newMode === "Duos") {
    mode = 1;
  } else {
    mode = 2;
  }
}

const labelToggleHandler = () => {
  if (labelToggle.checked()){
    showLabels = true;
  }else{
    showLabels = false;  
  }
}

const arcHandler = () => {
  if(arcToggle.checked()){
    useArc = true;
  }else{
    useArc = false;
  }
}

function formatPercent(amount) {
  return round(amount * 1000)/10 + "%";
}
