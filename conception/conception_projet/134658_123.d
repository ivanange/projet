format 224

classinstancecanvas 128002 classinstance_ref 128002 // 
  xyz 139 42 2005 life_line_z 2000
end
classinstance 128130 class_ref 128002 // User
  name ""   xyz 546 116 2000 life_line_z 2000
classinstancecanvas 129282 classinstance_ref 128130 // 
  xyz 324 49 2000 life_line_z 2000
end
continuation 130178 "user details valid"
  xyzwh 405 156 2020 109 56
note 131842 "name > 4 chars
email must not already exist
password > 4 chars"
  xyzwh 411 34 2000 155 63
durationcanvas 129410 classinstance_ref 128002 // :user
  xyzwh 147 116 2010 11 40
end
durationcanvas 129538 classinstance_ref 129282 // :Platform
  xyzwh 346 116 2010 11 25
end
durationcanvas 129794 classinstance_ref 129282 // :Platform
  xyzwh 346 179 2010 11 40
end
durationcanvas 129922 classinstance_ref 128130 // :User
  xyzwh 565 179 2010 11 25
end
durationcanvas 130306 classinstance_ref 128130 // :User
  xyzwh 565 240 2010 11 40
end
durationcanvas 130434 classinstance_ref 129282 // :Platform
  xyzwh 346 240 2010 11 29
end
durationcanvas 130690 classinstance_ref 128002 // :user
  xyzwh 147 258 2010 11 25
end
durationcanvas 130946 classinstance_ref 129282 // :Platform
  xyzwh 346 293 2010 11 41
end
durationcanvas 131202 classinstance_ref 128002 // :user
  xyzwh 147 360 2010 11 40
end
durationcanvas 131330 classinstance_ref 129282 // :Platform
  xyzwh 346 360 2010 11 25
end
durationcanvas 131586 classinstance_ref 128130 // :User
  xyzwh 565 371 2010 11 25
end
msg 129666 asynchronous
  from durationcanvas_ref 129410
  to durationcanvas_ref 129538
  yz 116 2015 explicitmsg "user details (name, email, password)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 163 103
msg 130050 synchronous
  from durationcanvas_ref 129794
  to durationcanvas_ref 129922
  yz 179 2015 unspecifiedmsg
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
msg 130562 return
  from durationcanvas_ref 130306
  to durationcanvas_ref 130434
  yz 240 2015 explicitmsg "created user"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 431 227
msg 130818 return
  from durationcanvas_ref 130434
  to durationcanvas_ref 130690
  yz 258 2015 explicitmsg "creation notification"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 205 245
reflexivemsg 131074 asynchronous
  to durationcanvas_ref 130946
  yz 298 2015 explicitmsg "email verification link"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 383 294
msg 131458 asynchronous
  from durationcanvas_ref 131202
  to durationcanvas_ref 131330
  yz 360 2015 explicitmsg "verify email"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 225 347
msg 131714 synchronous
  from durationcanvas_ref 131330
  to durationcanvas_ref 131586
  yz 371 2015 explicitmsg "verify user"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 435 358
line 131970 -_-_
  from ref 131842 z 2021 to ref 130178
end
