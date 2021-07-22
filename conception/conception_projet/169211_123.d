format 224

classinstance 128123 class_ref 129154 // user
  name ""   xyz 118.5 4 2005 life_line_z 2000
classinstance 128251 class_ref 135035 // systéme
  name ""   xyz 434.5 4 2000 life_line_z 2000
durationcanvas 128635 classinstance_ref 128123 // :user
  xyzwh 126 48 2010 11 83
end
durationcanvas 129019 classinstance_ref 128251 // :systéme
  xyzwh 456 50 2010 11 76
end
durationcanvas 129915 classinstance_ref 128251 // :systéme
  xyzwh 456 205 2010 11 40
end
durationcanvas 130043 classinstance_ref 128123 // :user
  xyzwh 126 206 2010 11 25
end
msg 129659 synchronous
  from durationcanvas_ref 128635
  to durationcanvas_ref 129019
  yz 50 2015 explicitmsg "demande de consultation  du tableau de bord"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 167 41
msg 130171 return
  from durationcanvas_ref 129915
  to durationcanvas_ref 130043
  yz 211 2015 explicitmsg "retourne l'analyse"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 243 200
end
