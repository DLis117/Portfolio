This is a simple demo of duplex communication using UART, and non blocking states handling.  
Once the button is pressed, it sends byte to receiver.  
Once the receiver receives a specific byte, it lights up corresponding LED for a while.    

To write the code I used PlatformIO.

schema:  

![UART_duplex schema](/embedded/docs/ATmega328P%20(Arduino)/4.3%20UART_duplex_transceiver/UART_duplex.png)

demo:

![UART_duplex demo](/embedded/docs/ATmega328P%20(Arduino)/4.3%20UART_duplex_transceiver/UART_duplex.gif)