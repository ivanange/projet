format 224

note 131067 "L'utilisateur doit etre au prealable connect� a son compte"
  xyzwh 214 5 2000 185 41
classinstance 131195 class_ref 128379 // syt�me
  name ""   xyz 450.5 4 2000 life_line_z 2000
classinstance 131323 class_ref 129154 // user
  name ""   xyz 54.5 4.5 2005 life_line_z 2000
fragment 134011 "alt"
  xyzwh 42 206 2020 486 207
  separator 5000
end
durationcanvas 131579 classinstance_ref 131323 // :user
  xyzwh 62 187.5 2010 11 64
end
durationcanvas 131835 classinstance_ref 131195 // :syt�me
  xyzwh 469 53 2010 11 71
end
durationcanvas 131963 classinstance_ref 131323 // :user
  xyzwh 62 59 2010 11 73
end
durationcanvas 132091 classinstance_ref 131323 // :user
  xyzwh 62 53 2010 11 207
end
durationcanvas 132219 classinstance_ref 131195 // :syt�me
  xyzwh 469 171 2010 11 80
end
durationcanvas 132347 classinstance_ref 131195 // :syt�me
  xyzwh 469 266 2010 11 40
end
durationcanvas 132475 classinstance_ref 131195 // :syt�me
  xyzwh 469 342 2010 11 40
end
durationcanvas 132731 classinstance_ref 131323 // :user
  xyzwh 62 340 2010 11 39
end
msg 132859 return
  from durationcanvas_ref 132475
  to durationcanvas_ref 132731
  yz 368 2015 explicitmsg "erreur et renvoie du formulaire"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 133 357
msg 132987 return
  from durationcanvas_ref 132219
  to durationcanvas_ref 131579
  yz 240.5 2015 explicitmsg "aucune erreur"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 228 229.5
reflexivemsg 133243 asynchronous
  to durationcanvas_ref 132347
  yz 272 2015 explicitmsg "notifie les utilisteurs concern�s"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 498 273
msg 133499 synchronous
  from durationcanvas_ref 131963
  to durationcanvas_ref 131835
  yz 61 2015 explicitmsg "demande de declaration d'un incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 86 50
msg 133755 synchronous
  from durationcanvas_ref 132091
  to durationcanvas_ref 132219
  yz 173 2015 explicitmsg "remplie les information relatif a l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 99 163
msg 133883 return
  from durationcanvas_ref 131835
  to durationcanvas_ref 131963
  yz 98 2015 explicitmsg "envoie du formulaire de declaration"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 188 87
end
