function createBarColumn(x, y, min, max, value, bLength, bWidth, isBar){ //define stroke before calling function
  let barLength = map(value, min*0.95, max*1.05, 0, bLength);
  isBar ? (rect(x, y, barLength, bWidth)) : (rect(x, y, bWidth, barLength));
  //console.log([min,max]);
  return [min, max, 0, barLength, value];
}

function createDial(x, y, min, max, value, diam, txt){
  push();
  strokeWeight(2);
  circle(x,y,diam);
  push();
  textAlign(CENTER, TOP);
  noStroke();
  fill(0);
  textSize(12);
  try{
    text(txt, x, y+diam/5);
  }catch{};
  (showLabels)&&text(formatPercent(value),x, y+5+diam/2);
  pop();
  let angMin = -190;
  let angMax = 10;
  let angVal = map(value, min, max, angMin, angMax);
  noFill();
  stroke(0);
  let cent = createVector(x,y);
  let endpt = createVector(diam/2*cos(angVal),diam/2*sin(angVal));
  //endpt.setMag(cent.dist(cent.add(endpt))/2)
  line(x,y,x+diam/2*cos(angMin),y+diam/2*sin(angMin));
  line(x,y,x+diam/2*cos(angMax),y+diam/2*sin(angMax));
  if(useArc){
    push();
    fill(0);
    noStroke();
    arc(x, y, diam, diam, angMin, angVal, PIE);
    pop();
  } else {
    drawArrow(cent, endpt, 'black');
  }
  //line(x,y,(x+diam/2*cos(angVal)),(y+diam/2*sin(angVal)));
  pop();
  return [x+diam/2*cos(angMin),y+diam/2*sin(angMin),x+diam/2*cos(angMax),y+diam/2*sin(angMax),x+diam/2*cos(angVal),y+diam/2*sin(angVal)];
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x/1.25, vec.y/1.25);
  rotate(vec.heading());
  let arrowSize = 3.5;
  translate(vec.mag()/1.25 - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
