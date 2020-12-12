if(resetpossible & |mouse().y-1.25|<.75 & |mouse().x-(SIZE+1.75)|<.75, reset(lastk));
if(mode == "select",
  if(|mouse().x-P2.x|>1,
    forall(1..length(pos),k,
      if(|pos_k-mouse().xy|<0.5,
        sel = k;
      );
    );
  ,
    if(P0.y-mouse().y < 0.5 & mouse().y - P1.y < 0.5, moveto(P2,mouse()));
  );
);
