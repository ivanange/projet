format 224

classinstance 128123 class_ref 129282 // Admin
  name ""   xyz 80 4 2005 life_line_z 2000
classinstance 128251 class_ref 135938 // Platform
  name ""   xyz 246 7 2000 life_line_z 2000
classinstance 128379 class_ref 128770 // Permission
  name ""   xyz 632 4 2000 life_line_z 2000
classinstance 128507 class_ref 128002 // User
  name ""   xyz 468 14 2000 life_line_z 2000
fragment 134267 "alt"
  xyzwh 177 327 2020 432 316
  separator 4114
  separator 7229
end
textcanvas 134395 "if( warn >3):"
  xyzwh 204 332 2025 57 11
textcanvas 134523 "if(warn>5)"
  xyzwh 187 465 2025 48 11
textcanvas 134651 "else:"
  xyzwh 198 570 2025 23 11
note 135803 "ici il s'agit d'informer les utilisateur des nouvautés consernat la plateforme"
  xyzwh 338 806 3005 131 47
durationcanvas 128635 classinstance_ref 128123 // :Admin
  xyzwh 93 64 2010 11 40
end
durationcanvas 128763 classinstance_ref 128507 // :User
  xyzwh 487 64 2010 11 58
end
durationcanvas 129019 classinstance_ref 128123 // :Admin
  xyzwh 93 64 2010 11 58
end
durationcanvas 129275 classinstance_ref 128123 // :Admin
  xyzwh 93 131 2010 11 66
end
durationcanvas 129403 classinstance_ref 128507 // :User
  xyzwh 487 164 2010 11 52
end
durationcanvas 129659 classinstance_ref 128379 // :Permission
  xyzwh 660 172 2010 11 86
end
durationcanvas 130299 classinstance_ref 128507 // :User
  xyzwh 487 242 2010 11 40
end
durationcanvas 130555 classinstance_ref 128123 // :Admin
  xyzwh 93 261 2010 11 25
end
durationcanvas 132859 classinstance_ref 128123 // :Admin
  xyzwh 93 312 2010 11 69
end
durationcanvas 132987 classinstance_ref 128251 // :Platform
  xyzwh 268 314 2010 11 369
end
durationcanvas 133243 classinstance_ref 128507 // :User
  xyzwh 487 355 2010 11 26
end
durationcanvas 133755 classinstance_ref 128507 // :User
  xyzwh 487 431 2010 11 25
end
durationcanvas 134011 classinstance_ref 128507 // :User
  xyzwh 487 605 2010 11 25
end
durationcanvas 134779 classinstance_ref 128123 // :Admin
  xyzwh 93 846 2010 11 26
end
durationcanvas 134907 classinstance_ref 128251 // :Platform
  xyzwh 268 847 2010 11 52
end
durationcanvas 135163 classinstance_ref 128251 // :Platform
  xyzwh 268 857 2010 11 40
end
durationcanvas 135291 classinstance_ref 128507 // :User
  xyzwh 487 865 2010 11 82
end
durationcanvas 135547 classinstance_ref 128123 // :Admin
  xyzwh 93 672 2010 11 25
end
lostfoundmsgsupport 133499 xyz 487 515 2015
msg 128891 synchronous
  from durationcanvas_ref 128635
  to durationcanvas_ref 128763
  yz 64 2015 explicitmsg "show_users()"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 301 53
msg 129147 return
  from durationcanvas_ref 128763
  to durationcanvas_ref 129019
  yz 107 2015 explicitmsg "users"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 326 96
msg 129531 synchronous
  from durationcanvas_ref 129275
  to durationcanvas_ref 129403
  yz 164 2015 explicitmsg "permission(id_user,name_per,decription)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 187 153
msg 129787 synchronous
  from durationcanvas_ref 129403
  to durationcanvas_ref 129659
  yz 205 2015 explicitmsg "modify_permission(name_per,description)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 474 194
msg 130427 return
  from durationcanvas_ref 129659
  to durationcanvas_ref 130299
  yz 242 2015 explicitmsg "new_permission"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 541 231
msg 130683 return
  from durationcanvas_ref 130299
  to durationcanvas_ref 130555
  yz 261 2015 explicitmsg "permission modify"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 253 250
msg 133115 synchronous
  from durationcanvas_ref 132859
  to durationcanvas_ref 132987
  yz 314 2015 explicitmsg "warn(user_id)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 153 303
msg 133371 asynchronous
  from durationcanvas_ref 132987
  to durationcanvas_ref 133243
  yz 355 2015 explicitmsg "modify_confidence(user_id)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 336 344
msg 133627 lost_synchronous
  from durationcanvas_ref 132987
  to lostfoundmsgsupport_ref 133499
  yz 513 2015 explicitmsg "delete(user_id)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 347 502
msg 133883 asynchronous
  from durationcanvas_ref 132987
  to durationcanvas_ref 133755
  yz 434 2015 explicitmsg "notify(user_id)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 349 423
msg 134139 asynchronous
  from durationcanvas_ref 132987
  to durationcanvas_ref 134011
  yz 605 2015 explicitmsg "notify_user(user_id)"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 336 594
msg 135035 asynchronous
  from durationcanvas_ref 134779
  to durationcanvas_ref 134907
  yz 847 2015 explicitmsg "updating"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 166 836
msg 135419 asynchronous
  from durationcanvas_ref 135163
  to durationcanvas_ref 135291
  yz 867 2015 explicitmsg "notify()"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 367 856
msg 135675 return
  from durationcanvas_ref 132987
  to durationcanvas_ref 135547
  yz 672 2015 explicitmsg "succes"
  show_full_operations_definition default show_class_of_operation default drawing_language default show_context_mode default
  label_xy 169 661
end
