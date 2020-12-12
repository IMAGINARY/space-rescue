levels = getshuffledlevels();

gettargetsonray(d) := (
  targetsonray = select(pos, p,
                        delta = p-pos_sel;
                        if(d.x == 0,
                           delta.x == 0 & delta.y*d.y>0,
                           delta.y == 0 & delta.x*d.x>0
                          );
                       );
);

reset(k) := (

    SIZE = 7;
    TARGET = (4,4);
    pos = levels_k;
    posA = pos;
    posB = pos;

    sel = 0;
    resetpossible = false;
    resetalpha = 0;
    target = (0,0);

    mode = "select";
    T = 0;
    resetclock();playanimation();
);

// Compute the linear interpolation parameter for the projection of P onto the line S0S1
projectPointOnLine(S0,S1,P):=(
  regional(vecS1S0);
  regional(vecS1P);
  regional(t);

  vecS1S0=(S0-S1).xy;
  vecS1P=(P-S1).xy;
  t=(vecS1P*vecS1S0)/(vecS1S0*vecS1S0);

  t;
);

// Project P onto the line segment S0S1 and return the number of the slot closest to P.
computeSlot(S0,S1,P,steps):=round(projectPointOnLine(S0,S1,P)*(steps-1))+1;

computek():=(
  computeSlot(P1,P0,P2,length(levels));
);

computeP(k) := (
  lambda = (k-1)/(length(levels)-1);
  (1-lambda)*P0.xy+lambda*P1.xy
);

setk(k) := (
  P2.xy = computeP(k);
  if(k!=lastk,
    lastk = k;
    reset(k);
  );
);

isfree(f) := (
  regional(free);
  free = true;
  forall(pos, p, if(p==f, free=false));
  free
);
lastk = 0;
setk(1);

drawimg(pos, size, img) := (
  drawimage(pos+[-size,-size],pos+[size,-size],img);
);

reset() := (
  setk(1);
);
