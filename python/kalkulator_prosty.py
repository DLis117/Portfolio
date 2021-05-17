import tkinter as tk
kalkulator=tk.Tk()
x=0#wynik obliczen
s=""#do wypisywania obliczen
def convert():
    global x
    global s
    entry.delete(0,tk.END)
    if (vv.get() == 2):
        entry.insert(tk.END, str(bin(x)))
    else:
        entry.insert(tk.END, str(x))

def dopisz(x):
    global s
    s+=str(x)
    entry.delete(0, tk.END)
    entry.insert(tk.END, s)

def oblicz():
    global x
    global s
    if "+" in s:
        k=s.split("+")
        v=int(k[0])
        b=int(k[1])
        x=v+b
        entry.delete(0,tk.END)
        if (vv.get() == 2):
            entry.insert(tk.END, str(bin(x)))
        else:
            entry.insert(tk.END, str(x))
        s=str(x)
    elif "-" in s:
        k = s.split("-")
        v = int(k[0])
        b = int(k[1])
        x = v - b
        entry.delete(0, tk.END)
        if (vv.get() == 2):
            entry.insert(tk.END, str(bin(x)))
        else:
            entry.insert(tk.END, str(x))
        s = str(x)
    elif "*" in s:
        k = s.split("*")
        v = int(k[0])
        b = int(k[1])
        x = v * b
        entry.delete(0, tk.END)
        if (vv.get() == 2):
            entry.insert(tk.END, str(bin(x)))
        else:
            entry.insert(tk.END, str(x))
        s = str(x)
    elif "/" in s:
        k = s.split("/")
        v = int(k[0])
        b = int(k[1])
        x = int(v / b)
        entry.delete(0, tk.END)
        if (vv.get() == 2):
            entry.insert(tk.END, str(bin(x)))
        else:
            entry.insert(tk.END, str(x))
        s = str(x)

def skasuj():
    global x
    global s
    x=0
    s=""
    entry.delete(0, tk.END)
    entry.insert(tk.END, str(x))


w=5
entry=tk.Entry(kalkulator)
entry.config(width=int(w*4))
entry.insert(tk.END,str(x))
entry.grid(columnspan=4)
vv=tk.IntVar()#do radiobuttonow
r1=tk.Radiobutton(kalkulator,text="dec",variable=vv,value=1,command=convert).grid(row=1,columnspan=2)
r2=tk.Radiobutton(kalkulator,text="bin",variable=vv,value=2,command=convert).grid(row=1,columnspan=4)
b1=tk.Button(kalkulator,text="1",width=int(w),command=lambda :dopisz(1)).grid(row=2,column=0)
b2=tk.Button(kalkulator,text="2",width=int(w),command=lambda :dopisz(2)).grid(row=2,column=1)
b3=tk.Button(kalkulator,text="3",width=int(w),command=lambda :dopisz(3)).grid(row=2,column=2)
bplus=tk.Button(kalkulator,text="+",width=int(w),command=lambda :dopisz("+")).grid(row=2,column=3)

b4=tk.Button(kalkulator,text="4",width=int(w),command=lambda :dopisz(4)).grid(row=3,column=0)
b5=tk.Button(kalkulator,text="5",width=int(w),command=lambda :dopisz(5)).grid(row=3,column=1)
b6=tk.Button(kalkulator,text="6",width=int(w),command=lambda :dopisz(6)).grid(row=3,column=2)
bminus=tk.Button(kalkulator,text="-",width=int(w),command=lambda :dopisz("-")).grid(row=3,column=3)

b7=tk.Button(kalkulator,text="7",width=int(w),command=lambda :dopisz(7)).grid(row=4,column=0)
b8=tk.Button(kalkulator,text="8",width=int(w),command=lambda :dopisz(8)).grid(row=4,column=1)
b9=tk.Button(kalkulator,text="9",width=int(w),command=lambda :dopisz(9)).grid(row=4,column=2)
bmul=tk.Button(kalkulator,text="*",width=int(w),command=lambda :dopisz("*")).grid(row=4,column=3)

b0=tk.Button(kalkulator,text="0",width=int(w),command=lambda :dopisz(0)).grid(row=5,column=0)
bequals=tk.Button(kalkulator,text="=",width=int(w),command=oblicz).grid(row=5,column=1)
bC=tk.Button(kalkulator,text="C",width=int(w),command=skasuj).grid(row=5,column=2)
bdiv=tk.Button(kalkulator,text="/",width=int(w),command=lambda :dopisz("/")).grid(row=5,column=3)
kalkulator.mainloop()