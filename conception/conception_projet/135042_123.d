format 224

classinstancecanvas 128002 classinstance_ref 128002 // 
  xyz 37 34 2005 life_line_z 2000
end
classinstancecanvas 129282 classinstance_ref 128130 // 
  xyz 321 55 2000 life_line_z 2000
end
durationcanvas 129410 classinstance_ref 128002 // :user
  xyzwh 45 116 2010 11 40
end
durationcanvas 129538 classinstance_ref 129282 // :Platform
  xyzwh 343 116 2010 11 25
end
durationcanvas 130434 classinstance_ref 129282 // :Platform
  xyzwh 343 362 2010 11 29
end
durationcanvas 130690 classinstance_ref 128002 // :user
  xyzwh 45 379 2010 11 104
end
durationcanvas 132226 classinstance_ref 129282 // :Platform
  xyzwh 343 299 2010 11 40
end
durationcanvas 132482 classinstance_ref 129282 // :Platform
  xyzwh 343 241 2010 11 40
end
msg 129666 asynchronous
  from durationcanvas_ref 129410
  to durationcanvas_ref 129538
  yz 116 2015 explicitmsg "suggest (Incident, modification)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 23 103
msg 130818 return
  from durationcanvas_ref 130434
  to durationcanvas_ref 130690
  yz 379 2015 explicitmsg "completion notification"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 103 366
reflexivemsg 132354 synchronous
  to durationcanvas_ref 132226
  yz 299 2015 explicitmsg "verify modifications by notifying users"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 380 298
reflexivemsg 132610 synchronous
  to durationcanvas_ref 132482
  yz 241 2015 explicitmsg "store modifications"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 386 241
end
