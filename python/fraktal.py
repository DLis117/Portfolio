import sys
from math import sqrt

from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtGui import QPainter, QColor, QPolygon
from PyQt5.QtCore import QRect, QPoint
V=""

class ExampleWindow(QWidget):
    def __init__(self,parent=None):
        super().__init__(parent)
        self.setup()

    def setup(self):
        self.canv=QRect(1,1,200,200)
        self.resize(500,500)
        self.show()

    def paintEvent(self,e):
        black = QColor(0, 0, 0)
        x = 200
        y = 0
        b = int(y + (x * sqrt(3)))
        c = int(y + (x * 2))

        points = QPolygon([
            QPoint(x + y, y),
            QPoint(y, b),
            QPoint(c, b)

        ])
        painter = QPainter(self)
        painter.setRenderHints(QPainter.Antialiasing)
        painter.setBrush(black)
        painter.drawPolygon(points)
        self.sierpinski(x + y, y, y, b, c, b, V)

    def sierpinski(self,x,y,a,b,c,d,limit):
        if(limit>0):
            limit-=1
            x1= QPoint(int((x+a)/2),int((y+b)/2))
            x2=QPoint(int((a+c)/2),int((b+d)/2))
            x3=QPoint(int((c+x)/2),int((d+y)/2))
            painter = QPainter(self)
            painter.setRenderHints(QPainter.Antialiasing)
            painter.setBrush(QColor(255,255,255))
            points = QPolygon([x1,x2,x3])
            painter.drawPolygon(points)

            self.sierpinski(x1.x().__ceil__(),x1.y().__ceil__(),x,y,x3.x().__ceil__(),x3.y().__ceil__(),limit)
            self.sierpinski(x1.x().__ceil__(),x1.y().__ceil__(),a,b,x2.x().__ceil__(),x2.y().__ceil__(),limit)
            self.sierpinski(x3.x().__ceil__(), x3.y().__ceil__(),x2.x().__ceil__(),x2.y().__ceil__(),c,d,limit)

V=int(input("podaj ile warstw fraktala chcesz uzyskac"))
print("wygenerowano fraktal w nowym oknie!")

app=QApplication(sys.argv)
window=ExampleWindow()
sys.exit(app.exec_())

