#include <iostream>
using namespace std;
struct Oddzial;
struct Pracownik;
Pracownik** tablica_wskaznikow_na_pracownikow;
int GLOBAL_IDpracownika=0;
int rozmiar_tablicy;
bool tylko_przenies=false;
bool czy_byl_niedobor_prac=false;
bool do_przodu=true;
#define NULL 0
int roznica;
struct Pracownik
{
    int id;
    string nazwa_pracownika;
    Pracownik* nastepny;
    Pracownik* poprzedni;
    Oddzial* oddzial_do_ktorego_nalezy2;

    Pracownik(string nazwap)
    {
        nazwa_pracownika=nazwap;
    }
};

struct Oddzial
{
    Pracownik* kierownik;
    int wielkosc_zmiany;
    string nazwa_oddzialu;
    int ile_osob_powinno_byc_na_zmianie;
    Oddzial* nastepny;

    Oddzial()
    {
        kierownik=0;
        wielkosc_zmiany=0;
    }

    Oddzial(string nazwa_oddzialu, int ile_osob_powinno_byc_na_zmianie)
    {
        this->nazwa_oddzialu=nazwa_oddzialu;
        this->ile_osob_powinno_byc_na_zmianie=ile_osob_powinno_byc_na_zmianie;
        kierownik=0;
        wielkosc_zmiany=0;
    }
     void wstaw_przed_kierownikiem(Pracownik* p1,int id)
     {

         if(tylko_przenies==false)
         {
             p1->id=GLOBAL_IDpracownika;
         }
         else
         {
             p1->id=id;
         }
         p1->oddzial_do_ktorego_nalezy2=this;

         if(wielkosc_zmiany==0)
         {
             kierownik=p1;
             kierownik->nastepny=kierownik->poprzedni=kierownik;
         }
         else
         {
             kierownik->poprzedni->nastepny=p1;
             p1->poprzedni=kierownik->poprzedni;
             p1->nastepny=kierownik;
             kierownik->poprzedni=p1;
         }
         if(tylko_przenies==false)
         {
             --roznica;
             if(roznica==0)
             {
                 Pracownik** tab2=new Pracownik*[rozmiar_tablicy*2];
                 copy(tablica_wskaznikow_na_pracownikow,tablica_wskaznikow_na_pracownikow+rozmiar_tablicy,tab2);
                 delete []tablica_wskaznikow_na_pracownikow;
                 tablica_wskaznikow_na_pracownikow=tab2;
                 roznica+=rozmiar_tablicy;
                 rozmiar_tablicy+=roznica;
             }
             tablica_wskaznikow_na_pracownikow[GLOBAL_IDpracownika]=p1;
             ++GLOBAL_IDpracownika;
         }
         else
         {
             tablica_wskaznikow_na_pracownikow[id]=p1;
         }
         ++wielkosc_zmiany;
     }
void usun_pracownika_z_id(int id)
{
     Pracownik* p =tablica_wskaznikow_na_pracownikow[id];
     Pracownik* zaid=p->nastepny;
     Pracownik* przedid=p->poprzedni;
     if(kierownik->id==id)
     {
         kierownik=kierownik->nastepny;
         zaid->poprzedni=przedid;
         przedid->nastepny=zaid;
         p->oddzial_do_ktorego_nalezy2=0;
     }
     else
     {
         zaid->poprzedni=przedid;
         przedid->nastepny=zaid;
         p->oddzial_do_ktorego_nalezy2=0;
     }
     p=0;
     --wielkosc_zmiany;
}

};
struct szpital
{
    Oddzial* pierwszy;
    Oddzial* ostatni;
    int ile_jest_oddzialow;

    szpital()
    {
        ile_jest_oddzialow=0;
    }
    Oddzial* znajdz_oddzial_o_nazwie(string nazwa)
    {
        Oddzial* i=pierwszy;
        for(int ii=0;ii<ile_jest_oddzialow;++ii)
        {
            if(i->nazwa_oddzialu==nazwa)
            {
                return i;
            }
            i=i->nastepny;
        }
    }
    void dodaj_oddzial(Oddzial* nowy)
    {
        nowy->nastepny=0;
        if(ile_jest_oddzialow==0)
        {
            pierwszy=ostatni=nowy;
            ++ile_jest_oddzialow;
            return;
        }
        else
        {
            ostatni->nastepny=nowy;
            ostatni=nowy;
            ++ile_jest_oddzialow;
        }
    }
    void dodaj_pracownika_o_nazwie_przed_kierownika_do_oddzialu(string nazwa,string naz_oddzialu)
    {
        Oddzial* ii=znajdz_oddzial_o_nazwie(naz_oddzialu);
        ii->wstaw_przed_kierownikiem(new Pracownik(nazwa),0);
    }
    void znajdz_oddzial_o_nazwie_i_usun(string naz_oddzialu)
    {
        int h=0;
        for(Oddzial* i=pierwszy,*przedi=pierwszy;i!=0;i=i->nastepny)
        {
           if(h>1)
           {
                    przedi=przedi->nastepny;
           }
           ++h;
            if(i->nazwa_oddzialu==naz_oddzialu)
            {
                   if(pierwszy==i)
                   {
                       Oddzial* do_zostawienia=i->nastepny;
                       pierwszy=do_zostawienia;
                   }
                   else if(i==ostatni)
                   {
                       ostatni=przedi;
                       i=0;
                   }
                   else
                   {
                       przedi->nastepny=i->nastepny;
                       i=0;
                   }
                --ile_jest_oddzialow;
                break;
            }
        }
    }

void znajdz_pracownika_o_id_i_przenies_go_do_oddzialu_o_nazwie(int id,string nazwa_oddzialu1)
{

    Oddzial* i=znajdz_oddzial_o_nazwie(nazwa_oddzialu1);
    Oddzial* z_ktorego_usunac=tablica_wskaznikow_na_pracownikow[id]->oddzial_do_ktorego_nalezy2;

    if(z_ktorego_usunac!=0)
    {
        z_ktorego_usunac->usun_pracownika_z_id(id);
    }
    tylko_przenies=true;
    i->wstaw_przed_kierownikiem(new Pracownik(tablica_wskaznikow_na_pracownikow[id]->nazwa_pracownika),id);
    tablica_wskaznikow_na_pracownikow[id]->oddzial_do_ktorego_nalezy2=i;
    tylko_przenies=false;
}
    void display_S(int liczba)
    {
        Oddzial* ii=pierwszy;
        for(int i=0;i<ile_jest_oddzialow;++i)
        {
            if(ii->wielkosc_zmiany==0)
            {
                cout<<"(niedobor pracownikow)"<<ii->nazwa_oddzialu<<":.\n";
            }
            else
            {
                //----------------------------
                    czy_byl_niedobor_prac=tylko_przenies=false;
                    int ss1=ii->ile_osob_powinno_byc_na_zmianie*liczba;
                    if(ss1>ii->wielkosc_zmiany)
                    {
                        do_przodu=true;
                    }
                    else
                    {
                        do_przodu=false;
                    }
                    ss1%=ii->wielkosc_zmiany;
                    if(do_przodu==true)
                    {
                        for(int j=0;j<ss1;++j)
                        {
                            ii->kierownik=(ii->kierownik)->nastepny;
                        }
                    }
                    else
                    {
                        for(int j=0;j<(ii->wielkosc_zmiany)-ss1;++j)
                        {
                            ii->kierownik=(ii->kierownik)->poprzedni;
                        }
                    }

                if(ii->ile_osob_powinno_byc_na_zmianie>ii->wielkosc_zmiany)
                {
                    cout<<"(niedobor pracownikow)";
                    czy_byl_niedobor_prac=true;
                }
                cout<<ii->nazwa_oddzialu<<":";
                int le;
                if(czy_byl_niedobor_prac==true)
                {
                    le=ii->wielkosc_zmiany;
                }
                else
                {
                    le=ii->ile_osob_powinno_byc_na_zmianie;
                }
                Pracownik* p=ii->kierownik;
                for(int j=0;j<le-1;++j)
                {
                    cout<<p->nazwa_pracownika;
                    cout<<",";
                    p=p->nastepny;
                }
                cout<<p->nazwa_pracownika;
                cout<<".\n";
                //----------------------------
            }

            ii=ii->nastepny;
        }
        cout<<"-\n";
    }
};

int main()
{

    ios_base::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    rozmiar_tablicy=1000;
    roznica=rozmiar_tablicy;
    char litera;
    unsigned int liczba;
    string nazwa,nazwa2;
    szpital sz;
    int n;
    cin>>n;
    tablica_wskaznikow_na_pracownikow=new Pracownik*[rozmiar_tablicy];
    for(int i=0;i<n;++i)
        {
            cin>>litera;
            switch (litera)
            {
                case 'a':
                    cin>>litera;
                    if(litera=='w')
                    {
                        cin>>nazwa>>liczba;
                        sz.dodaj_oddzial(new Oddzial(nazwa,liczba));
                    }
                    else if(litera=='e')
                    {
                        cin>>nazwa>>nazwa2;
                        sz.dodaj_pracownika_o_nazwie_przed_kierownika_do_oddzialu(nazwa,nazwa2);
                    }
                break;
                case 'd':
                    cin>>litera;
                    if(litera=='w')
                    {
                            cin>>nazwa;
                            sz.znajdz_oddzial_o_nazwie_i_usun(nazwa);
                    }
                    else if(litera=='e')
                    {
                        cin>>liczba;
                        Oddzial* szukany_oddzial=tablica_wskaznikow_na_pracownikow[liczba]->oddzial_do_ktorego_nalezy2;
                        szukany_oddzial->usun_pracownika_z_id(liczba);
                    }
                break;
                case 'm':
                    cin>>liczba>>nazwa;
                    sz.znajdz_pracownika_o_id_i_przenies_go_do_oddzialu_o_nazwie(liczba,nazwa);
                break;
                case 'e':
                    cin>>litera;
                    if(litera=='w')
                    {
                        cin>>nazwa>>nazwa2>>liczba;
                        Oddzial* i=sz.znajdz_oddzial_o_nazwie(nazwa);
                        i->nazwa_oddzialu=nazwa2;
                        i->ile_osob_powinno_byc_na_zmianie=liczba;
                    }

                    else if(litera=='e')
                    {
                        cin>>liczba>>nazwa;
                        tablica_wskaznikow_na_pracownikow[liczba]->nazwa_pracownika=nazwa;
                    }
                break;
                case 's':
                    cin>>liczba;
                    if(sz.ile_jest_oddzialow==0) //jezeli oddzialow nie ma wcale to wyswietl jedynie -
                    {
                        cout<<"-\n";
                        break;
                    }
                    sz.display_S(liczba);
            }
        }
        return 0;
    }
