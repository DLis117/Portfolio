import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class Kalk
{

    String sliczba="";

    JFrame f1=new JFrame("Kalkulator prosty");
//    JTextField t1=new JTextField();
//    TextField t2=new TextField(sliczba,20);
//    JLabel t1=new JLabel(sliczba);
//    JLabel t2;
//    label.setkj a sfd ;asf d ;ij
    JTextArea t1=new JTextArea(sliczba);



    JButton zero=new JButton("0");
    JButton jeden=new JButton("1");
    JButton dwa=new JButton("2");
    JButton trzy=new JButton("3");
    JButton cztery=new JButton("4");
    JButton piec=new JButton("5");
    JButton szesc=new JButton("6");
    JButton siedem=new JButton("7");
    JButton osiem=new JButton("8");
    JButton dziewiec=new JButton("9");
    JButton plus=new JButton("+");
    JButton minus=new JButton("-");
    JButton razy=new JButton("*");
    JButton podzielic=new JButton("/");
    JButton to_sie_rowna=new JButton("=");
    public Kalk()
    {
        f1.add(t1);
        f1.add(zero);
        f1.add(jeden);
        f1.add(dwa);
        f1.add(trzy);
        f1.add(cztery);
        f1.add(piec);
        f1.add(szesc);
        f1.add(siedem);
        f1.add(osiem);
        f1.add(dziewiec);
        f1.add(plus);
        f1.add(minus);
        f1.add(razy);
        f1.add(podzielic);
        f1.add(to_sie_rowna);

        jeden.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent)
            {
                            sliczba+="1";
                            //t1=new JLabel(sliczba);
               t1.append("1");
//                            t1.setVisible(true);
//                            f1.add(t1);
//                            f1.setLayout(new FlowLayout());
                            //t2=new JLabel(sliczba);
                            //f1.add(t2);

            }
        });
        dwa.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="2";
                t1.append("2");
            }
        });
        zero.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="0";t1.append("0");
            }
        });
        trzy.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="3";t1.append("3");
            }
        });
        cztery.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="4";t1.append("4");
            }
        });
        piec.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="5";t1.append("5");
            }
        });
        szesc.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="6";t1.append("6");
            }
        });
        siedem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="7";t1.append("7");
            }
        });
        osiem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="8";t1.append("8");
            }
        });
        dziewiec.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="9";t1.append("9");
            }
        });
        plus.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="+";t1.append("+");
            }
        });
        minus.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="-";t1.append("-");
            }
        });
        razy.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="*";t1.append("*");
            }
        });
        podzielic.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                sliczba+="/";t1.append("/");
            }
        });
        to_sie_rowna.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent)
            {
                String[] words=sliczba.split("");//regexy nie działajom :<
                String liczba1="";
                String liczba2="";
                int index2 = 0;
                String znak="";
                for(int i=0;i<words.length;++i)
                {

                    if((words[i].equals("+"))==false&&(words[i].equals("-"))==false&&(words[i].equals("*"))==false&&(words[i].equals("/"))==false)
                    {
                        liczba1+=words[i];

                    }
                    else
                    {
                        index2=i;
                        //System.out.println(index2);//kolejna liczba od index+1
                        break;
                    }
//                    System.out.println("XD");


                }
             for(int i=index2+1;i<words.length;++i)
             {
                 liczba2+=words[i];
             }
                        int l1,l2;
             l1=Integer.parseInt(liczba1);
             l2=Integer.parseInt(liczba2);
             int wynik=0;
             znak=words[index2];
             if(znak.equals("/"))
             {
                 wynik=l1/l2;
             }
             else if(znak.equals("*"))
             {
                 wynik=l1*l2;
             }
             else if(znak.equals("-"))
             {
                 wynik=l1-l2;
             }
             else if(znak.equals("+"))
             {
                 wynik=l1+l2;
             }
//             t1= new JTextArea(String.valueOf(wynik));
                String xd= String.valueOf(wynik);
                JTextArea t2=new JTextArea(xd);
                t1.setVisible(false);
                t2.setVisible(true);
                f1.add(t2);
            }
        });
        f1.setVisible(true);
        f1.setSize(250,170);
        f1.setLayout(new FlowLayout());
        f1.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    }
}
public class Calculus
{
    static Kalk k1=new Kalk();
    public static void main(String[] args)
    {

    }
}