#include <avr/io.h>
#include <util/atomic.h>

static volatile uint16_t ticks_counter = 0;

uint16_t get_ticks_counter()
{
  uint16_t ticks;
  ATOMIC_BLOCK(ATOMIC_RESTORESTATE)
  {
    ticks = ticks_counter;
  }
  return ticks;
}

void increment_ticks_counter()
{
  ticks_counter++;
}

void reset_ticks_counter()
{
  ATOMIC_BLOCK(ATOMIC_RESTORESTATE)
  {
    ticks_counter = 0;
  }
}