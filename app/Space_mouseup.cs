if(mode == "select" & sel>0,
v = mouse()-pos_sel;
d = (0,0);
if(v.x>|v.y|,
   d = (1,0);
  );
if(-v.x>|v.y|,
   d = (-1,0);
  );
if(v.y>|v.x|,
   d = (0,1);
  );
if(-v.y>|v.x|,
   d = (0,-1);
  );
//pos_sel = pos_sel+d;

//sel = 0;

targetsonray = gettargetsonray(d);
if(targetsonray==[],
   sel = 0;
   ,
   target = targetsonray_1;
   forall(targetsonray, t, if(|t-pos_sel|<|target-pos_sel|, target = t));
   target = target - d;
   posA = pos;
   pos_sel = target;
   posB = pos;
   T = |posB_sel - posA_sel|/10;
   mode = "animation";
   resetclock();playanimation();
   resetpossible = true;
   sel = 0;
  );
);
