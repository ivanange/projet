format 224

classcanvas 128002 class_ref 128002 // User
  classdiagramsettings member_max_width 0 end
  xyzwh 193 18 2000 191 257
end
classcanvas 128123 class_ref 141691 // notifications
  classdiagramsettings member_max_width 0 end
  xyz 23 114 2000
end
classcanvas 128130 class_ref 128130 // Incident
  classdiagramsettings member_max_width 0 end
  xyzwh 596 23 2000 175 213
end
classcanvas 128386 class_ref 128386 // Role
  classdiagramsettings member_max_width 0 end
  xyzwh 28 339 2000 105 77
end
classcanvas 128642 class_ref 128642 // Category
  classdiagramsettings member_max_width 0 end
  xyzwh 715 388 2000 117 113
end
classcanvas 128770 class_ref 128514 // Place
  classdiagramsettings member_max_width 0 end
  xyzwh 424 369 2000 173 151
end
classcanvas 129026 class_ref 128770 // Permission
  classdiagramsettings member_max_width 0 end
  xyz 257 436 2000
end
classcanvas 130818 class_ref 129026 // proposition
  classdiagramsettings member_max_width 0 end
  xyzwh 408 161 2000 141 107
end
relationcanvas 128251 relation_ref 134651 // recoit
  from ref 128123 z 2001 label "recoit" italic max_width 255 xyz 142 135 2001 to ref 128002
  no_role_a no_role_b
  multiplicity_a_pos 176 151 3000 multiplicity_b_pos 129 152 3000
end
relationcanvas 129154 relation_ref 128002 // possede
  decenter_end 732
  from ref 128002 z 2001 label "possede" italic max_width 255 xyz 128 282 2001 to ref 128386
  no_role_a no_role_b
  multiplicity_a_pos 95 324 3000 multiplicity_b_pos 173 254 3000
end
relationcanvas 129282 relation_ref 128130 // contient
  from ref 128386 z 2001 label "contient" italic max_width 255 xyz 176 412 2001 to ref 129026
  no_role_a no_role_b
  multiplicity_a_pos 242 458 3000 multiplicity_b_pos 142 407 3000
end
relationcanvas 129666 relation_ref 128386 // declares
  decenter_begin 287
  decenter_end 319
  from ref 128002 z 2001 label "declares" italic max_width 255 xyz 469 77 2001 to ref 128130
  no_role_a no_role_b
  multiplicity_a_pos 581 95 3000 multiplicity_b_pos 393 96 3000
end
relationcanvas 129794 relation_ref 128514 // appartient
  from ref 128130 z 2001 label "appartient" italic max_width 255 xyz 711 300 2001 to ref 128642
  no_role_a no_role_b
  multiplicity_a_pos 739 373 3000 multiplicity_b_pos 699 240 3000
end
relationcanvas 129922 relation_ref 128642 // se  deroule
  from ref 128130 z 2001 label "se  deroule" italic max_width 255 xyz 559 290 2001 to ref 128770
  no_role_a no_role_b
  multiplicity_a_pos 536 354 3000 multiplicity_b_pos 605 240 3000
end
relationcanvas 130690 relation_ref 128898 // propose
  from ref 128002 z 2001 label "propose" italic max_width 255 xyz 470 125 2001 to ref 128130
  no_role_a no_role_b
  multiplicity_a_pos 581 137 3000 multiplicity_b_pos 393 146 3000
end
relationcanvas 130946 relation_ref 129026 // <association>
  from ref 130818 z 3006 to point 477 131
  line 131074 z 3006 to ref 130818
  no_role_a no_role_b
  no_multiplicity_a no_multiplicity_b
end
end
