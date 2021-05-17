from socket import *
from _thread import *
from datetime import datetime
czat1=""
czat2=""
czat3=""
czat4=""
czat5=""
clients=[]
def getServerTime():
    return datetime.now().strftime("%H:%M:%S")

def client_thread(client):
    print("start")      #thread zaczyna dzialac
    work=True
    while work:
        data=client.recv(1024)
        dec=data.decode()
        if(dec==""):
            continue
        stri=str("wyslano o: "+getServerTime()+"\n"+dec)

        if (dec[-1] == "0"):
            global czat1
            czat1 += stri
            czat1 = czat1[:-1]
            czat1 += "\n"
            print("LEN CLI:",len(clients))
            for c in clients:
                c.send(czat1.encode())#         TESTOWANE DLA CZATU 1
        elif (dec[-1] == "1"):
            global czat2
            czat2 += stri
            czat2 = czat2[:-1]
            czat2 += "\n"
            client.send(czat2.encode())
        elif (dec[-1] == "2"):
            global czat3
            czat3 += stri
            czat3 = czat3[:-1]
            czat3 += "\n"
            client.send(czat3.encode())
        elif (dec[-1] == "3"):
            global czat4
            czat4 += stri
            czat4 = czat4[:-1]
            czat4 += "\n"
            client.send(czat4.encode())
        elif (dec[-1] == "4"):
            global czat5
            czat5+= stri
            czat5 = czat5[:-1]
            czat5 += "\n"
            client.send(czat5.encode())
    client.close()

s=socket(AF_INET,SOCK_STREAM)
s.bind(('',8888))
s.listen(5)
while True:
    client,addr=s.accept()
    print("nowe polaczenie z:",addr)#po dodaniu nowego clienta
    start_new_thread(client_thread,(client,))
    clients.append(client)
s.close()