# SPI Full-Duplex Communication

This project demonstrates full-duplex communication between an SPI master and a slave using ATmega328P microcontrollers.

## Master-to-Slave Communication

When a button on the master's side is pressed:

1. The master pulls the CS pin LOW to initiate communication.
2. The master writes a single byte to the `SPDR` register, which starts the data transfer and generates the clock signal:
   - `'R'` when the left button is pressed, indicating the red LED.
   - `'G'` when the right button is pressed, indicating the green LED.

   Simultaneously, the slave receives the byte and transmits its own previously prepared byte stored in the slave's `SPDR` register.
3. An interrupt signals the end of the data transfer.
4. The slave reads the received byte (`'R'` or `'G'`) and lights up the corresponding LED for a predefined duration.
5. The master terminates the communication by setting the CS pin HIGH.

## Slave-to-Master Communication

To notify the master that data is available for transmission, the slave uses an additional IRQ signal line.

When a button on the slave's side is pressed:

1. The slave prepares a single byte (`'R'` or `'G'`) by writing it to the `SPDR` register.
2. The slave pulls the IRQ line LOW.
3. The falling edge triggers an external interrupt on the master, setting the `irq` flag to `1`.
4. The master detects the flag and initiates an SPI connection by pulling the CS pin LOW.
5. The master writes a dummy value to its `SPDR` register to start the transfer and generate the clock signal. While the clock is running, the master receives the byte prepared by the slave and simultaneously sends the dummy value to the slave.
6. An interrupt signals the end of the data transfer.
7. The master reads the received byte (`'R'` or `'G'`) and lights up the corresponding LED.
8. The master terminates the communication by setting the CS pin HIGH.

The additional IRQ line allows the slave to notify the master when data is available, since the slave cannot initiate an SPI transfer on its own.

## Error Handling

If an error occurs during an SPI transfer, the master or slave indicates it by lighting up the yellow error LED.

## Development Environment

The firmware was developed using **PlatformIO**.

## Circuit Diagram

![SPI full-duplex communication circuit diagram](/embedded/docs/ATmega328P%20(Arduino)/6.%20SPI%20full_duplex/SPI_full_duplex.png)

## Demo

![SPI full-duplex communication demo](/embedded/docs/ATmega328P%20(Arduino)/6.%20SPI%20full_duplex/SPI_full_duplex.gif)
