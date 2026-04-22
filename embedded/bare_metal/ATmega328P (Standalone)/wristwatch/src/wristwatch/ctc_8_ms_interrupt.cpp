
#include <avr/io.h>
#include <avr/interrupt.h>

void ctc_8ms_interrupt_init()
{
  // WGM
  // to have more control over counter we will use CTC mode.

  TCCR0A |= (1 << WGM01);
  TCCR0A &= ~(1 << WGM00);
  TCCR0B &= ~(1 << WGM02);

  // PRESCALER
  // we need to use prescaler to slow down MCU's clock
  // default F_CPU is 16MHz, but in main.cpp it will be changed to 2MHz
  // we will use 64 prescaler (16000000/64 = 250000 ticks per second which is 250 tick per ms)

  TCCR0B &= ~(1 << CS02);
  TCCR0B |= (1 << CS01);
  TCCR0B |= (1 << CS00);

  // INTERRUPTS
  // OCR0A tells after how many ticks it will overflow counter and do an interrupt
  // we want our counter to count 250 ticks (250 * 0.000032s = 0.008s = 8ms)
  // knowing that counter counts from 0 we need to set OCR0A to 249 (0 - 249 gives exactly 250 ticks)

  OCR0A = 249;             // 8 ms when clock is set to 2 MHz
  TIMSK0 |= (1 << OCIE0A); // allows for ISR (Interrupt Sub Routine)
  sei();                   // global interrupt enable
}