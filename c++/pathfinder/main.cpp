#include <iostream>
#include<ctime>
#include<cstdlib>
#include<chrono>
#include<thread>
#include<conio.h>
using namespace std;
struct Element
{
    int x;
    int y;
};
int mobit=0;
struct plansza
{
    char** tab_of_obstacles;
    int** tab;
    int x;
    int y;
    int pointx;
    int pointy;
    int celx;
    int cely;
    void generatetab(int x,int y);
    void displaytab();
    void mobpodejdz()
    {
        int idzx=0,idzy=0;
        int v=-1;
        int i=celx,j=cely;
        if(tab_of_obstacles[i-1][j]!='D'&&tab[i-1][j]!=0)
        {
            if(tab[i-1][j]>v)
            {
                v=tab[i-1][j];
                idzx=i-1;idzy=j;
            }
        }
        if(tab_of_obstacles[i+1][j]!='D'&&tab[i+1][j]!=0)
        {
            if(tab[i+1][j]>v)
            {
                v=tab[i+1][j];
                idzx=i+1;idzy=j;
            }
        }
        if(tab_of_obstacles[i][j-1]!='D'&&tab[i][j-1]!=0)
        {
            if(tab[i][j-1]>v)
            {
                v=tab[i][j-1];
                idzx=i;idzy=j-1;
            }
        }
        if(tab_of_obstacles[i][j+1]!='D'&&tab[i][j+1]!=0)
        {
            if(tab[i][j+1]>v)
            {
                v=tab[i][j+1];
                idzx=i;idzy=j+1;
            }
        }
        tab_of_obstacles[celx][cely]=' ';//kasuje tam gdzie byl dopiero
        tab[celx][cely]--;//zeby nie wracal sie w to samo miejsce co juz byl!!!!
        celx=idzx;cely=idzy;
        tab_of_obstacles[celx][cely]='+';//ustawiam w nowe miejsce
    }
    void playerruszsie(char li)
    {
        tab_of_obstacles[pointx][pointy]=' ';//wyczysc
        if(li=='s')
        {
         if(tab_of_obstacles[pointx+1][pointy]!='D'&&tab_of_obstacles[pointx+1][pointy]!='x')
         {
             pointx++;
         }
        }
        else if(li=='a')
        {
            if(tab_of_obstacles[pointx][pointy-1]!='D'&&tab_of_obstacles[pointx][pointy-1]!='x')
            {
                pointy--;
            }
        }
        else if(li=='w')
        {
            if(tab_of_obstacles[pointx-1][pointy]!='D'&&tab_of_obstacles[pointx-1][pointy]!='x')
            {
                pointx--;
            }
        }
        else if(li=='d')
        {
            if(tab_of_obstacles[pointx][pointy+1]!='D'&&tab_of_obstacles[pointx][pointy+1]!='x')
            {
                pointy++;
            }
        }
        tab_of_obstacles[pointx][pointy]='0';
        int v=100;
        tab[pointx][pointy]=v;
        for(int d=pointy-1;tab_of_obstacles[pointx][d]!='x';--d)
        {
            tab[pointx][d]=v-1;
            --v;
        }
        v=100;
        for(int d=pointy+1;tab_of_obstacles[pointx][d]!='x';++d)
        {
            tab[pointx][d]=v-1;
            --v;
        }
        for(int d=1;d<y-1;++d)
        {
            //2 petle
            //mniejsze
            int vv=tab[pointx][d];
            for(int c=pointx;c>0;--c)
            {
                tab[c][d]=vv;
                --vv;
            }
            //wieksze
            vv=tab[pointx][d];
            for(int c=pointx;c<x-1;++c)
            {
                tab[c][d]=vv;
                --vv;
            }
        }
    }
};




int main()
{
    srand(time(0));
    int q=1;
    plansza* tab=new plansza[q];
    for(int i=0;i<q;++i)
    {
        tab[i].generatetab(10,15);
        tab[i].displaytab();
    }
    char li;
    cout<<"press s to start press p to stop\n";
    for(;;)
    {
        if(kbhit())
        {
            switch (li=getche())
            {
                case 's':
                cout<<"odpalam!"<<endl;
                this_thread::sleep_for(chrono::milliseconds(1000));
                break;
            }
            if(li=='s')
            {
                break;
            }
        }
    }
    for(;;)
    {
        ++mobit;
        tab->displaytab();
        //this_thread::sleep_for(chrono::milliseconds(1000));
        system("cls");
        if(kbhit())
        {
            switch (li=getche())
            {
                case 's':
                tab->playerruszsie('s');
                break;
                case 'w':
                tab->playerruszsie('w');
                break;
                case 'a':
                tab->playerruszsie('a');
                break;
                case 'd':
                tab->playerruszsie('d');
                break;
            }

            if(li=='p')
            {
                cout<<"koniec!"<<endl;
                break;
            }
        }
        if(mobit==8)//jak czesto ma sie wykonywac podejscie moba
        {
            tab->mobpodejdz();
            mobit=0;
        }
    }
    delete [] tab;
    return 0;
}

void plansza::generatetab(int x, int y)
{
    this->x=x;
    this->y=y;
    tab_of_obstacles=new char*[x];
    tab=new int*[x];
    for(int i=0;i<x;++i)
    {
        tab_of_obstacles[i]=new char[y];
        tab[i]=new int[y];
    }
    for(int i=0;i<x;++i)
    {
        for(int j=0;j<y;++j)
        {
            tab_of_obstacles[i][j]=' ';
        }
    }
    for(int i=0;i<x;++i)
    {
        tab_of_obstacles[i][y-1]='x';
        tab_of_obstacles[i][0]='x';
    }
    for(int i=0;i<y;++i)
    {
        tab_of_obstacles[x-1][i]='x';
        tab_of_obstacles[0][i]='x';
    }
    for (int i=0;i<5;++i)
    {
        tab_of_obstacles[(rand()%(x-2))+1][(rand()%(y-2))+1]='D';//kamien
    }
    this->celx=(rand()%(x-2))+1;
    this->cely=(rand()%(y-2))+1;
    this->pointx=(rand()%(x-2))+1;
    this->pointy=(rand()%(y-2))+1;
    tab_of_obstacles[pointx][pointy]='0';//player
    tab_of_obstacles[celx][cely]='+';//mob

    int a=x,b=y;
    for(a=0;a<x;++a)
    {
        for(b=0;b<y;++b)
        {
            tab[a][b]=0;
        }
    }

                    //gdy playeer zmieni pozycje obliccz na nowo
    int v=100;
    tab[pointx][pointy]=v;
    for(int d=pointy-1;tab_of_obstacles[pointx][d]!='x';--d)
    {
        tab[pointx][d]=v-1;
        --v;
    }
    v=100;
    for(int d=pointy+1;tab_of_obstacles[pointx][d]!='x';++d)
    {
        tab[pointx][d]=v-1;
        --v;
    }
    for(int d=1;d<y-1;++d)
    {
        //2 petle
        //mniejsze
        int vv=tab[pointx][d];
        for(int c=pointx;c>0;--c)
        {
            tab[c][d]=vv;
            --vv;
        }
        //wieksze
        vv=tab[pointx][d];
        for(int c=pointx;c<x-1;++c)
        {
            tab[c][d]=vv;
            --vv;
        }
    }
    for(a=0;a<x;++a)
    {
        for(b=0;b<y;++b)
        {
            cout<<tab[a][b]<<"  ";
        }cout<<endl;
    }

}

void plansza::displaytab()
{
    for(int i=0;i<this->x;++i)
    {
        for(int j=0;j<this->y;++j)
        {
            cout<<tab_of_obstacles[i][j]<<"  ";
        }
        cout<<endl;
    }
    cout<<endl;
}
