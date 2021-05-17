import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class calculus
{

    JFrame f1=new JFrame();
    JTextField t1=new JTextField(10);
    JTextField t2=new JTextField(10);
    JButton licz=new JButton("licz");
    public int licznwd(int pierwsza,int druga)
    {
        while (pierwsza != druga) // dopóki dwie liczby nie są sobie równe
        {
            if (pierwsza > druga)  // sprawdzamy, która z nich jest większa
            {
                pierwsza = pierwsza - druga; // odejmujemy mniejszą liczbę
            }                               // od większej
            else
            {
                druga = druga - pierwsza;
            }
        }
        return pierwsza;
    }
    calculus()
    {
        f1.add(t1);
        f1.add(t2);
        f1.add(licz);
        licz.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent)
            {
                String s1=t1.getText();
                String s2=t2.getText();
                int is1=Integer.parseInt(s1);
                int is2=Integer.parseInt(s2);

                int nwdd=licznwd(is1,is2);
                String xd=String.valueOf(nwdd);
                JTextField t3=new JTextField(xd,5);
                f1.add(t3);
                licz.setVisible(false);
                f1.setVisible(true);
                f1.setSize(250,170);
                f1.setLayout(new FlowLayout());
                f1.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            }
        });
        f1.setVisible(true);
        f1.setSize(250,170);
        f1.setLayout(new FlowLayout());
        f1.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

}
public class KalkNWD
{
    public static int NWD_1(int pierwsza, int druga)
    {
        while (pierwsza != druga) // dopóki dwie liczby nie są sobie równe
        {
            if (pierwsza > druga)  // sprawdzamy, która z nich jest większa
            {
                pierwsza = pierwsza - druga; // odejmujemy mniejszą liczbę
            }                               // od większej
            else
            {
                druga = druga - pierwsza;
            }
        }
        return pierwsza;
    }
    static calculus c1=new calculus();
    public static void main(String[] args) {

    }
}
