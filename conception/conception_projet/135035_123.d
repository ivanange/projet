format 224

classinstance 128123 class_ref 129154 // user
  name ""   xyz 93 11 2005 life_line_z 2000
classinstance 128251 class_ref 128379 // sytéme
  name ""   xyz 357 6 2000 life_line_z 2000
classinstance 128379 class_ref 128507 // incident
  name ""   xyz 622 4 2000 life_line_z 2000
fragment 131707 "alt"
  xyzwh 70 172 2020 633 206
  separator 5873
end
durationcanvas 128507 classinstance_ref 128123 // :user
  xyzwh 101 62 2010 11 57
end
durationcanvas 128635 classinstance_ref 128251 // :sytéme
  xyzwh 376 61 2010 11 26
end
durationcanvas 129403 classinstance_ref 128123 // :user
  xyzwh 101 199 2010 11 33
end
durationcanvas 129659 classinstance_ref 128123 // :user
  xyzwh 101 135 2010 11 51
end
durationcanvas 129787 classinstance_ref 128251 // :sytéme
  xyzwh 376 152 2010 11 81
end
durationcanvas 130043 classinstance_ref 128379 // :incident
  xyzwh 642 178 2010 11 72
end
durationcanvas 130683 classinstance_ref 128251 // :sytéme
  xyzwh 376 245 2010 11 40
end
durationcanvas 130939 classinstance_ref 128251 // :sytéme
  xyzwh 376 319 2010 11 40
end
durationcanvas 131067 classinstance_ref 128123 // :user
  xyzwh 101 319 2010 11 25
end
durationcanvas 131451 classinstance_ref 128251 // :sytéme
  xyzwh 376 97 2010 11 40
end
msg 128763 synchronous
  from durationcanvas_ref 128507
  to durationcanvas_ref 128635
  yz 62 2015 explicitmsg "demande de declaration d'un incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 125 51
msg 129915 synchronous
  from durationcanvas_ref 129659
  to durationcanvas_ref 129787
  yz 152 2015 explicitmsg "remplie les information relatif a l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 138 142
msg 130171 synchronous
  from durationcanvas_ref 129787
  to durationcanvas_ref 130043
  yz 195 2015 explicitmsg "Creer_incident(categorie ,date,lieu,decription ...)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 396 184
msg 130555 return
  from durationcanvas_ref 130043
  to durationcanvas_ref 129787
  yz 222 2015 explicitmsg "incident créé"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 483 211
reflexivemsg 130811 asynchronous
  to durationcanvas_ref 130683
  yz 251 2015 explicitmsg "notifie les utilisteurs concernés"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 405 252
msg 131195 return
  from durationcanvas_ref 130939
  to durationcanvas_ref 131067
  yz 319 2015 explicitmsg "erreur et renvoie du formulaire"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 172 308
msg 131323 return
  from durationcanvas_ref 129787
  to durationcanvas_ref 129403
  yz 216 2015 explicitmsg "aucune erreur et affiche l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 165 205
msg 131579 return
  from durationcanvas_ref 131451
  to durationcanvas_ref 128507
  yz 97 2015 explicitmsg "envoie du formulaire de declaration"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 161 86
end
