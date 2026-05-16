#include <avr/io.h>
#include "UART.h"

int main()
{
  UART_init(9600);
  while (1)
  {
    // UART
    UART_echo();
  }

  return 0;
}