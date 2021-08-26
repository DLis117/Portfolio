import javax.swing.*;
import javax.swing.Timer;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.*;

public class main2D
{
    public static int return_nucleotide()
    {
        int r=new Random().nextInt(8);
        return r;
    }
    public static void convert_dna_to_path(int z,int j,int i,population p1)
    {
        switch (z)
        {
            case 0:
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x+1;
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y;
                break;
            case 1:
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x-1;
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y;
                break;
            case 2:
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y+1;
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x;
                break;
            case 3:
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y-1;
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x;
                break;
            case 4:
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x+1;
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y-1;
                break;
            case 5:
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x-1;
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y+1;
                break;
            case 6:
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x+1;
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y+1;
                break;
            case 7:
                p1.tab[j].path[i].x=p1.tab[j].path[i-1].x-1;
                p1.tab[j].path[i].y=p1.tab[j].path[i-1].y-1;
                break;
        }
    }

    public static class best
    {
        private int value;
        private int index;
        public best(int index,int value)
        {
            this.index=index;
            this.value=value;
        }
        @Override
        public String toString()
        {
            return String.format("[index: %d, value: %d]",index,value);
        }
        int getValue()
        {
            return value;
        }
        int getIndex()
        {
            return index;
        }
    }

    public static class node
    {
        private final int time;
        private final int startx;
        private final int starty;
        int dna[];//
        Point path[];

        node(int time,int startx,int starty)
        {
            this.time=time;
            this.startx=startx;
            this.starty=starty;
            dna=new int[time];
            path=new Point[time];
            for(int i=0;i<time;++i)
            {
                path[i]=new Point(startx,starty);
            }
        }
    }
    public static class population
    {
        private final int nodes_amount;
        private final int time;
        private final int window_size_x;
        private final int targetx;
        private final int targety;
        private final int startx;
        private final int starty;
        int minv;
        int last_best;
        node tab[];
        population(int nodes_amount,int time,int window_size_x,int targetx,int targety,int startx,int starty)
        {
            this.last_best=0;
            this.targetx=targetx;
            this.targety=targety;
            this.nodes_amount=nodes_amount;
            this.time=time;
            this.window_size_x=window_size_x;
            this.startx=startx;
            this.starty=starty;
            tab=new node[nodes_amount];
            for(int i=0;i<nodes_amount;++i)
            {
                tab[i]=new node(time,startx,starty);
                for(int j=0;j<time;++j)
                {
                    tab[i].dna[j]=return_nucleotide();
                }
            }

        }
        int get_nodes_amount()
        {
            return nodes_amount;
        }
        int get_time()
        {
            return time;
        }
        int get_window_size_x()
        {
            return window_size_x;
        }
        int getTargetx()
        {
            return targetx;
        }
        int getTargety()
        {
            return targety;
        }
        int getStartx()
        {
            return startx;
        }
        int getStarty()
        {
            return starty;
        }
        int get_last_best()
        {
            return last_best;
        }
        void set_last_best(int x)
        {
            last_best=x;
        }

    }
    public static class GraphicsDemo extends JPanel implements ActionListener
    {
        //TU NIE MOZNA WYKONYWAC KODU TYLKO DEKLARACJE ZMIENNYCH
        Timer t1=new Timer(1,this);
        int state=0;
        population p1=new population(100,200,300,140,30,130,150);
        int c=0;
        int z=0;
        int x=0;
        public void paintComponent(Graphics g)
        {
            Random rnd=new Random();
            super.paintComponent(g);
            this.setBackground(Color.black);
            Graphics2D mg=(Graphics2D) g;//
            mg.setColor(Color.green);
            mg.drawRect((int)(p1.getTargetx()),(int)p1.getTargety(),10,10);
            mg.setColor(Color.white);
            if(state==0)
            {
                for(int i=1;i<p1.get_time();++i)
                {
                    for(int j=0;j<p1.get_nodes_amount();++j)
                    {
                        int z=p1.tab[j].dna[i];
                        convert_dna_to_path(z,j,i,p1);
                    }
                    if((i+1)==p1.get_nodes_amount())
                    {
                        state = 1;
                    }
                }
            }
            else if (state==1)
            {
                for(x=0;x<p1.get_nodes_amount();++x)
                {
                    if(x==p1.get_last_best())
                    {
                        mg.setColor(Color.yellow);
                    }
                    else
                    {
                        mg.setColor(Color.white);
                    }
                    mg.drawRect((int)(p1.tab[x].path[z].getX()),(int)p1.tab[x].path[z].getY(),10,10);
                }
                ++z;
                if(z==p1.get_time())
                {
                    int indexN=0;
                    p1.minv=p1.get_window_size_x();
                    for(int i=0;i<p1.get_nodes_amount();++i)
                    {
                        Point v=new Point(p1.tab[i].path[p1.get_time()-1].x,p1.tab[i].path[p1.get_time()-1].y);
                        best n1=new best(i,(int) Math.sqrt(Math.pow(v.x-p1.targetx,2)+Math.pow(v.y-p1.targety,2)));
                        if(n1.getValue()<p1.minv)
                        {
                            p1.minv=n1.getValue();
                            indexN=n1.getIndex();
                        }
                    }
                    mg.drawRect(p1.tab[indexN].path[p1.get_time()-1].x,p1.tab[indexN].path[p1.get_time()-1].y,10,10);

                    p1.set_last_best(indexN);
                    int the_best_of_all[]=new int[p1.get_time()];
                    for(int i=0;i<p1.get_time();++i)
                    {
                        the_best_of_all[i]=p1.tab[indexN].dna[i];
                    }
                    for(int i=0;i<p1.get_nodes_amount();++i)
                    {
                        p1.tab[i].dna=the_best_of_all;
                    }
//                    //modyfikacje
                    for(int i=0;i<p1.get_nodes_amount();++i)
                    {
                        p1.tab[i]=new node(p1.get_time(),p1.getStartx(),p1.getStarty());
                        for(int j=0;j<p1.get_time();++j)
                        {
                            int h=rnd.nextInt(100);//1% szans na mutacje
                            if(h==0)
                            {
                                p1.tab[i].dna[j]=return_nucleotide();
                            }
                            else
                            {
                                p1.tab[i].dna[j]=the_best_of_all[j];
                            }
                        }
                    }
                    state=2;
                }
            }
            else if(state==2)
            {
                for(int i=1;i<p1.get_time();++i)
                {
                    for(int j=0;j<p1.get_nodes_amount();++j)
                    {
//                        p1.tab[j].path[i].x=p1.tab[j].path[i].y=0;
                        int z=p1.tab[j].dna[i];
                        convert_dna_to_path(z,j,i,p1);
                    }
                    if((i+1)==p1.get_nodes_amount())
                    {
                        state = 3;
                        z=0;
                    }
                }
            }
            else if(state==3)
            {
                for(x=p1.get_nodes_amount()-1;x>=0;--x)
                {
                    if(x==p1.get_last_best())
                    {
                        mg.setColor(Color.green);
                    }
                    else
                    {
                        mg.setColor(Color.white);
                    }
                    mg.drawRect((int)(p1.tab[x].path[z].getX()),(int)p1.tab[x].path[z].getY(),10,10);
                }
                ++z;
                if(z==p1.get_time())
                {
                    z=0;
                    int indexN=0;
                    for(int i=0;i<p1.get_nodes_amount();++i)
                    {
                        Point v=new Point(p1.tab[i].path[p1.get_time()-1].x,p1.tab[i].path[p1.get_time()-1].y);
                        best n1=new best(i,(int) Math.sqrt(Math.pow(v.x-p1.targetx,2)+Math.pow(v.y-p1.targety,2)));
                        if(n1.getValue()<p1.minv)
                        {
                            p1.minv=n1.getValue();
                            indexN=n1.getIndex();
                        }
                    }
                    System.out.println("index_of_best_node "+indexN+" distance: "+p1.minv);
                    p1.set_last_best(indexN);

                    int the_best_of_all[]=new int[p1.get_time()];
                    for(int i=0;i<p1.get_time();++i)
                    {
                        the_best_of_all[i]=p1.tab[indexN].dna[i];
                    }
                    for(int i=0;i<p1.get_nodes_amount();++i)
                    {
                        p1.tab[i].dna=the_best_of_all;
                    }
//                    //modyfikacje
                    for(int i=0;i<p1.get_nodes_amount();++i)
                    {
                        p1.tab[i]=new node(p1.get_time(),p1.getStartx(),p1.getStarty());
                        for(int j=0;j<p1.get_time();++j)
                        {
                            int h=rnd.nextInt(100);
                            if(h==0)
                            {
                                p1.tab[i].dna[j]=return_nucleotide();
                            }
                            else
                            {
                                p1.tab[i].dna[j]=the_best_of_all[j];
                            }
                        }
                    }
                    if(p1.minv<3)
                    {
                        state=4;
                        p1.set_last_best(indexN);
                    }
                    else
                    {
                        state=2;
                    }
                }
            }
            else if(state==4)
            {
                z=0;
                c=0;
                state=5;
                for(int i=1;i<p1.get_time();++i)
                {
                    int gg=p1.tab[p1.get_last_best()].dna[i];
                    convert_dna_to_path(gg,p1.get_last_best(),i,p1);
                }
            }
            else if(state==5)
            {
                    int r=rnd.nextInt(11);
                    switch (r)
                    {
                        case 0:
                            mg.setColor(Color.blue);
                            break;
                        case 1:
                            mg.setColor(Color.green);
                            break;
                        case 2:
                            mg.setColor(Color.yellow);
                            break;
                        case 3:
                            mg.setColor(Color.white);
                            break;
                        case 4:
                            mg.setColor(Color.red);
                            break;
                        case 5:
                            mg.setColor(Color.cyan);
                            break;
                        case 6:
                            mg.setColor(Color.darkGray);
                            break;
                        case 7:
                            mg.setColor(Color.gray);
                            break;
                        case 8:
                            mg.setColor(Color.magenta);
                            break;
                        case 9:
                            mg.setColor(Color.orange);
                            break;
                        case 10:
                            mg.setColor(Color.pink);
                            break;
                    }

                mg.drawRect((int)(p1.tab[p1.get_last_best()].path[z].getX()),(int)p1.tab[p1.get_last_best()].path[z].getY(),10,10);
                ++z;
                if(z==p1.get_time())
                {
                    z=0;
                }

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
