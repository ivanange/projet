format 224

classinstance 128123 class_ref 135035 // systéme
  name ""   xyz 669 -2 2000 life_line_z 2000
classinstance 128251 class_ref 129154 // user
  name ""   xyz 375 -2 2005 life_line_z 2000
fragment 128379 "alt"
  xyzwh 316.5 258.5 2000 440 161
  separator 5729
end
durationcanvas 128507 classinstance_ref 128251 // :user
  xyzwh 383 74.5 2010 11 139
end
durationcanvas 128635 classinstance_ref 128251 // :user
  xyzwh 383 367.5 2010 11 36
end
durationcanvas 128763 classinstance_ref 128123 // :systéme
  xyzwh 691 74.5 2010 11 88
end
durationcanvas 128891 classinstance_ref 128123 // :systéme
  xyzwh 691 195.5 2010 11 33
end
durationcanvas 129019 classinstance_ref 128123 // :systéme
  xyzwh 691 375.5 2010 11 25
end
durationcanvas 129147 classinstance_ref 128251 // :user
  xyzwh 383 295.5 2010 11 25
end
durationcanvas 129275 classinstance_ref 128123 // :systéme
  xyzwh 691 293.5 2010 11 40
end
msg 129403 return
  from durationcanvas_ref 129275
  to durationcanvas_ref 129147
  yz 295.5 2015 explicitmsg "modification  reussi"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 496.5 284.5
msg 129531 return
  from durationcanvas_ref 128763
  to durationcanvas_ref 128507
  yz 129.5 2015 explicitmsg "affiche l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 503.5 118.5
msg 129659 return
  from durationcanvas_ref 129019
  to durationcanvas_ref 128635
  yz 386.5 2015 explicitmsg "echec re-affiche l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 443.5 375.5
msg 129787 synchronous
  from durationcanvas_ref 128507
  to durationcanvas_ref 128891
  yz 195.5 2015 explicitmsg "Ecrire les modifications"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 468.5 186.5
msg 129915 synchronous
  from durationcanvas_ref 128507
  to durationcanvas_ref 128763
  yz 74.5 2015 explicitmsg "selectionne l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 492.5 63.5
end
