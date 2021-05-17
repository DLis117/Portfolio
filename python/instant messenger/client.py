import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel,QGridLayout,QLineEdit, QPushButton,QTextEdit
from PyQt5 import QtCore
napis=""
ktore=""
###################

from socket import *
s=socket(AF_INET,SOCK_STREAM)
s.connect(("localhost",8888))


class subwindow(QWidget):
    got_msg=QtCore.pyqtSignal(str)
    def __init__(self,parent=None):
        super(subwindow,self).__init__(parent)
        self.setup()

    def setup(self):
        self.tx1=QTextEdit()
        self.tx1.setReadOnly(True)
        self.tf1=QLineEdit()###do wpisywania tekstu
        self.bu=QPushButton("wyslij")
        self.bu.clicked.connect(self.wyslano)
        uklad=QGridLayout()
        uklad.addWidget(self.tx1,0,0)
        uklad.addWidget(self.tf1,1,0)
        uklad.addWidget(self.bu,2,0)
        self.setLayout(uklad)

    def wyslano(self):
        self.got_msg.emit(self.tf1.text())

class Mainwindow(QWidget):
    def __init__(self,parent=None):
        super(Mainwindow,self).__init__(parent)
        self.subwindowy = [subwindow() for i in range(5)]
        for i in range (5):
            self.subwindowy[i].setWindowTitle("czat nr "+str(i+1))
            self.subwindowy[i].got_msg.connect(self.show_msg)
        self.setup()

    def show_msg(self,msg):
        global ktore
        for i in range (5):
            if(msg==self.subwindowy[i].tf1.text()):#dzieki temu wiadomo z ktorej grupy wyslano wiadomosc
                ktore=i
                if(self.subwindowy[i].tf1.text()!=""):
                    self.subwindowy[i].tf1.setText("")
        msg+=str(ktore)#ostatnia cyfra w wiadomosci mowi ktora to byla grupa
        napis = str(self.name.text()) + ": " + msg
        s.send(napis.encode())
        data = s.recv(1024)
        rv=data.decode()
        self.subwindowy[ktore].tx1.setText(rv)

    def setup(self):
        self.l1=QLabel("wybierz grupe: ")
        self.b1=QPushButton("grupa1")
        self.b2 = QPushButton("grupa2")
        self.b3 = QPushButton("grupa3")
        self.b4 = QPushButton("grupa4")
        self.b5 = QPushButton("grupa5")
        self.l2=QLabel("podaj nazwe uzytkownika")
        self.name=QLineEdit()

        self.b1.clicked.connect(self.dodaj)
        self.b2.clicked.connect(self.dodaj)
        self.b3.clicked.connect(self.dodaj)
        self.b4.clicked.connect(self.dodaj)
        self.b5.clicked.connect(self.dodaj)

        uklad=QGridLayout()
        uklad.addWidget(self.l2,0,0)
        uklad.addWidget(self.name,0, 1)

        uklad.addWidget(self.l1,1,0)
        uklad.addWidget(self.b1,2,0)
        uklad.addWidget(self.b2, 2, 1)
        uklad.addWidget(self.b3, 2, 2)
        uklad.addWidget(self.b4, 2, 3)
        uklad.addWidget(self.b5, 2, 4)
        self.setLayout(uklad)
        self.show()

    def dodaj(self):
        n=self.sender()
        if(n.text()=="grupa1"):
            self.subwindowy[0].show()
        elif(n.text()=="grupa2"):
            self.subwindowy[1].show()
        elif (n.text() == "grupa3"):
            self.subwindowy[2].show()
        elif (n.text() == "grupa4"):
            self.subwindowy[3].show()
        elif (n.text() == "grupa5"):
            self.subwindowy[4].show()

app=QApplication(sys.argv)
window=Mainwindow()
sys.exit(app.exec_())
s.close()