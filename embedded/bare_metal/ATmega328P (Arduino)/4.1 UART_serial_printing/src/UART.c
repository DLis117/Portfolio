#include <avr/io.h>

void UART_init(uint32_t baud)
{
    // baud rate of UART is set with UBRR register
    uint16_t ubrr_value = (F_CPU / (16UL * baud)) - 1; // we cast baud to unsigned long so result of division is not rounded

    // UBRR is 16 bit register so to set its value we need to set its lower and higher bits separately
    UBRR0H = (uint8_t)(ubrr_value >> 8); // HIGH bits of UBRR register
    UBRR0L = (uint8_t)(ubrr_value);      // LOW bits of UBRR register

    UCSR0B = (1 << TXEN0); // enable UART transmission

    // now we need to define data frame format
    // we want to send 8 bit data without parity bit and with 1 stop bit
    UCSR0C = 0;
    UCSR0C = (1 << UCSZ01) | (1 << UCSZ00); //8N1
}

void UART_send_byte(uint8_t byte)
{
    // Unless UART's Data Register is busy we loop waiting
    while(!(UCSR0A & (1<<UDRE0)));

    UDR0 = byte; //send data byte to Data Transmission Register (DTR)
}

void UART_print_string(const char* str)
{
    while(*str)
    {
        UART_send_byte(*str++);
    }
}

void UART_print_int(uint32_t num)
{
    char buffer[12];
    ultoa(num, buffer, 10);
    UART_print_string(buffer);
}