import javax.swing.*;
import javax.swing.Timer;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Rectangle2D;

import static java.lang.Math.*;

public class Graphs
{
    public static class GraphicsDemo extends JPanel implements ActionListener
    {
        //TU NIE MOZNA WYKONYWAC KODU TYLKO DEKLARACJE ZMIENNYCH
        Timer t1=new Timer(1000,this);

        public void paintComponent(Graphics g)
        {
            super.paintComponent(g);
            this.setBackground(Color.black);
            Graphics2D mg=(Graphics2D) g;//
            mg.setColor(Color.white);

            int x=300;
            for(int i=0;i<x;++i)
            {

                mg.drawRect(x/2,i,1,1);
                mg.drawRect(i,x/2,1,1);
            }
            mg.setColor(Color.green);
            for(double i=-x/2;i<=x/2;i+=0.01)
            {
                java.awt.geom.Rectangle2D.Double d1=new Rectangle2D.Double(i+x/2,(x/2-(((i*i-(14*i)+72)))),1,1);//pod i podstaw co chcesz wyliczyc w Y
                mg.draw(d1);
            }
            t1.stop();
        }
        public GraphicsDemo()
        {
            t1.start();
        }

        @Override
        public void actionPerformed(ActionEvent e)
        {
            repaint();
        }
    }
    public static class MyFrame extends JFrame
    {
        GraphicsDemo g1=new GraphicsDemo();
        public MyFrame()
        {
            this.setSize(300,300);
            this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            this.add(g1);
            this.setVisible(true);
        }
    }
    public static void main(String[] args)
    {
        MyFrame mf1=new MyFrame();
    }
}
