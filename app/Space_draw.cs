//UI
forall(1..length(levels),k,
P = computeP(k);
draw(P + (-.1,0), P + (.1,0), color->[1,1,1]);
);


//snap
k = computek();
setk(k);


//reset text
if(resetpossible, drawtext((SIZE+1,.75), size->140, "⟲", color->[1,1,1], alpha->resetalpha));

if(mode=="animation" & seconds()<T,
lambda = seconds()/T;
resetalpha = min(max(resetalpha, lambda),.8);
mpos = (1-lambda)*posA + lambda*posB;
,
mode = "select";
mpos = pos;
);



solved = (pos_1==TARGET);

connect([(.5,.5),(SIZE+.5,.5),(SIZE+.5,SIZE+.5),(.5,SIZE+.5),(.5,.5)], size->2, color->[1,1,1]);
forall(1..(SIZE),x,
  draw((x+.5,.5),(x+.5,SIZE+.5), color->[1,1,1], size->1, alpha->.65);
  draw((.5,x-.5),(SIZE+.5,x-.5), color->[1,1,1], size->1, alpha->.65);
);


//drawcircle(TARGET,.55, size->4,color->[.6,.5,1], alpha->.7);
drawimg(TARGET, .6, "target");

/*
forall(mpos, p, if(p!=mpos_1, fillcircle(p,.5, color->[.9,.5,.1], alpha->.7)));
fillcircle(mpos_1, if(solved,1/(2+5*seconds()),.5), color->[.6,.5,1], alpha->.7);
*/


if(sel>0,
  drawimg(mpos_sel,.5,"selected");
);

forall(1..length(mpos), k, drawimg(mpos_k, if(k!=1 % !solved, .5, 1/(2+1.5*seconds())), "o"+k));

if(sel>0,
//fillcircle(mpos_sel,.3, color->[.8,0,0]);
forall([(-1,0),(1,0),(0,1),(0,-1)],d,
  if(gettargetsonray(d)!=[] & isfree(mpos_sel+d),
    draw(mpos_sel+.7*d,mpos_sel+1.2*d, color->[.7647,.1412,.1569], size->6, arrow->true);
  );
 );
);

if(solved,
drawtext((4,0.2), color->[1,1,1],"Level " + k +" solved!", bold->true, align->"mid");
//fillcircle(TARGET,seconds(),color->[1,0,0], alpha->.3);
if(seconds()>2,
setk(mod(k, length(levels))+1)
);

);

//save ressources
if(mode!="animation" & !solved,
  pauseanimation();
);


drawtext(P0+(.25,-0.05),"Easy",color->(1,1,1),bold->true);
drawtext(P1+(.25,-0.05),"Hard",color->(1,1,1),bold->true);
