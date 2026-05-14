#ifndef UART_H
#define UART_H

#include <stdint.h>
void UART_init(uint32_t baud);
void UART_send_byte(uint8_t byte);
void UART_print_string(const char* str);
void UART_print_int(uint32_t num);
#endif