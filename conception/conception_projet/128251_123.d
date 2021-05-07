format 224

classinstance 128123 class_ref 129282 // Admin
  name ""   xyz 47 4 2005 life_line_z 2000
classinstance 128251 class_ref 128642 // Category
  name ""   xyz 370 4 2000 life_line_z 2000
durationcanvas 128379 classinstance_ref 128123 // :Admin
  xyzwh 60 176 2010 11 52
end
durationcanvas 128507 classinstance_ref 128251 // :Category
  xyzwh 393 179 2010 11 49
end
durationcanvas 129147 classinstance_ref 128123 // :Admin
  xyzwh 60 292 2010 11 52
end
durationcanvas 129275 classinstance_ref 128251 // :Category
  xyzwh 393 292 2010 11 55
end
durationcanvas 129659 classinstance_ref 128123 // :Admin
  xyzwh 60 59 2010 11 41
end
durationcanvas 129787 classinstance_ref 128251 // :Category
  xyzwh 393 59 2010 11 35
end
durationcanvas 130171 classinstance_ref 128123 // :Admin
  xyzwh 60 372 2010 11 40
end
durationcanvas 130299 classinstance_ref 128251 // :Category
  xyzwh 393 372 2010 11 25
end
msg 128635 synchronous
  from durationcanvas_ref 128379
  to durationcanvas_ref 128507
  yz 179 2015 explicitmsg "create_category(name,description)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 79 167
msg 128763 return
  from durationcanvas_ref 128507
  to durationcanvas_ref 128379
  yz 217 2020 explicitmsg "category"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 143 206
msg 129403 synchronous
  from durationcanvas_ref 129147
  to durationcanvas_ref 129275
  yz 292 2015 explicitmsg "update_category(id)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 163 286
msg 129531 return
  from durationcanvas_ref 129275
  to durationcanvas_ref 129147
  yz 333 2015 explicitmsg "category update"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 173 324
msg 129915 synchronous
  from durationcanvas_ref 129659
  to durationcanvas_ref 129787
  yz 59 2015 explicitmsg "show_categries"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 158 45
msg 130043 return
  from durationcanvas_ref 129787
  to durationcanvas_ref 129659
  yz 83 2015 explicitmsg "all categories"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 156 75
msg 130427 asynchronous
  from durationcanvas_ref 130171
  to durationcanvas_ref 130299
  yz 372 2015 explicitmsg "delete(id)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 180 363
end
