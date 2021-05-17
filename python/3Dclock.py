#!/usr/bin/env python3

from vpython import *
sekundy = arrow(pos=vector(0,0,0),axis=vector(0,1,0), shaftwidth=0.1,headwidth=0.1,color=vector(0,1,0),length=1.25)
minuty = arrow(pos=vector(0,0,0),axis=vector(0,1,0), shaftwidth=0.1,headwidth=0.1,color=vector(1,0,0),length=1)
godziny = arrow(pos=vector(0,0,0),axis=vector(0,1,0), shaftwidth=0.1,headwidth=0.1,color=vector(0,0,1),length=0.75)
ring(pos=vector(0,0,0),axis=vector(0,0,1),radius=1.70, thickness=0.1)
l12 = box(pos=vector(0,1.5,0),length=0.05, height=0.2, width=0.1)
l6 = box(pos=vector(0,-1.5,0),length=0.05, height=0.2, width=0.1)
l3 = box(pos=vector(1.5,0,0),length=0.05, height=0.2, width=0.1,axis=vector(0,1,0))
l9 = box(pos=vector(-1.5,0,0),length=0.05, height=0.2, width=0.1,axis=vector(0,1,0))

l1 = box(pos=vector((1.5/2),(1.5/2)*sqrt(3),0),length=0.05, height=0.2, width=0.1)
l2 = box(pos=vector((1.5/2)*sqrt(3),(1.5/2),0),length=0.05, height=0.2, width=0.1)
l1.rotate(angle=15,axis=vector(0,0,1))
l2.rotate(angle=-20,axis=vector(0,0,1))

l7 = box(pos=vector((1.5/2)*-1,(1.5/2)*sqrt(3)*-1,0),length=0.05, height=0.2, width=0.1)
l8 = box(pos=vector((1.5/2)*sqrt(3)*-1,(1.5/2)*-1,0),length=0.05, height=0.2, width=0.1)
l7.rotate(angle=15,axis=vector(0,0,1))
l8.rotate(angle=-20,axis=vector(0,0,1))

l10 = box(pos=vector((1.5/2)*-1,(1.5/2)*sqrt(3),0),length=0.05, height=0.2, width=0.1)
l11 = box(pos=vector((1.5/2)*sqrt(3)*-1,(1.5/2),0),length=0.05, height=0.2, width=0.1)
l10.rotate(angle=-15,axis=vector(0,0,1))
l11.rotate(angle=20,axis=vector(0,0,1))

l4 = box(pos=vector((1.5/2),(1.5/2)*sqrt(3)*-1,0),length=0.05, height=0.2, width=0.1)
l5 = box(pos=vector((1.5/2)*sqrt(3),(1.5/2)*-1,0),length=0.05, height=0.2, width=0.1)
l4.rotate(angle=-15,axis=vector(0,0,1))
l5.rotate(angle=20,axis=vector(0,0,1))

while 1:
    rate (100)
    sekundy.rotate(degrees((1/360*2/3)/100), axis=vector(0,0,-1))#degress(1/360)robilo 40 tickow na minute wiec 2*3 zeby dalo 60 i potem rate 100 wiec /100
    minuty.rotate(degrees((1/3600*2/3/6)/100), axis=vector(0,0,-1))
    godziny.rotate(degrees((1/216000*2/3/6*5)/100), axis=vector(0,0,-1))#x5 bo godzinowa robi 5 tickow w ciagu godziny