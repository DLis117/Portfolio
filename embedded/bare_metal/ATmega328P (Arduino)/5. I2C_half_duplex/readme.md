This is a simple demo of half duplex communication using I2C communication protocol,

when a button on master's side is pressed

- master claims the bus;
- sends SLA + W to a slave;
- sends byte of data either 'R' (when left button is pressed) or 'G' when right button is pressed. Letters indicate colors of LED to be light up on slave's side;
- once slave receives data it lights up corresponding LED for a while;
- at the end the communication stops.

For a reliable half-duplex communication additional wire is used to indicate data that slave wants to send to master.

if a button is pressed on slave's side:
- slave 

Once the button is pressed, it sends byte to receiver.  
Once the receiver receives a specific byte, it lights up corresponding LED for a while.    

To write the code I used PlatformIO.

schema:  

![UART_duplex schema](/embedded/docs/ATmega328P%20(Arduino)/4.3%20UART_duplex_transceiver/UART_duplex.png)

demo:

![UART_duplex demo](/embedded/docs/ATmega328P%20(Arduino)/4.3%20UART_duplex_transceiver/UART_duplex.gif)