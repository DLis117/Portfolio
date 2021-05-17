class perceptron:
    def __init__(self,ile_inputow,wspolczynnik):
        self.wagi=[0 for i in range(ile_inputow)]
        self.ile_iputow=ile_inputow
        self.wspolczynnik=wspolczynnik

    def ucz_sie(self,inputy):# w mainie odpal x=10 razy
        for x in inputy:
            wyliczony = self.sprawdz(x)
            for i in range(self.ile_iputow):
                self.wagi[i]+=self.wspolczynnik*(x[1]-wyliczony)*x[0][i]

    def sprawdz(self, inputy):
        wynik = 0
        for i in range(self.ile_iputow):
            # print(i)
            wynik += inputy[0][i] * self.wagi[i]
        if (wynik >= 1):
            return 1
        else:
            return 0

    def test(self,inputy):
        for j in range (len(inputy)):
            print(inputy[j],end="->")
            wynik = 0
            for i in range (self.ile_iputow):
                wynik+=inputy[j][i]*self.wagi[i]
            if(wynik>=1):
                print(1)
            else:
                print(0)


daneor=[[[0,0],0],
        [[0,1],1],
        [[1,0],1],
        [[1,1],1]]

daneand=[[[0,0],0],
         [[0,1],0],
         [[1,0],0],
         [[1,1],1]]

generacje=10

p1=perceptron(2,0.1)
for i in range(generacje):
    p1.ucz_sie(daneor)

p2=perceptron(2,0.1)
for i in range(generacje):
    p2.ucz_sie(daneand)

print("OR")
inp=[[1,1],[0,1],[1,0],[0,0]]
p1.test(inp)

print("AND")
inp=[[1,1],[0,1],[1,0],[0,0]]
p2.test(inp)