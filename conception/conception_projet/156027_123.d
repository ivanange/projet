format 224

classinstance 128123 class_ref 129154 // user
  name ""   xyz 126.5 22 2005 life_line_z 2000
classinstance 128251 class_ref 135035 // syst�me
  name ""   xyz 475.5 23 2000 life_line_z 2000
classinstance 130171 class_ref 128002 // User
  name ""   xyz 719 10 2000 life_line_z 2000
durationcanvas 128379 classinstance_ref 128251 // :syst�me
  xyzwh 497 160 2010 11 52
end
durationcanvas 128507 classinstance_ref 128251 // :syst�me
  xyzwh 497 77 2010 11 190
end
durationcanvas 128635 classinstance_ref 128251 // :syst�me
  xyzwh 497 75 2010 11 195
end
durationcanvas 128763 classinstance_ref 128123 // :user
  xyzwh 134 76 2010 11 161
end
durationcanvas 128891 classinstance_ref 128251 // :syst�me
  xyzwh 497 353 2010 11 40
end
durationcanvas 129019 classinstance_ref 128251 // :syst�me
  xyzwh 497 475 2010 11 40
end
durationcanvas 129147 classinstance_ref 128123 // :user
  xyzwh 134 350 2010 11 25
end
durationcanvas 129275 classinstance_ref 128123 // :user
  xyzwh 134 463 2010 11 25
end
durationcanvas 130299 classinstance_ref 130171 // :User
  xyzwh 738 178 2010 11 25
end
durationcanvas 130555 classinstance_ref 130171 // :User
  xyzwh 738 224 2010 11 47
end
msg 129403 synchronous
  from durationcanvas_ref 128763
  to durationcanvas_ref 128379
  yz 160 2015 explicitmsg "remplir le formulaire"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 284 149
msg 129531 synchronous
  from durationcanvas_ref 128763
  to durationcanvas_ref 128507
  yz 78 2015 explicitmsg "demande d'incription"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 266 67
reflexivemsg 129659 asynchronous
  to durationcanvas_ref 128635
  yz 256 2015 explicitmsg "envoie l'email  de verification"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 538 261
msg 129787 return
  from durationcanvas_ref 128891
  to durationcanvas_ref 129147
  yz 353 2015 explicitmsg "email verifier et compte creer renvoie a la page d'acceuil"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 224 342
msg 129915 return
  from durationcanvas_ref 128507
  to durationcanvas_ref 128763
  yz 117 2015 explicitmsg "formulaire d'inscription"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 267 106
msg 130043 return
  from durationcanvas_ref 129019
  to durationcanvas_ref 129275
  yz 477 2015 explicitmsg "erreur . renvoie du formulaire"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 284 466
msg 130427 synchronous
  from durationcanvas_ref 128635
  to durationcanvas_ref 130299
  yz 178 2015 explicitmsg "creer_user(nom,email,password)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 545 167
msg 130683 return
  from durationcanvas_ref 130555
  to durationcanvas_ref 128635
  yz 224 3005 explicitmsg "utilisateur cr��"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 588 213
end
