format 224

subject 128002 ""
  xyzwh 246.5 3.7 2000 583 668
classcanvas 128130 class_ref 129154 // user
  simpleclassdiagramsettings end
  xyz 106.6 45.6 2000
end
usecasecanvas 128258 usecase_ref 128002 // Declarer_un_incident
  xyzwh 705.6 21.9 3005 119 41 label_xy 716 33
end
usecasecanvas 128386 usecase_ref 128130 // Creer_un_compte
  xyzwh 288.3 9.1 3005 119 41 label_xy 306 20
end
usecasecanvas 128514 usecase_ref 128258 // Confirmer_un_incident
  xyzwh 481.9 168 3005 121 45 label_xy 486 182
end
usecasecanvas 128642 usecase_ref 128386 // Infirmer_un_incident
  xyzwh 328.3 134.6 3005 119 41 label_xy 338 146
end
usecasecanvas 128770 usecase_ref 128514 // s'authentifier
  xyzwh 692.9 316.4 3005 119 41 label_xy 719 328
end
usecasecanvas 129666 usecase_ref 128642 // Consulter le tableau de bord
  xyzwh 312.5 211.1 3005 167 37 label_xy 324 222
end
usecasecanvas 130306 usecase_ref 128770 // consulter_les_incidents
  xyzwh 280.6 298 3005 129 45 label_xy 286 312
end
classcanvas 132994 class_ref 129282 // Admin
  simpleclassdiagramsettings end
  xyz 107.9 513.3 2000
end
usecasecanvas 133506 usecase_ref 128898 // proposition
  xyzwh 526.1 63.1 3005 87 53 label_xy 542 79
end
usecasecanvas 134914 usecase_ref 129026 // suggerer_une_modif
  xyzwh 642.1 133.4 3005 115 47 label_xy 650 146
end
usecasecanvas 135682 usecase_ref 129154 // Creer categorie
  xyzwh 738.7 571.8 3005 91 43 label_xy 748 584
end
usecasecanvas 136194 usecase_ref 135682 // modifier categorie
  xyzwh 527.6 625.6 3005 115 39 label_xy 537 634
end
usecasecanvas 136322 usecase_ref 135810 // supprimer categorie
  xyzwh 341.2 623.7 3005 115 41 label_xy 349 635
end
usecasecanvas 136450 usecase_ref 135938 // consulter categories
  xyzwh 670.5 620.9 3005 111 43 label_xy 678 632
end
usecasecanvas 136578 usecase_ref 136066 // consulter utilisateur
  xyzwh 532.6 462.1 3010 125 35 label_xy 548 472
end
usecasecanvas 136706 usecase_ref 136194 // modifier utilisateur
  xyzwh 269.5 435.6 3005 113 39 label_xy 279 446
end
usecasecanvas 136834 usecase_ref 136322 // bannir utilisateur
  xyzwh 318.2 498.2 3015 101 41 label_xy 329 512
end
usecasecanvas 136962 usecase_ref 136450 // notifier utilisateur
  xyzwh 431.9 491.8 3005 101 43 label_xy 438 506
end
usecasecanvas 143618 usecase_ref 142978 // Gerer utilisateurs
  xyzwh 452.4 367.3 3005 109 41 label_xy 464 378
end
usecasecanvas 144386 usecase_ref 143106 // Gerer categories
  xyzwh 586.7 546 3005 95 49 label_xy 594 561
end
line 129026 ----
  from ref 128130 z 3006 to ref 128386
line 129794 ----
  from ref 129666 z 3006 to ref 128130
line 130434 ----
  from ref 128130 z 3006 to point 232.6 221.7
  line 146050 z 3006 to ref 130306
relationcanvas 133122 relation_ref 129154 // <generalisation>
  from ref 132994 z 2001 to ref 128130
  no_role_a no_role_b
  no_multiplicity_a no_multiplicity_b
end
line 133250 ----
  from ref 128130 z 3006 to ref 128258
line 133634 ----
  from ref 128130 z 3006 to point 294.4 101.7
  line 145794 z 3006 to ref 133506
simplerelationcanvas 134274 simplerelation_ref 129282
  decenter_begin 619
  from ref 128514 z 3006 to ref 133506
end
simplerelationcanvas 134402 simplerelation_ref 129410
  from ref 128642 z 3006 to ref 133506
end
simplerelationcanvas 134530 simplerelation_ref 129538
  decenter_end 654
  from ref 128258 z 3006 stereotype "<<include>>" xyz 763 186 3000 to ref 128770
end
simplerelationcanvas 135170 simplerelation_ref 129922
  from ref 134914 z 3006 to ref 133506
end
simplerelationcanvas 135426 simplerelation_ref 130050
  decenter_begin 769
  decenter_end 150
  from ref 133506 z 3006 stereotype "<<include>>" xyz 635 196 3000 to ref 128770
end
simplerelationcanvas 138754 simplerelation_ref 136578
  from ref 129666 z 3006 stereotype "<<include>>" xyz 524 249 3000 to ref 128770
end
simplerelationcanvas 138882 simplerelation_ref 136706
  from ref 130306 z 3006 stereotype "<<include>>" xyz 461 300 3000 to ref 128770
end
simplerelationcanvas 143746 simplerelation_ref 137986
  from ref 136834 z 3016 to ref 143618
end
simplerelationcanvas 144002 simplerelation_ref 138114
  from ref 136578 z 3011 to ref 143618
end
simplerelationcanvas 144130 simplerelation_ref 138242
  from ref 136706 z 3006 to ref 143618
end
simplerelationcanvas 144258 simplerelation_ref 138370
  from ref 136962 z 3006 to ref 143618
end
simplerelationcanvas 144514 simplerelation_ref 138498
  from ref 136322 z 3006 to ref 144386
end
simplerelationcanvas 144642 simplerelation_ref 138626
  from ref 136194 z 3006 to ref 144386
end
simplerelationcanvas 144770 simplerelation_ref 138754
  from ref 136450 z 3006 to ref 144386
end
simplerelationcanvas 144898 simplerelation_ref 138882
  from ref 135682 z 3006 to ref 144386
end
simplerelationcanvas 145026 simplerelation_ref 139010
  from ref 143618 z 3006 stereotype "<<include>>" xyz 593 360 3000 to ref 128770
end
simplerelationcanvas 145154 simplerelation_ref 139138
  from ref 144386 z 3006 stereotype "<<include>>" xyz 658 450 3000 to ref 128770
end
line 145282 ----
  from ref 132994 z 3006 to point 275.3 378
  line 146178 z 3006 to ref 143618
line 145410 ----
  from ref 132994 z 3006 to point 317.1 577.1
  line 145538 z 3006 to ref 144386
end
