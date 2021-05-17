#include <iostream>
#include<iomanip>
using namespace std;



struct kubelek
{
    int c;
    int indx=0;
    int* indexy;
    double* wartosci;
    kubelek()
    {
        c=2;
        indexy=new int[c];
        wartosci=new double[c];
    }
    void dispaly()
    {
        for(int i=0;i<indx;++i)
        {
            cout<<wartosci[i]<<" ";
        }
        cout<<endl;
    }
    void zwieksz_dwukrotnie_rozmiar_tablicy()
    {
        int* indexy2=new int[c*2];
        double* wartosci2=new double [c*2];
        for(int i=0;i<c;++i)
        {
            indexy2[i]=indexy[i];
            wartosci2[i]=wartosci[i];
        }
        indexy=indexy2;
        wartosci=wartosci2;
        c*=2;
    }
    void push_back(int index,double wartosc)
    {
        if(indx>=c)
        {
            zwieksz_dwukrotnie_rozmiar_tablicy();
        }
        indexy[indx]=index;
        wartosci[indx]=wartosc;
        ++indx;
    }
    void sortuj(kubelek k,int n)//WSTAWIANIE
    {
        int i, j;
        double offset;
        int ofs;
            for (i=1; i<n; i++)
            {
                offset=k.wartosci[i];
                ofs=k.indexy[i];
                j=i-1;

                while ((j>=0&&k.wartosci[j]<offset))//< bo inaczej nie zalicza!
                {
                    k.wartosci[j+1]=k.wartosci[j];
                    k.indexy[j+1]=k.indexy[j];
                    --j;
                }
                k.wartosci[j+1]=offset;
                k.indexy[j+1]=ofs;//ZLE PEWNIE

               // k.indexy[j+1]=k.indexy[offset];//zamien kubelki a nie wartosci/indeksy
            }
     }


};





int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    int ile_pudelek;
    int ile_butelek;
    int pojemnosc_tira;
    cin>>ile_pudelek>>ile_butelek>>pojemnosc_tira;
kubelek buk[ile_pudelek];
double tab[ile_pudelek][ile_butelek+1];
//    double** tab=new double*[ile_pudelek];
double x;
//pudelko tab[ile_pudelek];
    for(int i=0;i<ile_pudelek;++i)
    {
        tab[i][ile_butelek]=0;
        for(int j=0;j<ile_butelek;++j)
        {
            cin>>x;
            tab[i][j]=x;
            tab[i][ile_butelek]+=x;
        }
        int index;
        if(tab[i][ile_butelek]==ile_butelek)
        {
           index=int((tab[i][ile_butelek]/ile_butelek)*ile_pudelek)-1;
        }
        else
        {
            index=int((tab[i][ile_butelek]/ile_butelek)*ile_pudelek);
        }
        buk[index].push_back(i,tab[i][ile_butelek]);
    }


int v=0;
    for(int i=0;i<ile_pudelek;++i)
    {
        buk[i].sortuj(buk[i],buk[i].indx);
    }
//    for(int i=0;i<ile_pudelek;++i)
//    {
//        for(int j=0;j<buk[i].indx;j++)
//        {
//            cout<<" CC "<<buk[i].wartosci[j]<<" CC \n";
//            for(int z=0;z<ile_butelek;++z)
//            {
//                cout<<tab[buk[i].indexy[j]][z]<<" ";
//            }
//        }
//        cout<<endl;
//    }
//    return 0;
    for(int i=ile_pudelek-1;i>=0;--i)
    {
       // cout<<buk[i].indx<<"<<<"<<endl;
        for(int j=0;j<buk[i].indx;++j)
        {
            for(int z=0;z<ile_butelek;++z)
            {
                //cout<<buk[i].indexy[j]<<" "<<buk[i].wartosci[j]<<endl;
                cout<<tab[buk[i].indexy[j]][z]<<" ";
            }
            cout<<endl;
            ++v;
            if(v==pojemnosc_tira)
            {
                return 0;
            }
        }

    }
 return 0;
}
