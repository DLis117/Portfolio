#include <iostream>

using namespace std;
class Drzewo
{
    struct Element
    {
       int g;//ile ma galezi
       string nazwa;
       Element* lsyn;
       Element* pbrat;
       int ile_galezi_ma_juz_zapelnionych;
    };
    Element* root;
    Element* aktualny;
public:
    Drzewo();
    void display_postorder(Element* );
    void push_back(int g,string nazwa);
    Element* getroot();
    void getbacktoroot();

    void setroot(int g,string nazwa);
};

int main()
{
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);
    //uzywaj \n zamiast endl
    int n;
    cin>>n;
    int liczba;
    string nazwa;
    Drzewo d1;
    for(int i=0;i<n;++i)
    {
        cin>>liczba>>nazwa;
        if(i==0)//dodaj roota
        {
            d1.setroot(liczba,nazwa);
        }
        else
        {
            d1.push_back(liczba,nazwa);
        }
    }
    //d1.getbacktoroot();
    d1.display_postorder(d1.getroot());
   // cout << "Hello World!" << endl;
    return 0;
}

Drzewo::Drzewo()
{
    Element* nowy=new Element;
    root=nowy;
    root->g=0;
    root->nazwa="";
    root->lsyn=root->pbrat=NULL;
    aktualny=root;
    root->ile_galezi_ma_juz_zapelnionych=0;
}

void Drzewo::display_postorder(Element* r)//? NIE WIEM CZY DOBRZE
{
    if(r==NULL)
    {
        return;
    }
    display_postorder(r->lsyn);
    display_postorder(r->pbrat);

    cout<<r->nazwa<<" ";

}

void Drzewo::push_back(int g,string nazwa)//nie zawsze powstaje nowy element
{

    if(root->lsyn==NULL&&root->g>root->ile_galezi_ma_juz_zapelnionych)
    {
        //dodaj kogos jako lsyna roota
        Element* nowy=new Element;
        nowy->g=g;
        nowy->nazwa=nazwa;
        nowy->lsyn=NULL;
        nowy->pbrat=NULL;
        nowy->ile_galezi_ma_juz_zapelnionych=0;
        aktualny->lsyn=nowy;
        aktualny->ile_galezi_ma_juz_zapelnionych++;
        if(aktualny->ile_galezi_ma_juz_zapelnionych==aktualny->g)
        {
            aktualny=aktualny->lsyn;
        }

    }
//    if(aktualny->lsyn==NULL&&aktualny->ile_galezi_ma_juz_zapelnionych<aktualny->g)
//    {
//        //nie posluguj sie rootem tylko aktualnym
//        Element* nowy=new Element;
//        nowy->g=g;
//        nowy->nazwa=nazwa;
//        nowy->lsyn=NULL;
//        nowy->pbrat=NULL;
//        aktualny->lsyn=nowy;
//        aktualny=nowy;
//        nowy->ile_galezi_ma_juz_zapelnionych=0;
//        aktualny->ile_galezi_ma_juz_zapelnionych++;
//    }
//    else
//    {
//        bool calkiemnowagalaz=true;
//        Element* kopia=aktualny->lsyn;
//        do
//        {
//            if(kopia->g==g)
//            {

//                aktualny=kopia;
//                calkiemnowagalaz=false;
//                break;
//            }
//            if(kopia->pbrat!=NULL)
//            kopia=kopia->pbrat;//zeby kopia nigdy nie stala sie nullem
//            // wykonuje sie czasem za duzo razy
//            //makes u think
//        }while(kopia->pbrat!=NULL);
//        if(kopia->g==g)
//        {

//            aktualny=kopia;
//            calkiemnowagalaz=false;
//        }

//        if(calkiemnowagalaz==true)
//        {
//            Element* nowy=new Element;
//            nowy->g=g;
//            nowy->lsyn=nowy->pbrat=NULL;
//            kopia->pbrat=nowy;
//            aktualny=nowy;
//        }

//    }
}

Drzewo::Element *Drzewo::getroot()
{
    return this->root;
}

void Drzewo::getbacktoroot()
{
    this->aktualny=root;
}

void Drzewo::setroot(int g, string nazwa)
{
    this->root->g=g;
    this->root->nazwa=nazwa;
    this->root->ile_galezi_ma_juz_zapelnionych=0;
}
