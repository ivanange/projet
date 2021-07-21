format 224

classinstance 128123 class_ref 129154 // user
  name ""   xyz 62 4 2005 life_line_z 2000
classinstance 128251 class_ref 135035 // systéme
  name ""   xyz 286 15 2000 life_line_z 2000
classinstance 128379 class_ref 128507 // incident
  name ""   xyz 445 13 2000 life_line_z 2000
classinstance 128507 class_ref 135163 // Proposition
  name ""   xyz 670 25 2000 life_line_z 2000
durationcanvas 128635 classinstance_ref 128123 // :user
  xyzwh 70 66 2010 11 85
end
durationcanvas 128763 classinstance_ref 128251 // :systéme
  xyzwh 308 65 2010 11 103
end
durationcanvas 129019 classinstance_ref 128507 // :Proposition
  xyzwh 698 101 2010 11 67
end
durationcanvas 129403 classinstance_ref 128251 // :systéme
  xyzwh 308 115 2010 11 36
end
durationcanvas 129659 classinstance_ref 128251 // :systéme
  xyzwh 308 200 2010 11 40
end
durationcanvas 129915 classinstance_ref 128251 // :systéme
  xyzwh 308 262 2010 11 40
end
durationcanvas 130043 classinstance_ref 128123 // :user
  xyzwh 70 262 2010 11 25
end
durationcanvas 130299 classinstance_ref 128251 // :systéme
  xyzwh 308 331 2010 11 40
end
durationcanvas 130427 classinstance_ref 128123 // :user
  xyzwh 70 331 2010 11 25
end
msg 128891 synchronous
  from durationcanvas_ref 128635
  to durationcanvas_ref 128763
  yz 66 2015 explicitmsg "selection l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 91 55
msg 129147 asynchronous
  from durationcanvas_ref 128763
  to durationcanvas_ref 129019
  yz 157 2015 explicitmsg "creer_or_update_proposition(id_incidendent,confiance,type,modification )"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 350 149
msg 129275 return
  from durationcanvas_ref 128763
  to durationcanvas_ref 128635
  yz 101 2020 explicitmsg "affiche l'espace pour la modification"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 96 92
msg 129531 synchronous
  from durationcanvas_ref 128635
  to durationcanvas_ref 129403
  yz 140 2020 explicitmsg "ecrit  les modification a suggeré"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 116 129
reflexivemsg 129787 asynchronous
  to durationcanvas_ref 129659
  yz 202 2015 explicitmsg "notifie les utilisateurs concerné"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 329 190
msg 130171 return
  from durationcanvas_ref 129915
  to durationcanvas_ref 130043
  yz 262 2015 explicitmsg "modification reussie"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 146 251
msg 130555 return
  from durationcanvas_ref 130299
  to durationcanvas_ref 130427
  yz 331 2015 explicitmsg "modification non valide"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 139 320
end
