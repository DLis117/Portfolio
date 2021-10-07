import org.w3c.dom.ls.LSOutput;

import javax.swing.*;
import javax.swing.Timer;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Rectangle2D;
import java.lang.reflect.Array;
import java.util.*;

class kwadrat
{
    int dlugosc;
    double a;//ax+b
    double b;//ax+b

    double x;//pozycja x
    double y;//pozycja y
    public kwadrat(int dlugosc,int a,int b,int x,int y)
    {
        this.dlugosc=dlugosc;
        this.a=a;
        this.b=b;
        this.x=x;
        this.y=y;
    }
}

public class TEST
{
    static int size=500;//rozmiar ramki
    static int bok=20;//bok kwadratu
    static int populacja=10;//ile obiektow
    public static int getRandomNumberUsingNextInt(int min, int max)
    {
        Random random = new Random();
        int c=0;
        while(c==0)
        {
            c=random.nextInt(max - min) + min;
        }
        return c;
    }

    public static class GraphicsDemo extends JPanel implements ActionListener
    {
        //TU NIE MOZNA WYKONYWAC KODU TYLKO DEKLARACJE ZMIENNYCH
        Timer t1=new Timer(10,this);
        kwadrat[] tab=new kwadrat[populacja];
        double dopuszczalna_odleglosc;
        boolean intersects[]=new boolean[tab.length];
        int pierwszy=0;
        //        int i=0;
        public void paintComponent(Graphics g)
        {
            super.paintComponent(g);
            this.setBackground(Color.black);
            Graphics2D mg = (Graphics2D) g;
            mg.setColor(Color.green);

            if(pierwszy==0)
            {
                for(int i=0;i<tab.length;++i)
                {
                    tab[i]=new kwadrat(bok,getRandomNumberUsingNextInt(-5,5),getRandomNumberUsingNextInt(-5,5),getRandomNumberUsingNextInt(0,size),getRandomNumberUsingNextInt(0,size));

                    java.awt.geom.Rectangle2D.Double d1=new Rectangle2D.Double(tab[i].x,tab[i].y,tab[i].dlugosc,tab[i].dlugosc);//pod i podstaw co chcesz wyliczyc w Y
                    mg.draw(d1);
                }
                dopuszczalna_odleglosc=Math.sqrt(Math.pow(0-tab[0].dlugosc,2)+Math.pow(0-tab[0].dlugosc,2));
                pierwszy=1;
            }
            else
            {
                for(int i=0;i<tab.length;++i)
                {
                    double f=tab[i].a*i+tab[i].b;
                    tab[i].x+=i/2;
                    tab[i].y+=f/10;
                    if(tab[i].x>size)
                    {
                        tab[i].x=0;
                    }
                    else if(tab[i].x<0)
                    {
                        tab[i].x=size;
                    }

                    if(tab[i].y>size)
                    {
                        tab[i].y=0;
                    }
                    else if(tab[i].y<0)
                    {
                        tab[i].y=size;
                    }

                }

                for(int j=0;j<tab.length;++j)
                {
                    for(int k=0;k<tab.length;++k)
                    {
                        if(!(tab[j].equals(tab[k])))//NAJWAZNIEJSZA LINIA TO NIE POROWNUJ TEGO SAMEGO ZE SOBA BO ZAWSZE BEDZIE INTERSECT!
                        {
                            double ff=Math.sqrt(Math.pow(tab[j].x-tab[k].x,2)+Math.pow(tab[j].y-tab[k].y,2));

                            if(ff<=dopuszczalna_odleglosc)
                            {
                                intersects[j]=intersects[k]=true;
                                break;
                            }
                        }

                    }
                }
                for(int j=0;j<tab.length;++j)
                {
                    if(intersects[j]==true)
                    {
                        mg.setColor(Color.red);
                    }
                    else
                    {
                        mg.setColor(Color.green);
                    }
                    java.awt.geom.Rectangle2D.Double d1=new Rectangle2D.Double(tab[j].x,tab[j].y,tab[j].dlugosc,tab[j].dlugosc);//pod i podstaw co chcesz wyliczyc w Y
                    mg.draw(d1);
                }
                intersects=new boolean[tab.length];//jesli chcesz po intersectach zmienic kolor znowu na zielony
//                ++i;
            }
        }
        public GraphicsDemo()
        {
            t1.start();
        }

        @Override
        public void actionPerformed(ActionEvent e)
        {
            repaint();//ODSWIEZ CO TIMER(X) MILISEKUND
        }
    }
    public static class MyFrame extends JFrame
    {
        GraphicsDemo g1=new GraphicsDemo();
        public MyFrame()
        {
            this.setSize(size,size);
            this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            this.add(g1);
            this.setVisible(true);

        }
    }
    public static void main(String[] args)
    {
        MyFrame mf1=new MyFrame();
//        System.out.println("XD");
    }
}
