format 224

activitynodecanvas 128099 activitynode_ref 134627 // initial_node
  xyz 241 70 2000
end
activityactioncanvas 128227 activityaction_ref 134627 // activity action entrer et soumettre les infos
  
  show_opaque_action_definition default
  xyzwh 210 121 2000 83 58
end
activityactioncanvas 128739 activityaction_ref 134755 // activity action Enregistrer les infos
  
  show_opaque_action_definition default
  xyzwh 614 119 2000 100 60
end
activityactioncanvas 129507 activityaction_ref 134883 // activity action Envoie mail de confirmation
  
  show_opaque_action_definition default
  xyzwh 624 254 2000 100 60
  pins
    pincanvas 129763 pin_ref 134627 // user_mail
      xyzwh 642 244 2002 11 11 label_xy 622 226
    end
  end
end
activityactioncanvas 129635 activityaction_ref 135011 // activity action Confirmer par mail
  
  show_opaque_action_definition default
  xyzwh 176 491 2000 100 60
end
activityactioncanvas 131171 activityaction_ref 135139 // activity action finalisation (compte crée et enregistré)
  
  show_opaque_action_definition default
  xyzwh 594 491 2000 100 60
end
activitynodecanvas 131427 activitynode_ref 135267 // activity_final
  xyz 401 610 2000
end
activitynodecanvas 132323 activitynode_ref 162659 // decision
  xyz 510 132 2000
end
activitynodecanvas 132579 activitynode_ref 162787 // decision
  xyz 240 262 2000
end
activityactioncanvas 133475 activityaction_ref 156515 // activity action Reception email de confirmation
  
  show_opaque_action_definition default
  xyzwh 174 347 2000 100 60
end
activitypartitioncanvas 134755 activitypartition_ref 148963 // system
  xyzwh 474 59 2006 335 614
end
activitypartitioncanvas 134883 activitypartition_ref 149091 // User
  xyzwh 65 18 2005 278 667
end
textcanvas 135011 "infos valide?"
  xyzwh 500 122 2011 61 14
textcanvas 135139 "[non]"
  xyzwh 487 283 2011 24 14
textcanvas 135267 "[oui]"
  xyzwh 578 149 2011 20 14
textcanvas 135395 "compte utilisateur crée"
  xyzwh 517 625 2011 109 14
textcanvas 135523 "création compte annulée"
  xyzwh 174 622 2010 118 14
flowcanvas 128483 flow_ref 134627 // <flow>
  
  from ref 128099 z 2001 to ref 128227
   write_horizontally default
end
flowcanvas 132451 flow_ref 166627 // <flow>
  
  from ref 128227 z 2001 to ref 132323
   write_horizontally default
end
flowcanvas 132707 flow_ref 166755 // <flow>
  
  from ref 132323 z 2001 to ref 128739
   write_horizontally default
end
flowcanvas 132835 flow_ref 166883 // <flow>
  decenter_end 513
  
  from ref 132323 z 2001 to point 521 277
  line 132963 z 2001 to ref 132579
   write_horizontally default
end
flowcanvas 133091 flow_ref 167011 // <flow>
  
  from ref 132579 z 2001 to ref 128227
   write_horizontally default
end
flowcanvas 133347 flow_ref 167139 // <flow>
  decenter_begin 790
  decenter_end 689
  
  from ref 128739 z 2001 to ref 129507
   write_horizontally default
end
flowcanvas 133603 flow_ref 167267 // <flow>
  decenter_begin 708
  decenter_end 648
  
  from ref 129507 z 2001 to point 693 386
  line 133731 z 2001 to ref 133475
   write_horizontally default
end
flowcanvas 133859 flow_ref 167395 // <flow>
  
  from ref 133475 z 2001 to ref 129635
   write_horizontally default
end
flowcanvas 133987 flow_ref 167523 // <flow>
  
  from ref 129635 z 2001 to ref 131171
   write_horizontally default
end
flowcanvas 134115 flow_ref 167651 // <flow>
  
  from ref 131171 z 2001 to point 641 621
  line 134627 z 2001 to ref 131427
   write_horizontally default
end
flowcanvas 134243 flow_ref 167779 // <flow>
  
  from ref 132579 z 2001 to point 142 321
  line 134499 z 2001 to point 141 618
  line 134371 z 2001 to ref 131427
   write_horizontally default
end
end
