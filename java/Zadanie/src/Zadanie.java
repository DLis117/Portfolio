import java.io.FileReader;
import java.io.LineNumberReader;
import java.util.ArrayList;

abstract class Ksiazka
{
    Dane d1;
    public Ksiazka(Dane d1)
    {
        this.d1=d1;
    }
    public abstract int licz_zysk_ze_sprzedazy();
}
class elektroniczne extends Ksiazka
{
    int liczba_stron, ceny_kupna,ceny_sprzedazy_ksiazki;
    int rozmiar;
    String adres;
    public elektroniczne(Dane d2,int rozmiar,String adres)
    {

        super(d2);/*??*/
        this.rozmiar=rozmiar;
        this.adres=adres;
    }
    @Override
    public int licz_zysk_ze_sprzedazy()
    {
        return (int) ((ceny_kupna- ceny_sprzedazy_ksiazki) *0.8);
    }
}
class papierowe extends Ksiazka
{
    int liczba_stron, ceny_kupna,ceny_sprzedazy_ksiazki;
    int numer_regealu;
    public papierowe(Dane d2, int numer_regealu)
    {
        super(d2);
        this.numer_regealu=numer_regealu;
    }

    @Override
    public int licz_zysk_ze_sprzedazy()
    {
        return (int) ((ceny_kupna- ceny_sprzedazy_ksiazki) *0.7);
    }
}
class RejestrKsiazek {
    ArrayList<Ksiazka> l1 = new ArrayList<>();

    public RejestrKsiazek() {

    }

    public ArrayList<Ksiazka> liste_ksiazek_danego_autora(String autor) {
        ArrayList<Ksiazka> l2 = new ArrayList<>();
        for (int i = 0; i < l1.size(); ++i) {
            if (l1.contains(autor)) {
                l2.add(l1.get(i));
            }
        }
        return l2;
    }

    public int laczny_zysk_ze_sprzedarzy_ksiazek() {
        int wartosc = 0;
        for (int i = 0; i < l1.size(); ++i) {
            wartosc += l1.get(i).licz_zysk_ze_sprzedazy();
        }
        return wartosc;
    }
    public void wczytaj_info_pliku (String nazwa_pliku,ArrayList<Ksiazka> a2) throws Exception
    {
        FileReader f1;
        String line;
        f1=new FileReader(nazwa_pliku);
        LineNumberReader l1=new LineNumberReader(f1);
        String words[];
        try {
            while ((line = l1.readLine()) != null) {
                words = line.split(",");
                if(words[0].equals("papierowa"))
                {
                    Dane d3=new Dane(words[1],words[2],Integer.parseInt(words[3]),Integer.parseInt(words[4]),Integer.parseInt(words[5]));
                    Ksiazka k1=new papierowe(d3,Integer.parseInt(words[3]));
                    a2.add(k1);
                }
                else
                {
                    Dane d3=new Dane(words[1],words[2],Integer.parseInt(words[3]),Integer.parseInt(words[4]),Integer.parseInt(words[5]));
                    Ksiazka d4=new elektroniczne(d3,Integer.parseInt(words[7]),words[6]);
                    a2.add(d4);
                }
//
            }
        }
        finally {
            l1.close();
            f1.close();
        }
    }

}

class Dane
{
    String autor,tytul;
    int liczba_stron, ceny_kupna,ceny_sprzedazy_ksiazki;

    public Dane(String autor,String tytul,int liczba_stron,int ceny_kupna,int ceny_sprzedazy_ksiazki)
    {
        this.autor=autor;
        this.ceny_kupna=ceny_kupna;
        this.tytul=tytul;
        this.liczba_stron=liczba_stron;
        this.ceny_sprzedazy_ksiazki=ceny_sprzedazy_ksiazki;
    }
    String getAutor()
    {
        return autor;
    }
    String getTytul()
    {
        return tytul;
    }
    int getLiczba_stron()
    {
        return liczba_stron;
    }
    int getCeny_kupna()
    {
        return ceny_kupna;
    }
    int getCeny_sprzedazy_ksiazki()
    {
        return ceny_sprzedazy_ksiazki;
    }
}
public class Zadanie/*TO ZMIEN!!*/
{
    public static void main(String[] args)
    {

    }
}
