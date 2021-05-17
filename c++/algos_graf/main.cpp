#include <iostream>
#include <vector>
#include<queue>
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int liczba_placowek;
    int liczba_krawedzi;
    int nr_placowki_wysylajacej_transport;
    int max_liczba_godzin;
    int nr_placowki1,nr_placowki2;

    int counter=0;
    int maximum=0;

    cin>>liczba_placowek>>liczba_krawedzi>>nr_placowki_wysylajacej_transport>>max_liczba_godzin;
    vector<vector<int>> v1(liczba_placowek);
    bool odwiedzoned[liczba_placowek]={0};
    int distance[liczba_placowek]={0};
    queue<int> q1;
    for(int i=0;i<liczba_krawedzi;++i)
    {
        cin>>nr_placowki1>>nr_placowki2;
        v1.at(nr_placowki1).push_back(nr_placowki2);
        v1.at(nr_placowki2).push_back(nr_placowki1);
    }
    odwiedzoned[nr_placowki_wysylajacej_transport]=1;   //odwiedzony
    q1.push(nr_placowki_wysylajacej_transport);//?    numer= index!

    while(!q1.empty())//dopoki kolejka nie jest pusta to:
    {
        int curr=q1.front();
//        //cout<<"visited "<<curr<<endl;
        q1.pop();
        for(vector<int>::iterator it=v1.at(curr).begin();it!=v1.at(curr).end();++it)
        {
            if(!odwiedzoned[*it])
            {
                odwiedzoned[*it]=1;
                q1.push(*it);
                distance[*it]=distance[curr]+1;
                if(distance[*it]<=max_liczba_godzin/2)
                {
                  ++counter;
                }
                if(distance[*it]>maximum)
                {
                    maximum=distance[*it];
                }
            }

        }
    }
    cout<<maximum<<" "<<counter;

    return 0;
}
