import javax.swing.*;
import javax.swing.Timer;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Rectangle2D;
class kafelek
{
    short kolor;                                        //0 - red, 1- blue, 2- green, 3 - yellow
    Rectangle2D.Double kwadrat;
    kafelek(short kolor,Rectangle2D.Double kwadrat)
    {
        this.kolor=kolor;
        this.kwadrat=kwadrat;
    }
}
class particle
{
    short kolor;
    Rectangle2D.Double kwadrat;
    double alpha;
    int r;
    particle(short kolor, Rectangle2D.Double kwadrat, double alpha,int r)
    {
        this.kolor=kolor;
        this.kwadrat=kwadrat;
        this.alpha=alpha;
        this.r=r;
    }
}
public class MAIN
{
    public static int dubluj(int x)
    {
        x*=2;
        return x;
    }
    public static int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    public static int stworz_particle(boolean [] show_particles)                    //dodaje nową particle do tablicy i zwieksza index
    {
        show_particles[pindx]=true;
        pindx++;
        if(pindx==2000)
        {
            pindx=0;
        }
        return pindx;
    }

    static int rozmiar_planszy=550;
    static double r=0;                                                  //promien kola - bo polozenie particli jest liczone na podstawie promienia
    static double alpha=0;                                              //kat nachylenia do obliczania trajektorii
    static int pindx=0;                                                 //index particli
    public static class GraphicsDemo extends JPanel implements ActionListener
    {
        //TU NIE MOZNA WYKONYWAC KODU TYLKO DEKLARACJE ZMIENNYCH
        Timer t1=new Timer(10,this);
        kafelek tab[][]=new kafelek[40][40];
        int pierwszy=0;                                                 //stany
        int zajete[];                                                   //ile pol zajete jakim kolorem
        boolean dead[];                                                 //tablica pokonanych

        boolean reds=false,blues=false,greens=false,yellows=false;      //czy ktos strzela
        int ammor=1,ammob=1,ammog=1,ammoy=1;                            //ile maja pociskow
        particle particles[];                                           //tablica particli
        boolean show_particles[];                                       //czy particle maja byc widoczne
        public void paintComponent(Graphics g)
        {
            super.paintComponent(g);
            this.setBackground(Color.black);
            Graphics2D mg = (Graphics2D) g;

            if(pierwszy==0)
            {
                //zainicjalizowanie tablic - nadanie defaultowych wartosci
                zajete=new int[4];
                dead=new boolean[4];
                for(int q=0;q<4;++q)
                {
                    zajete[q]=400;
                    dead[q]=false;
                }
                int xx=10;
                int yy=10;

                for(int i=0;i<40;++i)
                {
                    tab[i]=new kafelek[40];
                    for(int j=0;j<40;++j)                                //ustawienie kolorow i wspolrzednych
                    {
                        Rectangle2D.Double d1=new Rectangle2D.Double(xx,yy,10,10);
                        short kolor;
                        if(xx<=220&&yy<=220)
                        {
                            kolor=0;
                        }
                        else if(xx>220&&yy<=220)
                        {
                            kolor=1;
                        }
                        else if(xx<=220&&yy>220)
                        {
                            kolor=2;
                        }
                        else
                        {
                            kolor=3;
                        }
                        tab[i][j]=new kafelek((short) kolor,d1);
                        xx+=11;
                        if(xx>440)
                        {
                            xx=10;
                            yy+=11;
                        }
                    }
                }
                //inicjalizacja particli
                particles=new particle[2000];                                   //powyzej 2400 na osobe nie wyswietlaj
                show_particles=new boolean[particles.length];
                for(int q=0;q<particles.length;++q)
                {
                    show_particles[q]=false;
                    Rectangle2D.Double d1=new Rectangle2D.Double(0,0,1,1);
                    particles[q]=new particle((short)0,d1,0,0);
                }
                pierwszy=1;
            }

            //wyswietlenie planszy
            for(int b=0;b<tab.length;++b)
            {
                for(int n=0;n<tab[b].length;++n)
                {
                    mg.setColor(Color.black);
                    mg.draw(tab[b][n].kwadrat);

                    Color c1=new Color(204,0, 18);
                    Color c2=new Color(0, 11,150);
                    Color c3=new Color(0,150,0);
                    Color c4=new Color(200,200,0);
                    if(tab[b][n].kolor==0)
                    {
                        mg.setColor(c1);
                    }
                    else if(tab[b][n].kolor==1)
                    {
                        mg.setColor(c2);
                    }
                    else if(tab[b][n].kolor==2)
                    {
                        mg.setColor(c3);
                    }
                    else
                    {
                        mg.setColor(c4);
                    }
                    mg.fill(tab[b][n].kwadrat);

                }
            }

            r=40;                                                       //wyswietlenie luf
            double x=Math.sqrt((r*r)-Math.pow((Math.sin(alpha)*r),2));  // -- wspolrzedna x dla kola o promieniu r
            double y=Math.sin(alpha)*r;                                 // -- wspolrzedna y dla kola o promieniu r

            Stroke st=new BasicStroke(10);
            mg.setStroke(st);

            if(!dead[0])
            {
                mg.setColor(Color.red);
                mg.drawLine(0,0,(int)x,(int)y);
            }
            if(!dead[1])
            {
                mg.setColor(Color.blue);
                mg.drawLine(450,0,(int)(450-x),(int)y);
            }
            if(!dead[2])
            {
                mg.setColor(Color.green);
                mg.drawLine(0,450,(int)x,450-(int)y);
            }
            if(!dead[3])
            {
                mg.setColor(Color.yellow);
                mg.drawLine(450,450,450-(int)x,450-(int)y);
            }

            if(pierwszy==1)
            {
                //sprawdzenie czy nie jest pokonany
                short hq=0;
                for(int q=0;q<4;++q)
                {
                    if(dead[q]==true)
                    {
                        ++hq;
                    }
                }
                if(hq>=3)
                {
                    pierwszy=2;
                }
                else
                {                                                   //wyswietlenie planszy



                    for(int q=0;q<4;++q)                                                //losowanie czy multiply czy shoot czy nic
                    {
                        if(!dead[q])
                        {
                            int rnd=getRandomNumber(0,100);                             //1% szans
                            if(rnd==0)//x2
                            {
                                if(q==0&&reds==false)
                                {
                                    ammor=dubluj(ammor);
                                }
                                else if(q==1&&blues==false)
                                {
                                    ammob=dubluj(ammob);
                                }
                                else if(q==2&&greens==false)
                                {
                                    ammog=dubluj(ammog);
                                }
                                else if(q==3&&yellows==false)
                                {
                                    ammoy=dubluj(ammoy);
                                }
                            }
                            else if(rnd==1)//shoot
                            {
                                if(q==0&&reds==false)
                                {
                                    reds=true;
                                }
                                else if(q==1&&blues==false)
                                {
                                    blues=true;
                                }
                                else if(q==2&&greens==false)
                                {
                                    greens=true;
                                }
                                else if(q==3&&yellows==false)
                                {
                                    yellows=true;
                                }
                            }
                        }

                    }
                    // -- tworzenie particli danego koloru
                    // -- zmniejszenie ilosci pociskow o 1
                    if(reds==true)
                    {
                        java.awt.geom.Rectangle2D.Double k1=new Rectangle2D.Double(x,y,1,1);
                        particles[pindx]=new particle((short)0,k1,alpha,0);
                        pindx=stworz_particle(show_particles);
                        ammor--;
                    }
                    if(blues==true)
                    {
                        java.awt.geom.Rectangle2D.Double k1=new Rectangle2D.Double(450-x,y,1,1);
                        particles[pindx]=new particle((short)1,k1,alpha,0);
                        pindx=stworz_particle(show_particles);
                        ammob--;
                    }
                    if(greens==true)
                    {
                        java.awt.geom.Rectangle2D.Double k1=new Rectangle2D.Double(x,450-y,1,1);
                        particles[pindx]=new particle((short)2,k1,alpha,0);
                        pindx=stworz_particle(show_particles);
                        ammog--;
                    }
                    if(yellows==true)
                    {
                        java.awt.geom.Rectangle2D.Double k1=new Rectangle2D.Double(450-x,450-y,1,1);
                        particles[pindx]=new particle((short)3,k1,alpha,0);
                        show_particles[pindx]=true;
                        pindx=stworz_particle(show_particles);
                        ammoy--;
                    }
                    boolean nowa_particla=false;
                    for(int q=0;q<particles.length;++q)
                    {
                        if(show_particles[q]==true)                                 //WAZNE! sprawdzaj tylko widoczne particle a nie wszystkie!
                        {
                            if(particles[q].r>700)                                  //te ktore przelecialy plansze - zniszcz
                            {
                                Rectangle2D.Double d1=new Rectangle2D.Double(0,0,0,0);
                                particles[q]=new particle((short)0,d1,0,0);
                                show_particles[q]=false;
                            }
                            else
                            {
                                for(int h=0;h<40;++h)                                //oblicz czy trafiono i zmien wartosci
                                {
                                    for (int k = 0; k < 40; ++k)
                                    {
                                        double odleglosc = Math.sqrt(Math.pow(particles[q].kwadrat.x - tab[h][k].kwadrat.x, 2) + Math.pow(particles[q].kwadrat.y - tab[h][k].kwadrat.y, 2));
                                        short atakuje = particles[q].kolor, atakowany = tab[h][k].kolor;
                                        if(odleglosc<=10&&atakowany!=atakuje)
                                        {
                                            show_particles[q]=false;
                                            tab[h][k].kolor=atakuje;
                                            zajete[atakowany]--;
                                            zajete[atakuje]++;
                                            nowa_particla=true;
                                        }
                                        if(nowa_particla==true)
                                        {
                                            break;
                                        }
                                    }
                                    if(nowa_particla==true)
                                    {
                                        nowa_particla=false;
                                        break;
                                    }
                                }
                            }
                        }

                        if(show_particles[q]==true)                                 //przesun particle na polu na nowe wspolrzedne
                        {
                            double xred=Math.sqrt((particles[q].r*particles[q].r)-Math.pow((Math.sin(particles[q].alpha)*particles[q].r),2));
                            double yred=Math.sin(particles[q].alpha)*particles[q].r;

                            double xblue=450-Math.sqrt((particles[q].r*particles[q].r)-Math.pow((Math.sin(particles[q].alpha)*particles[q].r),2));
                            double yblue=yred;

                            double xgreen=xred;
                            double ygreen=450-Math.sin(particles[q].alpha)*particles[q].r;

                            double xyellow=xblue;
                            double yyellow=ygreen;

                            if(particles[q].kolor==0)
                            {
                                particles[q].kwadrat.x=xred;
                                particles[q].kwadrat.y=yred;
                                mg.setColor(Color.red);
                            }
                            else if(particles[q].kolor==1)
                            {
                                particles[q].kwadrat.x=xblue;
                                particles[q].kwadrat.y=yblue;
                                mg.setColor(Color.blue);
                            }
                            else if(particles[q].kolor==2)
                            {
                                mg.setColor(Color.green);
                                particles[q].kwadrat.x=xgreen;
                                particles[q].kwadrat.y=ygreen;
                            }
                            else
                            {
                                particles[q].kwadrat.x=xyellow;
                                particles[q].kwadrat.y=yyellow;
                                mg.setColor(Color.yellow);
                            }

                            mg.draw(particles[q].kwadrat);
                            particles[q].r++;
                        }

                    }
                    //jesli skonczyl strzelac to wroc do trybu zbierania pociskow
                    if(reds==true&&ammor<1)
                    {
                        reds=false;
                        ammor=1;
                    }
                    if(blues==true&&ammob<1)
                    {
                        blues=false;
                        ammob=1;
                    }
                    if(greens==true&&ammog<1)
                    {
                        greens=false;
                        ammog=1;
                    }
                    if(yellows==true&&ammoy<1)
                    {
                        yellows=false;
                        ammoy=1;
                    }
                    mg.setColor(Color.white);                                                           //wyswietl statystyki na ekranie
                    mg.drawString("RED "+Integer.toString(zajete[0])+" "+Integer.toString(ammor),450,50);
                    mg.drawString("BLUE "+Integer.toString(zajete[1])+" "+Integer.toString(ammob),450,100);
                    mg.drawString("GREEN "+Integer.toString(zajete[2])+" "+Integer.toString(ammog),450,150);
                    mg.drawString("YELLOW "+Integer.toString(zajete[3])+" "+Integer.toString(ammoy),450,200);

                    alpha=(alpha+=0.01)%(Math.PI-0.01); //liczone w Radianach!
                    //sprawdz czy nie zostal pokonany
                    if(tab[0][0].kolor!=0||tab[0][1].kolor!=0||tab[1][0].kolor!=0||tab[1][1].kolor!=0)
                    {
                        dead[0]=true;
                    }
                    if(tab[0][39].kolor!=1||tab[0][38].kolor!=1||tab[1][38].kolor!=1||tab[1][39].kolor!=1)
                    {
                        dead[1]=true;
                    }
                    if(tab[38][0].kolor!=2||tab[38][1].kolor!=2||tab[39][0].kolor!=2||tab[39][1].kolor!=2)
                    {
                        dead[2]=true;
                    }
                    if(tab[39][39].kolor!=3||tab[38][39].kolor!=3||tab[39][38].kolor!=3||tab[38][38].kolor!=3)
                    {
                        dead[3]=true;
                    }

                }
            }
            else if(pierwszy==2)                                                            //po skonczonej grze
            {

                short v=0;
                for(short q=0;q<4;++q)
                {
                    if(!dead[q])
                    {
                        v=q;
                        break;
                    }
                }

                mg.setColor(Color.white);
                String s="";
                if(v==0)
                {
                    s+="RED";
                }
                else if(v==1)
                {
                    s+="BLUE";
                }
                else if(v==2)
                {
                    s+="GREEN";
                }
                else
                {
                    s+="YELLOW";
                }
                s+=" is the winner!";
                mg.drawString(s,450,50);                                    //wyswietl tekst o zwyciezcy na ekranie
                alpha=(alpha+=0.01)%Math.PI;                                        //liczone w Radianach!
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
            this.setSize(rozmiar_planszy+50,rozmiar_planszy-50);
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
