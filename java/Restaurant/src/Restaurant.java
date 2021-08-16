import java.io.FileReader;
import java.io.LineNumberReader;
import java.util.ArrayList;

class Danie
{
    private int identyfikator_dania,cena;
    private String nazwa;
    public Danie(int identyfikator_dania,int cena,String nazwa)
    {
        this.identyfikator_dania=identyfikator_dania;
        this.cena=cena;
        this.nazwa=nazwa;
    }
    public int getIdentyfikator_dania()
    {
        return identyfikator_dania;
    }
    public int getCena()
    {
        return cena;
    }
    public String getNazwa()
    {
        return  nazwa;
    }

    @Override
    public String toString() {
        return String.format("nazwa: "+nazwa+" cena: "+cena+" identyfikator: "+identyfikator_dania);
    }
}
class Menu
{
    final ArrayList<Danie> l1=new ArrayList<>();
    public Menu()
    {

    }
    public void wyswietl_menu()
    {
        for(int i=0;i<l1.size();++i)
        {
            System.out.println(l1.get(i));
        }
    }
    public void sczytaj_dania_z_pliku (String nazwa_pliku,ArrayList<Danie> lista) throws Exception
    {
        FileReader f1;
        String line;
        f1=new FileReader(nazwa_pliku);
        LineNumberReader l1=new LineNumberReader(f1);
        try {
            while ((line = l1.readLine()) != null)
            {
                String podziel[]= line.split(",");
                Danie d1=new Danie(Integer.parseInt(podziel[0]),(int)(Float.parseFloat(podziel[1])),podziel[2]);
                lista.add(d1);
            }
        }
        finally {
            l1.close();
            f1.close();
        }
    }
    public  void zamiana_listy_numerow_na_liste_dan(ArrayList<Danie> l2)
    {
        ArrayList<Danie> l3=new ArrayList<>();
        for(int i=0;i<l1.size();++i)
        {
            for(int j=0;j<l2.size();++j)
            {
                if(l1.contains(l2.get(j)))
                {
                    l3.add(l1.get(i));
                    continue;
                }
            }
        }
    }
}
class SerwisGlowny
{
    ArrayList<Danie> d1;
    public SerwisGlowny(){}
    public ArrayList<String> pobierz_nr_dan( ArrayList<Integer> nr_dan,ArrayList<Danie> l1)
    {
        ArrayList<String> s1=new ArrayList<String>();
        System.out.println("pobieram dania: ");
        boolean zn=false;
        for(int i=0;i<nr_dan.size();++i)
        {
            for(int j=0;j<l1.size();++j)
            {
                if(nr_dan.get(i).equals(l1.get(j).getIdentyfikator_dania()))
                {
                    System.out.println("pobieram danie: "+l1.get(j).getNazwa());
                    zn=true;
                    s1.add(l1.get(j).getNazwa());
                    break;
                }
            }
            if(zn!=true)
            {
                System.out.println("nie znaleziono dania o identyfikatorze "+nr_dan.get(i));
            }
            zn=false;
        }
        return s1;
    }
    public void odbierz_zamowienie(ArrayList<String> s5)
    {
        System.out.println("odebrano zamowienie");
        for(int i=0;i<s5.size();++i)
        {
            System.out.println(s5.get(i));
        }
    }

}
public class Restaurant
{
    public static void main(String[] args) throws Exception
    {
        ArrayList<String> s5;
        ArrayList<Integer> a5=new ArrayList<>();
        a5.add(4);
        a5.add(1);
        a5.add(0);
        ArrayList<Danie> l1 =new ArrayList<>();
        Menu m1=new Menu();
        m1.sczytaj_dania_z_pliku("menu.txt",l1);
//        System.out.println(l1);
        SerwisGlowny sg=new SerwisGlowny();
        s5=sg.pobierz_nr_dan(a5,l1);
        sg.odbierz_zamowienie(s5);
    }
}
