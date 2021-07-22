format 224

classinstance 128123 class_ref 129154 // user
  name ""   xyz 60 4 2005 life_line_z 2000
classinstance 128251 class_ref 135035 // systéme
  name ""   xyz 354 8 2000 life_line_z 2000
durationcanvas 128379 classinstance_ref 128123 // :user
  xyzwh 68 51 2010 11 139
end
durationcanvas 128507 classinstance_ref 128251 // :systéme
  xyzwh 376 52 2010 11 83
end
durationcanvas 128891 classinstance_ref 128251 // :systéme
  xyzwh 376 155 2010 11 32
end
durationcanvas 129275 classinstance_ref 128251 // :systéme
  xyzwh 376 281 2010 11 25
end
durationcanvas 129403 classinstance_ref 128123 // :user
  xyzwh 68 273 2010 11 36
end
durationcanvas 129659 classinstance_ref 128251 // :systéme
  xyzwh 376 228 2010 11 40
end
durationcanvas 129787 classinstance_ref 128123 // :user
  xyzwh 68 228 2010 11 25
end
msg 128635 synchronous
  from durationcanvas_ref 128379
  to durationcanvas_ref 128507
  yz 52 2015 explicitmsg "selectionne l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 178 41
msg 128763 return
  from durationcanvas_ref 128507
  to durationcanvas_ref 128379
  yz 98 2015 explicitmsg "affiche l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 189 87
msg 129019 synchronous
  from durationcanvas_ref 128379
  to durationcanvas_ref 128891
  yz 155 2015 explicitmsg "confirme/ infirme/suggere une modification  sur l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 94 144
msg 129531 return
  from durationcanvas_ref 129275
  to durationcanvas_ref 129403
  yz 292 2015 explicitmsg "echec de modification re-affiche l'incident"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 129 281
msg 129915 return
  from durationcanvas_ref 129659
  to durationcanvas_ref 129787
  yz 228 2015 explicitmsg "modification reussi"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 182 217
end
