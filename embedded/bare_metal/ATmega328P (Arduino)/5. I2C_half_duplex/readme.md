# I2C Half-Duplex Communication

This project demonstrates half-duplex communication between an I2C master and a slave using an ATmega328P microcontroller.

## Master-to-Slave Communication

When a button on the master's side is pressed:

1. The master claims the I2C bus by generating a START condition.
2. It sends the slave address with the **Write (SLA+W)** bit.
3. It transmits a single byte:
   - `'R'` when the left button is pressed, indicating the red LED.
   - `'G'` when the right button is pressed, indicating the green LED.
4. The slave receives the byte and lights up the corresponding LED for a predefined duration.
5. The master terminates the communication by generating a STOP condition.

## Slave-to-Master Communication

To notify the master that it has data to send, the slave uses an additional IRQ signal wire.

When a button on the slave's side is pressed:

1. The slave pulls the IRQ line low.
2. The falling edge triggers an external interrupt on the master, setting the `irq` flag to `1`.
3. The master detects the flag and initiates an I2C read transaction.
4. It sends the slave address with the **Read (SLA+R)** bit.
5. The master receives a single byte (`'R'` or `'G'`) and lights up the corresponding LED.
6. The master terminates the communication with a STOP condition.

The additional IRQ line allows the slave to notify the master when data is available, since the slave cannot initiate an I2C transaction on its own.

## Error Handling

If an error occurs during an I2C transaction, the master or slave indicates it by lighting up the yellow error LED.

## Development Environment

The firmware was developed using **PlatformIO**.

## Circuit Diagram

![I2C half-duplex communication circuit diagram](/embedded/docs/ATmega328P%20(Arduino)/5.%20I2C_half_duplex/I2C_half_duplex.png)

## Demo

![I2C_half_duplex communication demo](/embedded/docs/ATmega328P%20(Arduino)/5.%20I2C_half_duplex/I2C_half_duplex.gif)
